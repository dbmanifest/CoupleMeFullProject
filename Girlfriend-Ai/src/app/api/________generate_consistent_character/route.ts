import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import FormData from "form-data";
import { convertImageToBase64 } from "@/lib/base64";

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

export async function POST(req: NextRequest) {
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

  try {
    // Convert image to base64
    const base64Image = await convertImageToBase64(imageUrl);

    // Prepare FormData
    const formData = new FormData();
    formData.append("face_image", base64Image);
    formData.append("positive_prompt", positive_prompt);
    formData.append("negative_prompt", negative_prompt);
    formData.append("seed", seed);
    formData.append("cfg", cfg);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("num_images", num_images);
    formData.append("revert_extra", revert_extra);
    formData.append("callback_url", callback_url);


    // Make POST request
    const url =
      "https://digifab-fastapi.vercel.app/generate_consistent_character";
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
