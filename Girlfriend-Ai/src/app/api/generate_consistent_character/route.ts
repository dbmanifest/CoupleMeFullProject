import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import FormData from "form-data";
import { currentUser } from "@clerk/nextjs/server";
import { getBalance, deductBalance } from "@/lib/wallet";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const { positive_prompt, char_name, charId, companion} = await req.json();

  const negative_prompt =
    "((masterpiece, best quality)), award winning, 4k, 8k, character sheet, simple background, photography, visible face, (one woman), portrait, model, influencer, hot, beautiful, cute, white dress, ((Perfect Hands)), UHD, 8K, natural pose, waving, greeting, natural background";
  const cfg = 2.0;
  const width = 512;
  const height = 512;
  const num_images = 1;
  const seed = "";
  const revert_extra = "";
  const callback_url = "";

  try {
    const user = await currentUser();

    if (!user || !user.firstName || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let companionAvatarUrl = await prismadb.companion.findUnique({
      where: {
        id: charId,
      },
      select: {
        src: true,
        name: true,
        baseImageOne: true,
        baseImagePrompt: true,
      },
    });

    if (companionAvatarUrl) {
      const imageResponse = await axios.get(companionAvatarUrl.baseImageOne, {
        responseType: "arraybuffer",
      });
      let fileImage;
      if (imageResponse.status === 200) {
         fileImage = Buffer.from(imageResponse.data);
      } else {
       fileImage = Buffer.from(companionAvatarUrl.baseImageOne, "base64");
      }
      
      const formData = new FormData();
      
      formData.append("positive_prompt", `${companionAvatarUrl.baseImagePrompt}, ${positive_prompt}`);
      formData.append("face_image", fileImage, {
        filename: "face_image",
      });
      const url =
        "https://jjgzmcnggv7pfa-8000.proxy.runpod.net/consistent_character";
      const response = await axios.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (response.status == 200) {
        const res = response.data;
        const image_uuid = res.images_info[0].image_uuid;

        return NextResponse.json(
          { image_uuid },
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
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
