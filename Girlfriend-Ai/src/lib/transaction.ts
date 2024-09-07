import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export const createTransaction = async (
  amount: number,
  type: "DEBIT" | "CREDIT",
  description?: string
): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    await prismadb.transaction.create({
      data: {
        userId,
        amount,
        type,
        description,
      },
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return false;
  }
  return true;
};

export const getTransactions = async (): Promise<any[] | false> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    const transactions = await prismadb.transaction.findMany({
      where: {
        userId,
      },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return false;
  }
};

export const getTransaction = async (id: string): Promise<any | false> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    const transaction = await prismadb.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new Error("Transaction not found or unauthorized access");
    }

    return transaction;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return false;
  }
};

export const updateTransaction = async (
  id: string,
  amount: number,
  type: "DEBIT" | "CREDIT",
  description?: string
): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    const transaction = await prismadb.transaction.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new Error("Transaction not found or unauthorized access");
    }

    await prismadb.transaction.update({
      where: {
        id,
      },
      data: {
        amount,
        type,
        description,
      },
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return false;
  }
  return true;
};

export const deleteTransaction = async (id: string): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  try {
    const transaction = await prismadb.transaction.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new Error("Transaction not found or unauthorized access");
    }

    await prismadb.transaction.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return false;
  }
  return true;
};
