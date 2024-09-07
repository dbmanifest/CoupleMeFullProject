import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    // Parse the JSON body
    const { priceAmount, userId, callback_url } = await req.json();

    // console.log("Received data:", { priceAmount, userId, callback_url });

    if (!priceAmount || !userId) {
      return NextResponse.json({ error: "Missing Required Params" }, { status: 400 });
    }
      
    const data = {
      price_amount: priceAmount,
      price_currency: 'USD',
      receive_currency: 'USD',
      callback_url: callback_url,
      success_url: 'https://couple.me',
      cancel_url: 'https://couple.me'
    };

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer 2dY-4RezXsDno5UqZcnXVg_cMw_3SgzW1vgP6ry6'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('https://api.coingate.com/api/v2/orders', options);
    const order = await response.json();

    // console.log("CoinGate response:", order);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: `Error Creating Order: ${error}` }, { status: 500 });
  }
}