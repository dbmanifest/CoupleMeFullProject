import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Underage Policy - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
const UnderagePolicy = () => {
  return (
    <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6">
      <h2 className="text-2xl font-bold">Underage Policy</h2>

      <div className="w-full flex flex-col gap-4 mt-8">
        <p className="text-base text-muted-foreground">
          At Fab AI LTD, we are committed to ensuring that our platform
          Couple.me (“APP”) is used in a responsible and safe way by users who
          meet the legal age requirements.
          <br />
          <br />
          The APP includes AI-generated adult content for registered users only.
          Therefore, users must be at least 18 years old or of legal age in
          their country of residence to access and engage with such content. By
          using the APP, users affirm that they meet the minimum age requirement
          and are legally permitted to access adult content.
          <br />
          <br />
          We have implemented several measures to oversee and prevent the
          registration of users not of legal age.
        </p>

        <p className="text-lg font-semibold mt-8">1. Registering</p>
        <p className="text-base text-muted-foreground">
          When registering for the APP, an initial landing page or age gate,
          strategically designed to restrict entry to individuals who are not of
          legal age is presented to the user. Prior to gaining access to the
          main content, users are obligated to confirm their age.
          <br />
          <br />
          Users are prompted to affirm that they are above 18, and this
          information is used to verify their eligibility to access the website.
          <br />
          <br />
          A transparent disclaimer emphasizes that users must be 18 years or
          older to access our services. Users are also notified that providing
          inaccurate information about their age constitutes a violation of our
          Terms of Service.
          <br />
          <br />
          Fab AI LTD cannot be held responsible for any inaccuracies or
          misrepresentations regarding user age. It is the user&apos;s
          responsibility to ensure compliance with their local laws and
          regulations regarding the access and consumption of adult content.
        </p>

        <p className="text-lg font-semibold mt-8">2. Content responsibility</p>
        <p className="text-base text-muted-foreground">
          You, as a user of the APP are solely responsible for the Output
          generated by the AI Companions through text messages, voice messages,
          images, and videos. The AI Companions learn and respond based on the
          conversations you lead and the parameters you select. You understand
          and agree that Fab AI LTD does not control or endorse the content
          generated by the AI Companions. Therefore, you acknowledge that you
          are fully responsible for the Output generated by the AI and for your
          own actions while using the APP.
          <br />
          <br />
          You must ensure that your interactions with the AI Companions comply
          with applicable laws, regulations, Terms, and Policies, in particular
          the Blocked Content Policy, and you shall not engage in any illegal,
          unethical, or harmful activities through the APP.
          <br />
          <br />
          We explicitly point at paragraphs 1d) and 1e) of the Blocked Content
          Policy prohibiting any content that exploits or poses a danger to
          minors, including but not limited to child pornography, sexual
          exploitation, or any form of harm or harassment towards minors as well
          as any attempt to generate AI content which would bear any resemblance
          to minors or exploit their likeness.
        </p>

        <p className="text-lg font-semibold mt-8">3. Content Moderation</p>
        <p className="text-base text-muted-foreground">
          We at Fab AI LTD value the safety, respect, and integrity of all our
          users. While conversations between users and AI Companions are
          generally confidential, we have implemented a content moderation
          filter, based on our proprietary LLM technology to ensure compliance
          with our Terms and Policies, in particular with our Blocked Content
          Policy. In the event that the moderation filter detects any content
          that violates our terms, we reserve the right to manually review the
          flagged content and take appropriate action, which may include
          terminating the user&apos;s account. This measure is implemented to
          maintain a respectful and secure environment for all users. We strive
          to strike a balance between privacy and community standards, and we
          appreciate your understanding and cooperation in adhering to our
          guidelines.
        </p>

        <p className="text-lg font-semibold mt-8">4. Content Removal</p>
        <p className="text-base text-muted-foreground">
          Any user content that we believe, in our sole discretion, violates
          these provisions will be promptly removed.
        </p>

        <p className="text-lg font-semibold mt-8">5. Contact Information</p>
        <p className="text-base text-muted-foreground">
          If you have noticed any violation of these Terms from your
          perspective, content of any nature whatsoever or you have any
          questions or require further clarification regarding our Underage
          Policy, please contact us at: support@couple.me or directly report in
          the APP in the “Contact” section.
        </p>

        <p className="text-lg font-semibold mt-8">6. Termination</p>
        <p className="text-base text-muted-foreground">
          We have the right to suspend or terminate the use of the APP by anyone
          engaged in suspected infringement described above.
        </p>
      </div>
    </div>
  );
};

export default UnderagePolicy;
