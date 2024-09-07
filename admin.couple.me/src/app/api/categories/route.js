import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });
    const totalCategories = await prisma.category.count({
      where: {
        name: {
          contains: search,
        },
      },
    });
    return NextResponse.json({
      categories,
      totalCategories,
      page,
      totalPages: Math.ceil(totalCategories / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newCategory = await prisma.category.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}
