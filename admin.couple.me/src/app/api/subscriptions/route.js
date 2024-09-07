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

    const hairstyles = await prisma.userSubscription.findMany({
      where: {
        userId: {
          contains: search,
        },
      },
      skip: offset,
      take: limit,
    });

    const totalHairstyles = await prisma.userSubscription.count({
      where: {
        userId: {
          contains: search,
        },
      },
    });

    return NextResponse.json({
      hairstyles,
      totalHairstyles,
      page,
      totalPages: Math.ceil(totalHairstyles / limit),
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error fetching User Subscriptions" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newEyecolor = await prisma.userSubscription.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(newEyecolor);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Error creating User Subscriptions" },
      { status: 500 }

    );
  }
}
