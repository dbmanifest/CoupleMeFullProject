"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useAuth } from "@clerk/nextjs";
import EmerchantPayButton from "@/components/payment_buttons/emerchantpay_button";
import prismadb from "@/lib/prismadb";

const Tokens = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState("monthly");
  const { userId} = useAuth();
  const [selectedPaypalPlanId, setSelectedPaypalPlanId] = useState("monthly");

  const onCoingateClick = async () => {
    let priceAmount = 0;
    if (selectedPlan === "100tokens") {
      priceAmount = 9.99;
    }
    if (selectedPlan === "450token") {
      priceAmount = 34.99;
    }
    if (selectedPlan === "650tokens") {
      priceAmount = 49.99;
    }
    if (selectedPlan === "1250tokens") {
      priceAmount = 99.99;
    }
    if (selectedPlan === "2600tokens") {
      priceAmount = 199.99;
    }
    if (selectedPlan === "4250tokens") {
      priceAmount = 299.99;
    }

    try {
      const response = await fetch("/api/coingate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceAmount,
          userId,
          callback_url: `https://couple.me/api/coingate-token-webhook?user=${userId}`,
        }),
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
    if (plan === "100tokens") {
      setSelectedPaypalPlanId("P-3GH56689XX6130522M2OERYY");
    } else if (plan === "450token") {
      setSelectedPaypalPlanId("P-1B596473LM891781EM2OESXY");
    } else if (plan === "650tokens") {
      setSelectedPaypalPlanId("P-3FC53946EA0777933M2OETIA");
    } else if (plan === "1250tokens") {
      setSelectedPaypalPlanId("P-69L40066FU0578746M2OETWI");
    } else if (plan === "2600tokens") {
      setSelectedPaypalPlanId("P-0UW294349N658573MM2OEUAI");
    } else if (plan === "4250tokens") {
      setSelectedPaypalPlanId("P-4C037465MJ973260FM2OEUHQ");
    } else {
      setSelectedPaypalPlanId("P-3GH56689XX6130522M2OERYY");
    }
  }, []);

  async function onApprove() {
    let tokens = 0;
    if (selectedPlan === "100tokens") {
      tokens = 100;
    } else if (selectedPlan === "450token") {
      tokens = 450;
    } else if (selectedPlan === "650tokens") {
      tokens = 650;
    } else if (selectedPlan === "1250tokens") {
      tokens = 1250;
    } else if (selectedPlan === "2600tokens") {
      tokens = 2600;
    } else if (selectedPlan === "4250tokens") {
      tokens = 4250;
    }
    await prismadb.wallet.updateMany({
      where: { userId: userId ?? "" },
      data: {
        balance: {
          increment: tokens,
        },
      },
    });
  }

  const getPlanId = useCallback((plan: string) => {
    switch (plan) {
      case "100token":
        return "P-3GH56689XX6130522M2OERYY";
      case "450tokens":
        return "P-1B596473LM891781EM2OESXY";
      case "650tokens":
        return "P-3FC53946EA0777933M2OETIA";
      case "1250tokens":
        return "P-69L40066FU0578746M2OETWI";
      case "2600tokens":
        return "P-0UW294349N658573MM2OEUAI";
      case "4250tokens":
        return "P-4C037465MJ973260FM2OEUHQ";
      default:
        return "P-3GH56689XX6130522M2OERYY";
    }
  }, []);

  const createPaypalTokens: PayPalButtonsComponentProps["createSubscription"] =
    useCallback(
      (
        _data: any,
        actions: {
          subscription: { create: (arg0: { plan_id: string }) => any };
        }
      ) => {
        const planId = getPlanId(selectedPlan);
        return actions.subscription.create({
          plan_id: planId,
        });
      },
      [selectedPlan, getPlanId]
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
          Choose your plan and start building your perfect AI girlfriend
          experience today!
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
            <div className="mt-4">
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
              <div
                className={`flex flex-col border border-white rounded-lg p-4 ${
                  selectedPlanId === "100token" ? "bg-primary" : ""
                }`}
                onClick={() => handlePlanSelection("100token")}
              >
                <div className="MuiBox-root jss316"></div>
                <div className="MuiBox-root jss317">
                  <div className="font-bold">100 Tokens</div>
                </div>
                <div className="flex items-center">
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                    style={{ fontSize: "1.5rem", fontWeight: "bold", gap: 2 }}
                  >
                    $9.99
                  </h5>
                </div>
              </div>

              <div
                className={`flex flex-col border border-white rounded-lg p-4 ${
                  selectedPlanId === "450token" ? "bg-primary" : ""
                }`}
                onClick={() => handlePlanSelection("450token")}
              >
                <div className="MuiBox-root jss316"></div>
                <div className="MuiBox-root jss317">
                  <div className="font-bold">450 Tokens</div>
                </div>
                <div className="flex items-center">
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                    style={{ fontSize: "1.5rem", fontWeight: "bold", gap: 2 }}
                  >
                    $34.99
                  </h5>
                </div>
              </div>

              <div
                className={`flex flex-col border border-white rounded-lg p-4 ${
                  selectedPlanId === "650tokens" ? "bg-primary" : ""
                }`}
                onClick={() => handlePlanSelection("650tokens")}
              >
                <div className="MuiBox-root jss316"></div>
                <div className="MuiBox-root jss317">
                  <div className="font-bold">650 Tokens</div>
                </div>
                <div className="flex items-center">
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                    style={{ fontSize: "1.5rem", fontWeight: "bold", gap: 2 }}
                  >
                    $49.99
                  </h5>
                </div>
              </div>

              <div
                className={`flex flex-col border border-white rounded-lg p-4 ${
                  selectedPlanId === "1250tokens" ? "bg-primary" : ""
                }`}
                onClick={() => handlePlanSelection("1250tokens")}
              >
                <div className="MuiBox-root jss323"></div>
                <div className="MuiBox-root jss324">
                  <div className="font-bold">1250 Tokens</div>
                </div>
                <div className="flex items-center">
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                    style={{ fontSize: "1.5rem", fontWeight: "bold", gap: 2 }}
                  >
                    $99.99
                  </h5>
                </div>
              </div>

              <div
                className={`flex flex-col border border-white rounded-lg p-4 ${
                  selectedPlanId === "2600tokens" ? "bg-primary" : ""
                }`}
                onClick={() => handlePlanSelection("2600tokens")}
              >
                <div className="MuiBox-root jss323"></div>
                <div className="MuiBox-root jss324">
                  <div className="font-bold">2600 Tokens</div>
                </div>
                <div className="flex items-center">
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                    style={{ fontSize: "1.5rem", fontWeight: "bold", gap: 2 }}
                  >
                    $199.99
                  </h5>
                </div>
              </div>

              <div
                className={`flex flex-col border border-white rounded-lg p-4 ${
                  selectedPlanId === "4250tokens" ? "bg-primary" : ""
                }`}
                onClick={() => handlePlanSelection("4250tokens")}
              >
                <div className="MuiBox-root jss323"></div>
                <div className="MuiBox-root jss324">
                  <div className="font-bold">4250 Tokens</div>
                </div>
                <div className="flex items-center">
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                    style={{ fontSize: "1.5rem", fontWeight: "bold", gap: 2 }}
                  >
                    $299.99
                  </h5>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "black" }}>
              <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                  style={{
                    layout: "horizontal",
                    shape: "pill",
                    color: "black",
                    tagline: false,
                  }}
                  forceReRender={[selectedPaypalPlanId]}
                  createSubscription={createPaypalTokens}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
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
          </div>
          <div className="MuiBox-root jss334" id="right">
            <div className="MuiBox-root jss335">
              <div className="MuiBox-root jss336" id="left-side">
                <h6 style={{ fontSize: "22px" }}>Get Exclusive Discount!</h6>
                <p className="MuiTypography-root MuiTypography-body2">
                  Up to <span>50%</span> off on subscription
                </p>
              </div>
              <div className="MuiBox-root jss337" id="right">
                <h6 className="mt-4">Premium Benefits</h6>
                <div className="mt-2">
                  <div className="flex">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={14}
                    />
                    <p className="pl-4">Create your own AI characters</p>
                  </div>
                  <div className="flex mt-2">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={16}
                    />
                    <p className="pl-4">Enjoy Unlimited Text Messages</p>
                  </div>
                  <div className="flex mt-2">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={16}
                    />
                    <p className="pl-4">Token Carry Forward System</p>
                  </div>
                  <div className="flex mt-2">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={16}
                    />
                    <p className="pl-4">Generate Custom Images</p>
                  </div>
                  <div className="flex mt-2">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={16}
                    />
                    <p className="pl-4">Fast Response Times</p>
                  </div>
                  <div className="flex mt-2">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={16}
                    />
                    <p className="pl-4">
                      Consistent Character Images for Social Media
                    </p>
                  </div>
                  <div className="flex mt-2">
                    <Image
                      src="/accept.png"
                      alt="Check Mark"
                      width={20}
                      height={12}
                    />
                    <p className="pl-4">Fast response time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiBox-root jss346">
              <Image
                src="/priceImg2.png"
                alt="Manga"
                style={{ width: "75%", objectFit: "cover", marginRight: 100 }}
                width={75}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokens;
