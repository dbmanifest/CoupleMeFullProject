"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useCallback, useState } from "react";
import { useBalance } from "@/app/context/BalanceContext";
import SearchInput from "../parts/search-input";
import { Button } from "../ui/button";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { balance, setBalance } = useBalance();
  const [subscriptionStatus, setSubscriptionStatus] = useState<boolean | null>(
    null
  );

  const fetchBalance = useCallback(async () => {
    try {
      // Fetch balance
      const response = await fetch("/api/wallet", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      setBalance(data.balance);

      // Fetch subscription status
      const subscriptionResponse = await fetch("/api/subscription", {
        method: "GET",
      });

      if (!subscriptionResponse.ok) {
        throw new Error("Failed to fetch subscription status");
      }

      const subscriptionData = await subscriptionResponse.json();
      setSubscriptionStatus(subscriptionData.isValid);
      // console.log("Subscription status:", subscriptionData.isValid);
    } catch (error) {
      setSubscriptionStatus(false);
      console.error("Error fetching data:", error);
    }
  }, [setBalance]);

  useEffect(() => {
    if (isSignedIn) {
      fetchBalance();
    }
  }, [isSignedIn, fetchBalance]);

  return (
    <div className="md:pl-[265px] lg:pl-[315px] md:pr-[20px] pl-2 pr-2 flex flex-col-reverse md:flex-row md:justify-between gap-3 md:gap-0 md:items-center py-2.5 md:py-4 w-full sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="hidden md:block"></div>
      <div className="flex flex-row items-center gap-1 md:gap-3">
        <div className="md:hidden w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between w-full items-center">
            <div>
              <MobileSidebar />
            </div>
            <div className="flex flex-row items-center gap-1.5">
              {isSignedIn ? (
                <>
                  <div className="flex flex-row items-center gap-3">
                    <UserButton />
                    {subscriptionStatus ? (
                      balance !== null && (
                        <button
                          type="button"
                          className="chakra-button css-i8y1hn"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "30px",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="chakra-button__icon css-1wh2kri">
                            <svg
                              stroke="currentColor"
                              fill="none"
                              stroke-width="2"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              focusable="false"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              ></path>
                            </svg>
                          </span>
                          {balance}
                        </button>
                      )
                    ) : (
                      <Link href="/subscriptions">
                        <Button variant="outline">Buy Subscription</Button>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link href="sign-in">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="outline">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <SearchInput />
        </div>

        <div className="hidden md:block">
          {isSignedIn ? (
            <>
              <div className="flex flex-row items-center gap-3">
                {subscriptionStatus ? (
                  balance !== null && (
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "30px",
                        justifyContent: "space-between",
                        marginRight:"20px"
                      }}
                    >
                      <span className="chakra-button__icon css-1wh2kri">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          ></path>
                        </svg>
                      </span>
                      {balance}
                    </button>
                  )
                ) : (
                  <Link href="/subscriptions">
                    <Button variant="outline">Buy Subscription</Button>
                  </Link>
                )}
                <UserButton />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center gap-2">
                <SearchInput />
                <Link href="sign-in">
                  <Button>Login</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline">Register</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
