"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileWarning,
  MapPin,
  Lock,
  ShieldOff,
  Plug,
  Rocket,
  Check,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ChevronDown,
  Mail,
  Send,
  Users,
  MessageSquare,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { PreflightCheckMockup } from "@/components/mockups";

// ============ MOCKUP COMPONENTS ============

// 1. Hidden Required Fields - Form with scrolled-out-of-view required field
function HiddenFieldFormMockup() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
      {/* Browser header */}
      <div className="bg-secondary-100 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-secondary-500">app.yourproduct.com/settings/profile</span>
        </div>
      </div>

      {/* Form content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-secondary-900 mb-4">Profile Settings</h3>

        {/* Completed fields */}
        <div className="space-y-3 mb-3">
          {[
            { label: "Full Name", value: "John Doe" },
            { label: "Email", value: "john@company.io" },
            { label: "Phone", value: "+1 (555) 123-4567" },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-xs font-medium text-secondary-700 mb-1.5 block">{field.label}</label>
              <div className="h-9 bg-green-50 border border-green-300 rounded-lg flex items-center px-3">
                <span className="text-sm text-secondary-700">{field.value}</span>
                <Check className="w-4 h-4 text-green-500 ml-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center justify-center gap-2 py-2 text-secondary-400 border-y border-dashed border-secondary-200 mb-3">
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span className="text-xs">Scrolled out of view</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>

        {/* Hidden required field - highlighted by Flexdash */}
        <motion.div
          animate={{ scale: [1, 1.01, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative mb-4"
        >
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 bg-red-500/15 rounded-lg border-2 border-red-400 border-dashed"
          />
          <div className="relative">
            <label className="text-xs font-medium text-secondary-700 mb-1.5 block">
              Company <span className="text-red-500">*</span>
            </label>
            <div className="h-9 bg-red-50 border-2 border-red-400 rounded-lg flex items-center px-3">
              <span className="text-sm text-red-400 italic">Required field</span>
              <AlertCircle className="w-4 h-4 text-red-400 ml-auto" />
            </div>
          </div>

          {/* Flexdash tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 bg-secondary-900 text-white text-xs p-3 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="font-semibold">Found the issue!</span>
            </div>
            <p className="text-secondary-300">This required field was below the fold. Fill it in to enable Save.</p>
          </motion.div>
        </motion.div>

        {/* Disabled Save button */}
        <button className="w-full px-4 py-2.5 bg-secondary-200 text-secondary-400 text-sm rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
          <span>Save Changes</span>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">1 field missing</span>
        </button>
      </div>
    </div>
  );
}

// 2. Setting Moved After Update - Shows old→new location pointer
function SettingMovedMockup() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
      {/* Browser header */}
      <div className="bg-secondary-100 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-secondary-500">app.yourproduct.com/settings</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar nav */}
        <div className="w-32 bg-secondary-50 border-r border-secondary-200 p-3">
          <div className="space-y-1">
            <div className="text-xs px-2.5 py-2 rounded-lg text-secondary-500">General</div>
            <div className="text-xs px-2.5 py-2 rounded-lg text-secondary-500">Profile</div>

            {/* Old location - crossed out */}
            <div className="relative">
              <div className="text-xs px-2.5 py-2 rounded-lg text-secondary-300 line-through">
                Notifications
              </div>
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 text-[9px] bg-secondary-200 text-secondary-500 px-1.5 py-0.5 rounded">
                Moved
              </div>
            </div>

            <div className="text-xs px-2.5 py-2 rounded-lg bg-primary-100 text-primary-700 font-medium">
              Advanced
            </div>
            <div className="text-xs px-2.5 py-2 rounded-lg text-secondary-500">Billing</div>
          </div>
        </div>

        {/* Main content - Advanced settings */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-semibold text-secondary-900 mb-4">Advanced Settings</h3>

          <div className="space-y-3">
            <div className="p-3 bg-secondary-50 rounded-lg">
              <p className="text-xs font-medium text-secondary-700">API Access</p>
              <p className="text-[11px] text-secondary-500">Manage API keys and webhooks</p>
            </div>

            {/* New location - highlighted */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1.5 bg-primary-500/20 rounded-xl"
              />
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 border-2 border-primary-500 rounded-xl"
              />
              <div className="relative p-3 bg-primary-50 rounded-lg border border-primary-200">
                <p className="text-xs font-medium text-primary-700">Notification Preferences</p>
                <p className="text-[11px] text-primary-600">Email, push, and in-app alerts</p>
              </div>
            </motion.div>

            <div className="p-3 bg-secondary-50 rounded-lg">
              <p className="text-xs font-medium text-secondary-700">Data Export</p>
              <p className="text-[11px] text-secondary-500">Download your data</p>
            </div>
          </div>

          {/* Flexdash guidance tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 bg-secondary-900 text-white text-xs p-3 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="font-semibold">Setting relocated!</span>
            </div>
            <p className="text-secondary-300">Notifications moved from sidebar to <span className="text-white font-medium">Advanced → Notification Preferences</span></p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 3. Prerequisite Block - Disabled button with explanation
function PrerequisiteBlockMockup() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
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

      <div className="p-4">
        {/* Header with disabled Export */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary-900">Monthly Reports</h3>

          {/* Disabled Export button - highlighted */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 bg-amber-500/20 rounded-lg"
            />
            <button className="relative px-3 py-1.5 bg-secondary-200 text-secondary-400 text-sm rounded-lg cursor-not-allowed flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </motion.div>
        </div>

        {/* Table with no selections */}
        <div className="border border-secondary-200 rounded-lg overflow-hidden mb-4">
          <div className="bg-secondary-50 px-3 py-2 border-b border-secondary-200 flex items-center gap-3">
            <div className="w-4 h-4 rounded border-2 border-secondary-300 bg-white" />
            <span className="text-xs font-medium text-secondary-600 flex-1">Report Name</span>
            <span className="text-xs font-medium text-secondary-600 w-20">Date</span>
            <span className="text-xs font-medium text-secondary-600 w-16">Status</span>
          </div>
          {[
            { name: "Q4 Revenue", date: "Dec 31", status: "Ready" },
            { name: "User Growth", date: "Dec 28", status: "Ready" },
            { name: "Churn Analysis", date: "Dec 25", status: "Ready" },
          ].map((row, i) => (
            <div key={i} className="px-3 py-2.5 border-b border-secondary-100 last:border-0 flex items-center gap-3">
              <div className="w-4 h-4 rounded border-2 border-secondary-300 bg-white" />
              <span className="text-sm text-secondary-700 flex-1">{row.name}</span>
              <span className="text-xs text-secondary-500 w-20">{row.date}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full w-16 text-center">{row.status}</span>
            </div>
          ))}
        </div>

        {/* Flexdash explanation */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-amber-50 border border-amber-200 rounded-lg p-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800 mb-1">Export requires selection</p>
              <p className="text-xs text-amber-700 mb-2">Select at least one report from the table above to enable export.</p>
              <button className="text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors">
                Select all reports →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// 4. Permission Block - Access denied with request access
function PermissionBlockMockup() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
      {/* Browser header */}
      <div className="bg-secondary-100 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-secondary-500">app.yourproduct.com/admin/billing</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary-900">Billing Management</h3>

          {/* Locked action button */}
          <button className="px-3 py-1.5 bg-secondary-200 text-secondary-400 text-sm rounded-lg cursor-not-allowed flex items-center gap-1.5">
            <ShieldOff className="w-3.5 h-3.5" />
            Upgrade Plan
          </button>
        </div>

        {/* Access denied card */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <ShieldOff className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-red-800">Admin Access Required</p>
              <p className="text-xs text-red-600">You need elevated permissions</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-red-100">
            <p className="text-xs text-secondary-600 mb-1">Required permission:</p>
            <p className="text-sm font-mono text-red-700 bg-red-50 px-2 py-1 rounded inline-block">billing.admin</p>
          </div>
        </div>

        {/* Flexdash solution - Request access */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary-50 border border-primary-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Flexdash can help</span>
          </div>

          <div className="bg-white rounded-lg p-3 border border-primary-100 mb-3">
            <p className="text-xs text-secondary-500 mb-1.5">Pre-filled message to admin:</p>
            <p className="text-sm text-secondary-700 italic">&ldquo;Hi, I need billing.admin access to upgrade our team plan. Can you grant this permission?&rdquo;</p>
          </div>

          <motion.button
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25"
          >
            <Send className="w-4 h-4" />
            Request Access from Admin
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

// 5. Onboarding Mockup - Multi-step progress tracker
function OnboardingMockup() {
  return (
    <div className="bg-white rounded-xl border border-secondary-200 overflow-hidden">
      {/* Browser header */}
      <div className="bg-secondary-100 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-secondary-500">app.yourproduct.com/onboarding</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-secondary-900">Getting Started</h3>
          <span className="text-xs font-medium text-secondary-500 bg-secondary-100 px-2.5 py-1 rounded-full">40% complete</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-secondary-100 rounded-full mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {/* Completed steps */}
          {[
            { step: 1, label: "Create account", done: true },
            { step: 2, label: "Connect workspace", done: true },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-green-700 font-medium">{item.label}</span>
              <span className="ml-auto text-xs text-green-600">Done</span>
            </div>
          ))}

          {/* Stuck step - highlighted */}
          <motion.div
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1.5 bg-amber-500/20 rounded-xl border-2 border-amber-400"
            />
            <div className="relative flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-amber-800 font-medium block">Invite team member</span>
                <span className="text-xs text-amber-600">You&apos;re stuck here</span>
              </div>
              <span className="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-medium">Current</span>
            </div>
          </motion.div>

          {/* Pending steps */}
          {[
            { step: 4, label: "Send first message" },
            { step: 5, label: "Complete setup" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg border border-secondary-100">
              <div className="w-7 h-7 rounded-full bg-secondary-200 flex items-center justify-center">
                <Circle className="w-4 h-4 text-secondary-400" />
              </div>
              <span className="text-sm text-secondary-400">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Flexdash helper */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-primary-50 border border-primary-200 rounded-xl p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Quick action</span>
          </div>
          <p className="text-xs text-primary-600 mb-3">Just add one teammate&apos;s email to continue. You can add more later.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="teammate@company.com"
              className="flex-1 h-9 px-3 text-sm border border-primary-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <motion.button
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg font-medium flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              Invite
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ============ USE CASES DATA ============

const useCases = [
  {
    id: "hidden-fields",
    icon: FileWarning,
    title: "Hidden Required Fields",
    question: "Why won't this form submit?",
    description: "User fills a long form, hits Save, and nothing happens. Flexdash highlights the exact missing fields and guides them until Submit becomes enabled.",
    steps: [
      { text: "Detects disabled Save button", status: "done" },
      { text: "Scans for empty required fields", status: "done" },
      { text: "Scrolls to hidden 'Company' field", status: "done" },
      { text: "Shows inline guidance to complete", status: "done" },
    ],
    mockup: <HiddenFieldFormMockup />,
  },
  {
    id: "setting-moved",
    icon: MapPin,
    title: "Setting Moved After Update",
    question: "Where did this button go?",
    description: "User follows old docs and can't find the button. Flexdash points to the new location and walks them through.",
    steps: [
      { text: "Understands user's intent from query", status: "done" },
      { text: "Detects UI has changed since docs", status: "done" },
      { text: "Locates feature in new position", status: "done" },
      { text: "Guides with animated pointer", status: "done" },
    ],
    mockup: <SettingMovedMockup />,
  },
  {
    id: "prerequisite",
    icon: Lock,
    title: "Prerequisite Block",
    question: "Why is Export disabled?",
    description: "User tries Export but it's greyed out. Flexdash explains what needs to be done first and takes them there.",
    steps: [
      { text: "Analyzes button's disabled state", status: "done" },
      { text: "Identifies missing prerequisite", status: "done" },
      { text: "Shows clear explanation", status: "done" },
      { text: "One-click navigation to fix", status: "done" },
    ],
    mockup: <PrerequisiteBlockMockup />,
  },
  {
    id: "permission",
    icon: ShieldOff,
    title: "Permission Required",
    question: "Why can't I access this?",
    description: "User sees 'not allowed' or action greyed out. Flexdash explains what access is needed and offers one-click request to admin.",
    steps: [
      { text: "Detects permission-blocked action", status: "done" },
      { text: "Identifies required role/permission", status: "done" },
      { text: "Generates request access message", status: "done" },
      { text: "One-click send to workspace admin", status: "done" },
    ],
    mockup: <PermissionBlockMockup />,
  },
  {
    id: "integration",
    icon: Plug,
    title: "Integration Setup Failure",
    question: "Why won't Slack connect?",
    description: "Integration fails with vague error. Flexdash runs preflight checks, flags the missing scope, shows exactly what to fix.",
    steps: [
      { text: "Runs OAuth preflight checklist", status: "done" },
      { text: "Detects missing 'channels:read' scope", status: "done" },
      { text: "Shows exactly where to fix it", status: "done" },
      { text: "Verifies connection works", status: "done" },
    ],
    mockup: <PreflightCheckMockup />,
  },
  {
    id: "onboarding",
    icon: Rocket,
    title: "Stalled Onboarding",
    question: "What do I do next?",
    description: "New customer stuck mid-onboarding. Flexdash detects the stalled step, surfaces the smallest next action, and verifies progress.",
    steps: [
      { text: "Detects onboarding is stalled", status: "done" },
      { text: "Identifies blocked step", status: "done" },
      { text: "Surfaces smallest next action", status: "done" },
      { text: "Verifies completion to first success", status: "done" },
    ],
    mockup: <OnboardingMockup />,
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
            {/* Left - Description & Steps */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-secondary-200">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shadow-sm">
                    <activeCase.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs text-secondary-500 uppercase tracking-wide font-medium">Common Issue</p>
                    <h3 className="font-bold text-lg text-secondary-900">{activeCase.title}</h3>
                  </div>
                </div>

                {/* User question */}
                <div className="bg-secondary-50 rounded-xl p-4 mb-5">
                  <p className="text-sm text-secondary-500 mb-1">User asks:</p>
                  <p className="font-semibold text-secondary-900 text-lg">
                    &ldquo;{activeCase.question}&rdquo;
                  </p>
                </div>

                {/* Description */}
                <p className="text-secondary-600 mb-6 leading-relaxed text-sm">
                  {activeCase.description}
                </p>

                {/* Steps */}
                <div className="space-y-3">
                  {activeCase.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary-600" />
                      </div>
                      <p className="text-secondary-700 text-sm">{step.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Success indicator */}
                <div className="mt-6 pt-6 border-t border-secondary-100 flex items-center gap-2 text-primary-600 font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Problem solved instantly</span>
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
