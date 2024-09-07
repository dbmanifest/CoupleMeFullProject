import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const buttsize = await prisma.buttsize.findUnique({
      where: { id: intId },
    });
    if (!buttsize) {
      return NextResponse.json({ error: "buttsize not found" }, { status: 404 });
    }
    return NextResponse.json(buttsize);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching buttsize" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.buttsize.update({
      where: { id: intId },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating buttsize" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.buttsize.delete({
      where: { id: intId },
    });
    return NextResponse.json({ message: "Style deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting buttsize" },
      { status: 500 }
    );
  }
}
