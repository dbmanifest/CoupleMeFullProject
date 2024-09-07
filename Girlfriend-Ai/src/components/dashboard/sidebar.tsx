"use client";

import Image from "next/image";
import Link from "next/link";
import LogoDark from "../parts/logo-dark";

import { SIDEBAR } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Info, MessageSquarePlus, Waypoints } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Discord from "../parts/discord";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-dvh md:h-screen bg-background w-[250px] md:w-[250px] lg:w-[300px] px-2 text-white z-50">
      <div className="px-3 flex-1 w-full">
        <Link
          href="/"
          className="flex items-center pl-3 mb-12 md:mb-14"
        >
          <LogoDark />
          {/* {theme === "dark" ? <LogoDark /> : <LogoLight />} */}
        </Link>
        <div className="space-y-1 w-full">
          {SIDEBAR.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-[16px] md:text-[18px] font-dmSans font-normal group flex p-3 w-[250px] md:w-full justify-start cursor-pointer rounded-full transition",
                pathname === route.href
                  ? "text-white bg-primary"
                  : "text-accent-foreground hover:bg-popover transition-all duration-75 ease-in"
              )}
            >
              <div className="flex items-center flex-1">
                <Image
                  width={28}
                  height={28}
                  alt={route.label}
                  src={
                    pathname === route.href ? route.activeIcon : route.darkIcon
                  }
                  className={cn("mr-3")}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col pb-4 md:pb-2 gap-6">
        {/* <p className="px-4 text-muted-foreground">More</p>
        <div className="w-[280px] md:w-full flex flex-row items-center justify-between px-4 md:px-4 text-sm md:text-base text-muted-foreground">
          <Button variant="outline" size="icon">
            <Discord />
            
          </Button>
          <Button variant="outline" size="icon">
            <MessageSquarePlus />
          </Button>
          <Button variant="outline" size="icon">
            <Waypoints />
          </Button>
          <Button variant="outline" size="icon">
            <Info />
          </Button>
        </div> */}
        <div className="w-[280px] md:w-full flex flex-row items-center justify-between px-4 md:px-4 text-sm md:text-base text-muted-foreground">
          <Link href="/terms-of-service">
            <p className=" hover:text-foreground cursor-pointer">
              Terms of Service
            </p>
          </Link>
          <Link href="/privacy-policy">
            <p className=" hover:text-foreground cursor-pointer">
              Privacy Policy
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
