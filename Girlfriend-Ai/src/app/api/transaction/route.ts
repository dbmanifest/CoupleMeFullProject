import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "@/lib/transaction";
import { addBalance, createWallet, deductBalance } from "@/lib/wallet";

export async function POST(req: any) {
  const { amount, type, description } = await req.json(); // Parse the JSON body

  const success = await createTransaction(amount, type, description);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }

  if (type === "DEBIT") {
    await deductBalance(amount);
  } else if (type === "CREDIT") {
    await addBalance(amount);
  }

  return NextResponse.json(
    { message: "Transaction created successfully" },
    { status: 200 }
  );
}

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const transaction = await getTransaction(id);
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found or unauthorized access" },
        { status: 404 }
      );
    }
    return NextResponse.json(transaction, { status: 200 });
  } else {
    const transactions = await getTransactions();
    if (transactions === false) {
      return NextResponse.json(
        { error: "Error fetching transactions" },
        { status: 500 }
      );
    }
    return NextResponse.json(transactions, { status: 200 });
  }
}

export async function PUT(req: any) {
  const { id, amount, type, description } = await req.json();

  const success = await updateTransaction(id, amount, type, description);

  if (!success) {
    return NextResponse.json(
      { error: "Error updating transaction" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Transaction updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(req: any) {
  const { id } = await req.json();

  const success = await deleteTransaction(id);

  if (!success) {
    return NextResponse.json(
      { error: "Error deleting transaction" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Transaction deleted successfully" },
    { status: 200 }
  );
}
