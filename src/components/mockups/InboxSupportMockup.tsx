"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  HelpCircle,
  Plug,
  FileQuestion,
  Ban,
  DollarSign,
  TrendingUp,
  Gauge,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";

// Ticket type with impact data
type Ticket = {
  id: number;
  subject: string;
  preview: string;
  time: string;
  priority: "high" | "medium" | "low";
  icon: LucideIcon;
  unread: boolean;
  category: string;
  avgTimeToResolve: string;
  ticketsPerMonth: number;
  monthlyCost: string;
  complexity: "Low" | "Medium" | "High";
  flexdashSolution: string;
};

const tickets: Ticket[] = [
  {
    id: 1,
    subject: "Where is the export button?",
    preview: "I can't find the export feature anywhere in...",
    time: "2m ago",
    priority: "high",
    icon: HelpCircle,
    unread: true,
    category: "Navigation Confusion",
    avgTimeToResolve: "12 min",
    ticketsPerMonth: 156,
    monthlyCost: "$2,340",
    complexity: "Low",
    flexdashSolution: "Spotlight the Export button instantly with one click",
  },
  {
    id: 2,
    subject: "Why is my button disabled?",
    preview: "Trying to submit the form but the button...",
    time: "15m ago",
    priority: "high",
    icon: Ban,
    unread: true,
    category: "Blocked State",
    avgTimeToResolve: "18 min",
    ticketsPerMonth: 203,
    monthlyCost: "$4,060",
    complexity: "Medium",
    flexdashSolution: "Shows exactly which field is missing or invalid",
  },
  {
    id: 3,
    subject: "Slack integration not working",
    preview: "Getting an error when connecting...",
    time: "1h ago",
    priority: "medium",
    icon: Plug,
    unread: true,
    category: "Integration Issue",
    avgTimeToResolve: "45 min",
    ticketsPerMonth: 89,
    monthlyCost: "$3,115",
    complexity: "High",
    flexdashSolution: "Runs preflight checks and shows missing OAuth scopes",
  },
  {
    id: 4,
    subject: "Documentation doesn't match UI",
    preview: "The help article shows different steps...",
    time: "2h ago",
    priority: "low",
    icon: FileQuestion,
    unread: false,
    category: "Stale Documentation",
    avgTimeToResolve: "25 min",
    ticketsPerMonth: 67,
    monthlyCost: "$1,675",
    complexity: "Medium",
    flexdashSolution: "Guides based on actual UI, not outdated docs",
  },
  {
    id: 5,
    subject: "Can't find settings",
    preview: "Where do I change my notification...",
    time: "3h ago",
    priority: "medium",
    icon: HelpCircle,
    unread: false,
    category: "Feature Discovery",
    avgTimeToResolve: "8 min",
    ticketsPerMonth: 134,
    monthlyCost: "$1,787",
    complexity: "Low",
    flexdashSolution: "Navigates directly to the exact settings panel",
  },
];

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-secondary-400",
};

const priorityGradients = {
  high: "from-red-500 to-red-600",
  medium: "from-amber-500 to-amber-600",
  low: "from-secondary-500 to-secondary-600",
};

