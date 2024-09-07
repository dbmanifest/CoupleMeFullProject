'use client'
import Image from "next/image";
import Link from "next/link";
import { UserButton, SignInButton, useAuth, SignedIn } from "@clerk/nextjs"; // Import UserButton and SignInButton

export default function MobileNavigation2() {
  const { isSignedIn } = useAuth();
  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bdrb1">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <Link className="mobile_logo" href="/">
                  <Image
                    height={40}
                    width={133}
                    src="/images/coupleme-logo.png"
                    alt="Header Logo"
                  />
                </Link>
                <div>
                      {isSignedIn ? (
                        <div
                        // style={{ marginLeft: "1000px" }}
                        >
                          <UserButton />
                        </div>
                      ) : (
                        <div className="dropdown-menu">
                          <Link href="/sign-in" className="dropdown-item">
                            <i className="flaticon-login mr10" />
                            Sign In
                          </Link>
                        </div>
                      )}
                    </div>
              </div>
            </div>
            <div className="posr">
              <div className="mobile_menu_close_btn">
                <span className="far fa-times" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
