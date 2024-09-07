import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is NO Filter NSFW AI Chat?",
    answer:
      "NO Filter NSFW AI Chat is an artificial intelligence-based chat tool designed to engage in conversations without restrictions on topics, including explicit and adult content.",
  },
  {
    question: "How does our NSFW AI Chat bot work?",
    answer:
      "The Couple.me AI chatbot uses advanced natural language processing (NLP) techniques to understand and generate human-like text based on user input. Our models have been specifically trained or fine-tuned on datasets that include explicit content, allowing it to produce adult-oriented responses. Despite being labeled as 'No Filter,' there may still be some level of filtering to prevent the generation of illegal content or to comply with platform policies. Couple.me AI chat bot is accessible through a user-friendly interface, which can be a web application, mobile app, or integration within other platforms.",
  },
  {
    question: "Is the Couple.me NO Filter NSFW AI Chat safe to use?",
    answer:
      "While the Couple.me chatbot can engage in unrestricted conversations, it is important to use it responsibly and be aware of potential risks, such as exposure to inappropriate content. User discretion is advised.",
  },
  {
    question: "How do people interact with their NSFW AI characters?",
    answer:
      "Interaction with NSFW AI characters typically involves engaging in conversations, requesting specific interactions, and customizing their behavior to suit personal preferences.",
  },
  {
    question: "How does Couple.me provide privacy and data security?",
    answer:
      "Couple.me has measures in place to protect user data and ensure confidentiality. It is essential to review the privacy policy to understand how your information is handled.",
  },
  {
    question: "What age group is the NO Filter NSFW AI Chat intended for?",
    answer:
      "This tool is intended for adults only, usually 18 years and older, due to the nature of the content it can generate.",
  },
  {
    question: "How can I design my own NSFW AI characters?",
    answer:
      "Designing your own NSFW AI characters involves several steps, including defining their personality, appearance, and behavior. You can give your character a name, background story, and specific traits, and interact with them without limitations.",
  },
  {
    question: "Can you customize your AI character?",
    answer:
      "Yes, users typically have the option to customize their AI character's topics according to their preferences to ensure a comfortable and enjoyable experience.",
  },
  {
    question: "Can I ask for pictures?",
    answer:
      "Yes, you can also ask for pictures from your AI characters as part of your interactions.",
  },
];

const FAQ = () => {
  return (
    <div className="flex flex-col items-center mt-20 mb-0 md:mt-20 md:mb-20">
      <h4 className="text-3xl font-bold text-center md:text-start">
        Frequently Asked <span className="text-primary">Questions</span>
      </h4>
      <Accordion type="single" collapsible className="w-full mt-12">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
