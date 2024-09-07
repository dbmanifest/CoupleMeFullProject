import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

const BACKEND_URL = "https://jjgzmcnggv7pfa-8000.proxy.runpod.net";

async function getImage(imageUuid: string) {
  try {
    const url = `${BACKEND_URL}/getimage/${imageUuid}`;
    const params = { delete: true, type: "PNG", base64_c: true, quality_level: 100 };
    const response = await axios.get(url, { params });

    if (response.status === 200) {
      return response.data;
    } else {
      return response.statusText;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return error;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUuid = searchParams.get("uuid");

  if (!imageUuid) {
    return NextResponse.json({ error: "Missing image UUID" }, { status: 400 });
  }

  try {
    const image = await getImage(imageUuid);

    if (image === "Image not found") {
      return NextResponse.json({ status: "pending" }, { status: 202 });
    } else if (image.image_data) {

        // Save the image to the LibraryItem table
        const user = await currentUser();
        if (!user || !user.id) {
          return new NextResponse("Unauthorized", { status: 401 });
        }
        await prismadb.libraryItem.create({
          data: {
            userId: user.id,
            base64_string: image.image_data,
          },
        });
      return NextResponse.json({ image_data: image.image_data }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}