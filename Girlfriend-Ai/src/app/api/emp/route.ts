import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import crypto from 'crypto';
import { I } from '@upstash/redis/zmscore-a4ec4c2a';

const verifySignature = (wpf_unique_id: string, apiPassword: string, signature: string) => {
  const hash = crypto.createHash('sha512');
  hash.update(wpf_unique_id + apiPassword);
  const calculatedSignature = hash.digest('hex');
  return calculatedSignature === signature;
};

export async function POST(req: NextRequest) {
  console.log("emp route");
  console.log(await req.json());

  const { signature, unique_id, status, consumer_id, payment_transaction_amount, usage } = await req.json();

  const apiPassword = process.env.EMERCHANTPAY_API_PASSWORD ?? '';

  if (!verifySignature(unique_id, apiPassword, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  } 
  if (usage === 'token') {
  if (status === 'approved') {

    let amountAdd = 0;
    if (payment_transaction_amount == 999) {
      amountAdd = 100;
    } else if (payment_transaction_amount == 3499) {
      amountAdd = 450;
    } else if (payment_transaction_amount == 4999) {
      amountAdd = 650;
    } else if (payment_transaction_amount == 9999) {
      amountAdd = 1250;
    } else if (payment_transaction_amount == 19999) {
      amountAdd = 2600;
    } else if (payment_transaction_amount == 29999) {
      amountAdd = 4250;
    }

    try {
      await prismadb.wallet.updateMany({
        where: { userId: consumer_id },
        data: {
          balance: {
            increment: amountAdd,
          },
        },
      });
    
        return NextResponse.json({ message: 'Payment verified and tokens added' });
      } catch (error) {
        console.error('Database update error:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: 'Unhandled event status' });
    }
  }
  else if (usage === 'subscription') {
    if (status === 'approved') {
      const stripeSubscriptionId = unique_id; // Using CoinGate order ID as subscription ID
      const stripeCustomerId = 'cg_' + unique_id; // Prefixing CoinGate order ID to differentiate
      const stripePriceId = 'price_' + payment_transaction_amount + '_' + "USD"; // Creating a price ID from the amount and currency
      const stripeCurrentPeriodEnd = new Date();
      if (payment_transaction_amount == 9.99) {
      stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 1); // Assuming monthly subscription
      }
      else if (payment_transaction_amount == 24.99) {
          stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 3); // Assuming monthly subscription
      }
      else if (payment_transaction_amount == 40.99) {
          stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 6); // Assuming monthly subscription
      }
      else if (payment_transaction_amount == 71.99) {
          stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 12); // Assuming monthly subscription
      }
      else {
          stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 1); // Assuming monthly subscription
      }
  
      try {
        await prismadb.userSubscription.upsert({
          where: { userId: consumer_id },
          update: {
            stripeSubscriptionId,
            stripeCurrentPeriodEnd,
            stripeCustomerId,
            stripePriceId,
          },
          create: {
            userId: consumer_id,
            stripeSubscriptionId,
            stripeCurrentPeriodEnd,
            stripeCustomerId,
            stripePriceId,
          }
        });
      } catch (error) {
        console.error('Database update error:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    }
    else {
      return NextResponse.json({ message: 'Unhandled event status' });
    }
  }
  else {
    return NextResponse.json({ message: 'Unhandled event usage' });
  }
}