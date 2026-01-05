"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Check, X, RefreshCw, Clock, Shield, ChevronRight } from "lucide-react";

const trackedElements = [
  { name: "submit-form-main", selector: "button.submit-btn", status: "ok", lastSeen: "2m ago" },
  { name: "export-csv-btn", selector: "button.export", status: "warning", lastSeen: "5m ago", issue: "Class changed" },
  { name: "user-menu-dropdown", selector: "#user-menu", status: "ok", lastSeen: "2m ago" },
  { name: "settings-link", selector: "a.settings", status: "missing", lastSeen: "1h ago", issue: "Element not found" },
  { name: "search-input", selector: "input#search", status: "ok", lastSeen: "2m ago" },
];

const statusConfig = {
  ok: { icon: Check, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  missing: { icon: X, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
};

export function DriftDetectionMockup() {
  const okCount = trackedElements.filter(e => e.status === "ok").length;
  const warningCount = trackedElements.filter(e => e.status === "warning").length;
  const missingCount = trackedElements.filter(e => e.status === "missing").length;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Dashboard card */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-secondary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900">Drift Detection</h3>
                <div className="flex items-center gap-1 text-xs text-secondary-500">
                  <Clock className="w-3 h-3" />
                  <span>Last checked: 2 min ago</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-secondary-500" />
            </motion.button>
          </div>
        </div>

        {/* Status summary */}
        <div className="px-5 py-3 border-b border-secondary-100 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-secondary-600">{okCount} OK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-sm text-secondary-600">{warningCount} Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-secondary-600">{missingCount} Missing</span>
          </div>
        </div>

        {/* Elements list */}
        <div className="p-4 space-y-2 max-h-[280px] overflow-y-auto">
          {trackedElements.map((element, index) => {
            const config = statusConfig[element.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`p-3 rounded-xl border ${config.border} ${config.bg} group cursor-pointer hover:shadow-sm transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm`}>
                    <StatusIcon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-secondary-900 truncate">
                        {element.name}
                      </span>
                      {element.status !== "ok" && (
                        <motion.span
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            element.status === "warning" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {element.issue}
                        </motion.span>
                      )}
                    </div>
                    <code className="text-xs text-secondary-500 truncate block">
                      {element.selector}
                    </code>
                  </div>
                  <ChevronRight className="w-4 h-4 text-secondary-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer action */}
        {(warningCount > 0 || missingCount > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-5 py-4 bg-secondary-50 border-t border-secondary-200"
          >
            <button className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25">
              <RefreshCw className="w-4 h-4" />
              Re-map {warningCount + missingCount} Elements
            </button>
          </motion.div>
        )}
      </div>

      {/* Alert badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute -top-3 -right-3"
      >
        <div className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          {warningCount + missingCount} drifted
        </div>
      </motion.div>
    </div>
  );
}
