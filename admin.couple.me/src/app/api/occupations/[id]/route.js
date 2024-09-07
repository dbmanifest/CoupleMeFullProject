import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const occupation = await prisma.occupation.findUnique({
      where: { id: intId },
    });
    if (!occupation) {
      return NextResponse.json({ error: "occupation not found" }, { status: 404 });
    }
    return NextResponse.json(occupation);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching occupation" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.occupation.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating occupation" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.occupation.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "Style deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting occupation" },
      { status: 500 }
    );
  }
}
