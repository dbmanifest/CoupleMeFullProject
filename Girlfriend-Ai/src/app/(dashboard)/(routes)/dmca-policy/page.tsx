import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Digital Millennium Copyright Act (DMCA) - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
const DMCAPolicy = () => {
  return (
    <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6">
      <h2 className="text-2xl font-bold">
        Digital Millennium Copyright Act (DMCA)
      </h2>

      <div className="w-full flex flex-col gap-4 mt-8">
        <p className="text-base text-muted-foreground">
          Fab AI LTD values and upholds the intellectual property rights of
          others. We are dedicated to adhering to the Digital Millennium
          Copyright Act (DMCA) and other relevant copyright laws. Our DMCA
          Policy delineates the steps we take to address notifications of
          copyright infringement and provides guidance on reaching out to us if
          you suspect that your copyrighted material has been utilized on our
          platform without proper authorization.
        </p>

        <p className="text-lg font-semibold mt-8">
          1. Reporting Copyright Infringement
        </p>
        <p className="text-base text-muted-foreground">
          If you believe in good faith that materials transmitted or created
          through Couple.me (“APP”) infringe your copyright, you (or your agent)
          may send us a notice requesting that we remove the material or block
          access to it. Please provide the following information in writing:
          <br />
          <br />
          a. An electronic or physical signature of the owner (or person
          authorized to act on behalf of the owner) of the copyrighted work;
          <br />
          <br />
          b. A description of the copyrighted work that you claim has been
          infringed upon and sufficient information for us to locate such
          copyrighted work;
          <br />
          <br />
          c. Your address, telephone number, and e-mail address;
          <br />
          <br />
          d. A statement by you that you have a good-faith belief that the
          disputed use is not authorized by the copyright owner, its agent, or
          the law;
          <br />
          <br />
          e. A statement by you, made under penalty of perjury, that the above
          information in your notice is accurate and that you are the copyright
          owner or authorized to act on the copyright owner&apos;s behalf.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">2. DMCA Notices Response</p>
        <p className="text-base text-muted-foreground">
          After receiving a complete infringement notice, we will take the
          following actions:
          <br />
          <br />
          a. Review and confirm that received documents meet DMCA requirements;
          <br />
          <br />
          b. Take proper preliminary actions against said alleged infringement
          within 1-3 days after receipt of said information, including without
          limitation link blockage;
          <br />
          <br />
          c. Notify the alleged infringer and demand him or her to explain and
          provide counter-evidence.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">3. Counter Notification</p>
        <p className="text-base text-muted-foreground">
          If you believe in good faith that someone has wrongly filed a notice
          of copyright infringement against you, you may send us a
          counter-notice. If you do, we will notify the alleged claimant and
          hold the process for 10-14 days and then re-enable your content unless
          the copyright owner initiates legal action against you before then.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">4. Contact Information</p>
        <p className="text-base text-muted-foreground">
          Notices and counter-notices should be sent to us via email at:
          support@couple.me. We are committed to addressing concerns in a timely
          manner and ensuring a positive experience for all our users.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">5. Termination</p>
        <p className="text-base text-muted-foreground">
          We have the right to suspend or terminate the use of the APP by anyone
          engaged in the suspected infringement described above.
        </p>
      </div>
    </div>
  );
};

export default DMCAPolicy;
