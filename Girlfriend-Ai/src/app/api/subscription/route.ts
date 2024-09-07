import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

const DAY_IN_MS = 86_400_000;

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });

    if (!userSubscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
        Date.now();

    return NextResponse.json({ isValid }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
