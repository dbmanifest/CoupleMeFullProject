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
    let amountAdd = 0;
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
    res.status(200).json({ message: 'Unhandled event status' });
  }
};

