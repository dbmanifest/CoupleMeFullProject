import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const deductBalance = async (amount: number): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  try {
    const userWallet = await prismadb.wallet.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!userWallet) {
      throw new Error("Wallet not found");
    }

    const newBalance = userWallet.balance - amount;
    await prismadb.wallet.update({
      where: {
        userId: userId,
      },
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    console.error("Error deducting balance:", error);
    return false;
  }
  return true;
};

export const addBalance = async (amount: number): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  try {
    let userWallet = await prismadb.wallet.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!userWallet) {
      userWallet = await prismadb.wallet.create({
        data: {
          userId: userId,
          balance: amount,
        },
      });
    }

    const newBalance = userWallet.balance + amount;
    await prismadb.wallet.update({
      where: {
        userId: userId,
      },
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    console.error("Error adding to balance:", error);
    return false;
  }
  return true;
};

export const getBalance = async (): Promise<number | false> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  try {
    let userWallet = await prismadb.wallet.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!userWallet) {
      userWallet = await prismadb.wallet.create({
        data: {
          userId: userId,
          balance: 0,
        },
      });
    }

    return userWallet.balance;
  } catch (error) {
    console.error("Error Getting Balance:", error);
    return false;
  }
};

export const createWallet = async (): Promise<boolean> => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  try {
    await prismadb.wallet.create({
      data: {
        userId: userId,
        balance: 3,
        trialMessages: 3,
      },
    });
  } catch (error) {
    console.error("Error Creating Wallet:", error);
    return false;
  }
  return true;
};
