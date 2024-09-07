import prisma from "@/utils/prismadb";
import { log } from "console";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    // Calculate the offset
    const offset = (page - 1) * limit;

    const styles = await prisma.style.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    const totalStyles = await prisma.style.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    return NextResponse.json({
      
        styles,
        totalStyles,
        page,
        totalPages: Math.ceil(totalStyles / limit),
      
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error fetching styles" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newStyle = await prisma.style.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating style" },
      { status: 500 }
    );
  }
}
