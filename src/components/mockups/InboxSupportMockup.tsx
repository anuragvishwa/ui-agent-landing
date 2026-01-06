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
  high: "from-red-400 to-red-500",
  medium: "from-amber-400 to-amber-500",
  low: "from-secondary-400 to-secondary-500",
};

// Detail Panel Component
function TicketDetailPanel({ ticket }: { ticket: Ticket }) {
  const Icon = ticket.icon;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] border border-secondary-100 overflow-hidden h-full">
      {/* Header with category - enhanced gradient */}
      <div className={`px-6 py-5 bg-gradient-to-br ${priorityGradients[ticket.priority]} relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -right-8 top-8 w-16 h-16 bg-white/5 rounded-full" />

        <div className="flex items-center gap-4 relative">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/90 text-xs font-medium tracking-wide uppercase">{ticket.category}</p>
            <p className="text-white font-bold text-base truncate mt-0.5">{ticket.subject}</p>
          </div>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="p-5">
        <p className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider mb-4">
          Cost & Time Impact
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Time per ticket */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl p-3.5 border border-amber-100/50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-[11px] font-medium text-secondary-600">Time Lost</span>
            </div>
            <p className="text-xl font-bold text-secondary-900">{ticket.avgTimeToResolve}</p>
            <p className="text-[10px] text-secondary-500 mt-0.5">per ticket</p>
          </div>

          {/* Monthly cost */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50/50 rounded-xl p-3.5 border border-red-100/50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-red-600" />
              </div>
              <span className="text-[11px] font-medium text-secondary-600">Monthly Cost</span>
            </div>
            <p className="text-xl font-bold text-red-600">{ticket.monthlyCost}</p>
            <p className="text-[10px] text-secondary-500 mt-0.5">support overhead</p>
          </div>

          {/* Tickets per month */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-3.5 border border-blue-100/50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-[11px] font-medium text-secondary-600">Volume</span>
            </div>
            <p className="text-xl font-bold text-secondary-900">{ticket.ticketsPerMonth}</p>
            <p className="text-[10px] text-secondary-500 mt-0.5">tickets/month</p>
          </div>

          {/* Complexity */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50/50 rounded-xl p-3.5 border border-purple-100/50">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                <Gauge className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-[11px] font-medium text-secondary-600">Complexity</span>
            </div>
            <p className={`text-xl font-bold ${
              ticket.complexity === "High" ? "text-red-600" :
              ticket.complexity === "Medium" ? "text-amber-600" :
              "text-green-600"
            }`}>{ticket.complexity}</p>
            <p className="text-[10px] text-secondary-500 mt-0.5">to resolve</p>
          </div>
        </div>

        {/* Flexdash Solution - enhanced */}
        <div className="bg-gradient-to-br from-primary-50 to-teal-50/50 rounded-xl p-4 border border-primary-200/60 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-primary-100 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            </div>
            <span className="text-sm font-semibold text-primary-700">With Flexdash</span>
          </div>
          <p className="text-sm text-primary-800/90 mb-3 leading-relaxed">{ticket.flexdashSolution}</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-100/80 px-2.5 py-1 rounded-full font-medium">
              <Check className="w-3 h-3" />
              <span>Instant</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-100/80 px-2.5 py-1 rounded-full font-medium">
              <Check className="w-3 h-3" />
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
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main container with two panels */}
      <div className="flex gap-6">
        {/* LEFT: Ticket List */}
        <div className="w-[380px] flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] overflow-hidden border border-secondary-100">
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-secondary-50 to-secondary-100/50 border-b border-secondary-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center shadow-sm border border-red-200/50">
                  <Mail className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-secondary-900">Support Inbox</h3>
                  <p className="text-[11px] text-secondary-500">UI confusion tickets</p>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[11px] font-bold rounded-full shadow-sm"
              >
                {tickets.filter(t => t.unread).length} new
              </motion.div>
            </div>

            {/* Ticket list */}
            <div className="divide-y divide-secondary-100/80">
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
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-gradient-to-r from-primary-50 to-primary-50/50 border-l-3 border-l-primary-500"
                        : "hover:bg-secondary-50/80 border-l-3 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Priority dot */}
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColors[ticket.priority]} shadow-sm`} />

                      {/* Icon */}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? "bg-primary-100" : "bg-secondary-100"
                      }`}>
                        <Icon className={`w-3.5 h-3.5 ${
                          isSelected ? "text-primary-600" : "text-secondary-400"
                        }`} />
                      </div>

                      {/* Subject */}
                      <span className={`text-sm truncate flex-1 ${
                        isSelected
                          ? "text-primary-700 font-semibold"
                          : ticket.unread ? "text-secondary-900 font-medium" : "text-secondary-500"
                      }`}>
                        {ticket.subject}
                      </span>

                      {/* Unread indicator */}
                      {ticket.unread && !isSelected && (
                        <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 animate-pulse" />
                      )}
                    </div>

                    {/* Time - only show if not selected */}
                    {!isSelected && (
                      <div className="flex items-center gap-1.5 mt-1.5 ml-[38px]">
                        <Clock className="w-3 h-3 text-secondary-400" />
                        <span className="text-[11px] text-secondary-400">{ticket.time}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-secondary-50 to-secondary-100/50 text-center border-t border-secondary-200/80">
              <span className="text-[11px] text-secondary-500 font-medium">+47 more tickets today</span>
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

    </div>
  );
}
