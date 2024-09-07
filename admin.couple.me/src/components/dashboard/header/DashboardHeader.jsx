"use client";
import { dasboardNavigation } from "@/data/dashboard";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, useAuth, SignedIn } from "@clerk/nextjs"; // Import UserButton and SignInButton

export default function DashboardHeader() {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);
  const path = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <>
      <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu w-full">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between w-full">
              <div className="">
                <div className="text-center text-lg-start d-flex align-items-center justify-between">
                  <div className="text-center text-lg-start d-flex align-items-center">
                    <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                      <Link href="/" className="logo">
                        <Image
                          height={40}
                          width={133}
                          src="/images/coupleme-logo.png"
                          alt="logo"
                        />
                      </Link>
                    </div>
                    <div className="fz20 ml90">
                      <a
                        onClick={toggle}
                        className="dashboard_sidebar_toggle_icon vam"
                      >
                        <Image
                          height={18}
                          width={20}
                          src="/images/dashboard-navicon.svg"
                          alt="navicon"
                        />
                      </a>
                    </div>
                    <a
                      className="login-info d-block d-xl-none ml40 vam"
                      data-bs-toggle="modal"
                      href="#exampleModalToggle"
                    >
                      <span className="flaticon-loupe" />
                    </a>
                  </div>
                  <div>
                    {/* <div className="ml40 d-none d-xl-block">
                    <div className="search_area dashboard-style">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="What service are you looking for today?"
                      />
                      <label>
                        <span className="flaticon-loupe" />
                      </label>
                    </div>
                  </div> */}
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
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
