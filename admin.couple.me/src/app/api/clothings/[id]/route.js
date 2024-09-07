import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const clothing = await prisma.clothing.findUnique({
      where: { id: intId },
    });
    if (!clothing) {
      return NextResponse.json({ error: "clothing not found" }, { status: 404 });
    }
    return NextResponse.json(clothing);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching clothing" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.clothing.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating clothing" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.clothing.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "Style deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting clothing" },
      { status: 500 }
    );
  }
}
