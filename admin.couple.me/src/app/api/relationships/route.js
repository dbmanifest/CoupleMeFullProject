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
    const relationships = await prisma.relationship.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    // Fetch the total count with the search filter
    const totalRelationships = await prisma.relationship.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    // Return the paginated and filtered data along with the total count
    return NextResponse.json({
      relationships,
      totalRelationships,
      page,
      totalPages: Math.ceil(totalRelationships / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching relationships" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newrelationship = await prisma.relationship.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newrelationship);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error creating relationship" },
      { status: 500 }
    );
  }
}
