import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";
import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
    });

    let invoiceResponse;

    if (userSubscription && userSubscription.stripeCustomerId) {
      // Assuming similar handling for Cryptomus customer ID
      invoiceResponse = await createCryptomusInvoice(
        userSubscription.stripeCustomerId,
        user.emailAddresses[0].emailAddress
      );
    } else {
      invoiceResponse = await createCryptomusInvoice(
        userId,
        user.emailAddresses[0].emailAddress
      );
    }

    return new NextResponse(
      JSON.stringify({ url: invoiceResponse.data.result.url })
    );
  } catch (error) {
    // console.log("[CRYPTOMUS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function createCryptomusInvoice(userId: string, userEmail: string) {
  const merchantId = "your_merchant_id";
  const apiKey = "your_api_key";

  const data = {
    amount: "9.99", // Example amount
    currency: "USD",
    order_id: userId,
    url_return: absoluteUrl("/settings"),
    url_success: absoluteUrl("/settings"),
    url_callback: absoluteUrl("/api/cryptomus-webhook"),
    to_currency: "BTC", // Assuming BTC, change if necessary
    network: "your_network_code", // Optional, specify if needed
  };

  const headers = {
    merchant: merchantId,
    sign: createSignature(data, apiKey),
    "Content-Type": "application/json",
  };

  return await axios.post("https://api.cryptomus.com/v1/payment", data, {
    headers,
  });
}

function createSignature(data: object, apiKey: string): string {
  const sign = crypto
    .createHash("md5")
    .update(
      Buffer.from(JSON.stringify(data), "utf8").toString("base64") + apiKey
    )
    .digest("hex");
  return sign;
}
