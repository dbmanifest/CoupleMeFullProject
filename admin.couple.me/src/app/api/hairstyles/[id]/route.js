import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const eyecolor = await prisma.hairstyle.findUnique({
      where: { id: intId },
    });
    if (!eyecolor) {
      return NextResponse.json({ error: "Eyecolor not found" }, { status: 404 });
    }
    return NextResponse.json(eyecolor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching hairstyle" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedEyecolor = await prisma.hairstyle.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedEyecolor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating hairstyle" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.hairstyle.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "hairstyle deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting hairstyle" },
      { status: 500 }
    );
  }
}
