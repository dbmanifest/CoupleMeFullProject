import prisma from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({
      where: { id: id },
    });
    if (!category) {
      return NextResponse.json(
        { error: "category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching category" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.category.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "category deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
