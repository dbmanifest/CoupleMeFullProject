import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import prismadb from '@/lib/prismadb';
import { NextRequest } from 'next/server';


const extractUserId = (orderUrl: string): string | null => {
    try {
      const url = new URL(orderUrl);
      return url.searchParams.get('user');
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  };
  
  const handler = async (req: NextRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      return res.status(405).end('Method Not Allowed');
    }
  
    const body = JSON.stringify(req.body);
    
    const event = JSON.parse(body);
  
    // Extract userId from the order_id URL
    const userId = extractUserId(req.url);
  
    if (!userId) {
      return res.status(400).json({ error: 'Invalid or missing user ID in the order URL' });
    }

  if (event.status === 'paid') {
    const stripeSubscriptionId = event.id; // Using CoinGate order ID as subscription ID
    const stripeCustomerId = 'cg_' + event.id; // Prefixing CoinGate order ID to differentiate
    const stripePriceId = 'price_' + event.price_amount + '_' + event.price_currency; // Creating a price ID from the amount and currency
    const stripeCurrentPeriodEnd = new Date();
    if (event.price_amount == 9.99) {
    stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 1); // Assuming monthly subscription
    }
    else if (event.price_amount == 24.99) {
        stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 3); // Assuming monthly subscription
    }
    else if (event.price_amount == 40.99) {
        stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 6); // Assuming monthly subscription
    }
    else if (event.price_amount == 71.99) {
        stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 12); // Assuming monthly subscription
    }
    else {
        stripeCurrentPeriodEnd.setMonth(stripeCurrentPeriodEnd.getMonth() + 1); // Assuming monthly subscription
    }

    try {
      await prismadb.userSubscription.upsert({
        where: { userId },
        update: {
          stripeSubscriptionId,
          stripeCurrentPeriodEnd,
          stripeCustomerId,
          stripePriceId,
        },
        create: {
          userId,
          stripeSubscriptionId,
          stripeCurrentPeriodEnd,
          stripeCustomerId,
          stripePriceId,
        }
      });

      res.status(200).json({ message: 'Payment verified and subscription updated' });
    } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ error: 'Database update failed' });
    }
  } 
  else {
    res.status(200).json({ message: 'Unhandled event status' });
  }
};

