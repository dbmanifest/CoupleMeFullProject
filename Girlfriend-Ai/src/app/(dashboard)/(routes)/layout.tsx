"use client";

import { BalanceProvider } from "@/app/context/BalanceContext";
import AgeGate from "@/components/age-gate/AgeGate";
import Footer from "@/components/dashboard/footer";
import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import type { Metadata } from "next";
const metadata: Metadata = {
  title: "Couple.me - No Filter NSFW AI Chat",
  description:
    "Explore uncensored and No Filter NSFW character AI chat with lifelike AI characters - Meet Your AI Girlfriend and engage in authentic NSFW conversations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BalanceProvider>
      <div>
        <AgeGate />
        <Navbar />
        <div className="hidden md:flex h-full w-[300px] flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-[265px] lg:pl-[310px] md:mr-4 md:ml-0 mr-2 ml-2">
          {children}
          <Footer />
        </main>
      </div>
    </BalanceProvider>
  );
}
