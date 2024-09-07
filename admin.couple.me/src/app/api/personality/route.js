import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Get query parameters for pagination and search
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    // Calculate the offset
    const offset = (page - 1) * limit;

    // Fetch the paginated and filtered data
    const personalities = await prisma.personality.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    // Fetch the total count with the search filter
    const totalPersonalities = await prisma.personality.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    // Return the paginated and filtered data along with the total count
    return NextResponse.json({
      personalities,
      totalPersonalities,
      page,
      totalPages: Math.ceil(totalPersonalities / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching personalities" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const newpersonality = await prisma.personality.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newpersonality);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error creating personality" },
      { status: 500 }
    );
  }
}
