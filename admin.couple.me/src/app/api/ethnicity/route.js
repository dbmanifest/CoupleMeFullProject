import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const search = searchParams.get("search") || "";

    const offset = (page - 1) * limit;

    const Ethnicities = await prisma.ethnicity.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    const totalEthnicities = await prisma.ethnicity.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    return NextResponse.json({
      Ethnicities,
      totalEthnicities,
      page,
      totalPages: Math.ceil(totalEthnicities / limit),
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error fetching ethnicities" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newEthnicity = await prisma.ethnicity.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newEthnicity);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating ethnicity" },
      { status: 500 }
    );
  }
}
