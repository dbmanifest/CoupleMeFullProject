import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines - couple.me",
  description:
    "Community guidelines for maintaining a positive experience on Couple.me.",
};

const CommunityGuidelines = () => {
  return (
    <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6">
      <h2 className="text-2xl font-bold">Community Guidelines</h2>

      <div className="w-full flex flex-col gap-4 mt-8">
        <p className="text-base text-muted-foreground">
          Our community rules play an important role in maintaining a positive
          experience for our users. Please follow these rules, in addition to
          all applicable laws, the Couple.me Terms of Use, the Couple.me Privacy
          Policy, and all posted rules when using the Couple.me Service. When we
          are notified or otherwise become aware of a potential rule violation,
          we may review and take action, including limiting or terminating a
          user’s access to the community or app, or as otherwise specified in
          these rules. For more information, please see our Terms of Use.
        </p>

        <p className="text-lg font-semibold mt-8">Illegal Activities</p>
        <p className="text-base text-muted-foreground">
          Do not use the Couple.me Service to engage in or promote illegal
          activities, including commercial sexual activity, trafficking, or
          pornography, or to promote dangerous or illegal acts.
        </p>

        <p className="text-lg font-semibold mt-8">Malicious Use</p>
        <p className="text-base text-muted-foreground">
          Do not transmit viruses, malware, or any other malicious or
          destructive code. Do not distribute content that harms or interferes
          with the operation of the Couple.me Service.
        </p>

        <p className="text-lg font-semibold mt-8">Hate Speech</p>
        <p className="text-base text-muted-foreground">
          Do not post or distribute content that promotes hatred or violence
          towards groups of people based on their race or ethnic origin,
          national origin, religion, disability, gender, age, veteran status,
          sexual orientation, or gender identity. This includes content related
          to or depicting historical atrocities or idolization of hate figures
          such as Adolf Hitler, Joseph Stalin, or Pol Pot.
        </p>

        <p className="text-lg font-semibold mt-8">Misinformation</p>
        <p className="text-base text-muted-foreground">
          Do not post misinformation that is likely to contribute to the risk of
          imminent violence or physical harm or interfere with the functioning
          of political processes.
        </p>

        <p className="text-lg font-semibold mt-8">
          Personal and Confidential Information
        </p>
        <p className="text-base text-muted-foreground">
          Do not distribute other people’s personal and confidential
          information, such as photos, credit card numbers, account passwords,
          or unlisted contact information.
        </p>

        <p className="text-lg font-semibold mt-8">Account Hijacking</p>
        <p className="text-base text-muted-foreground">
          Do not access another user’s account without permission. Do not use
          our service for phishing scams.
        </p>

        <p className="text-lg font-semibold mt-8">Child Exploitation</p>
        <p className="text-base text-muted-foreground">
          Do not create or depict characters who are minors or whose age is not
          clearly defined as over 18. This includes &ldquo;aged-up&rdquo;
          characters, originally depicted as minors in source material.
          Realistic or human-like depictions of underage characters, even if
          fictional, are strictly prohibited.
        </p>

        <p className="text-lg font-semibold mt-8">Spam</p>
        <p className="text-base text-muted-foreground">
          Do not spam, including sending or creating characters that will
          provide unwanted promotional or commercial content, or unwanted or
          mass solicitation.
        </p>

        <p className="text-lg font-semibold mt-8">Sexually Explicit Material</p>
        <p className="text-base text-muted-foreground">
          Do not post real images or overly realistic AI-generated images of any
          individuals. This prohibition includes images that might be
          indistinguishable from real photos, to protect individual privacy and
          prevent the misuse of someone&quot;s likeness without consent.
          Permitted content within our community must respect these boundaries
          to ensure a respectful and safe environment.
        </p>

        <p className="text-lg font-semibold mt-8">Imagery of Sexual Activity</p>
        <p className="text-base text-muted-foreground">
          Avoid depicting explicit sexual activity and stimulation. Implied
          sexual activity is permitted when contextually appropriate (medical,
          educational, fictional representation).
        </p>

        <p className="text-lg font-semibold mt-8">Fetish Content</p>
        <p className="text-base text-muted-foreground">
          Do not post content involving acts that are likely to lead to the
          death of any person or animal, dismemberment, cannibalism, or bodily
          fluids such as feces and urine. Promotion or normalization of sexual
          attraction to non-human animals is prohibited; however, fictional
          species like Pokémon are exempt.
        </p>

        <p className="text-lg font-semibold mt-8">
          Non–Consensual Sexually Explicit Material
        </p>
        <p className="text-base text-muted-foreground">
          Do not post content that exploits people through sextortion, revenge
          porn, posting or threatening to post non-consensual intimate imagery,
          secretly taken imagery of commonly sexualized body parts, or posting
          or threatening to post private sexual conversations.
        </p>

        <p className="text-lg font-semibold mt-8">Harassment and Bullying</p>
        <p className="text-base text-muted-foreground">
          Harassment and bullying are not tolerated on our platform. If you
          encounter or witness harassment or bullying, please report it
          immediately using our provided tools on the platform.
        </p>

        <p className="text-lg font-semibold mt-8">Violence and Threats</p>
        <p className="text-base text-muted-foreground">
          Do not distribute depictions of graphic or gratuitous violence. We may
          remove content and may escalate to law enforcement when we perceive a
          genuine risk of physical harm, or a direct threat to public safety.
        </p>

        <p className="text-lg font-semibold mt-8">Self-Harm</p>
        <p className="text-base text-muted-foreground">
          We may remove any promotion or encouragement of suicide,
          self-mutilation, eating disorders, or drug abuse.
        </p>

        <p className="text-lg font-semibold mt-8">
          Impersonation or Deceptive Behavior
        </p>
        <p className="text-base text-muted-foreground">
          Do not use our Service to impersonate others or engage in deceptive
          behavior.
        </p>

        <p className="text-lg font-semibold mt-8">Intellectual Property</p>
        <p className="text-base text-muted-foreground">
          Respect copyrights, trademarks, and other legal rights when sharing
          content on our Service.
        </p>

        <p className="text-lg font-semibold mt-8">Restricted Goods</p>
        <p className="text-base text-muted-foreground">
          Do not advertise or attempt transactions involving regulated goods.
        </p>

        <p className="text-lg font-semibold mt-8">
          Contests, Promotions, and Solicitations
        </p>
        <p className="text-base text-muted-foreground">
          Avoid running unauthorized contests or promotions, and do not solicit
          users for business purposes without permission.
        </p>

        <p className="text-lg font-semibold mt-8">Reporting Potential Issues</p>
        <p className="text-base text-muted-foreground">
          Our users play an important role in reporting content or behavior that
          may violate our Community Guidelines. If you encounter content, a
          character, or a user that you believe violates the above rules, please
          report it to us at support@couple.me.
        </p>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
