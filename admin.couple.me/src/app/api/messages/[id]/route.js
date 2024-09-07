import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const personality = await prisma.message.findUnique({
      where: { id: intId },
    });
    if (!personality) {
      return NextResponse.json({ error: "message not found" }, { status: 404 });
    }
    return NextResponse.json(personality);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching message" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.message.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating message" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.message.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "message deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting message" },
      { status: 500 }
    );
  }
}
