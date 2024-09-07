import React from "react";
import LogoDark from "../parts/logo-dark";
import Link from "next/link";
import Image from "next/image"; // Import Image component for logos

// Import Visa and MasterCard logos
import VisaLogo from "/public/visa-logo.png";
import MastercardLogo from "/public/mastercard-logo.webp";

const Footer = () => {
  return (
    <div className="flex flex-1 flex-col-reverse mr-24 text-center lg:text-start lg:flex-row lg:gap-[86px] gap-[35px] max-w-7xl mx-auto lg:px-5 md:px-10 text-white py-10 px-5 ">
      <div className="flex lg:max-w-[427px]">
        <div className="flex flex-col lg:flex-1 lg:gap-7 w-full gap-10 md:mb-0 mb-5">
          <div className="flex lg:flex-none flex-1">
            <div className="flex flex-col lg:items-start items-center gap-6 flex-1">
              <LogoDark />
              <p className="text-[#E1E1E1] text-sm lg:text-start text-center">
                Couple.me powers immersive experiences that feel real, allowing
                users to generate images and create AI characters.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 lg:flex-none flex-1">
            <div className="text-grey-default text-sm font-medium leading-6">
              Contacts:
            </div>
            <p className="text-sm text-grey-light leading-6 font-medium lg:text-start text-center">
              FAB AI LTD - 37 Panton Street Piccadilly Circus London SW1Y 4EA.
              <br />
              <Link href="mailto:support@couple.me">support@couple.me</Link>
              <br />
              <span className="text-grey-default text-sm font-medium leading-6">
                +1 (302) 261-9484
              </span>
            </p>
          </div>

          {/* Visa and Mastercard logos */}
          <div className="flex justify-center lg:justify-start gap-4 mt-4">
            <Image src={VisaLogo} alt="Visa Logo" width={50} height={30} />
            <Image
              src={MastercardLogo}
              alt="MasterCard Logo"
              width={50}
              height={30}
            />
          </div>
          <div className="flex lg:justify-start justify-center">
            <span className="text-grey-default text-sm font-medium leading-6">
              © 2024 couple.me. All Rights Reserved
              <br />
            </span>
          </div>
        </div>
      </div>
      <div className="flex lg:w-full justify-between lg:flex-nowrap flex-wrap">
        <div className="flex lg:flex-col lg:w-auto w-full justify-between md:mb-0 mb-5">
          <div className="flex flex-col text-start min-w-[100px] gap-5 lg:pl-2">
            <div className="text-grey-default text-lg font-semibold block">
              Policy
            </div>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/dmca-policy"
            >
              DMCA Policy
            </Link>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/cookies-policy"
            >
              Cookies Policy
            </Link>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/underage-policy"
            >
              Underage Policy
            </Link>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/complaint-policy"
            >
              Complaint Policy
            </Link>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/content-removal-policy"
            >
              Content Removal Policy
            </Link>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/blocked-content-policy"
            >
              Blocked Content Policy
            </Link>
            <Link
              className="cursor-pointer whitespace-nowrap text-white text-sm font-medium"
              href="/community-guidelines"
            >
              Community Guidelines
            </Link>
          </div>
        </div>
        <div className="flex lg:flex-col lg:w-auto w-full justify-between md:mb-0 mb-5">
          <div className="flex flex-col text-start gap-5">
            <div className="text-grey-default text-lg font-semibold block">
              Legal
            </div>
            <Link
              className="cursor-pointer text-white text-sm font-medium whitespace-nowrap"
              href="/terms-of-service"
            >
              Terms of Service
            </Link>
            <Link
              className="cursor-pointer text-white text-sm font-medium whitespace-nowrap"
              href="/usc-exemption"
            >
              U.S.C. 2257 Exemption
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between lg:min-w-[180px] lg:pl-5">
          {/* Other sections */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
