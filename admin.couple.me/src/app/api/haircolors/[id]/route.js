import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const eyecolor = await prisma.haircolor.findUnique({
      where: { id: intId },
    });
    if (!eyecolor) {
      return NextResponse.json({ error: "Eyecolor not found" }, { status: 404 });
    }
    return NextResponse.json(eyecolor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching haircolor" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedEyecolor = await prisma.haircolor.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedEyecolor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating haircolor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.haircolor.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "haircolor deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting haircolor" },
      { status: 500 }
    );
  }
}
