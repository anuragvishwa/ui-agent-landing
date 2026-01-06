"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Bot,
  Sparkles,
  Eye,
  Target,
  Clock,
  CheckCircle2,
  HelpCircle,
  Loader2,
  MousePointer,
  FileText,
  Settings,
  AlertCircle,
  Check,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

// Dual-track animation phases for parallel animations
type ChatbotPhase = "idle" | "typing" | "text" | "scrolling" | "confused";
type FlexdashPhase = "idle" | "analyzing" | "spotlight" | "success";
type QuestionPhase = "idle" | "typing" | "done";

// Questions to cycle through
const questions = [
  "How do I export my data?",
  "Where is the settings page?",
  "Why is Save disabled?",
];

// Chatbot response text (long and confusing)
const chatbotResponses = [
  `To export your data, you'll need to follow these steps:

1. First, navigate to the Reports section by clicking on the sidebar menu. Look for the icon that looks like a bar chart.

2. Once you're in Reports, you'll see several tabs at the top. Click on "Data Export" - it might be hidden under "More Options" depending on your screen size.

3. In the Data Export panel, select the date range you want. Make sure you have the correct permissions enabled in your account settings first.

4. Choose your export format (CSV, JSON, or Excel). Note that some formats require a premium subscription.

5. Finally, click the Export button and wait for the download to complete. This may take several minutes depending on data size...`,

  `To access your settings, here's what you need to do:

1. Look at the top-right corner of your screen for your profile avatar. Click on it to reveal a dropdown menu.

2. In the dropdown, you should see "Settings" - but note that on mobile devices, this might be in a different location.

3. If you don't see Settings there, try the gear icon in the sidebar. Some users have reported it being moved after the recent update.

4. Once in Settings, there are multiple tabs: General, Security, Notifications, Integrations, and Advanced. Make sure you're in the right section for what you need...`,

  `The Save button might be disabled for several reasons:

1. Check if all required fields are filled out. Required fields are usually marked with an asterisk (*) but not always visible.

2. Scroll through the entire form - there might be validation errors at the bottom that you haven't seen yet.

3. Make sure you have the correct permissions. Contact your admin if you're unsure about your role.

4. Sometimes the Save button is disabled until you make at least one change. Try modifying a field and changing it back.

5. Clear your browser cache and refresh the page. Some users have reported this fixes the issue...`,
];

// Differentiator cards data
const differentiators = [
  {
    icon: Eye,
    title: "See it, don't read it",
    description: "Visual highlights on actual UI elements beat walls of text",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: HelpCircle,
    title: "Any question, any context",
    description: "Not limited to predefined flows - works for anything users ask",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Starts where you're stuck",
    description: "Detects your current screen and state - no 'start from step 1'",
    gradient: "from-amber-500 to-orange-500",
  },
];

// Screen configurations for each question - different UI for Flexdash side
type ScreenType = "reports" | "dashboard" | "form";

const screenConfigs: Array<{
  screenType: ScreenType;
  highlightTarget: string;
  successLabel: string;
}> = [
  {
    // Q1: "How do I export my data?"
    screenType: "reports",
    highlightTarget: "export-button",
    successLabel: "Exported!",
  },
  {
    // Q2: "Where is the settings page?"
    screenType: "dashboard",
    highlightTarget: "settings-nav",
    successLabel: "Found it!",
  },
  {
    // Q3: "Why is Save disabled?"
    screenType: "form",
    highlightTarget: "required-field",
    successLabel: "Fixed!",
  },
];

