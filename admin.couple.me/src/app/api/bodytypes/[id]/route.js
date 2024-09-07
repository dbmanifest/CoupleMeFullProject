import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const bodytype = await prisma.bodytype.findUnique({
      where: { id: intId },
    });
    if (!bodytype) {
      return NextResponse.json({ error: "Style not found" }, { status: 404 });
    }
    return NextResponse.json(bodytype);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching bodytype" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.bodytype.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating bodytype" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.bodytype.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "Style deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting bodytype" },
      { status: 500 }
    );
  }
}
