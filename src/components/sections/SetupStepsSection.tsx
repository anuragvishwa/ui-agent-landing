"use client";

import { motion } from "framer-motion";
import { Code, MousePointer, Rocket } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: Code,
    title: "Install SDK",
    description: "Add Flexdash with a script tag or npm package. Start on staging first.",
  },
  {
    number: "02",
    icon: MousePointer,
    title: "Turn on Mapping Mode",
    description: "Click to approve UI anchors, rename or ignore suggestions, then publish your map.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Enable top intents",
    description: "Import your docs/FAQs, configure success signals, and launch to users.",
  },
];

export function SetupStepsSection() {
  return (
    <section className="relative bg-dark-gradient py-20 lg:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 text-sm font-medium rounded-full mb-4">
            Get Started
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Up and running in minutes
          </h2>
          <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
            Three simple steps to transform your product&apos;s user experience.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5">
            <div className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 opacity-50" />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
            >
              <div className="text-center">
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring" }}
                  className="relative inline-flex mb-6"
                >
                  <div className="w-32 h-32 rounded-2xl bg-secondary-800/50 backdrop-blur-sm border border-secondary-700 flex items-center justify-center relative overflow-hidden group hover:border-primary-500/50 transition-colors">
                    {/* Large background number */}
                    <span className="absolute text-8xl font-bold text-secondary-700/30 select-none">
                      {step.number}
                    </span>
                    {/* Icon */}
                    <step.icon className="w-12 h-12 text-primary-400 relative z-10" />
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary-400 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
