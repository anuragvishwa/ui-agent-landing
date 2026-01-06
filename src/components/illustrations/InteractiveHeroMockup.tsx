"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  CheckCircle2,
  Sparkles,
  Loader2,
  Eye,
  Target,
  Layers,
  Navigation,
  CornerDownLeft,
  MessageSquare,
  FileText,
  Check,
  AlertCircle,
  Settings,
  FolderOpen,
  Plug,
  type LucideIcon,
} from "lucide-react";

// Screen type for each question
type ScreenType = "dashboard" | "reports" | "settings" | "form" | "integrations";

// Step type with navigation info
type StepType = {
  label: string;
  icon: LucideIcon;
  screen: ScreenType;
  highlightElement?: string;
  isNavigation?: boolean;
  targetScreen?: ScreenType;
};

// URL map for each screen
const urlMap: Record<ScreenType, string> = {
  dashboard: "app.yourproduct.com/dashboard",
  reports: "app.yourproduct.com/reports",
  settings: "app.yourproduct.com/settings",
  form: "app.yourproduct.com/projects/new",
  integrations: "app.yourproduct.com/integrations",
};

// Different questions with step-based navigation
const questions: Array<{
  text: string;
  steps: StepType[];
}> = [
  {
    text: "How do I export data?",
    steps: [
      {
        label: "Go to Reports section",
        icon: Navigation,
        screen: "dashboard",
        isNavigation: true,
        targetScreen: "reports",
      },
      {
        label: "Click Export CSV",
        icon: Target,
        screen: "reports",
        highlightElement: "export",
      },
      {
        label: "Select date range",
        icon: Layers,
        screen: "reports",
        highlightElement: "dateRange",
      },
    ],
  },
  {
    text: "How do I connect my API?",
    steps: [
      {
        label: "Navigate to Settings",
        icon: Navigation,
        screen: "dashboard",
        isNavigation: true,
        targetScreen: "settings",
      },
      {
        label: "Find API Key field",
        icon: Target,
        screen: "settings",
        highlightElement: "apiKey",
      },
      {
        label: "Enter your key",
        icon: Layers,
        screen: "settings",
        highlightElement: "apiKeyInput",
      },
    ],
  },
  {
    text: "Why is Save disabled?",
    steps: [
      {
        label: "Checking prerequisites",
        icon: Eye,
        screen: "form",
        highlightElement: "form",
      },
      {
        label: "Missing required field",
        icon: Target,
        screen: "form",
        highlightElement: "description",
      },
    ],
  },
  {
    text: "How do I add a webhook?",
    steps: [
      {
        label: "Open Integrations",
        icon: Navigation,
        screen: "dashboard",
        isNavigation: true,
        targetScreen: "integrations",
      },
      {
        label: "Find Webhooks panel",
        icon: Eye,
        screen: "integrations",
        highlightElement: "webhooks",
      },
      {
        label: "Add new endpoint",
        icon: Target,
        screen: "integrations",
        highlightElement: "addEndpoint",
      },
    ],
  },
];

type DemoPhase =
  | "idle"
  | "typing"
  | "options"
  | "selecting"
  | "analyzing"
  | "building"
  | "showing-steps"
  | "executing"
  | "success";

// Animation variants for steps list
const stepVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
      delay: i * 0.12
    }
  })
};

// ============ SCREEN COMPONENTS ============

