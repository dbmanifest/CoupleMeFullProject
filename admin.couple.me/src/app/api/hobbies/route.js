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
    const hobbies = await prisma.hobbies.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    // Fetch the total count with the search filter
    const totalHobbies = await prisma.hobbies.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    // Return the paginated and filtered data along with the total count
    return NextResponse.json({
      hobbies,
      totalHobbies,
      page,
      totalPages: Math.ceil(totalHobbies / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching hobbies" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newhobbies = await prisma.hobbies.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newhobbies);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating hobbies" },
      { status: 500 }
    );
  }
}
