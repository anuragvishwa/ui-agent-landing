"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle, Loader2, Plug, ArrowRight, Copy, ExternalLink } from "lucide-react";

const preflightSteps = [
  { id: 1, label: "API Key configured", status: "success", detail: "sk-...4f2a" },
  { id: 2, label: "OAuth scopes verified", status: "warning", detail: "Missing: channels:read" },
  { id: 3, label: "Webhook URL valid", status: "error", detail: "URL returns 404" },
  { id: 4, label: "Rate limits checked", status: "pending", detail: "Checking..." },
];

const statusIcons = {
  success: Check,
  warning: AlertTriangle,
  error: X,
  pending: Loader2,
};

const statusColors = {
  success: { icon: "text-green-500", bg: "bg-green-50", border: "border-green-200" },
  warning: { icon: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  error: { icon: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
  pending: { icon: "text-secondary-400", bg: "bg-secondary-50", border: "border-secondary-200" },
};

export function PreflightCheckMockup() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < preflightSteps.length ? prev + 1 : prev));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header with Slack logo */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#4A154B]/10 to-purple-50 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#4A154B] flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">#</span>
            </div>
            <div>
              <h3 className="font-semibold text-secondary-900">Slack Integration</h3>
              <p className="text-sm text-secondary-500">Running preflight checks...</p>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="px-5 py-3 bg-secondary-50 border-b border-secondary-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-secondary-600">Preflight Progress</span>
            <span className="font-medium text-secondary-900">
              {Math.min(activeStep, preflightSteps.length)}/{preflightSteps.length}
            </span>
          </div>
          <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(Math.min(activeStep, preflightSteps.length) / preflightSteps.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="p-5 space-y-3">
          {preflightSteps.map((step, index) => {
            const isActive = index < activeStep;
            const status = isActive ? step.status : "pending";
            const StatusIcon = statusIcons[status as keyof typeof statusIcons];
            const colors = statusColors[status as keyof typeof statusColors];

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isActive ? 1 : 0.5 }}
                className={`p-4 rounded-xl border ${colors.border} ${colors.bg} transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <StatusIcon
                      className={`w-4 h-4 ${colors.icon} ${status === "pending" ? "animate-spin" : ""}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-900">{step.label}</span>
                      {isActive && status !== "success" && status !== "pending" && (
                        <button className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                          Fix
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-secondary-500 mt-0.5">{step.detail}</p>

                    {/* Inline guidance for errors */}
                    {isActive && status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-3 bg-white rounded-lg border border-red-200"
                      >
                        <p className="text-xs text-red-700 mb-2">
                          Your webhook endpoint is not responding. Please verify the URL.
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 px-2 py-1 bg-secondary-100 rounded text-xs text-secondary-700 truncate">
                            https://api.example.com/webhooks/slack
                          </code>
                          <button className="p-1 hover:bg-secondary-100 rounded">
                            <Copy className="w-3.5 h-3.5 text-secondary-500" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {isActive && status === "warning" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-3 bg-white rounded-lg border border-amber-200"
                      >
                        <p className="text-xs text-amber-700 mb-2">
                          Add the <code className="px-1 bg-amber-100 rounded">channels:read</code> scope to your OAuth app.
                        </p>
                        <button className="text-xs text-amber-700 font-medium flex items-center gap-1 hover:underline">
                          Open Slack API Console
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-secondary-50 border-t border-secondary-200">
          <div className="flex items-center gap-3">
            <button className="flex-1 py-2.5 bg-secondary-200 text-secondary-500 text-sm font-medium rounded-xl cursor-not-allowed">
              Connect Slack
            </button>
            <button className="px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2">
              <Plug className="w-4 h-4" />
              Generate Handoff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