// Dashboard Screen - starting point for navigation
function DashboardScreen({
  phase,
  targetScreen,
}: {
  phase: DemoPhase;
  targetScreen?: ScreenType;
}) {
  const isShowingSteps = phase === "showing-steps";

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-secondary-900">Dashboard</h3>

      {/* Navigation cards */}
      <div className="grid grid-cols-2 gap-3">
        <NavCard
          title="Reports"
          icon={FileText}
          isHighlighted={isShowingSteps && targetScreen === "reports"}
        />
        <NavCard
          title="Settings"
          icon={Settings}
          isHighlighted={isShowingSteps && targetScreen === "settings"}
        />
        <NavCard
          title="Projects"
          icon={FolderOpen}
          isHighlighted={isShowingSteps && targetScreen === "form"}
        />
        <NavCard
          title="Integrations"
          icon={Plug}
          isHighlighted={isShowingSteps && targetScreen === "integrations"}
        />
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-secondary-50/80 rounded-lg p-3 border border-secondary-100">
        <p className="text-xs font-medium text-secondary-500 mb-2">Recent Activity</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-secondary-600">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Invoice #1234 exported</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary-600">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>API key updated</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-secondary-600">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>New webhook added</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation card component for dashboard
function NavCard({
  title,
  icon: Icon,
  isHighlighted,
}: {
  title: string;
  icon: LucideIcon;
  isHighlighted: boolean;
}) {
  return (
    <div
      className={`relative p-3 rounded-lg border transition-all ${
        isHighlighted
          ? "bg-primary-50 border-primary-500 shadow-lg"
          : "bg-white border-secondary-200"
      }`}
    >
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: [1, 1.06, 1],
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -inset-1 bg-primary-500/20 rounded-lg border-2 border-primary-500"
          />
        )}
      </AnimatePresence>
      <div className="relative">
        <Icon
          className={`w-5 h-5 mb-1 ${
            isHighlighted ? "text-primary-600" : "text-secondary-400"
          }`}
        />
        <p
          className={`text-sm font-medium ${
            isHighlighted ? "text-primary-700" : "text-secondary-700"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

// Reports Screen - for export question
function ReportsScreen({ phase }: { phase: DemoPhase }) {
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  return (
    <div className="space-y-4">
      {/* Header with Export button */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-secondary-900">Reports</h3>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-secondary-600 hover:bg-secondary-50 rounded-lg">
            Filter
          </button>
          {/* Export button - highlighted during execution */}
          <div className="relative">
            <AnimatePresence>
              {isExecuting && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -inset-2 bg-primary-500/10 rounded-lg border-2 border-primary-500 border-dashed"
                  />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(20, 184, 166, 0.4)",
                        "0 0 0 8px rgba(20, 184, 166, 0)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -inset-1 rounded-lg"
                  />
                </>
              )}
            </AnimatePresence>
            <button
              className={`relative px-4 py-1.5 text-sm font-medium rounded-lg shadow-sm transition-all ${
                isSuccess
                  ? "bg-green-500 text-white"
                  : "bg-primary-500 text-white"
              }`}
            >
              {isSuccess ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Exported!
                </span>
              ) : (
                "Export CSV"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Invoice table rows */}
      <div className="space-y-2">
        {[
          { id: "#INV-1234", amount: "$1,250.00", status: "Paid", statusColor: "green" },
          { id: "#INV-1235", amount: "$890.00", status: "Pending", statusColor: "yellow" },
          { id: "#INV-1236", amount: "$2,100.00", status: "Paid", statusColor: "green" },
        ].map((invoice, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-secondary-50/80 rounded-lg border border-secondary-100"
          >
            <div className="w-4 h-4 rounded border border-secondary-300 bg-white" />
            <FileText className="w-4 h-4 text-secondary-400" />
            <span className="text-sm font-medium text-secondary-700 flex-1">{invoice.id}</span>
            <span className="text-sm text-secondary-600">{invoice.amount}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              invoice.statusColor === "green"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {invoice.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Screen - for API question
function SettingsScreen({ phase }: { phase: DemoPhase }) {
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  return (
    <div className="space-y-4">
      {/* API Key field with interactive spotlight */}
      <motion.div
        animate={isExecuting ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className="relative"
      >
        <AnimatePresence>
          {isExecuting && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -inset-3 bg-primary-500/10 rounded-xl border-2 border-primary-500 border-dashed"
              />
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(20, 184, 166, 0.4)",
                    "0 0 0 8px rgba(20, 184, 166, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -inset-1 rounded-xl"
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative">
          <label className="text-xs font-medium text-secondary-700 mb-1.5 block flex items-center gap-1">
            API Key
            <span className="text-red-500">*</span>
          </label>
          <div
            className={`h-10 rounded-lg flex items-center px-3 transition-all ${
              isExecuting || isSuccess
                ? "bg-primary-50/80 border-2 border-primary-500 shadow-inner-glow"
                : "bg-secondary-50/80 border border-secondary-200"
            }`}
          >
            <span className={`text-sm ${isExecuting || isSuccess ? "text-primary-600" : "text-secondary-400"}`}>
              {isExecuting || isSuccess ? "sk-flex-xxxx-xxxx-xxxx" : "Enter API key..."}
            </span>
            {(isExecuting || isSuccess) && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-0.5 h-4 bg-primary-500 ml-0.5"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Other form fields */}
      <div>
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block">Webhook URL</label>
        <div className="h-10 bg-secondary-50/80 border border-secondary-200 rounded-lg flex items-center px-3">
          <span className="text-sm text-secondary-400">https://</span>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block">Environment</label>
        <div className="h-10 bg-secondary-50/80 border border-secondary-200 rounded-lg flex items-center justify-between px-3">
          <span className="text-sm text-secondary-400">Select environment...</span>
          <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Save button */}
      <div className="pt-2">
        <motion.div
          animate={isSuccess ? { scale: [1, 1.05, 1] } : {}}
          className={`h-10 rounded-lg w-28 flex items-center justify-center transition-all ${
            isSuccess
              ? "bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer shadow-lg"
              : "bg-secondary-200/80 opacity-50 cursor-not-allowed"
          }`}
        >
          <span className={`text-sm ${isSuccess ? "text-white font-medium" : "text-secondary-500"}`}>
            {isSuccess ? "Saved!" : "Save Changes"}
          </span>
          {isSuccess && <CheckCircle2 className="w-4 h-4 text-white ml-1" />}
        </motion.div>
      </div>
    </div>
  );
}

// Form Screen - for disabled button question
function FormScreen({ phase }: { phase: DemoPhase }) {
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  return (
    <div className="space-y-3">
      {/* Project Name - filled */}
      <div>
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block flex items-center gap-1">
          Project Name
          <span className="text-red-500">*</span>
        </label>
        <div className="h-9 bg-green-50/50 border border-green-300 rounded-lg flex items-center px-3">
          <span className="text-sm text-secondary-700">My New Project</span>
          <Check className="w-4 h-4 text-green-500 ml-auto" />
        </div>
      </div>

      {/* Description - EMPTY (highlighted) */}
      <motion.div
        animate={isExecuting ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className="relative"
      >
        <AnimatePresence>
          {isExecuting && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -inset-2 bg-red-500/10 rounded-lg border-2 border-red-400 border-dashed"
              />
            </>
          )}
        </AnimatePresence>
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block flex items-center gap-1">
          Description
          <span className="text-red-500">*</span>
        </label>
        <div className={`h-9 rounded-lg flex items-center px-3 ${
          isSuccess
            ? "bg-green-50/50 border border-green-300"
            : "bg-red-50/50 border border-red-300"
        }`}>
          <span className={`text-sm ${isSuccess ? "text-secondary-700" : "text-red-400"}`}>
            {isSuccess ? "Project for Q1 launch" : "Required field"}
          </span>
          {isSuccess ? (
            <Check className="w-4 h-4 text-green-500 ml-auto" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 ml-auto" />
          )}
        </div>
      </motion.div>

      {/* Category - empty */}
      <div>
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block flex items-center gap-1">
          Category
          <span className="text-red-500">*</span>
        </label>
        <div className={`h-9 rounded-lg flex items-center justify-between px-3 ${
          isSuccess
            ? "bg-green-50/50 border border-green-300"
            : "bg-secondary-50/80 border border-secondary-200"
        }`}>
          <span className={`text-sm ${isSuccess ? "text-secondary-700" : "text-secondary-400"}`}>
            {isSuccess ? "Marketing" : "Select..."}
          </span>
          {isSuccess && <Check className="w-4 h-4 text-green-500" />}
        </div>
      </div>

      {/* Save button - disabled initially */}
      <div className="pt-2">
        <motion.div
          animate={isSuccess ? { scale: [1, 1.05, 1] } : {}}
          className={`h-9 rounded-lg w-full flex items-center justify-center transition-all ${
            isSuccess
              ? "bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer shadow-lg"
              : "bg-secondary-200/80 opacity-50 cursor-not-allowed"
          }`}
        >
          <span className={`text-sm ${isSuccess ? "text-white font-medium" : "text-secondary-500"}`}>
            {isSuccess ? "Project Created!" : "Create Project"}
          </span>
          {isSuccess && <CheckCircle2 className="w-4 h-4 text-white ml-1" />}
        </motion.div>
        {!isSuccess && (
          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Fill required fields to enable
          </p>
        )}
      </div>
    </div>
  );
}

// Integrations Screen - for webhook question
function IntegrationsScreen({ phase }: { phase: DemoPhase }) {
  const isExecuting = phase === "executing";
  const isSuccess = phase === "success";

  return (
    <div className="space-y-4">
      {/* Connected integrations */}
      <div>
        <p className="text-xs font-medium text-secondary-500 mb-2">Connected</p>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="w-5 h-5 bg-[#4A154B] rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">S</span>
            </div>
            <span className="text-xs text-secondary-600">Slack</span>
            <Check className="w-3 h-3 text-green-500" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="w-5 h-5 bg-[#181717] rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">G</span>
            </div>
            <span className="text-xs text-secondary-600">GitHub</span>
            <Check className="w-3 h-3 text-green-500" />
          </div>
        </div>
      </div>

      {/* Webhooks section */}
      <div>
        <p className="text-xs font-medium text-secondary-500 mb-2">Webhooks</p>

        {/* Add webhook button - highlighted */}
        <motion.div
          animate={isExecuting ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          className="relative mb-2"
        >
          <AnimatePresence>
            {isExecuting && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -inset-2 bg-primary-500/10 rounded-lg border-2 border-primary-500 border-dashed"
                />
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(20, 184, 166, 0.4)",
                      "0 0 0 8px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-1 rounded-lg"
                />
              </>
            )}
          </AnimatePresence>
          <button
            className={`relative w-full px-3 py-2 text-sm font-medium rounded-lg border-2 border-dashed transition-all ${
              isSuccess
                ? "bg-green-50 border-green-300 text-green-700"
                : "border-primary-300 text-primary-600 hover:bg-primary-50"
            }`}
          >
            {isSuccess ? (
              <span className="flex items-center justify-center gap-1">
                <Check className="w-4 h-4" />
                Webhook Added!
              </span>
            ) : (
              "+ Add Endpoint"
            )}
          </button>
        </motion.div>

        {/* Existing webhook */}
        <div className="flex items-center gap-3 p-2.5 bg-secondary-50/80 rounded-lg border border-secondary-100">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-mono text-secondary-600 flex-1">POST /api/events</span>
          <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Active</span>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============

export function InteractiveHeroMockup() {
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("dashboard");
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const hasStartedRef = useRef(false);

  const currentQuestion = questions[questionIndex];
  const currentStep = currentQuestion.steps[activeStepIndex];
  const currentUrl = urlMap[currentScreen];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main animation orchestrator
  const runDemoLoop = useCallback(() => {
    const question = questions[questionIndex];

    // Reset to initial state - determine starting screen from first step
    const firstStep = question.steps[0];
    const startingScreen = firstStep.screen;
    setCurrentScreen(startingScreen);
    setActiveStepIndex(0);

    // Phase 1: Typing
    setPhase("typing");
    setDisplayText("");

    const typeCharacter = (index: number) => {
      if (index <= question.text.length) {
        setDisplayText(question.text.slice(0, index));
        setTimeout(() => typeCharacter(index + 1), 80);
      } else {
        setTimeout(() => {
          setPhase("options");

          setTimeout(() => {
            setPhase("selecting");

            setTimeout(() => {
              setPhase("analyzing");

              setTimeout(() => {
                setPhase("building");

                setTimeout(() => {
                  setPhase("showing-steps");
                  setVisibleSteps(0);

                  const showSteps = (stepIndex: number) => {
                    if (stepIndex <= question.steps.length) {
                      setVisibleSteps(stepIndex);
                      setActiveStepIndex(stepIndex - 1);

                      // Get current step and update screen
                      const step = question.steps[stepIndex - 1];
                      if (step) {
                        if (step.isNavigation && step.targetScreen) {
                          // Show source screen first (dashboard)
                          setCurrentScreen(step.screen);

                          // After brief highlight, navigate to target
                          setTimeout(() => {
                            setCurrentScreen(step.targetScreen!);
                          }, 800);
                        } else {
                          setCurrentScreen(step.screen);
                        }
                      }

                      if (stepIndex < question.steps.length) {
                        // Longer delay for navigation steps
                        const delay = step?.isNavigation ? 1500 : 800;
                        setTimeout(() => showSteps(stepIndex + 1), delay);
                      } else {
                        setTimeout(() => {
                          setPhase("executing");

                          setTimeout(() => {
                            setPhase("success");

                            setTimeout(() => {
                              setPhase("idle");
                              setQuestionIndex((prev) => (prev + 1) % questions.length);
                              setVisibleSteps(0);
                              setDisplayText("");
                              setCurrentScreen("dashboard");
                              setActiveStepIndex(0);
                            }, 2500);
                          }, 3000);
                        }, 1000);
                      }
                    }
                  };
                  showSteps(1);
                }, 1000);
              }, 2500);
            }, 1000);
          }, 3000);
        }, 500);
      }
    };

    typeCharacter(1);
  }, [questionIndex]);

  // Start demo loop (after first cycle completes)
  useEffect(() => {
    if (phase === "idle" && hasStartedRef.current) {
      const startDelay = setTimeout(() => {
        runDemoLoop();
      }, 800);
      return () => clearTimeout(startDelay);
    }
  }, [phase, runDemoLoop]);

  // Initial start (only once on mount)
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const initialDelay = setTimeout(() => {
      runDemoLoop();
    }, 1000);
    return () => clearTimeout(initialDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto px-2 sm:px-0">
      {/* Main mockup container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* App window frame */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-glass-lg border border-white/50 overflow-hidden">
          {/* Window header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary-50/80 border-b border-secondary-200/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1.5 bg-white/80 backdrop-blur rounded-lg text-xs text-secondary-500 border border-secondary-200/50 flex items-center gap-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {currentUrl}
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="p-4 sm:p-6 bg-gradient-to-b from-white/50 to-secondary-50/30 min-h-[280px] sm:min-h-[320px]">
            {/* Dynamic screen content based on current screen state */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
              >
                {currentScreen === "dashboard" && (
                  <DashboardScreen
                    phase={phase}
                    targetScreen={currentStep?.targetScreen}
                  />
                )}
                {currentScreen === "reports" && <ReportsScreen phase={phase} />}
                {currentScreen === "settings" && <SettingsScreen phase={phase} />}
                {currentScreen === "form" && <FormScreen phase={phase} />}
                {currentScreen === "integrations" && <IntegrationsScreen phase={phase} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scanning overlay for analyzing phase */}
        <AnimatePresence>
          {phase === "analyzing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden"
            >
              <motion.div
                animate={{ y: [0, 320, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                style={{ top: 60 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                className="absolute inset-0 bg-purple-500"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Building phase overlay - Generating guidance */}
        <AnimatePresence>
          {phase === "building" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-6 left-6 right-6 z-30"
            >
              <div className="bg-secondary-900/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-secondary-700">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full"
                  />
                  <span className="text-white text-sm font-medium">Generating guidance</span>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-primary-400 text-sm"
                  >
                    •••
                  </motion.span>
                </div>
                {/* Progress bar with anticipation curve */}
                <div className="mt-3 h-1 bg-secondary-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 1.2,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success sparkles - positioned based on current screen's action area */}
        <AnimatePresence>
          {phase === "success" && (
            <>
              {[...Array(8)].map((_, i) => {
                // Position sparkles based on where the action happened on each screen
                const getSparkleOrigin = () => {
                  switch (currentScreen) {
                    case "reports":
                      // Export button is top-right
                      return { x: 340, y: 90 };
                    case "settings":
                      // API key field is center-top
                      return { x: 200, y: 120 };
                    case "form":
                      // Save button is bottom-center
                      return { x: 200, y: 280 };
                    case "integrations":
                      // Add webhook button is center
                      return { x: 200, y: 200 };
                    default:
                      return { x: 200, y: 150 };
                  }
                };
                const origin = getSparkleOrigin();
                // Spread sparkles in a burst pattern from the origin
                const angle = (i / 8) * Math.PI * 2;
                const distance = 40 + Math.random() * 60;

                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      x: [0, Math.cos(angle) * distance],
                      y: [0, Math.sin(angle) * distance],
                    }}
                    transition={{
                      delay: i * 0.07,
                      duration: 0.8,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    className="absolute z-50 pointer-events-none"
                    style={{ left: origin.x, top: origin.y }}
                  >
                    <Sparkles className={`${i % 2 === 0 ? "w-4 h-4" : "w-3 h-3"} text-yellow-400`} />
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Command bar overlay */}
        <AnimatePresence>
          {["typing", "options", "selecting", "analyzing", "building"].includes(phase) && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5
              }}
              className="absolute top-12 sm:top-14 left-2 right-2 sm:left-4 sm:right-4 z-10"
            >
              <div className="glass-card-strong rounded-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-secondary-100/50 bg-white/50">
                  <Search className="w-4 h-4 text-secondary-400" />
                  <div className="flex-1 flex items-center">
                    <span className="text-sm text-secondary-900">{displayText}</span>
                    {phase === "typing" && (
                      <motion.span
                        animate={{ opacity: showCursor ? 1 : 0 }}
                        className="w-0.5 h-4 bg-secondary-400 ml-0.5"
                      />
                    )}
                  </div>
                  <kbd className="px-2 py-1 text-[10px] bg-secondary-100/80 rounded-md text-secondary-500 font-medium border border-secondary-200/50 flex items-center gap-1">
                    <CornerDownLeft className="w-2.5 h-2.5" />
                  </kbd>
                </div>

                {/* Options UI - Framer Motion with spring physics */}
                <AnimatePresence>
                  {phase === "options" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-2 bg-white/30 space-y-2"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          delay: 0.05
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 bg-primary-50/80 rounded-lg border border-primary-200/50 cursor-pointer hover:bg-primary-100/80"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-secondary-900">Show me how</div>
                          <div className="text-xs text-secondary-500">Interactive step-by-step guidance</div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-xs text-primary-600 font-semibold flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          delay: 0.12
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 bg-secondary-50/50 rounded-lg border border-secondary-200/30"
                      >
                        <div className="w-9 h-9 rounded-lg bg-secondary-200 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-secondary-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-secondary-700">Just tell me</div>
                          <div className="text-xs text-secondary-500">Text answer only</div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Selecting animation - spring with scale pulse */}
                <AnimatePresence>
                  {phase === "selecting" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-2 bg-white/30"
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{
                          scale: [1, 0.98, 1.01, 1],
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 border-primary-500 bg-primary-50"
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-primary-700">Show me how</div>
                          <div className="text-xs text-primary-500">Starting interactive guidance...</div>
                        </div>
                        <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI action hint during typing */}
                {phase === "typing" && displayText.length > 5 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-2 bg-white/30">
                    <div className="flex items-center gap-3 px-3 py-2.5 bg-primary-50/80 rounded-lg border border-primary-200/50">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-secondary-900">Show me how</div>
                        <div className="text-xs text-secondary-500">AI will guide you step-by-step</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating steps bubble - smooth spring entrance */}
      <div className="mt-3 sm:mt-4 min-h-[140px] sm:min-h-[180px]">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{
            opacity: ["showing-steps", "executing", "success"].includes(phase) ? 1 : 0,
            y: ["showing-steps", "executing", "success"].includes(phase) ? 0 : 20,
            scale: ["showing-steps", "executing", "success"].includes(phase) ? 1 : 0.97
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8
          }}
          className={!["showing-steps", "executing", "success"].includes(phase) ? "pointer-events-none" : ""}
        >
          <div className="glass-card-strong rounded-xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center gap-2 mb-3 text-xs text-secondary-500">
              <Sparkles className="w-3 h-3 text-primary-500" />
              <span>Generated {currentQuestion.steps.length}-step guidance</span>
            </div>
            <div className="space-y-2">
              {currentQuestion.steps.map((step, i) => {
                const StepIcon = step.icon;
                const isVisible = i < visibleSteps || phase === "executing" || phase === "success";
                const isCompleted = phase === "success" || (phase === "executing" && i < currentQuestion.steps.length - 1);
                const isActive = phase === "executing" && i === currentQuestion.steps.length - 1;

                return (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={stepVariants}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-primary-50/80 border border-primary-200"
                        : isCompleted
                        ? "bg-green-50/50"
                        : "bg-secondary-50/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-primary-500 text-white"
                          : "bg-secondary-200 text-secondary-600"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <StepIcon
                      className={`w-4 h-4 ${
                        isCompleted ? "text-green-500" : isActive ? "text-primary-500" : "text-secondary-400"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isCompleted
                          ? "text-green-700 line-through"
                          : isActive
                          ? "text-primary-700 font-medium"
                          : "text-secondary-600"
                      }`}
                    >
                      {step.label}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? [1, 1.3, 1] : 0.5
                      }}
                      transition={{
                        opacity: { duration: 0.2 },
                        scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="ml-auto"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-500" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
