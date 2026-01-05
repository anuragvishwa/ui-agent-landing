"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TrendingDown, Rocket, CheckCircle, Zap } from "lucide-react";

const stats = [
  {
    value: 80,
    suffix: "%",
    label: "Reduction in UI confusion tickets",
    description: "Average decrease in support volume",
    icon: TrendingDown,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    value: 3,
    suffix: "x",
    label: "Faster onboarding completion",
    description: "Users complete setup faster",
    icon: Rocket,
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    value: 50,
    suffix: "%",
    label: "Less form abandonment",
    description: "Higher completion rates",
    icon: CheckCircle,
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    value: 800,
    prefix: "<",
    suffix: "ms",
    label: "Guidance latency",
    description: "Real-time assistance",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-80 h-80 border border-primary-200/30 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-96 h-96 border border-indigo-200/30 rounded-full"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-secondary-100 shadow-soft hover:shadow-elevated transition-all duration-300 text-center group"
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-b-full bg-gradient-to-r ${stat.color}`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>

              {/* Counter */}
              <div className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              {/* Label */}
              <p className="text-sm font-medium text-secondary-800 mb-1 line-clamp-2">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-xs text-secondary-500">
                {stat.description}
              </p>

              {/* Decorative ring on hover */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="absolute -inset-px rounded-2xl border-2 border-primary-300 pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
