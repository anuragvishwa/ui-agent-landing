"use client";

import { motion } from "framer-motion";
import {
  Search,
  Settings,
  Ban,
  Lock,
  FormInput,
  HelpCircle,
  FileX,
  Monitor,
  Unplug,
  AlertTriangle,
  Headphones,
  UserX,
  DoorOpen,
  Hourglass,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { InboxSupportMockup } from "@/components/mockups";

const painPoints = [
  {
    icon: Search,
    secondaryIcon: Settings,
    quote: "Where is this setting?",
    color: "from-blue-500 to-blue-600",
    solution: "Flexdash shows the exact location with a spotlight",
  },
  {
    icon: Ban,
    secondaryIcon: Lock,
    quote: "Why is this disabled?",
    color: "from-purple-500 to-violet-600",
    solution: "Flexdash explains the reason and guides to fix it",
  },
  {
    icon: FormInput,
    secondaryIcon: HelpCircle,
    quote: "What should I fill here?",
    color: "from-green-500 to-emerald-600",
    solution: "Flexdash provides inline field guidance",
  },
  {
    icon: FileX,
    secondaryIcon: Monitor,
    quote: "Doc doesn't match screen",
    color: "from-orange-500 to-amber-600",
    solution: "Flexdash guides based on actual UI, not docs",
  },
  {
    icon: Unplug,
    secondaryIcon: AlertTriangle,
    quote: "Integration not working",
    color: "from-red-500 to-rose-600",
    solution: "Flexdash runs preflight checks to find issues",
  },
];

const costImpacts = [
  {
    id: "headcount",
    stat: "+$85k",
    title: "Support headcount",
    description: "Extra staff needed yearly",
    icon: Headphones,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
    accentColor: "bg-green-500",
  },
  {
    id: "conversion",
    stat: "-23%",
    title: "Lower activation",
    description: "Users abandoning setup",
    icon: UserX,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    accentColor: "bg-blue-500",
  },
  {
    id: "churn",
    stat: "34%",
    title: "Onboarding churn",
    description: "Users leaving in first week",
    icon: DoorOpen,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    accentColor: "bg-purple-500",
  },
  {
    id: "deals",
    stat: "2.3x",
    title: "Longer sales cycle",
    description: "Enterprise deals delayed",
    icon: Hourglass,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    accentColor: "bg-orange-500",
  },
];

export function ProblemSection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration - light theme */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-80 h-80 border border-primary-200/30 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-60 h-60 border border-secondary-200/30 rounded-full"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="The Problem"
          title="Support is overloaded with UI confusion"
          description="These aren't product bugs — they're context gaps that cost you time, money, and growth."
        />

        {/* Two-column layout: Mockup + Pain Points */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: Inbox mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <InboxSupportMockup />
          </motion.div>

          {/* Right: Pain point cards - static, non-clickable */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {/* Pain point cards in a clean stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <div className="bg-white border border-secondary-200 rounded-2xl p-5 h-full hover:shadow-lg hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1">
                    {/* Large icon box */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <point.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Quote */}
                    <p className="text-secondary-900 text-sm font-medium mb-2">
                      &ldquo;{point.quote}&rdquo;
                    </p>

                    {/* Solution - always visible */}
                    <p className="text-xs text-secondary-500">
                      {point.solution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stat callout */}
            <motion.div
              variants={fadeInUp}
            >
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    +340%
                  </p>
                  <p className="text-sm text-secondary-600">increase in UI confusion tickets</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-14 h-14 rounded-full bg-red-100 border border-red-200 flex items-center justify-center"
                >
                  <AlertTriangle className="w-7 h-7 text-red-500" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Cost Impact Cards - Premium Design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <p className="text-secondary-600 mb-8 text-center text-lg font-medium">
            These context gaps cost you:
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {costImpacts.map((cost, index) => (
              <motion.div
                key={cost.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-secondary-100 text-center overflow-hidden"
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 ${cost.accentColor} rounded-b-full`} />

                {/* Icon */}
                <div className={`w-12 h-12 ${cost.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <cost.icon className={`w-6 h-6 ${cost.iconColor}`} />
                </div>

                {/* Stat */}
                <p className="text-4xl font-bold text-secondary-900 mb-2">
                  {cost.stat}
                </p>

                {/* Title */}
                <p className="text-sm font-semibold text-secondary-800 mb-1">
                  {cost.title}
                </p>

                {/* Description */}
                <p className="text-xs text-secondary-500">
                  {cost.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
