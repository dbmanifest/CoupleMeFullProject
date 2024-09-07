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

    const bodytypes = await prisma.bodytype.findMany({
      where: {
        label: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });
    const totatBodytypes = await prisma.bodytype.count({
      where: {
        label: {
          contains: search,
        },
      },
    });

    return NextResponse.json({
      bodytypes,
      totatBodytypes,
      page,
      totalPages: Math.ceil(totatBodytypes / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching bodytypes" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newbodytype = await prisma.bodytype.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newbodytype);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating bodytype" },
      { status: 500 }
    );
  }
}
