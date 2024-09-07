import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prismadb";
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
  const baseUuid = searchParams.get("baseUuid");
  const srcUuid = searchParams.get("srcUuid");
  const charachteristics = JSON.parse(searchParams.get("charachteristics") || "{}");

  if (!baseUuid || !srcUuid) {
    return NextResponse.json({ error: "Missing image UUIDs" }, { status: 400 });
  }

  try {
    const baseImage = await getImage(baseUuid);
    const srcImage = await getImage(srcUuid);

    if (baseImage === "Image not found" || srcImage === "Image not found") {
      return NextResponse.json({ status: "pending" }, { status: 202 });
    } else if (baseImage.image_data && srcImage.image_data) {
      const user = await currentUser();

      if (!user || !user.id) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const instructions = `Name: ${charachteristics.name}
        Age: ${charachteristics.age}
        Ethnicity: ${charachteristics.ethnicity}
        Gender: ${charachteristics.gender}
        Personality: ${charachteristics.personality}
        Occupation: ${charachteristics.occupation}   
        Hobbies: ${charachteristics.hobbies}      
        Relationship: ${charachteristics.relationship}
       
        Example Dialogue:

        User: Hey ${charachteristics.name}, up for a game tonight?
        ${charachteristics.name}: Hey! Always 😎 What time?

        User: How about 8 PM?
        ${charachteristics.name}: Perfect. I'm ready to win 😂

        User: We'll see about that!
        ${charachteristics.name}: Bring it on! 😈
      `;

      const image_prompt_base = `
        ${charachteristics.ethnicity}, ${charachteristics.gender}, ${charachteristics.age} years old, ${charachteristics.bodytype}, ${charachteristics.breastsize}, ${charachteristics.haircolor}, ${charachteristics.hairstyle}, ${charachteristics.eyecolor}.
      `;
          // get that category ID
      const category = await prisma.category.findFirst({
        where: {
          name: "Default",
        },
      });
      const categoryId = category?.id;
      if (!categoryId || !category) {
        return NextResponse.json({ error: "Failed to fetch category ID" }, { status: 500 });
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
      // Create a new character
      const newCharacter = await prisma.companion.create({
        data: {
          name: charachteristics.name,
          userName: user.firstName || 'CoupleMe',
          description: `A ${charachteristics.age}-year-old ${charachteristics.ethnicity} girl. She likes ${hobbies}. She is a ${charachteristics.occupation}.`,
          seed: charachteristics.seed || "",
          baseImageOne: baseImage.image_data,
          baseImagePrompt: image_prompt_base,
          instructions: instructions,
          src: srcImage.image_data,
          userId: user.id,
          age: charachteristics.age,
          traits: charachteristics.personality,
          backstory: charachteristics.relationship,
          categoryId: categoryId,
        },
      });

      return NextResponse.json({ newCharacter }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}