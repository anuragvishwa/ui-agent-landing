"use client";

import { motion } from "framer-motion";
import { Lock, AlertTriangle, Check, ArrowRight, Shield, User } from "lucide-react";

const prerequisites = [
  { label: "Email verified", completed: true },
  { label: "Profile completed", completed: true },
  { label: "Payment method added", completed: false, action: "Add payment method" },
  { label: "Terms accepted", completed: false, action: "Review terms" },
];

export function BlockedStateDebuggerMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">Upgrade to Pro</h3>
              <p className="text-sm text-secondary-500">Unlock advanced features</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Feature preview */}
          <div className="space-y-3 mb-6">
            {["Unlimited exports", "Team collaboration", "Priority support"].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-secondary-600">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-purple-600" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          {/* Disabled button with tooltip trigger */}
          <div className="relative">
            <button
              disabled
              className="w-full py-3 px-4 bg-secondary-200 text-secondary-400 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Upgrade Now
            </button>

            {/* Animated pulse indicator */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -right-2 -top-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Debugger tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 translate-y-full w-full max-w-sm z-10"
      >
        <div className="bg-secondary-900 text-white rounded-xl shadow-2xl overflow-hidden">
          {/* Tooltip arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-secondary-900 rotate-45" />

          {/* Header */}
          <div className="px-4 py-3 bg-secondary-800 flex items-center gap-2 border-b border-secondary-700">
            <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-sm">Why is this disabled?</span>
          </div>

          {/* Prerequisites list */}
          <div className="p-4">
            <p className="text-xs text-secondary-400 mb-3 uppercase tracking-wider">
              Prerequisites
            </p>
            <div className="space-y-2">
              {prerequisites.map((prereq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                    prereq.completed ? "bg-secondary-800/50" : "bg-amber-500/10 border border-amber-500/30"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {prereq.completed ? (
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-amber-500/50" />
                    )}
                    <span className={`text-sm ${prereq.completed ? "text-secondary-400" : "text-white"}`}>
                      {prereq.label}
                    </span>
                  </div>
                  {!prereq.completed && prereq.action && (
                    <button className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1">
                      {prereq.action}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Role info */}
            <div className="mt-4 pt-4 border-t border-secondary-700 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary-800 flex items-center justify-center">
                <User className="w-4 h-4 text-secondary-400" />
              </div>
              <div>
                <p className="text-xs text-secondary-400">Current role</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Free Plan</span>
                  <span className="px-1.5 py-0.5 bg-secondary-700 rounded text-xs text-secondary-400">
                    Limited
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
