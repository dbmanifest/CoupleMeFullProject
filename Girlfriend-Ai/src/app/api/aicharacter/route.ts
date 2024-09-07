import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription-server";

export async function POST(req: Request) {
  // console.log(req,"reqqqqqq")
  try {
    const body = await req.json();
    const user = await currentUser();
    // const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const prompt = body.prompt;
    // console.log(prompt, "Prompt from frontend");

    // if (
    //   !src ||
    //   !name ||
    //   !description ||
    //   !instructions ||
    //   !seed ||
    //   !categoryId
    // ) {
    //   return new NextResponse("Missing required fields", { status: 400 });
    // }

    // const isPro = await checkSubscription();

    // if (!isPro) {
    //   return new NextResponse("Pro subscription required", { status: 403 });
    // }

    // const companion = await prismadb.companion.create({
    //   data: {
    //     userId: user.id,
    //     userName: "Virtual Amour",
    //     src: src,
    //     name: name,
    //     description: description,
    //     instructions: instructions,
    //     seed: seed,
    //     backstory: "default backstory",
    //     traits: "default traits",
    //     age: 28,
    //     categoryId: "1",
    //   },
    // });

    return NextResponse.json({ prompt });
  } catch (error) {
    // console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