// ============ CHATBOT SIDE COMPONENT ============
function ChatbotSide({
  chatbotPhase,
  questionIndex
}: {
  chatbotPhase: ChatbotPhase;
  questionIndex: number;
}) {
  const showTyping = chatbotPhase === "typing";
  const showText = ["text", "scrolling", "confused"].includes(chatbotPhase);
  const isScrolling = chatbotPhase === "scrolling";
  const isConfused = chatbotPhase === "confused";

  return (
    <div className="relative">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-secondary-200 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-secondary-500" />
        </div>
        <span className="text-sm font-medium text-secondary-600">Traditional Chatbot</span>
      </div>

      {/* Chat window */}
      <div className="bg-white rounded-xl border border-secondary-200 shadow-soft overflow-hidden">
        {/* Chat header */}
        <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-secondary-500">Support Assistant</span>
        </div>

        {/* Chat content */}
        <div className="h-[280px] overflow-hidden relative">
          <motion.div
            animate={isScrolling ? { y: -120 } : { y: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="p-4"
          >
            {/* Bot response */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-secondary-500" />
              </div>
              <div className="flex-1">
                {/* Typing indicator */}
                <AnimatePresence>
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 px-3 py-2 bg-secondary-100 rounded-lg w-16"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-secondary-400"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actual response */}
                <AnimatePresence>
                  {showText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-secondary-100 rounded-lg p-3">
                        <p className="text-xs text-secondary-700 whitespace-pre-line leading-relaxed">
                          {chatbotResponses[questionIndex]}
                        </p>
                      </div>

                      {/* Reading time indicator */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-1.5 mt-2 text-xs text-secondary-400"
                      >
                        <Clock className="w-3 h-3" />
                        <span>~3 min read</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <AnimatePresence>
            {showText && !isScrolling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-secondary-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confused user indicator - fixed height container to prevent layout shift */}
      <div className="h-10 mt-3">
        <AnimatePresence>
          {isConfused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
                {/* Floating question marks */}
                <div className="relative">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], y: [-5, -15] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute text-amber-500 text-xs"
                      style={{ left: i * 8 - 8 }}
                    >
                      ?
                    </motion.span>
                  ))}
                </div>
                <span className="text-xs text-amber-700 font-medium ml-4">Still reading...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============ FLEXDASH SIDE COMPONENT ============
function FlexdashSide({
  flexdashPhase,
  questionIndex
}: {
  flexdashPhase: FlexdashPhase;
  questionIndex: number;
}) {
  const isAnalyzing = flexdashPhase === "analyzing";
  const showSpotlight = ["spotlight", "success"].includes(flexdashPhase);
  const isSuccess = flexdashPhase === "success";

  const config = screenConfigs[questionIndex];

  return (
    <div className="relative">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary-600" />
        </div>
        <span className="text-sm font-medium text-primary-700">Flexdash</span>
      </div>

      {/* App mockup */}
      <div className="bg-white rounded-xl border border-secondary-200 shadow-soft overflow-hidden">
        {/* Window header */}
        <div className="px-4 py-3 bg-secondary-50 border-b border-secondary-100 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 bg-white rounded text-xs text-secondary-400 border border-secondary-200">
              app.yourproduct.com
            </div>
          </div>
        </div>

        {/* App content - different screens based on question */}
        <div className="h-[280px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 p-4"
            >
              {config.screenType === "reports" && (
                <ReportsScreen showSpotlight={showSpotlight} isSuccess={isSuccess} />
              )}
              {config.screenType === "dashboard" && (
                <DashboardScreen showSpotlight={showSpotlight} isSuccess={isSuccess} />
              )}
              {config.screenType === "form" && (
                <FormScreen showSpotlight={showSpotlight} isSuccess={isSuccess} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Analyzing overlay */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-200">
                  <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                  <span className="text-sm text-primary-700 font-medium">Analyzing screen...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success indicator - fixed height container to prevent layout shift */}
      <div className="h-10 mt-3">
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">Done in 3 seconds</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success sparkles */}
      <AnimatePresence>
        {isSuccess && (
          <>
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const distance = 30 + Math.random() * 40;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, Math.cos(angle) * distance],
                    y: [0, Math.sin(angle) * distance],
                  }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="absolute z-50 pointer-events-none"
                  style={{ left: "50%", top: "50%" }}
                >
                  <Sparkles className={`${i % 2 === 0 ? "w-4 h-4" : "w-3 h-3"} text-yellow-400`} />
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ SCREEN COMPONENTS FOR FLEXDASH ============

// Reports Screen - for "How do I export my data?"
function ReportsScreen({ showSpotlight, isSuccess }: { showSpotlight: boolean; isSuccess: boolean }) {
  return (
    <div className="space-y-3">
      {/* Header with Export button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-secondary-900">Reports</h3>
        <div className="relative">
          <AnimatePresence>
            {showSpotlight && (
              <>
                {/* Spotlight ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -inset-2 rounded-lg border-2 border-primary-500 border-dashed"
                />
                {/* Pulse effect */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(20, 184, 166, 0.4)",
                      "0 0 0 12px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-1 rounded-lg"
                />
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                >
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary-600 text-white text-xs rounded shadow-lg">
                    <MousePointer className="w-3 h-3" />
                    Click here
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <button className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            isSuccess ? "bg-green-500 text-white" : "bg-primary-500 text-white"
          }`}>
            {isSuccess ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                Exported!
              </span>
            ) : "Export CSV"}
          </button>
        </div>
      </div>

      {/* Table rows */}
      <div className="space-y-2">
        {[
          { id: "#INV-1234", amount: "$1,250", status: "Paid" },
          { id: "#INV-1235", amount: "$890", status: "Pending" },
          { id: "#INV-1236", amount: "$2,100", status: "Paid" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 bg-secondary-50 rounded-lg border border-secondary-100">
            <div className="w-4 h-4 rounded border border-secondary-300" />
            <FileText className="w-3.5 h-3.5 text-secondary-400" />
            <span className="text-xs font-medium text-secondary-700 flex-1">{row.id}</span>
            <span className="text-xs text-secondary-500">{row.amount}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              row.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard Screen - for "Where is the settings page?"
function DashboardScreen({ showSpotlight, isSuccess }: { showSpotlight: boolean; isSuccess: boolean }) {
  return (
    <div className="flex gap-4 h-full">
      {/* Sidebar */}
      <div className="w-12 space-y-2 flex-shrink-0">
        <div className="w-full h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-secondary-400" />
        </div>
        {/* Settings button - highlighted */}
        <div className="relative">
          <AnimatePresence>
            {showSpotlight && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -inset-1.5 rounded-lg border-2 border-primary-500 border-dashed"
                />
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(20, 184, 166, 0.4)",
                      "0 0 0 10px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-0.5 rounded-lg"
                />
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap z-20"
                >
                  <div className="flex items-center gap-1 px-2 py-1 bg-primary-600 text-white text-xs rounded shadow-lg">
                    <MousePointer className="w-3 h-3" />
                    Settings
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className={`w-full h-10 rounded-lg flex items-center justify-center transition-all ${
            showSpotlight ? "bg-primary-100 border-2 border-primary-500" : isSuccess ? "bg-green-100" : "bg-secondary-100"
          }`}>
            <Settings className={`w-4 h-4 ${
              showSpotlight ? "text-primary-600" : isSuccess ? "text-green-600" : "text-secondary-400"
            }`} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-3">
        <h3 className="text-sm font-semibold text-secondary-900">Dashboard</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
            <p className="text-[10px] text-secondary-500 mb-1">Total Revenue</p>
            <p className="text-sm font-semibold text-secondary-900">$24,500</p>
          </div>
          <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
            <p className="text-[10px] text-secondary-500 mb-1">Active Users</p>
            <p className="text-sm font-semibold text-secondary-900">1,234</p>
          </div>
        </div>
        <div className="p-3 bg-secondary-50 rounded-lg border border-secondary-100">
          <p className="text-[10px] text-secondary-500 mb-2">Recent Activity</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-secondary-600">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>New user signed up</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-secondary-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Report generated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Screen - for "Why is Save disabled?"
function FormScreen({ showSpotlight, isSuccess }: { showSpotlight: boolean; isSuccess: boolean }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-secondary-900">Create Project</h3>

      {/* Project Name - filled */}
      <div>
        <label className="text-[10px] font-medium text-secondary-600 mb-1 block flex items-center gap-1">
          Project Name <span className="text-red-500">*</span>
        </label>
        <div className="h-8 bg-green-50/50 border border-green-300 rounded-lg flex items-center px-2.5">
          <span className="text-xs text-secondary-700">My New Project</span>
          <Check className="w-3.5 h-3.5 text-green-500 ml-auto" />
        </div>
      </div>

      {/* Description - EMPTY (highlighted) */}
      <div className="relative">
        <AnimatePresence>
          {showSpotlight && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -inset-2 bg-red-500/10 rounded-lg border-2 border-red-400 border-dashed z-10"
              />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-6 left-0 z-20"
              >
                <div className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-[10px] rounded shadow-lg">
                  <AlertCircle className="w-3 h-3" />
                  Fill this field
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <label className="text-[10px] font-medium text-secondary-600 mb-1 block flex items-center gap-1">
          Description <span className="text-red-500">*</span>
        </label>
        <div className={`h-8 rounded-lg flex items-center px-2.5 transition-all ${
          isSuccess
            ? "bg-green-50/50 border border-green-300"
            : "bg-red-50/50 border border-red-300"
        }`}>
          <span className={`text-xs ${isSuccess ? "text-secondary-700" : "text-red-400"}`}>
            {isSuccess ? "Project for Q1 launch" : "Required field"}
          </span>
          {isSuccess ? (
            <Check className="w-3.5 h-3.5 text-green-500 ml-auto" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 text-red-400 ml-auto" />
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-[10px] font-medium text-secondary-600 mb-1 block">Category</label>
        <div className={`h-8 rounded-lg flex items-center justify-between px-2.5 ${
          isSuccess ? "bg-green-50/50 border border-green-300" : "bg-secondary-50 border border-secondary-200"
        }`}>
          <span className={`text-xs ${isSuccess ? "text-secondary-700" : "text-secondary-400"}`}>
            {isSuccess ? "Marketing" : "Select..."}
          </span>
          {isSuccess && <Check className="w-3.5 h-3.5 text-green-500" />}
        </div>
      </div>

      {/* Save button */}
      <motion.div
        animate={isSuccess ? { scale: [1, 1.03, 1] } : {}}
        className={`h-8 rounded-lg w-full flex items-center justify-center transition-all ${
          isSuccess
            ? "bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer shadow-md"
            : "bg-secondary-200 opacity-50 cursor-not-allowed"
        }`}
      >
        <span className={`text-xs ${isSuccess ? "text-white font-medium" : "text-secondary-500"}`}>
          {isSuccess ? "Create Project" : "Create Project"}
        </span>
        {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-white ml-1" />}
      </motion.div>
      {!isSuccess && (
        <p className="text-[10px] text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Fill required fields to enable
        </p>
      )}
    </div>
  );
}

// ============ MAIN COMPONENT ============
export function DifferentiatorsSection() {
  // Dual-track state machine for parallel animations
  const [questionPhase, setQuestionPhase] = useState<QuestionPhase>("idle");
  const [chatbotPhase, setChatbotPhase] = useState<ChatbotPhase>("idle");
  const [flexdashPhase, setFlexdashPhase] = useState<FlexdashPhase>("idle");
  const [showComparison, setShowComparison] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState("");
  const hasStartedRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Helper to manage timeouts and prevent memory leaks
  const scheduleTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Clear all scheduled timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Main animation orchestrator with PARALLEL tracks
  const runDemoLoop = useCallback(() => {
    const question = questions[questionIndex];

    // Clear any pending timeouts from previous cycle
    clearAllTimeouts();

    // Reset all states
    setChatbotPhase("idle");
    setFlexdashPhase("idle");
    setShowComparison(false);
    setDisplayQuestion("");
    setQuestionPhase("typing");

    // Phase 1: Type the question character by character
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayQuestion(question.slice(0, charIndex));
      if (charIndex >= question.length) {
        clearInterval(typeInterval);
        setQuestionPhase("done");

        // After typing complete, start BOTH animation tracks in parallel
        scheduleTimeout(() => {
          // ========== CHATBOT TRACK ==========
          // Chatbot starts with typing indicator
          setChatbotPhase("typing");

          // Chatbot shows text after 1s
          scheduleTimeout(() => setChatbotPhase("text"), 1000);

          // Chatbot starts scrolling after 2.5s
          scheduleTimeout(() => setChatbotPhase("scrolling"), 2500);

          // Chatbot shows confused state after 4s
          scheduleTimeout(() => setChatbotPhase("confused"), 4000);

          // ========== FLEXDASH TRACK (slightly delayed to show contrast) ==========
          // Flexdash starts analyzing after 0.5s
          scheduleTimeout(() => setFlexdashPhase("analyzing"), 500);

          // Flexdash shows spotlight after 1.5s
          scheduleTimeout(() => setFlexdashPhase("spotlight"), 1500);

          // Flexdash shows success after 3s
          scheduleTimeout(() => setFlexdashPhase("success"), 3000);

          // ========== COMPARISON & RESET ==========
          // Show comparison badge after 4.5s
          scheduleTimeout(() => setShowComparison(true), 4500);

          // Reset and advance to next question after 7s
          scheduleTimeout(() => {
            setChatbotPhase("idle");
            setFlexdashPhase("idle");
            setShowComparison(false);
            setQuestionPhase("idle");
            setQuestionIndex((prev) => (prev + 1) % questions.length);
          }, 7000);
        }, 500);
      }
    }, 60);

    // Store interval ID for cleanup
    timeoutsRef.current.push(typeInterval as unknown as NodeJS.Timeout);
  }, [questionIndex, scheduleTimeout, clearAllTimeouts]);

  // Restart loop when idle (after first cycle)
  useEffect(() => {
    if (questionPhase === "idle" && hasStartedRef.current) {
      const timer = setTimeout(() => {
        runDemoLoop();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [questionPhase, runDemoLoop]);

  // Initial start (only once on mount)
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const timer = setTimeout(() => {
      runDemoLoop();
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  return (
    <section className="pt-8 pb-20 lg:pb-28 bg-gradient-to-b from-white to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-300 rounded-full blur-3xl"
        />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          badge="Why Flexdash?"
          title="See the difference instantly"
          description="While chatbots make users read, Flexdash shows them exactly where to click."
        />

        {/* Shared question display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="bg-white rounded-xl border border-secondary-200 shadow-soft p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-secondary-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-secondary-500 mb-0.5">User asks:</p>
                <p className="text-sm font-medium text-secondary-900 min-h-[20px]">
                  {displayQuestion}
                  {questionPhase === "typing" && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-secondary-400 ml-0.5"
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Side-by-side comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        >
          {/* Chatbot side */}
          <ChatbotSide chatbotPhase={chatbotPhase} questionIndex={questionIndex} />

          {/* Flexdash side */}
          <FlexdashSide flexdashPhase={flexdashPhase} questionIndex={questionIndex} />
        </motion.div>

        {/* Comparison result - fixed height container to prevent layout shift */}
        <div className="h-16 mb-12 flex items-center justify-center">
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-4 px-6 py-3 bg-primary-50 rounded-full border border-primary-200">
                  <span className="text-secondary-500 line-through">Minutes of reading</span>
                  <span className="text-secondary-300">vs</span>
                  <span className="text-primary-700 font-semibold">3 seconds to done</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Three differentiator cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-secondary-100 h-full hover:shadow-elevated hover:border-primary-200 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
