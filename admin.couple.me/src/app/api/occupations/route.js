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
    const occupations = await prisma.occupation.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    // Fetch the total count with the search filter
    const totalOccupations = await prisma.occupation.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    // Return the paginated and filtered data along with the total count
    return NextResponse.json({
      occupations,
      totalOccupations,
      page,
      totalPages: Math.ceil(totalOccupations / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching occupations" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newoccupation = await prisma.occupation.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newoccupation);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating occupation" },
      { status: 500 }
    );
  }
}
