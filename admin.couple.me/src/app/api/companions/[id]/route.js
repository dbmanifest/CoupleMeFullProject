import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const companion = await prisma.companion.findUnique({
      where: { id },
    });
    if (!companion) {
      return NextResponse.json(
        { error: "Companion not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(companion);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching companion" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updatedCompanion = await prisma.companion.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedCompanion);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Error updating companion" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.companion.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Companion deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting companion" },
      { status: 500 }
    );
  }
}
