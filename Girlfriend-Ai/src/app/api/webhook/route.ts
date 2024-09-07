import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prismadb from '@/lib/prismadb';

const apiPaymentKey = 'your_api_key';

function verifySignature(body: object, signature: string): boolean {
  const hash = crypto.createHash('md5').update(Buffer.from(JSON.stringify(body), 'utf8').toString('base64') + apiPaymentKey).digest('hex');
  return hash === signature;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sign, ...data } = body;
  
  if (!verifySignature(data, sign)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (data.status === 'paid' && data.is_final) {
    const userId = data.order_id;
    
    // Assuming we get required details from webhook or have static values for demo
    const stripeSubscriptionId = data.uuid; // Or from another field
    const stripeCustomerId = data.uuid; // Or from another field
    const stripePriceId = 'price_12345'; // Replace with actual value or derive from data
    const stripeCurrentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Example, 30 days from now

    try {
      await prismadb.userSubscription.update({
        where: { userId },
        data: {
          stripeSubscriptionId,
          stripeCurrentPeriodEnd,
          stripeCustomerId,
          stripePriceId,
        }
      });
      return NextResponse.json({ message: 'Payment verified and subscription updated' });
    } catch (error) {
      console.error('Database update error:', error);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }
  }

 
}