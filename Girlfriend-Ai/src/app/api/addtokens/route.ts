import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { amount } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedWallet = await prismadb.wallet.upsert({
      where: { userId },
      update: { balance: { increment: amount } },
      create: { userId, balance: amount },
    });

    return NextResponse.json(updatedWallet);
  } catch (error) {
    console.error("[ADD_TOKENS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
