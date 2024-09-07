import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const eyecolor = await prisma.transaction.findUnique({
      where: { id: intId },
    });
    if (!eyecolor) {
      return NextResponse.json({ error: "transaction not found" }, { status: 404 });
    }
    return NextResponse.json(eyecolor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching transaction" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedEyecolor = await prisma.transaction.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedEyecolor);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.transaction.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "transaction deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting transaction" },
      { status: 500 }
    );
  }
}
