import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    // Calculate the offset
    const offset = (page - 1) * limit;

    const haircolors = await prisma.haircolor.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    // Fetch the total count with the search filter
    const totalHaircolors = await prisma.haircolor.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    // Return the paginated and filtered data along with the total count
    return NextResponse.json({
      haircolors,
      totalHaircolors,
      page,
      totalPages: Math.ceil(totalHaircolors / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching haircolors" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newHaircolor = await prisma.haircolor.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newHaircolor);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error creating haircolor" },
      { status: 500 }

    );
  }
}
