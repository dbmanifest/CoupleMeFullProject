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
        let amountAdd = 0;
        // have to confirm the price amount field on paypal event
        // have to confirm how we're sending the userID
        if (event.price_amount == 9.99) {
            amountAdd = 100;
        }
        else if (event.price_amount == 34.99) {
            amountAdd = 450;
        }
        else if (event.price_amount == 49.99) {
            amountAdd = 650;
        }
        else if (event.price_amount == 99.99) {
            amountAdd = 1250;
        }
        else if (event.price_amount == 199.99) {
            amountAdd = 2600;
        }
        else if (event.price_amount == 299.99) {
            amountAdd = 4250;
        }
      try {
        await prismadb.wallet.updateMany({ // Change 'update' to 'updateMany'
            where: { userId },
            data: {
                balance: {
                    increment: amountAdd
                }
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
  
