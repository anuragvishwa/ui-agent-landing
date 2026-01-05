"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  UserX,
  DoorOpen,
  Hourglass,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp } from "@/lib/animations";
import { InboxSupportMockup } from "@/components/mockups";

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

        {/* Full-width Inbox mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <InboxSupportMockup />
        </motion.div>

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
