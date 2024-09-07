import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const ethnicity = await prisma.ethnicity.findUnique({
      where: { id: intId },
    });
    if (!ethnicity) {
      return NextResponse.json({ error: "Ethnicity not found" }, { status: 404 });
    }
    return NextResponse.json(ethnicity);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching ethnicity" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedEthnicity = await prisma.ethnicity.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedEthnicity);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating ethnicity" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.ethnicity.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "Style deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting style" },
      { status: 500 }
    );
  }
}
