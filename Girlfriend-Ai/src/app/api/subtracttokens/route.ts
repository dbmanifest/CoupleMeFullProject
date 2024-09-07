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

    const wallet = await prismadb.wallet.findUnique({
      where: { userId },
    });

    if (!wallet || wallet.balance < amount) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    const updatedWallet = await prismadb.wallet.update({
      where: { userId },
      data: { balance: { decrement: amount } },
    });

    return NextResponse.json(updatedWallet);
  } catch (error) {
    console.error("[SUBTRACT_TOKENS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
