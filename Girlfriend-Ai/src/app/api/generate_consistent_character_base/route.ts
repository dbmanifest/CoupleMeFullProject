import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import { currentUser } from "@clerk/nextjs/server";

const BACKEND_URL = "https://jjgzmcnggv7pfa-8000.proxy.runpod.net";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
  
  const { seed, cfg, width, height, charachteristics } = await req.json();

  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let descriptage = 0;
    if (charachteristics.age === "Teen(18 )") {
      // random number between 18 and 20
      descriptage= Math.floor(Math.random() * 3) + 18;
    }

    if (charachteristics.age === "20s") {

      descriptage = Math.floor(Math.random() * 10) + 20;
    }

    if (charachteristics.age === "30s") {
      descriptage = Math.floor(Math.random() * 10) + 30;
    }

    let hobbies = "";

    for (let i = 0; i < charachteristics.hobbies.length; i++) {
      hobbies += charachteristics.hobbies[i];
      if (i !== charachteristics.hobbies.length - 1) {
        hobbies += ", ";
      }
    }

    const formData = new FormData();
    const image_prompt_base = `
    ${charachteristics.ethnicity}, female, ${descriptage} years old, ${charachteristics.bodyType}, ${charachteristics.breastSize}, ${charachteristics.hairColor}, ${charachteristics.hairStyle}, ${charachteristics.eyeColor}.`;
    const action_prompt =  `${image_prompt_base}, at her job as ${charachteristics.occupation}`;
    
    formData.append("face_prompt", image_prompt_base);
    formData.append("src_prompt", image_prompt_base + action_prompt);

    const url = `${BACKEND_URL}/generate_images`;
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.status === 200) {
      const res = response.data;
      const baseUuid = res.images_info.find((info: { type: string }) => info.type === 'base')?.image_uuid;
      const srcUuid = res.images_info.find((info: { type: string }) => info.type === 'src')?.image_uuid;

      return NextResponse.json(
        { baseUuid, srcUuid, charachteristics },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      throw new Error("Failed to generate images");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}