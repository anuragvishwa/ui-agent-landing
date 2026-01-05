"use client";

import { motion } from "framer-motion";
import { MessageSquare, Map, Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

const chatbotPoints = [
  { text: "Highlights the exact field/button", isGood: true },
  { text: "Scrolls to the right section", isGood: true },
  { text: "Points out what's missing", isGood: true },
  { text: "Confirms progress and completion", isGood: true },
];

const walkthroughPoints = [
  { text: "Triggered by user's question", isGood: true },
  { text: "Adapts based on current screen + state", isGood: true },
  { text: "Includes drift detection", isGood: true },
  { text: "Guidance doesn't silently break", isGood: true },
];

export function DifferentiatorsSection() {
  return (
    <section className="section-padding bg-secondary-50">
      <Container>
        <SectionHeading
          badge="What Makes Us Different"
          title="Not just another tool"
          description="Flexdash fundamentally changes how users get help inside your product."
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Not another chatbot */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
          >
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-secondary-200 h-full hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900">
                    Not another chatbot
                  </h3>
                  <p className="text-secondary-500 text-sm">
                    Chatbots talk. Users still get stuck.
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                <p className="text-secondary-700">
                  <span className="font-semibold text-primary-600">Flexdash guides</span>{" "}
                  using the UI itself:
                </p>
              </div>

              <ul className="space-y-3">
                {chatbotPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-600" />
                    </div>
                    <span className="text-secondary-700">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Not another walkthrough */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
          >
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-secondary-200 h-full hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <Map className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900">
                    Not another walkthrough
                  </h3>
                  <p className="text-secondary-500 text-sm">
                    Walkthroughs are authored flows that go stale.
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-secondary-50 rounded-xl border border-secondary-100">
                <p className="text-secondary-700">
                  <span className="font-semibold text-primary-600">Flexdash is on-demand</span>{" "}
                  and contextual:
                </p>
              </div>

              <ul className="space-y-3">
                {walkthroughPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-600" />
                    </div>
                    <span className="text-secondary-700">{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
