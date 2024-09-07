import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import FormData from "form-data";
import { convertImageToBase64 } from "@/lib/base64";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  try {
    const data = await prismadb.companion.findMany({
      where: {
        categoryId: categoryId || undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const { positive_prompt, char_name } = await req.json();

  const negative_prompt =
    "((masterpiece, best quality)), award winning, 4k, 8k, character sheet, simple background, photography, visible face, (one woman), portrait, model, influencer, hot, beautiful, cute, white dress, ((Perfect Hands)), UHD, 8K, natural pose, waving, greeting, natural background";
  const cfg = 2.0;
  const width = 512;
  const height = 512;
  const num_images = 1;
  const seed = "";
  const revert_extra = "";
  const callback_url = "";

  // Generate image URL based on char_name
  const imageUrl = `https://i.ibb.co/YbnjbZd/${char_name}.png`;
  let image_uuid = ""; //default is dummy uuid, just for test purose

  try {
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      // console.log("Unauthorized")
      // console.log("User: ", user)

      // console.log(user);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // logging users message
    await prismadb.companion.update({
      where: {
        id: params.chatId,
      },
      data: {
        messages: {
          create: {
            content: positive_prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    let companionAvatarUrl = await prismadb.companion.findUnique({
      where: {
        id: params.chatId,
      },
      select: {
        src: true,
        name: true,
      },
    });

    if (companionAvatarUrl) {
      // prepare json data and send image as file
      // Prepare FormData
      // Fetch the image from the URL
      const imageResponse = await axios.get(companionAvatarUrl.src, {
        responseType: "arraybuffer",
      });
      const imageBuffer = Buffer.from(imageResponse.data);
      const formData = new FormData();

      formData.append("positive_prompt", positive_prompt);
      formData.append("face_image", imageBuffer, {
        filename: `${companionAvatarUrl.name}.png`,
        contentType: imageResponse.headers["content-type"],
      });
      const url =
        "https://jjgzmcnggv7pfa-8000.proxy.runpod.net/generate_consistent_character";
      const response = await axios.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      if (response.status == 200) {
        const res = JSON.parse(response.data);
        // const res = response.data; //for testing purpose, this will be replaced with the above code line
        image_uuid = res.images_info[0].image_uuid;
      }
      // Rest of the code...
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },

        { status: 500 }
      );
    }

    // Assuming response structure would be as given the the sample python code
    // {
    // "images_info":[{
    //  "image_uuid":"sjfd-awaw-fq434-5343-45345"
    // }]

    // Assumption, response object returned

    const getImage = async (
      imageUuid: any,
      deleteFlag = true,
      type = "PNG",
      base64C = false,
      qualityLevel = 100
    ) => {
      try {
        // Validate quality_level and type
        if (qualityLevel < 0 || qualityLevel > 100) {
          qualityLevel = 100;
        }
        const supportedTypes = ["PNG", "JPEG", "WebP", "GIF"];
        if (!supportedTypes.includes(type)) {
          throw new Error("Unsupported image type");
        }

        // Construct the URL
        const url = `https://jjgzmcnggv7pfa-8000.proxy.runpod.net/getimage/${imageUuid}`;

        // Set up the parameters
        const params = {
          delete: deleteFlag,
          type,
          base64_c: base64C,
          quality_level: qualityLevel,
        };

        // Make the GET request
        const response = await axios.get(url, { params });
        // console.log(response, "responseresponseresponseresponseresponse");

        // Check if the response is OK
        if (response.status === 200) {
          if (base64C) {
            // If the response is JSON, parse it
            return response.data;
          } else {
            // Otherwise, return the raw content
            return response.data;
          }
        } else {
          // Handle errors
          return response.statusText;
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        return error;
      }
    };
    let image;
    try {
      while (true) {
        image = await getImage(image_uuid);
        // console.log(image, "imageimageimageimageimage");
        image = image.data;
        if (image != "Image Not Found") {
          break;
        }
      }
      let image_data = image.image_data;
      await prismadb.companion.update({
        where: {
          id: params.chatId,
        },
        data: {
          messages: {
            create: {
              content: JSON.stringify(image_data),
              role: "system",
              userId: user.id,
            },
          },
        },
      });
      return new NextResponse(image, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },

      { status: 500 }
    );
  }
}
