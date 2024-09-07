
import { NextResponse } from "next/server";
import { getBalance } from "@/lib/wallet";

export async function GET(req: any) {
  try {
    const balance = await getBalance();
    if (balance !== false) {
      return NextResponse.json({ balance }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }
  } catch (error) {
    console.error('Error Getting Balance:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}