import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { image_uuid: string } }
) {
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
      const url = `https://3z7938sez1oz8t-8000.proxy.runpod.net/getimage/${imageUuid}`;

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

  try {
    const image = await getImage(params.image_uuid);
    // console.log(image, "imageimageimageimageimage");

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
}
