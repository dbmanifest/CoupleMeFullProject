// app/subscriptions/Subscriptions.tsx
"use client";
import EmerchantPayButton from "@/components/payment_buttons/emerchantpay_button";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useAuth } from "@clerk/nextjs";

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState("monthly");
  const { userId } = useAuth();
  const [selectedPaypalPlanId, setSelectedPaypalPlanId] = useState("monthly");

  // Function for handling CoinGate payments
  const onCoingateClick = async () => {
    let priceAmount = 0;
    if (selectedPlan === "monthly") {
      priceAmount = 9.99;
    } else if (selectedPlan === "3months") {
      priceAmount = 24.99;
    } else if (selectedPlan === "6months") {
      priceAmount = 40.99;
    } else if (selectedPlan === "yearly") {
      priceAmount = 71.99;
    }

    try {
      const callback_url = `https://couple.me/api/coingate-webhook?user=${userId}`;

      const response = await fetch("/api/coingate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceAmount, userId, callback_url }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      window.location.href = order.payment_url;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handlePlanSelection = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setSelectedPlanId(plan);
    setSelectedPaypalPlanId(getPlanId(plan));
  }, []);

  const getPlanId = useCallback((plan: string) => {
    switch (plan) {
      case "monthly":
        return "P-8YG72356TE796681LM2JW64A";
      case "3months":
        return "P-8495412535063653VM2JY3DY";
      case "6months":
        return "P-6TH0177841483851KM2JY3UI";
      case "yearly":
        return "P-14T02291R9152190SM2I5G4A";
      default:
        return "P-8YG72356TE796681LM2JW64A"; // Default to monthly
    }
  }, []);

  const createPaypalSubscription: PayPalButtonsComponentProps["createSubscription"] =
    useCallback(
      (_data: any, actions: { subscription: { create: (arg0: { plan_id: string }) => any } }) => {
        const planId = getPlanId(selectedPaypalPlanId);
        return actions.subscription.create({ plan_id: planId });
      },
      [selectedPaypalPlanId, getPlanId]
    );

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
    intent: "subscription",
    "disable-funding": "paylater,card",
    vault: true,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1
          style={{
            fontSize: "40px",
            textAlign: "center",
            color: "rgb(192, 192, 192)",
          }}
        >
          Plans and Packages
        </h1>
        <p
          style={{
            color: "rgb(192, 192, 192)",
            width: "75%",
            margin: "auto",
            textAlign: "center",
          }}
        >
          Choose your plan and start building your perfect AI girlfriend experience today!
        </p>
      </div>

      <div>
        <div className="flex flex-col xl:flex-row mt-20 justify-around">
          <div className="flex flex-col items-center xl:w-1/4 mb-8 xl:mb-0">
            <h6 style={{ fontSize: "22px" }}>
              Exciting Plans
              <br />
              Await You!!
            </h6>
            <p className="mt-4">
              Up to <span>50%</span> off on subscription
            </p>
            <div className="mt-4 w-full">
              <Image
                src="/priceImg1.png"
                alt="Subscription"
                style={{ width: "100%", objectFit: "cover" }}
                width={200}
                height={300}
              />
            </div>
          </div>
          <div className="flex flex-col xl:w-2/4">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4 p-4">
              {/* Render subscription plans */}
              {["monthly", "3months", "6months", "yearly"].map(plan => (
                <div
                  key={plan}
                  className={`flex flex-col border border-white rounded-lg p-4 ${
                    selectedPlanId === plan ? "bg-primary" : ""
                  }`}
                  onClick={() => handlePlanSelection(plan)}
                >
                  <div className="font-bold">{`${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`}</div>
                  <div className="flex items-center">
                    <h5
                      className="text-2xl font-bold"
                    >
                      {plan === "monthly" ? "$9.99" :
                       plan === "3months" ? "$24.99" :
                       plan === "6months" ? "$40.99" :
                       "$71.99"}
                    </h5>
                  </div>
                  <div className="text-white text-[15px]">
                    <div>
                      {plan === "monthly" ? "100 tokens per month" :
                       plan === "3months" ? "300 tokens total" :
                       plan === "6months" ? "600 tokens total" :
                       "1200 tokens total"}
                    </div>
                    <div>Unlimited texting</div>
                    <div>
                      {plan === "monthly" ? "" :
                       plan === "3months" ? "Save $5.00 compared to the monthly plan." :
                       plan === "6months" ? "Save $18.00 compared to the monthly plan." :
                       "Save $48.00 compared to the monthly plan."}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <EmerchantPayButton userId={userId || ''} selectedPlan={selectedPlan || ''} usagePurpose={'subscription'}  />

            <div
              onClick={onCoingateClick}
              className="bg-red-500 p-4 rounded-lg mt-4 text-center font-medium"
            >
              <a
                className="block text-white"
                tabIndex={0}
                role="button"
                aria-disabled="false"
                href="#"
              >
                <span className="MuiButton-label">
                  Pay With Crypto
                </span>
                <span className="MuiTouchRipple-root" />
              </a>
            </div>
          <div style={{backgroundColor: "black"}}>
        
            <PayPalScriptProvider options={paypalOptions}>
              <PayPalButtons
                style={{
                  layout: "horizontal",
                  shape: "pill",
                  color: "black",
                  tagline: false,
                }}
                forceReRender={[selectedPaypalPlanId]}
                createSubscription={createPaypalSubscription}
              />
            </PayPalScriptProvider>
            </div>
          </div>
          <div className="flex flex-col items-center xl:w-1/4 mt-8 xl:mt-0">
            <h6 style={{ fontSize: "22px" }}>
              Our Best Features
            </h6>
            <p className="mt-4">
              Get the best experience with our most powerful features
            </p>
            <div className="mt-4 w-full">
              <Image
                src="/priceImg2.png"
                alt="Subscription"
                style={{ width: "100%", objectFit: "cover" }}
                width={200}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
