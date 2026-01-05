"use client";

import { motion } from "framer-motion";
import { Search, Zap, Lightbulb, CheckCircle2, Sparkles } from "lucide-react";

export function HeroMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background glow effect */}
      <motion.div
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1.4, 1.6, 1.4]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-primary-400/30 via-primary-500/20 to-indigo-400/20 blur-3xl rounded-full"
      />

      {/* Main mockup container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* App window frame with glassmorphism */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-glass-lg border border-white/50 overflow-hidden">
          {/* Window header - macOS style */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary-50/80 border-b border-secondary-200/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1.5 bg-white/80 backdrop-blur rounded-lg text-xs text-secondary-500 border border-secondary-200/50 flex items-center gap-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                app.yourproduct.com/settings
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="p-6 bg-gradient-to-b from-white/50 to-secondary-50/30">
            {/* Top navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-800 to-secondary-900 shadow-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <span className="text-sm font-semibold text-secondary-900">Settings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-700">JD</span>
                </div>
              </div>
            </div>

            {/* Settings form mockup */}
            <div className="space-y-4">
              {/* Form field with spotlight effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative"
              >
                {/* Animated spotlight ring */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(20, 184, 166, 0.4)",
                      "0 0 0 8px rgba(20, 184, 166, 0)",
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-1 rounded-xl"
                />
                <div className="absolute -inset-2 bg-primary-500/10 rounded-xl" />
                <div className="relative">
                  <label className="text-xs font-medium text-secondary-700 mb-1.5 block flex items-center gap-1">
                    API Key
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="h-10 bg-primary-50/80 border-2 border-primary-500 rounded-lg flex items-center px-3 shadow-inner-glow">
                    <span className="text-sm text-primary-600">sk-flex-xxxx-xxxx-xxxx</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-0.5 h-4 bg-primary-500 ml-0.5"
                    />
                  </div>
                </div>

                {/* Tooltip with glass effect */}
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full z-10"
                >
                  <div className="bg-secondary-900/95 backdrop-blur-md text-white text-xs px-3 py-2.5 rounded-xl shadow-xl max-w-[180px] border border-white/10">
                    <div className="flex items-center gap-1.5 font-medium mb-1">
                      <Sparkles className="w-3 h-3 text-primary-400" />
                      Required Field
                    </div>
                    <div className="text-secondary-300 text-[11px] leading-relaxed">
                      Enter your API key from the dashboard to enable integrations
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-secondary-900/95 rotate-45 border-l border-b border-white/10" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Other form fields */}
              <div>
                <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
                  Webhook URL
                </label>
                <div className="h-10 bg-secondary-50/80 border border-secondary-200 rounded-lg flex items-center px-3">
                  <span className="text-sm text-secondary-400">https://</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
                  Environment
                </label>
                <div className="h-10 bg-secondary-50/80 border border-secondary-200 rounded-lg flex items-center justify-between px-3">
                  <span className="text-sm text-secondary-400">Select environment...</span>
                  <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Save button */}
              <div className="pt-2">
                <div className="h-10 bg-secondary-200/80 rounded-lg w-28 flex items-center justify-center opacity-50 cursor-not-allowed">
                  <span className="text-sm text-secondary-500">Save Changes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Command bar overlay with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[92%]"
        >
          <div className="glass-card-strong rounded-xl shadow-2xl overflow-hidden">
            {/* Command bar header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-secondary-100/50 bg-white/50">
              <Search className="w-4 h-4 text-secondary-400" />
              <div className="flex-1 flex items-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-secondary-900"
                >
                  How do I connect my API?
                </motion.span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-0.5 h-4 bg-secondary-400 ml-0.5"
                />
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 text-[10px] bg-secondary-100/80 rounded-md text-secondary-500 font-medium border border-secondary-200/50">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Command bar results */}
            <div className="p-2 bg-white/30">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-3 px-3 py-2.5 bg-primary-50/80 rounded-lg border border-primary-200/50 group cursor-pointer hover:bg-primary-100/80 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-secondary-900">
                    Show me how to connect API
                  </div>
                  <div className="text-xs text-secondary-500">
                    Interactive step-by-step guidance
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-primary-600 font-semibold flex items-center gap-1"
                >
                  Show me
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Floating elements with enhanced design */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-glow flex items-center justify-center"
        >
          <Lightbulb className="w-7 h-7 text-white" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-4 -left-6 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center"
        >
          <CheckCircle2 className="w-6 h-6 text-white" />
        </motion.div>

        {/* Additional floating element */}
        <motion.div
          animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -right-8 w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg shadow-lg flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>

        {/* Decorative rings */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -bottom-8 -right-8 w-24 h-24 border-2 border-primary-300 rounded-full"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-12 -right-12 w-32 h-32 border border-primary-200 rounded-full"
        />
      </motion.div>
    </div>
  );
}
