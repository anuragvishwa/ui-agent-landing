"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2,
  ArrowDown,
  Check,
  Scan,
  Target,
  Sparkles,
  Eye,
} from "lucide-react";

interface ShowMeGuidanceMockupProps {
  activeStep?: number; // 0-4, optional for backwards compatibility
}

export function ShowMeGuidanceMockup({ activeStep = 2 }: ShowMeGuidanceMockupProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Browser chrome */}
      <div className="bg-secondary-100 rounded-t-xl px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white rounded-md px-3 py-1.5 text-xs text-secondary-500 text-center">
            app.flexdash.io/invoices
          </div>
        </div>
      </div>

      {/* Browser content */}
      <div className="bg-white border-x border-b border-secondary-200 rounded-b-xl p-6 min-h-[280px] relative overflow-hidden">
        {/* Header - always visible */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">Invoices</h3>
          <div className="flex items-center gap-2">
            {/* Filter button - highlighted in step 1 */}
            <div className="relative">
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, repeat: 2 }}
                    className="absolute -inset-1 border-2 border-dashed border-secondary-400 rounded-lg"
                  />
                )}
              </AnimatePresence>
              <button className="px-3 py-1.5 text-sm text-secondary-600 hover:bg-secondary-50 rounded-lg">
                Filter
              </button>
            </div>

            {/* Export button - main target */}
            <div className="relative">
              {/* Step 1: Dashed outline finding animation */}
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -inset-2 border-2 border-primary-500 rounded-xl"
                  />
                )}
              </AnimatePresence>

              {/* Step 2 & 3: Animated spotlight ring */}
              <AnimatePresence>
                {(activeStep === 2 || activeStep === 3) && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-3 bg-primary-500/20 rounded-xl blur-sm"
                    />
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{
                        scale: [1, 1.08, 1],
                        opacity: 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -inset-2 border-2 border-primary-500 rounded-xl"
                    />
                  </>
                )}
              </AnimatePresence>

              {/* Step 4: Success state */}
              <AnimatePresence>
                {activeStep === 4 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -inset-2 bg-green-500/20 rounded-xl border-2 border-green-500"
                  />
                )}
              </AnimatePresence>

              <button
                className={`relative px-4 py-2 text-sm font-medium rounded-lg shadow-lg transition-colors ${
                  activeStep === 4
                    ? "bg-green-500 text-white shadow-green-500/30"
                    : "bg-primary-600 text-white shadow-primary-500/30"
                }`}
              >
                {activeStep === 4 ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Exported!
                  </span>
                ) : (
                  "Export CSV"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Table rows placeholder */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 bg-secondary-50 rounded-lg relative"
            >
              {/* Step 0: Flash highlight on rows during scan */}
              <AnimatePresence>
                {activeStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ delay: i * 0.3, duration: 0.8 }}
                    className="absolute inset-0 bg-blue-500/10 rounded-lg"
                  />
                )}
              </AnimatePresence>
              <div className="w-8 h-8 bg-secondary-200 rounded" />
              <div className="flex-1">
                <div className="h-3 bg-secondary-200 rounded w-32 mb-2" />
                <div className="h-2 bg-secondary-100 rounded w-24" />
              </div>
              <div className="h-3 bg-secondary-200 rounded w-16" />
            </div>
          ))}
        </div>

        {/* ========== STEP 0: Scanning Animation ========== */}
        <AnimatePresence>
          {activeStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
              {/* Scanning line */}
              <motion.div
                animate={{ y: [0, 260, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                style={{ top: 20 }}
              />

              {/* Scan overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                className="absolute inset-0 bg-blue-500"
              />

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-full"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Scan className="w-3 h-3" />
                </motion.div>
                Analyzing page structure...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== STEP 1: Finding Elements ========== */}
        <AnimatePresence>
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white text-xs font-medium rounded-full"
              >
                <Target className="w-3 h-3" />
                Found: Export CSV button
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== STEP 2: Rendering Overlays (Tooltip) ========== */}
        <AnimatePresence>
          {activeStep === 2 && (
            <>
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ delay: 0.3 }}
                className="absolute top-[85px] right-4 z-20"
              >
                <div className="bg-secondary-900 text-white rounded-xl px-4 py-3 shadow-xl max-w-[200px] relative">
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-secondary-900 rotate-45" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <span className="text-xs text-secondary-400">
                        Step 1 of 2
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">Click Export CSV</p>
                    <p className="text-xs text-secondary-400">
                      This will download all invoices as a spreadsheet
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Cursor pointer animation */}
              <motion.div
                initial={{ x: 100, y: 100, opacity: 0 }}
                animate={{
                  x: [100, 30, 30],
                  y: [100, 20, 20],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.6, 1],
                  ease: "easeInOut",
                }}
                className="absolute top-[55px] right-[50px] z-30"
              >
                <MousePointer2 className="w-6 h-6 text-secondary-900 drop-shadow-lg fill-white" />
              </motion.div>

              {/* Click here indicator */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-[115px] right-[85px] flex items-center gap-1 text-primary-600 z-20"
              >
                <ArrowDown className="w-4 h-4" />
                <span className="text-xs font-medium">Click here</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ========== STEP 3: Multi-Step Guidance ========== */}
        <AnimatePresence>
          {activeStep === 3 && (
            <>
              {/* Multi-step tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-[85px] right-4 z-20"
              >
                <div className="bg-secondary-900 text-white rounded-xl px-4 py-3 shadow-xl max-w-[220px] relative">
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-secondary-900 rotate-45" />
                  <div className="relative">
                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 h-1.5 bg-secondary-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "50%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-primary-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-secondary-400">2/2</span>
                    </div>

                    {/* Step 1 - Completed */}
                    <div className="flex items-center gap-2 mb-2 opacity-60">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs line-through">
                        Click Export CSV
                      </span>
                    </div>

                    {/* Step 2 - Current */}
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"
                      >
                        <span className="text-xs font-bold">2</span>
                      </motion.div>
                      <span className="text-xs font-medium">
                        Select date range
                      </span>
                    </div>

                    <p className="text-xs text-secondary-400 ml-7">
                      Choose the invoices you want to export
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Cursor on button */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-[55px] right-[50px] z-30"
              >
                <MousePointer2 className="w-6 h-6 text-secondary-900 drop-shadow-lg fill-white" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ========== STEP 4: Success Verification ========== */}
        <AnimatePresence>
          {activeStep === 4 && (
            <>
              {/* Success checkmark overlay on button area */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-[42px] right-[45px] z-30"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>

              {/* Success toast notification */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white text-sm font-medium rounded-full shadow-lg shadow-green-500/30">
                  <Sparkles className="w-4 h-4" />
                  Export complete! File downloaded.
                </div>
              </motion.div>

              {/* Sparkle effects */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 60],
                    y: [0, (Math.random() - 0.5) * 60],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="absolute top-[50px] right-[70px] z-20"
                >
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
