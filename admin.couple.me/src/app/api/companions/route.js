import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";


export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    // Calculate the offset
    const offset = (page - 1) * limit;

    const companions = await prisma.companion.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    const totalCompanions = await prisma.companion.count({
      where: {
        name: {
          contains: search,
        },
      },
    });

    return NextResponse.json({
      companions,
      totalCompanions,
      page,
      totalPages: Math.ceil(totalCompanions / limit),
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error fetching companions" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newCompanion = await prisma.companion.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newCompanion);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating companion" },
      { status: 500 }
    );
  }
}
