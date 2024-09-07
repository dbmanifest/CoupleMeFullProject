import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const personality = await prisma.libraryItem.findUnique({
      where: { id: intId },
    });
    if (!personality) {
      return NextResponse.json({ error: "libraryItem not found" }, { status: 404 });
    }
    return NextResponse.json(personality);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching libraryItem" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.libraryItem.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating libraryItem" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.libraryItem.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "libraryItem deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting libraryItem" },
      { status: 500 }
    );
  }
}
