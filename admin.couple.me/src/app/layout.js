"use client";
import Header1 from "@/components/header/Header1";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import { usePathname } from "next/navigation";
import Header2 from "@/components/header/Header2";
import Header3 from "@/components/header/Header3";
import {
  header1,
  header10,
  header11,
  header2,
  header3,
  header4,
  header5,
  header6,
  header7,
  header8,
  header9,
  sidebarEnable,
} from "@/data/header";
import Header4 from "@/components/header/Header4";
import Header5 from "@/components/header/Header5";
import Footer2 from "@/components/footer/Footer2";
import Header6 from "@/components/header/Header6";
import Footer3 from "@/components/footer/Footer3";
import Header7 from "@/components/header/Header7";
import Header8 from "@/components/header/Header8";
import Header9 from "@/components/header/Header9";
import Footer4 from "@/components/footer/Footer4";
import Header10 from "@/components/header/Header10";
import Footer5 from "@/components/footer/Footer5";
import Header11 from "@/components/header/Header11";
import toggleStore from "@/store/toggleStore";
import { footer } from "@/data/footer";
import "react-tooltip/dist/react-tooltip.css";
import NavSidebar from "@/components/sidebar/NavSidebar";
import Footer12 from "@/components/footer/Footer12";
import Footer14 from "@/components/footer/Footer14";
import Footer15 from "@/components/footer/Footer15";
import Footer18 from "@/components/footer/Footer18";
import Footer20 from "@/components/footer/Footer20";
import { ClerkProvider } from "@clerk/nextjs";

if (typeof window !== "undefined") {
  import("bootstrap");
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }) {
  const isListingActive = toggleStore((state) => state.isListingActive);
  const path = usePathname();
  // wow js
  useEffect(() => {
    const { WOW } = require("wowjs");
    const wow = new WOW({
      live: false,
    });
    wow.init();
  }, [path]);

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${dmSans.className} ${
            path === "/register" || path === "/login"
              ? "bgc-thm4 mm-wrapper mm-wrapper--position-left-front"
              : sidebarEnable.includes(path)
              ? isListingActive
                ? "menu-hidden-sidebar-content"
                : ""
              : ""
          }`}
        >
          <div className="wrapper mm-page mm-slideout">
            {children}
            {/* bottom to top */}
            <BottomToTop />
          </div>

          {/* sidebar mobile navigation */}
          <NavSidebar />
        </body>
      </html>
    </ClerkProvider>
  );
}
