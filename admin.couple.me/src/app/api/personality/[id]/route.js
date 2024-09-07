import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const personality = await prisma.personality.findUnique({
      where: { id: intId },
    });
    if (!personality) {
      return NextResponse.json({ error: "personality not found" }, { status: 404 });
    }
    return NextResponse.json(personality);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching personality" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.personality.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating personality" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.personality.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "Personality deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting personality" },
      { status: 500 }
    );
  }
}
