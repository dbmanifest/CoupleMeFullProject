import prisma from "@/utils/prismadb";
import { log } from "console";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    const style = await prisma.wallet.findUnique({
      where: { id: intId },
    });
    if (!style) {
      return NextResponse.json({ error: "Style not found" }, { status: 404 });
    }
    return NextResponse.json(style);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching style" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    // const intId = parseInt(id, 10); // Convert id to integer
    const body = await req.json();
    const updatedStyle = await prisma.wallet.update({
      where: { id },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedStyle);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error updating style" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const intId = parseInt(id, 10); // Convert id to integer
    await prisma.wallet.delete({
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
