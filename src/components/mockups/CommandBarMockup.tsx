"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Command, FileOutput, Settings, Users, HelpCircle, Clock, ArrowRight } from "lucide-react";

const suggestions = [
  { icon: FileOutput, text: "Export invoices to CSV", shortcut: "E" },
  { icon: Settings, text: "Open settings", shortcut: "S" },
  { icon: Users, text: "Manage team members", shortcut: "T" },
  { icon: HelpCircle, text: "Get help with forms", shortcut: "?" },
];

const recentSearches = [
  "How do I export invoices?",
  "Why is the button disabled?",
  "Connect Slack integration",
];

export function CommandBarMockup() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "How do I export invoices?";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 -m-8 bg-secondary-900/60 backdrop-blur-sm rounded-3xl" />

      {/* Command bar container */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
      >
        {/* Search input */}
        <div className="flex items-center gap-3 p-4 border-b border-secondary-100">
          <Search className="w-5 h-5 text-secondary-400" />
          <div className="flex-1 text-secondary-900 text-base">
            {displayText}
            <span className={`inline-block w-0.5 h-5 bg-primary-500 ml-0.5 -mb-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 bg-secondary-100 rounded text-xs font-medium text-secondary-600 border border-secondary-200">
              <Command className="w-3 h-3 inline -mt-0.5" />K
            </kbd>
          </div>
        </div>

        {/* Suggestions */}
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-medium text-secondary-500 uppercase tracking-wider">
            Quick Actions
          </div>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 cursor-pointer group transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                <suggestion.icon className="w-4 h-4 text-secondary-600 group-hover:text-primary-600" />
              </div>
              <span className="flex-1 text-sm text-secondary-700 group-hover:text-secondary-900">
                {suggestion.text}
              </span>
              <kbd className="px-1.5 py-0.5 bg-secondary-100 rounded text-xs font-medium text-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {suggestion.shortcut}
              </kbd>
            </motion.div>
          ))}
        </div>

        {/* Recent searches */}
        <div className="p-2 border-t border-secondary-100">
          <div className="px-3 py-2 text-xs font-medium text-secondary-500 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Recent
          </div>
          {recentSearches.map((search, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary-50 cursor-pointer group transition-colors"
            >
              <Search className="w-4 h-4 text-secondary-400" />
              <span className="flex-1 text-sm text-secondary-600">{search}</span>
              <ArrowRight className="w-4 h-4 text-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-3 bg-secondary-50 border-t border-secondary-100 flex items-center justify-between text-xs text-secondary-500">
          <span>Type to search or ask a question</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-white rounded border border-secondary-200 text-secondary-600">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
