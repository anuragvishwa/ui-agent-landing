"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Target,
  Layers,
  Navigation,
  CheckCircle,
  Play,
  Pause,
  MessageSquare,
  Zap,
  Clock,
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

const comparisonData = {
  traditional: {
    label: "Traditional Support",
    icon: Clock,
    items: [
      { text: "Submit a ticket", time: "Day 1" },
      { text: "Wait for response", time: "Day 2-3" },
      { text: "Back and forth emails", time: "Day 4-5" },
      { text: "Finally resolved", time: "Day 7+" },
    ],
    totalTime: "~7 days",
    color: "red",
  },
  flexdash: {
    label: "With Flexdash",
    icon: Zap,
    items: [
      { text: "Ask question", time: "0s" },
      { text: "See guidance", time: "1s" },
      { text: "Follow steps", time: "30s" },
      { text: "Task complete", time: "1 min" },
    ],
    totalTime: "~1 minute",
    color: "green",
  },
};

export function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Auto-advance through steps when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = (prev + 1) % steps.length;
          if (next === 0) setIsPlaying(false); // Stop at end
          return next;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

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

        {/* Interactive Demo Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-primary-500/25"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Demo
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play Demo
              </>
            )}
          </button>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-full font-medium transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            {showComparison ? "Hide" : "Show"} Comparison
          </button>
        </motion.div>

        {/* Two-column layout: Steps + Mockup */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Interactive Steps */}
          <div className="relative">
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
                  onClick={() => {
                    setActiveStep(index);
                    setIsPlaying(false);
                  }}
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

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm text-primary-700 bg-primary-100 rounded-lg p-3 mt-2"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Active indicator */}
                  {activeStep === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}
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
                  opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.3,
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

        {/* Comparison Section */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional Support */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-red-50 border border-red-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-900">Traditional Support</h4>
                      <p className="text-sm text-red-600">Time to resolution: {comparisonData.traditional.totalTime}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {comparisonData.traditional.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-100">
                        <span className="text-sm text-secondary-700">{item.text}</span>
                        <span className="text-xs font-medium text-red-500 bg-red-100 px-2 py-1 rounded">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Flexdash */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900">With Flexdash</h4>
                      <p className="text-sm text-green-600">Time to resolution: {comparisonData.flexdash.totalTime}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {comparisonData.flexdash.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-100">
                        <span className="text-sm text-secondary-700">{item.text}</span>
                        <span className="text-xs font-medium text-green-500 bg-green-100 px-2 py-1 rounded">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Time savings highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">10,000x faster resolution</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
