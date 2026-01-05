"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  Layers,
  Navigation,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ShowMeGuidanceMockup } from "@/components/mockups";

const steps = [
  {
    icon: Eye,
    title: "Detects screen context",
    description: "Automatically understands where users are in your UI",
    detail: "Flexdash analyzes the current page structure, visible elements, and user state to understand exactly what's on screen.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Target,
    title: "Finds UI elements",
    description: "Locates the right buttons, fields, and controls",
    detail: "Using stable anchors you define, Flexdash precisely locates the exact element users need to interact with.",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Layers,
    title: "Renders overlays",
    description: "Shows tooltips, spotlights, and arrows dynamically",
    detail: "Visual guidance appears directly on your UI—spotlights, tooltips, arrows—without disrupting the user experience.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Navigation,
    title: "Guides to completion",
    description: "Step-by-step assistance until the task is done",
    detail: "Multi-step flows are broken into digestible actions, guiding users through complex processes one step at a time.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: CheckCircle,
    title: "Verifies success",
    description: "Confirms the action worked and adapts if needed",
    detail: "Flexdash confirms when actions succeed and adapts guidance if something unexpected happens along the way.",
    color: "from-pink-500 to-rose-500",
  },
];

export function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="solution" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-80 h-80 border border-primary-200/30 rounded-full"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="How It Works"
          title="Flexdash is an on-demand UI support layer"
          description="Users ask a question or click 'Show me' and Flexdash guides them to completion."
        />

        {/* Two-column layout: Steps + Mockup */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Interactive Steps */}
          <div className="relative min-h-[700px]">
            {/* Progress indicator */}
            <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-secondary-200 hidden md:block">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-500 to-primary-400"
                initial={{ height: "0%" }}
                animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-4"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeStep === index
                      ? "bg-primary-50 border-2 border-primary-500 shadow-lg"
                      : "hover:bg-secondary-50 border-2 border-transparent"
                  }`}
                >
                  {/* Step icon */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={activeStep === index ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${
                        activeStep === index ? "shadow-primary-500/40" : ""
                      }`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      activeStep >= index
                        ? "bg-primary-500 text-white"
                        : "bg-secondary-300 text-secondary-600"
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className={`text-base font-semibold mb-1 transition-colors ${
                      activeStep === index ? "text-primary-600" : "text-secondary-900"
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-secondary-600 mb-2">
                      {step.description}
                    </p>

                    {/* Detail text - always rendered, opacity controls visibility */}
                    <div className="mt-2">
                      <p
                        className={`text-sm rounded-lg p-3 transition-all duration-200 ${
                          activeStep === index
                            ? "text-primary-700 bg-primary-100 opacity-100"
                            : "text-transparent bg-transparent opacity-0"
                        }`}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator - always rendered, opacity controls visibility */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center transition-all duration-200 ${
                      activeStep === index ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: ShowMe Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block sticky top-8"
          >
            <div className="relative">
              {/* Glow effect behind mockup */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-amber-500/20 rounded-3xl blur-3xl scale-110"
              />

              {/* Step indicator badge */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
              >
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${steps[activeStep].color} text-white text-sm font-medium shadow-lg`}>
                  Step {activeStep + 1}: {steps[activeStep].title}
                </div>
              </motion.div>

              <div className="relative pt-8">
                <ShowMeGuidanceMockup activeStep={activeStep} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-50 to-amber-50 rounded-full border border-primary-100">
            <span className="text-primary-600 font-medium">
              This isn&apos;t a rigid &ldquo;product tour&rdquo;
            </span>
            <span className="text-secondary-400">—</span>
            <span className="text-secondary-700">
              It&apos;s real-time assistance based on what the user is doing
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
