import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    const offset = (page - 1) * limit;

    const eyecolors = await prisma.eyecolor.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    const totalEyecolors = await prisma.eyecolor.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    return NextResponse.json({
      eyecolors,
      totalEyecolors,
      page,
      totalPages: Math.ceil(totalEyecolors / limit),
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error fetching eyecolors" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newEyecolor = await prisma.eyecolor.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newEyecolor);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error creating eyecolor" },
      { status: 500 }

    );
  }
}
