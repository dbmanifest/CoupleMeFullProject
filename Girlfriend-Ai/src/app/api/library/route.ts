// app/api/library/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId } = auth();

  if (userId) {
    try {
      const images = await prismadb.libraryItem.findMany({
        where: {
          userId: userId,
        },
      });
      // console.log(images, "iamgesss");
      return NextResponse.json(images);
    } catch (error) {
      return NextResponse.error();
    }
  }

  return NextResponse.json([]);
}
