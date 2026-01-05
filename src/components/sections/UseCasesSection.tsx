"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileOutput,
  Ban,
  Plug,
  Search,
  HelpCircle,
  Webhook,
  Check,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { PreflightCheckMockup } from "@/components/mockups";

// ============ SCREEN COMPONENTS ============

function UseCaseReportsScreen() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden relative">
      {/* Browser header */}
      <div className="bg-secondary-100 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-secondary-500">app.yourproduct.com/reports</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary-900">Reports</h3>
          <div className="relative">
            {/* Spotlight animation */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 bg-primary-500/20 rounded-lg"
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1.5 border-2 border-primary-500 rounded-lg"
            />
            <button className="relative px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg flex items-center gap-1.5">
              <FileOutput className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>
        {/* Invoice rows */}
        <div className="space-y-2">
          {[
            { id: "#INV-1234", amount: "$1,250.00", status: "Paid" },
            { id: "#INV-1235", amount: "$890.00", status: "Pending" },
            { id: "#INV-1236", amount: "$2,100.00", status: "Paid" },
          ].map((inv, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 bg-secondary-50 rounded-lg">
              <div className="w-4 h-4 rounded border border-secondary-300 bg-white" />
              <span className="text-sm font-medium text-secondary-700">{inv.id}</span>
              <span className="ml-auto text-sm text-secondary-500">{inv.amount}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              }`}>
                {inv.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-[72px] right-2 bg-secondary-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center text-[10px] font-bold">1</div>
          <span className="font-medium">Click here</span>
        </div>
        <p className="text-secondary-300 text-[11px]">Export all selected invoices</p>
        <div className="absolute -top-1 right-8 w-2 h-2 bg-secondary-900 rotate-45" />
      </motion.div>
    </div>
  );
}

function UseCaseFormScreen() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 p-4">
      <h3 className="text-sm font-semibold text-secondary-900 mb-4">Create Project</h3>

      {/* Valid field */}
      <div className="mb-3">
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
          Project Name <span className="text-red-500">*</span>
        </label>
        <div className="h-9 bg-green-50 border border-green-300 rounded-lg flex items-center px-3">
          <span className="text-sm text-secondary-700">My Project</span>
          <Check className="w-4 h-4 text-green-500 ml-auto" />
        </div>
      </div>

      {/* Missing required field - highlighted */}
      <motion.div
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-3 relative"
      >
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-1.5 bg-red-500/10 rounded-lg border-2 border-red-400 border-dashed"
        />
        <div className="relative">
          <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="h-9 bg-red-50 border border-red-300 rounded-lg flex items-center px-3">
            <span className="text-sm text-red-400">Required field</span>
            <AlertCircle className="w-4 h-4 text-red-400 ml-auto" />
          </div>
        </div>
        {/* Inline tooltip */}
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-2 bg-secondary-900 text-white text-xs p-2.5 rounded-lg"
        >
          <p className="font-medium mb-0.5">Missing required field</p>
          <p className="text-secondary-300">Add a description to enable saving</p>
        </motion.div>
      </motion.div>

      {/* Another field */}
      <div className="mb-4">
        <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
          Category
        </label>
        <div className="h-9 bg-secondary-50 border border-secondary-200 rounded-lg flex items-center px-3">
          <span className="text-sm text-secondary-400">Select...</span>
        </div>
      </div>

      {/* Disabled button */}
      <button className="w-full px-4 py-2 bg-secondary-200 text-secondary-400 text-sm rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
        <span>Save Project</span>
        <span className="text-xs bg-secondary-300 px-1.5 py-0.5 rounded">1 field missing</span>
      </button>
    </div>
  );
}

function UseCaseSettingsScreen() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
      <div className="flex">
        {/* Sidebar nav */}
        <div className="w-28 bg-secondary-50 border-r border-secondary-200 p-2">
          <div className="space-y-1">
            <div className="text-xs px-2 py-1.5 rounded text-secondary-500">General</div>
            <div className="text-xs px-2 py-1.5 rounded text-secondary-500">Team</div>
            <div className="text-xs px-2 py-1.5 rounded bg-primary-100 text-primary-700 font-medium">
              Integrations
            </div>
            <div className="text-xs px-2 py-1.5 rounded text-secondary-500">Billing</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-semibold text-secondary-900 mb-4">API Settings</h3>

          {/* API Key field - spotlighted */}
          <motion.div
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 bg-primary-500/20 rounded-lg"
            />
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1.5 border-2 border-primary-500 rounded-lg"
            />
            <div className="relative">
              <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
                API Key
              </label>
              <div className="flex gap-2">
                <div className="flex-1 h-9 bg-secondary-50 border border-primary-300 rounded-lg flex items-center px-3">
                  <span className="text-sm text-secondary-600 font-mono">sk-flex-xxxx-xxxx-xxxx</span>
                </div>
                <button className="px-3 py-1.5 bg-primary-100 text-primary-700 text-sm rounded-lg font-medium">
                  Copy
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 bg-secondary-900 text-white text-xs p-2.5 rounded-lg"
          >
            <p className="font-medium mb-0.5">Found: API Key</p>
            <p className="text-secondary-300">Copy this key to authenticate your requests</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function UseCaseFormFieldScreen() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 p-4 relative overflow-visible">
      <h3 className="text-sm font-semibold text-secondary-900 mb-4">Event Details</h3>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-secondary-700 mb-1.5 block">Event Name</label>
          <div className="h-9 bg-secondary-50 border border-secondary-200 rounded-lg flex items-center px-3">
            <span className="text-sm text-secondary-700">Product Launch</span>
          </div>
        </div>

        {/* Date field with helper tooltip */}
        <div className="relative">
          <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
            Start Date <span className="text-red-500">*</span>
          </label>
          <motion.div
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1 bg-primary-500/20 rounded-lg"
            />
            <div className="h-9 bg-primary-50 border-2 border-primary-400 rounded-lg flex items-center px-3 relative">
              <span className="text-sm text-secondary-400">YYYY-MM-DD</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-0.5 h-4 bg-primary-500 ml-0.5"
              />
            </div>
          </motion.div>

          {/* Floating helper - positioned to the right */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-[105%] top-4 w-44 bg-secondary-900 text-white text-xs p-3 rounded-lg shadow-xl z-20"
          >
            <p className="font-medium mb-1.5">Date Format</p>
            <p className="text-secondary-300 mb-2">Enter as YYYY-MM-DD</p>
            <div className="bg-secondary-800 rounded px-2 py-1.5">
              <p className="text-secondary-400 text-[10px] mb-0.5">Example:</p>
              <p className="text-white font-mono">2024-03-15</p>
            </div>
            <div className="absolute -left-1 top-6 w-2 h-2 bg-secondary-900 rotate-45" />
          </motion.div>
        </div>

        <div>
          <label className="text-xs font-medium text-secondary-700 mb-1.5 block">Location</label>
          <div className="h-9 bg-secondary-50 border border-secondary-200 rounded-lg flex items-center px-3">
            <span className="text-sm text-secondary-400">Enter location...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UseCaseWebhooksScreen() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-secondary-900">Webhooks</h3>

        {/* Add button - spotlighted */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 bg-primary-500/20 rounded-lg"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-1.5 border-2 border-primary-500 rounded-lg"
          />
          <button className="relative px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg font-medium">
            + Add Endpoint
          </button>
        </div>
      </div>

      {/* Existing webhooks */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 p-2.5 bg-secondary-50 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-secondary-700 font-mono flex-1">POST /api/events</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
        </div>
        <div className="flex items-center gap-3 p-2.5 bg-secondary-50 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-secondary-700 font-mono flex-1">POST /api/users</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
        </div>
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-secondary-900 text-white text-xs p-3 rounded-lg"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-[10px] font-bold">1</div>
          <span className="font-medium">Step 1 of 3</span>
        </div>
        <p className="text-secondary-300">Click &ldquo;Add Endpoint&rdquo; to create a new webhook</p>
      </motion.div>
    </div>
  );
}

// ============ USE CASES DATA ============

const useCases = [
  {
    id: "export",
    icon: FileOutput,
    title: "Export data",
    question: "How do I export invoices?",
    steps: [
      { text: "Detects you're on the Reports page", status: "done" },
      { text: "Spotlights the Export CSV button", status: "done" },
      { text: "Shows tooltip with next steps", status: "done" },
      { text: "Confirms export completed", status: "done" },
    ],
    mockup: <UseCaseReportsScreen />,
  },
  {
    id: "disabled",
    icon: Ban,
    title: "Fix blocked action",
    question: "Why is Save disabled?",
    steps: [
      { text: "Analyzes button state and prerequisites", status: "done" },
      { text: "Identifies missing required fields", status: "done" },
      { text: "Highlights fields with inline guidance", status: "done" },
      { text: "Button enables when fields are valid", status: "done" },
    ],
    mockup: <UseCaseFormScreen />,
  },
  {
    id: "integration",
    icon: Plug,
    title: "Fix integration",
    question: "I can't connect Slack",
    steps: [
      { text: "Runs OAuth preflight checklist", status: "done" },
      { text: "Detects missing 'channels:read' scope", status: "done" },
      { text: "Shows exactly where to fix it", status: "done" },
      { text: "Verifies connection works", status: "done" },
    ],
    mockup: <PreflightCheckMockup />,
  },
  {
    id: "settings",
    icon: Search,
    title: "Find a setting",
    question: "Where is the API key?",
    steps: [
      { text: "Understands you need API credentials", status: "done" },
      { text: "Navigates to Settings → Integrations", status: "done" },
      { text: "Spotlights the API Key field", status: "done" },
      { text: "Shows copy button and usage tips", status: "done" },
    ],
    mockup: <UseCaseSettingsScreen />,
  },
  {
    id: "formhelp",
    icon: HelpCircle,
    title: "Get field help",
    question: "What format should this be?",
    steps: [
      { text: "Detects focus on the date field", status: "done" },
      { text: "Shows expected format: YYYY-MM-DD", status: "done" },
      { text: "Provides example values", status: "done" },
      { text: "Validates input as you type", status: "done" },
    ],
    mockup: <UseCaseFormFieldScreen />,
  },
  {
    id: "webhook",
    icon: Webhook,
    title: "Set up webhook",
    question: "How do I create a webhook?",
    steps: [
      { text: "Opens Integrations → Webhooks tab", status: "done" },
      { text: "Spotlights 'Add Endpoint' button", status: "done" },
      { text: "Guides through URL and event setup", status: "done" },
      { text: "Tests webhook and confirms delivery", status: "done" },
    ],
    mockup: <UseCaseWebhooksScreen />,
  },
];

// ============ MAIN COMPONENT ============

export function UseCasesSection() {
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const activeCase = useCases.find((uc) => uc.id === activeTab)!;

  return (
    <section id="use-cases" className="section-padding bg-secondary-50">
      <Container>
        <SectionHeading
          badge="Use Cases"
          title="See Flexdash in action"
          description="Real examples of how Flexdash guides users through common stuck moments."
        />

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCases.map((useCase) => (
            <button
              key={useCase.id}
              onClick={() => setActiveTab(useCase.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                activeTab === useCase.id
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                  : "bg-white text-secondary-600 hover:bg-secondary-100 border border-secondary-200"
              )}
            >
              <useCase.icon className="w-4 h-4" />
              {useCase.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto"
          >
            {/* Left - Steps */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-secondary-200">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-secondary-100">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <activeCase.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500">User asks:</p>
                    <p className="font-semibold text-secondary-900">
                      &ldquo;{activeCase.question}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeCase.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary-600" />
                      </div>
                      <p className="text-secondary-700">{step.text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-secondary-100 flex items-center gap-2 text-sm text-primary-600 font-medium">
                  <span>Task completed successfully</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Right - Mockup */}
            <div className="relative">
              {activeCase.mockup}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