// Detail Panel Component
function TicketDetailPanel({ ticket }: { ticket: Ticket }) {
  const Icon = ticket.icon;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden h-full">
      {/* Header with category */}
      <div className={`px-5 py-4 bg-gradient-to-r ${priorityGradients[ticket.priority]}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs font-medium">{ticket.category}</p>
            <p className="text-white font-semibold text-sm truncate">{ticket.subject}</p>
          </div>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="p-4">
        <p className="text-[10px] font-semibold text-secondary-400 uppercase tracking-wider mb-3">
          Cost & Time Impact
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Time per ticket */}
          <div className="bg-secondary-50 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] text-secondary-500">Time Lost</span>
            </div>
            <p className="text-lg font-bold text-secondary-900">{ticket.avgTimeToResolve}</p>
            <p className="text-[10px] text-secondary-400">per ticket</p>
          </div>

          {/* Monthly cost */}
          <div className="bg-secondary-50 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] text-secondary-500">Monthly Cost</span>
            </div>
            <p className="text-lg font-bold text-red-600">{ticket.monthlyCost}</p>
            <p className="text-[10px] text-secondary-400">support overhead</p>
          </div>

          {/* Tickets per month */}
          <div className="bg-secondary-50 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] text-secondary-500">Volume</span>
            </div>
            <p className="text-lg font-bold text-secondary-900">{ticket.ticketsPerMonth}</p>
            <p className="text-[10px] text-secondary-400">tickets/month</p>
          </div>

          {/* Complexity */}
          <div className="bg-secondary-50 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Gauge className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[10px] text-secondary-500">Complexity</span>
            </div>
            <p className={`text-lg font-bold ${
              ticket.complexity === "High" ? "text-red-600" :
              ticket.complexity === "Medium" ? "text-amber-600" :
              "text-green-600"
            }`}>{ticket.complexity}</p>
            <p className="text-[10px] text-secondary-400">to resolve</p>
          </div>
        </div>

        {/* Flexdash Solution */}
        <div className="bg-primary-50 rounded-xl p-3 border border-primary-200">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-xs font-semibold text-primary-700">With Flexdash</span>
          </div>
          <p className="text-xs text-primary-800 mb-2">{ticket.flexdashSolution}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" />
              <span>Instant</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" />
              <span>Zero support time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InboxSupportMockup() {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const activeTicket = tickets.find(t => t.id === selectedTicket);

  // Auto-select first ticket on mount
  useEffect(() => {
    const timer = setTimeout(() => setSelectedTicket(1), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through tickets every 4 seconds (unless paused)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedTicket(prev => {
        const currentIndex = tickets.findIndex(t => t.id === prev);
        const nextIndex = (currentIndex + 1) % tickets.length;
        return tickets[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main container with two panels */}
      <div className="flex gap-3">
        {/* LEFT: Ticket List */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-secondary-900 rounded-2xl shadow-2xl overflow-hidden border border-secondary-700">
            {/* Header */}
            <div className="px-3 py-2.5 bg-secondary-800 border-b border-secondary-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Support Inbox</h3>
                  <p className="text-[10px] text-secondary-400">UI confusion tickets</p>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full"
              >
                {tickets.filter(t => t.unread).length} new
              </motion.div>
            </div>

            {/* Ticket list */}
            <div className="divide-y divide-secondary-700/50">
              {tickets.map((ticket, index) => {
                const Icon = ticket.icon;
                const isSelected = selectedTicket === ticket.id;

                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`px-3 py-2 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-primary-500/20 border-l-2 border-l-primary-500"
                        : "hover:bg-secondary-800/50 border-l-2 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Priority dot */}
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityColors[ticket.priority]}`} />

                      {/* Icon */}
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isSelected ? "text-primary-400" : "text-secondary-500"
                      }`} />

                      {/* Subject */}
                      <span className={`text-xs truncate flex-1 ${
                        isSelected
                          ? "text-white font-medium"
                          : ticket.unread ? "text-white" : "text-secondary-400"
                      }`}>
                        {ticket.subject}
                      </span>

                      {/* Unread indicator */}
                      {ticket.unread && !isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Time - only show if not selected */}
                    {!isSelected && (
                      <div className="flex items-center gap-1 mt-1 ml-5">
                        <Clock className="w-2.5 h-2.5 text-secondary-600" />
                        <span className="text-[10px] text-secondary-600">{ticket.time}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-3 py-1.5 bg-secondary-800/50 text-center border-t border-secondary-700">
              <span className="text-[10px] text-secondary-500">+47 more tickets today</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Detail Panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTicket && (
              <motion.div
                key={activeTicket.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TicketDetailPanel ticket={activeTicket} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating total cost card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="bg-secondary-900 text-white px-5 py-2.5 rounded-xl shadow-lg border border-secondary-700">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-[10px] text-secondary-400">Total Monthly</p>
              <p className="text-lg font-bold text-red-400">$12,977</p>
            </div>
            <div className="w-px h-8 bg-secondary-700" />
            <div className="text-center">
              <p className="text-[10px] text-secondary-400">Avg Resolution</p>
              <p className="text-lg font-bold text-amber-400">21 min</p>
            </div>
            <div className="w-px h-8 bg-secondary-700" />
            <div className="text-center">
              <p className="text-[10px] text-secondary-400">Volume</p>
              <p className="text-lg font-bold text-blue-400">649/mo</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
