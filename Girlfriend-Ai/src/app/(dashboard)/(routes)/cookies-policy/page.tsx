import React from 'react';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cookies Policy - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
const CookiesPolicy = () => {
  return (
    <div
      className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6"
    >
      <h2 className="text-2xl font-bold">Cookies Policy</h2>

      <div className="w-full flex flex-col gap-4 mt-8">
        <p className="text-base text-muted-foreground">
          This Cookies Policy is designed to help visitors and users understand
          how and why we use cookies on our website https://couple.me (the “APP
          “). “We” and “Us” in this document refers to Fab AI LTD, duly
          incorporated in the United States of America, having its address at
          SAKINEH A MAJD SOLE MBR 8 THE GRN STE A, DOVER, DE 19901 and registered
          with the STATE of DELAWARE under the EIN number 93-4851219.
          <br />
          <br />
          By using our APP, you agree to the use of cookies as described in
          this policy.
        </p>

        <p className="text-lg font-semibold mt-8">1. What are Cookies</p>
        <p className="text-base text-muted-foreground">
          Cookies are small text files that are stored on your computer or mobile
          device when you visit a website. They help websites recognize your
          device and remember information about your visit, preferences, and
          actions.
        </p>

        <p className="text-lg font-semibold mt-8">2. Types of Cookies We Use</p>
        <p className="text-base text-muted-foreground">
          <strong>Essential Cookies:</strong> These cookies are necessary for
          the proper functioning of our website. They enable you to navigate our
          site and use its features, such as accessing secure areas. Without
          these cookies, certain services you have requested cannot be provided.
          <br />
          <br />
          <strong>Analytical/Performance Cookies:</strong> We use these cookies
          to analyze how visitors use our website and to monitor its performance.
          For example, we may use Google Analytics to collect information about
          your online activity and interactions with our site.
          <br />
          <br />
          <strong>Functionality Cookies:</strong> These cookies allow us to
          remember choices you make on our website (such as your username,
          language, or region) and provide enhanced, more personalized features.
          <br />
          <br />
          <strong>Targeting Cookies:</strong> We may use these cookies to deliver
          content that is more relevant to your interests. They may be used by
          third-party companies to build a profile of your interests and show
          you relevant advertisements on other sites.
        </p>

        <p className="text-lg font-semibold mt-8">3. Your Consent</p>
        <p className="text-base text-muted-foreground">
          By using our APP, you consent to the placement of cookies on your
          device. You can manage your cookie preferences through your browser
          settings. However, please note that disabling certain cookies may
          affect the functionality of our APP.
        </p>

        <p className="text-lg font-semibold mt-8">4. How to Manage Cookies</p>
        <p className="text-base text-muted-foreground">
          Most web browsers allow you to control cookies through their settings.
          To find out more about cookies, including how to see what cookies have
          been set, visit <a href="http://www.allaboutcookies.org">www.allaboutcookies.org</a>.
        </p>

        <p className="text-lg font-semibold mt-8">5. Changes to This Policy</p>
        <p className="text-base text-muted-foreground">
          We may update our Cookies Policy to reflect changes in our practices
          or for other operational, legal, or regulatory reasons. Any changes
          will be effective immediately upon posting the updated policy on our
          website.
        </p>

        <p className="text-lg font-semibold mt-8">6. Contact Information</p>
        <p className="text-base text-muted-foreground">
          If you have any questions or require further clarification regarding
          our Cookies Policy, please contact us at: support@couple.me or directly
          report in the APP in the “Contact” section.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicy;
