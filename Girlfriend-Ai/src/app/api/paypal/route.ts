import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';  
import prismadb from '@/lib/prismadb';


const verifySignature = (req: NextApiRequest, buf: Buffer): boolean => {
  const signature = req.headers['paypal-transmission-sig'] as string;
  const expectedSignature = createHmac('sha256', process.env.PAYPAL_WEBHOOK_ID as string)
    .update(buf)
    .digest('hex');

  return signature === expectedSignature;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const buf = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });
  
    if (!verifySignature(req, buf)) {
      return res.status(400).send('Invalid signature');
    }
  
    const event = JSON.parse(buf.toString());
    if (event.webhook_event.event_type == "BILLING.SUBSCRIPTION.CREATED" || event.webhook_event.event_type == "BILLING.SUBSCRIPTION.ACTIVATED") {
      const userId = event.resource.custom_id;
      const stripeSubscriptionId = event.resource.id; // PayPal subscription ID
      const stripeCustomerId = event.resource.billing_info.payer_id; // PayPal customer ID
      const stripePriceId = 'price_12345'; // You can map this if you have corresponding product pricing IDs
      const stripeCurrentPeriodEnd = new Date(event.resource.billing_info.next_billing_time); // Next billing time from PayPal
  
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
  
        res.status(200).json({ message: 'Payment verified and subscription updated' });
      } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ error: 'Database update failed' });
      }
    }
    else {
    try {
      const userId = event.resource.custom_id;
      await prismadb.userSubscription.delete({
        where: { userId },
       });
  
      res.status(200).json({ message: 'Payment verified and subscription updated' });
    } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ error: 'Database update failed' });
    }
}};
  
