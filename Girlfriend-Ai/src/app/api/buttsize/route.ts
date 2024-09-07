import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"; // Adjust the path to your Prisma client instance

export async function GET() {
  try {
    // Fetch styles from the Prisma database

    const styles = await prisma.buttsize.findMany();

    // Return the styles as a JSON response
    return NextResponse.json(styles);
  } catch (error) {
    console.error("Error fetching styles:", error);
    return NextResponse.json(
      { error: "Failed to fetch styles" },
      { status: 500 }
    );
  }
}
