import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Complaint Policy - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
const ComplaintPolicy = () => {
  return (
    <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6">
      <h2 className="text-2xl font-bold">Complaint Policy</h2>

      <div className="w-full flex flex-col gap-4 mt-8">
        <p className="text-base text-muted-foreground">
          At Fab AI LTD we value our users and strive to provide a positive
          experience with Couple.me (the “APP”). We understand that concerns or
          complaints may arise from time to time, and we are committed to
          addressing them promptly and effectively. This Complaint Policy
          outlines the process for users to file complaints regarding any issues
          encountered while using our platform.
        </p>

        <p className="text-lg font-semibold mt-8">1. Customer Support</p>
        <p className="text-base text-muted-foreground">
          We have a dedicated support team to assist our users with any concerns
          or complaints. Our support team is committed to providing prompt and
          effective assistance. Users can contact our support team if they
          encounter any issues or have inquiries regarding our app or services.
          Our support team manages all inquiries professionally, confidentially,
          and impartially. We are committed to addressing our users’ concerns
          promptly and to the best of our abilities.
        </p>

        <p className="text-lg font-semibold mt-8">2. Submitting a Complaint</p>
        <p className="text-base text-muted-foreground">
          Users who wish to file a complaint can do so by contacting our
          customer support team through support@couple.me or directly report in
          the APP in the “Contact” section.
        </p>

        <p className="text-lg font-semibold mt-8">
          3. Information to Include in the Complaint
        </p>
        <p className="text-base text-muted-foreground">
          When submitting a complaint, users are encouraged to provide the
          following details to help us investigate and address the issue
          promptly:
          <br />
          <br />
          a. User&apos;s full name and e-mail;
          <br />
          b. Description of the complaint, including relevant details such as
          the date and time of the incident;
          <br />
          c. Any supporting documentation or screenshots, if applicable.
        </p>

        <p className="text-lg font-semibold mt-8">
          4. Acknowledgment of Complaint
        </p>
        <p className="text-base text-muted-foreground">
          Upon receiving a complaint, our customer support team will acknowledge
          the receipt within 24 hours via e-mail.
        </p>

        <p className="text-lg font-semibold mt-8">
          5. Investigation and Resolution
        </p>
        <p className="text-base text-muted-foreground">
          We will conduct a thorough investigation into each complaint to
          understand the nature of the issue. Our goal is to provide a
          resolution within a reasonable timeframe. Depending on the complexity
          of the complaint, some cases may require additional time to conduct a
          comprehensive investigation. Users will be kept informed of the
          progress and expected resolution timeline.
        </p>

        <p className="text-lg font-semibold mt-8">6. Feedback and Follow-Up</p>
        <p className="text-base text-muted-foreground">
          Once the complaint has been addressed, users will receive feedback
          regarding the outcome of the investigation and any actions taken. We
          may also seek user feedback on the resolution process to continuously
          improve our services.
        </p>

        <p className="text-lg font-semibold mt-8">7. Escalation</p>
        <p className="text-base text-muted-foreground">
          If a user is dissatisfied with the resolution provided, he/she may
          request further escalation. In this case, users can notify our support
          team within a reasonable timeframe, providing clear reasons for their
          dissatisfaction with the initial resolution. The case will be reviewed
          by individuals or teams not initially involved in the complaint
          resolution process. They will re-assess the complaint and reconsider
          the previous decision. The user will be notified of the outcome of the
          escalation within a reasonable timeframe.
        </p>
      </div>
    </div>
  );
};

export default ComplaintPolicy;
