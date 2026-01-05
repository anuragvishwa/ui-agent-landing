"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Lightbulb,
  FileCheck,
  HelpCircle,
  Plug,
  MapPin,
  RefreshCw,
  BarChart3,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer, expandOverlay } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  CommandBarMockup,
  ShowMeGuidanceMockup,
  FormsCopilotMockup,
  BlockedStateDebuggerMockup,
  PreflightCheckMockup,
  MappingModeMockup,
  DriftDetectionMockup,
} from "@/components/mockups";

// Mockup components mapped by feature index
const featureMockups: Record<number, ReactNode> = {
  0: <CommandBarMockup />,
  1: <ShowMeGuidanceMockup />,
  2: <FormsCopilotMockup />,
  3: <BlockedStateDebuggerMockup />,
  4: <PreflightCheckMockup />,
  5: <MappingModeMockup />,
  6: <DriftDetectionMockup />,
};

const features = [
  {
    icon: Command,
    title: "Command Bar",
    shortDesc: "Cmd+K assistant everywhere",
    fullDesc:
      "A lightweight Ctrl/Cmd+K assistant available across your product. Users can ask questions like 'How do I export invoices?' or 'Why is Save disabled?' and get instant, contextual help.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    examples: ["Ask: How do I export invoices?", "Ask: Why is this disabled?", "Embed as side panel or help button"],
    hasMockup: true,
  },
  {
    icon: Lightbulb,
    title: "Show Me Guidance",
    shortDesc: "Dynamic overlays & spotlights",
    fullDesc:
      "Turn answers into interactive guidance. Spotlight the exact element, show tooltips with next steps, arrows and callouts, and step-by-step micro flows when needed.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    examples: ["Spotlight exact elements", "Tooltips with next steps", "Works across all screens"],
    hasMockup: true,
  },
  {
    icon: FileCheck,
    title: "Forms Copilot",
    shortDesc: "Highest ROI for conversions",
    fullDesc:
      "Forms are where users abandon. Flexdash identifies missing required fields, highlights invalid fields, explains validation errors in plain language, and confirms when errors are resolved.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    examples: ["Identifies missing fields", "Explains validation errors", "Guides minimum steps to submit"],
    hasMockup: true,
  },
  {
    icon: HelpCircle,
    title: "Blocked-State Debugger",
    shortDesc: "Why can't I do this?",
    fullDesc:
      "Most stuck moments are caused by missing prerequisites, permission limits, feature flags, or plan entitlements. Flexdash detects the block reason and guides the fix.",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    examples: ["Detects missing prerequisites", "Shows permission limits", "Guides to the right fix"],
    hasMockup: true,
  },
  {
    icon: Plug,
    title: "Integration Preflight",
    shortDesc: "OAuth & webhook troubleshooting",
    fullDesc:
      "For OAuth, webhooks, and integrations that fail often: detect missing steps or scopes, guide to the exact config screen, and generate clean handoff payloads if needed.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    examples: ["Detect missing scopes", "Guide to config screen", "Clean handoff payloads"],
    hasMockup: true,
  },
  {
    icon: MapPin,
    title: "Mapping Mode",
    shortDesc: "No-code anchor setup",
    fullDesc:
      "Onboard without reading the codebase. Devs log in normally, turn on Mapping Mode, hover/click on elements to auto-generate stable IDs, and publish a versioned UI map.",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    examples: ["Auto-generate stable IDs", "Accept/rename/ignore", "Publish versioned UI map"],
    hasMockup: true,
  },
  {
    icon: RefreshCw,
    title: "Drift Detection",
    shortDesc: "UI change alerts",
    fullDesc:
      "UI changes break tours and docs. Flexdash makes drift visible with checks for critical anchors, reports missing elements, and lets you re-map in minutes, not days.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    examples: ["Critical anchor checks", "Missing element reports", "One-click remap"],
    hasMockup: true,
  },
  {
    icon: BarChart3,
    title: "Analytics",
    shortDesc: "Outcome verification",
    fullDesc:
      "Prove value in weeks: guided completions (verified, not just views), form-submit success lift, top stuck screens, most common blocked reasons, and time-to-first-value improvement.",
    color: "from-secondary-600 to-secondary-700",
    bgColor: "bg-secondary-50",
    examples: ["Verified completions", "Form success metrics", "Time-to-value tracking"],
    hasMockup: false,
  },
];

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <section id="features" className="section-padding bg-white">
      <Container>
        <SectionHeading
          badge="Core Features"
          title="Everything you need to guide users"
          description="Eight powerful features that work together to eliminate UI confusion."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              onClick={() => setSelectedFeature(index)}
              className="cursor-pointer group"
            >
              <div
                className={cn(
                  "relative h-full p-6 rounded-2xl border border-secondary-200 bg-white",
                  "hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300",
                  "overflow-hidden"
                )}
              >
                {/* Gradient background on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    feature.bgColor
                  )}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                      feature.color
                    )}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {feature.shortDesc}
                  </p>

                  {/* Click to expand indicator */}
                  <div className="mt-4 flex items-center gap-1 text-xs text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Click to learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expanded Feature Modal/Overlay */}
        <AnimatePresence>
          {selectedFeature !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/60 backdrop-blur-md"
              onClick={() => setSelectedFeature(null)}
            >
              <motion.div
                variants={expandOverlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "bg-white rounded-2xl shadow-2xl overflow-hidden",
                  features[selectedFeature].hasMockup ? "max-w-5xl w-full" : "max-w-lg w-full"
                )}
              >
                {/* Header */}
                <div
                  className={cn(
                    "p-6 bg-gradient-to-br text-white",
                    features[selectedFeature].color
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                        {(() => {
                          const Icon = features[selectedFeature].icon;
                          return <Icon className="w-7 h-7 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {features[selectedFeature].title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {features[selectedFeature].shortDesc}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFeature(null)}
                      className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className={cn(
                  "p-6",
                  features[selectedFeature].hasMockup && "grid md:grid-cols-2 gap-8"
                )}>
                  {/* Left: Text content */}
                  <div>
                    <p className="text-secondary-700 mb-6">
                      {features[selectedFeature].fullDesc}
                    </p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-secondary-900">
                        Key capabilities:
                      </p>
                      <ul className="space-y-2">
                        {features[selectedFeature].examples.map((example, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-secondary-600"
                          >
                            <div
                              className={cn(
                                "w-1.5 h-1.5 rounded-full bg-gradient-to-br",
                                features[selectedFeature].color
                              )}
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Mockup */}
                  {features[selectedFeature].hasMockup && featureMockups[selectedFeature] && (
                    <div className="flex items-center justify-center bg-secondary-50 rounded-xl p-4 min-h-[300px]">
                      <div className="transform scale-90 origin-center">
                        {featureMockups[selectedFeature]}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
