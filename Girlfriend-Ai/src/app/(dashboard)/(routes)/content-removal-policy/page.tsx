import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Content Removal Policy - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
const ContentRemovalPolicy = () => {
  return (
    <div
      className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6"
    >
      <h2 className="text-2xl font-bold">Content Removal Policy</h2>

      <div className="w-full flex flex-col gap-4 mt-8">
        <p className="text-base text-muted-foreground">
          At Fab AI LTD, we strive to maintain a safe and respectful experience
          for all our users. Our Content Removal Policy outlines our approach to
          addressing concerns related to content that may inadvertently resemble
          real individuals. All content accessible on Couple.me (the “APP”) is
          generated exclusively through artificial intelligence technology,
          allowing users to create and interact with AI-generated characters. It
          is important to note that any similarity to an actual person is
          unintentional and purely coincidental.
        </p>

        <p className="text-lg font-semibold mt-8">
          1. Unintentional Resemblance to Actual Persons
        </p>
        <p className="text-base text-muted-foreground">
          Despite the AI-generated nature of the content on the app, we
          acknowledge that there might be instances where the generated content
          unintentionally resembles actual persons. We are dedicated to promptly
          addressing any concerns that may arise in such situations.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">2. Content Removal Process</p>
        <p className="text-base text-muted-foreground">
          If a user believes that any content on our app bears a resemblance to
          them or another person, they can request its removal by contacting our
          support team at support@Couple.me or directly reporting their concern
          in the app in the “Contact” section. We will thoroughly review the
          request and take appropriate action within a reasonable timeframe.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">3. User Verification</p>
        <p className="text-base text-muted-foreground">
          To ensure the accuracy and legitimacy of content removal requests, we
          may ask the user to provide adequate evidence of their identity or
          relationship to the person depicted in the content. This verification
          process is implemented to handle requests responsibly and safeguard
          the rights and interests of all users.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">4. Content Removal</p>
        <p className="text-base text-muted-foreground">
          Upon verification and confirmation of a valid content removal request,
          the specified content will be removed in a timely manner from the APP.
          Our goal is to complete this process promptly while ensuring
          compliance with applicable laws and regulations.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">5. Privacy</p>
        <p className="text-base text-muted-foreground">
          Our highest priority is to respect user privacy throughout the entire
          content removal process. All requests are treated strictly
          confidential, and we do not disclose any personal information or
          details of the requests to any third parties without explicit consent
          unless required by law.
          <br />
          <br />
        </p>

        <p className="text-lg font-semibold">6. Contact Information</p>
        <p className="text-base text-muted-foreground">
          If you have any questions or require further clarification regarding
          our Content Removal Policy, please contact us at: support@Couple.me or
          directly report in the APP in the “Contact” section. We are committed
          to addressing concerns in a timely manner and ensuring a positive
          experience for all our users.
        </p>
      </div>
    </div>
  );
};

export default ContentRemovalPolicy;
