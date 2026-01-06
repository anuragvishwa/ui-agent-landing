"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp } from "@/lib/animations";

const faqs = [
  {
    question: "Is this just a product tour tool?",
    answer:
      "No. Product tours are pre-authored flows that play on a schedule. Flexdash is fundamentally different — it's on-demand guidance driven by user questions and real-time UI state. Users ask a question, and Flexdash responds by highlighting the exact UI elements they need, adapting to their current context.",
  },
  {
    question: "Do you need access to our codebase?",
    answer:
      "No. Mapping Mode works entirely on the rendered UI in your browser. Your developers log in to your app normally and use our visual interface to identify and approve UI anchors. Code-first anchors (adding assistId attributes) are optional for extra stability but not required.",
  },
  {
    question: "Does this work with SSO/MFA apps?",
    answer:
      "Yes. Because Mapping Mode is performed by your logged-in admin inside your actual application, it works with any authentication system — Okta, Azure AD, Google Workspace, custom SSO, or MFA. We never need your credentials.",
  },
  {
    question: "Will this slow down our app?",
    answer:
      "No. The Flexdash SDK runs incremental DOM scanning and event-based detection, meaning it only processes what's changed rather than continuously polling. Mapping Mode is dev-only and can be completely disabled in production builds. Typical overhead is under 10ms.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are up and running within a day. Install the SDK (5 minutes), run Mapping Mode on your key screens (1-2 hours), configure your first few intents (30 minutes), and you're ready to test. Production rollout typically happens within the first week.",
  },
];

export function FAQSection() {
  return (
    <section className="pt-8 pb-20 lg:pb-28 bg-white">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know about Flexdash."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-secondary-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  );
}
