import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export const getWalletInfo = async () => {
  const { userId } = auth();

  if (!userId) {
    return { balance: 0, trialMessages: 0 };
  }

  const wallet = await prismadb.wallet.findUnique({
    where: {
      userId: userId,
    },
    select: {
      balance: true,
      trialMessages: true,
    },
  });

  return wallet || { balance: 0, trialMessages: 0 };
};