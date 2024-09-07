import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { js2xml, xml2json } from "xml-js";
import crypto from 'crypto';
import genesis from 'genesis.js/lib/genesis.js';
import { currentUser } from '@clerk/nextjs/server'
import js2xmlparser from 'js2xmlparser'

export async function POST(req: NextRequest) {
  const { priceAmount, userId, usagePurpose } = await req.json();
  // Use req.headers.get instead of indexing
  const forwardedFor = req.headers.get('x-forwarded-for');
  const ip = forwardedFor
  
  const user = await currentUser()
  const userEmail = user?.emailAddresses[0]
  const data = {
    transaction_id: `${userId}-${Date.now()}`,
    usage: `${usagePurpose}`,
    description: `${priceAmount}`,
    notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    return_success_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    return_failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    return_cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    return_pending_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    amount: priceAmount * 100, // Amount in cents
    currency: "USD",
    consumer_id: userId,
    billing_address: {
      country: "usa"
    },
    customer_email: userEmail,
    remember_card: true,
    lifetime: 60,
    transaction_types: ["authorize", "sale"],
    remote_ip: ip
  };
  
  // Convert to XML using js2xml
  
  const xml = js2xmlparser.parse("wpf_payment", data);
  console.log(xml);



  const failure = function(reason: any) {
    return console.log(reason);
  };

  const success = function(data: any) {
    console.log(data);
    return NextResponse.json({ redirect_url: data.redirect_url });
  };

  try {
    const response = await axios.post(
      "https://wpf.emerchantpay.net/wpf",
      xmlData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        auth: {
          username: process.env.EMERCHANTPAY_API_USERNAME ?? '',
          password: process.env.EMERCHANTPAY_API_PASSWORD ?? '',
        },
      }
    );
    console.log(response.data);
    // parse xml response
    const responseXML = xml2json(response.data);
    console.log(responseXML);
    const responseData = JSON.parse(responseXML);
    console.log(responseData);
    if (responseData.status === "new") {
      return NextResponse.json({ redirect_url: responseData.redirect_url });
    } else {
      return NextResponse.json(
        { error: "Failed to create payment session" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating payment session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}