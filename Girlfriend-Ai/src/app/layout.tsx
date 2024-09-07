import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";
import "@/styles/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Couple.me: Get Your Own AI Girlfriend & Chat Anytime",
  description:
    " Create your personalized AI girlfriend and start chatting instantly. Experience companionship, sex chat, and meaningful conversations anytime, anywhere!",
  alternates: {
    canonical: "https://couple.me",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta name="cryptomus" content="65587d9d" />
        </Head>
        <Script
          src="https://www.paypal.com/sdk/js?Aa515WNpuSxm594D6hbOfBgIREfV5Yla-DK333ko47oSO0TBFsnqFneUtVGwrOiVHI4mziGvDaAdALp-&vault=true&intent=subscription"
          strategy="beforeInteractive"
        />

        <body
          className={cn(
            "bg-background h-full overflow-x-hidden",
            inter.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
