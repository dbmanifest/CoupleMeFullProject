import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription-server";
import axios from "axios";

const BACKEND_URL = "https://jjgzmcnggv7pfa-3000.proxy.runpod.net/";

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
const { seed, cfg, width, height, charachteristics } = await req.json();

  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = new FormData();
   const instructions = `Name: ${charachteristics.name}
    Age: ${charachteristics.age}
    Ethnicity: ${charachteristics.ethnicity.value}
    Gender: ${charachteristics.age}
    Personality: ${charachteristics.personality.value}
    Occupation: ${charachteristics.occupation.value}   
    Hobbies: ${charachteristics.hobbies.value}      
    Relationship: ${charachteristics.relationship.value}
    
    Example Dialogue:

    User: Hey ${charachteristics.name}, up for a game tonight?
    ${charachteristics.name}: Hey! Always 😎 What time?

    User: How about 8 PM?
    ${charachteristics.name}: Perfect. I'm ready to win 😂

    User: We'll see about that!
    ${charachteristics.name}: Bring it on! 😈
    `;

    const image_prompt_base = `
    ${charachteristics.ethnicity.value}, ${charachteristics.gender}, ${charachteristics.age} years old, ${charachteristics.bodytype.value}, ${charachteristics.breastsize.value}, ${charachteristics.haircolor.value}, ${charachteristics.hairstyle.value}, ${charachteristics.eyecolor.value}.
    `;

    const action_prompt =  `${charachteristics.prompt}`
    
    formData.append("face_prompt", image_prompt_base);
    formData.append("src_prompt", image_prompt_base + action_prompt);


    const url = `${BACKEND_URL}/generate_images`;
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      const res = response.data;
      const baseUuid = res.images_info.find((info: { type: string }) => info.type === 'base')?.image_uuid;
      const srcUuid = res.images_info.find((info: { type: string }) => info.type === 'src')?.image_uuid;

      // Wait for a short time to ensure images are processed
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const getImage = async (imageUuid: string) => {
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
      };

      let baseImage, srcImage;

      if (baseUuid) {
        while (true) {
          baseImage = await getImage(baseUuid);
          if (baseImage !== "Image not found") {
            break;
          } else {
            await new Promise((resolve) => setTimeout(resolve, 2500));
          }
        }
      }

      if (srcUuid) {
        while (true) {
          srcImage = await getImage(srcUuid);
          if (srcImage !== "Image not found") {
            break;
          } else {
            await new Promise((resolve) => setTimeout(resolve, 2500));
          }
        }
      }
      // turn baseImage and srcImage into base64
      const baseImageBase64 = baseImage?.image_data;
      const srcImageBase64 = srcImage?.image_data;

     // find character using companionId param and update the record with the new values (all the fromData and the baseImageBase64 and srcImageBase64)
      const character = await prisma.companion.findUnique({
        where: {
          id: params.companionId,
        },
      });

      if (!character) {
        return new NextResponse("Character not found", { status: 404 });
      }
      // create new object without cfg and seed and width and height and face_positive_prompt and src_positive_prompt
      const formDataWithoutCfgSeedWidthHeightFacePositivePromptSrcPositivePrompt = {
        ...formData,
        cfg: undefined,
        seed: undefined,
        width: undefined,
        height: undefined,
        face_positive_prompt: undefined,
        src_positive_prompt: undefined,
      };


      const updatedCharacter = await prisma.companion.update({
        where: {
          id: params.companionId,
        },
        data: {
        instructions: instructions,
        baseImageOne: baseImageBase64,
        description: `A ${charachteristics.age}-year-old ${charachteristics.gender} ${charachteristics.ethnicity.value}`, // Add description field
        src: srcImageBase64,
        age: charachteristics.age,
        traits: charachteristics.personality.value,
        backstory: charachteristics.relationship.value,
        category: charachteristics.style.value,
        },
      });

      return NextResponse.json(
        character,
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
    // console.log("[COMPANION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
