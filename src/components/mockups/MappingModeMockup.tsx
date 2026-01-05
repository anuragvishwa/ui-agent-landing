"use client";

import { motion } from "framer-motion";
import { MousePointer2, Code, Check, X, Edit3, Eye } from "lucide-react";

export function MappingModeMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Dev tools header bar */}
      <div className="bg-secondary-900 rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/20 rounded">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-medium text-cyan-400">Mapping Mode</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-xs text-secondary-400 hover:text-white">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button className="px-3 py-1 bg-cyan-600 text-white text-xs rounded font-medium">
            Publish Map
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-white border-x border-secondary-200 p-6 relative min-h-[220px]">
        {/* Simulated UI elements with hover outlines */}
        <div className="space-y-4">
          {/* Header element */}
          <div className="relative group">
            <div className="h-8 bg-secondary-100 rounded-lg w-48" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 border-2 border-dashed border-secondary-300 rounded-lg pointer-events-none"
            />
          </div>

          {/* Hovered/Selected element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="h-12 bg-primary-100 rounded-lg flex items-center px-4">
              <span className="text-sm text-primary-700 font-medium">Submit Button</span>
            </div>
            {/* Active selection highlight */}
            <motion.div
              animate={{
                boxShadow: ["0 0 0 2px rgba(6, 182, 212, 0.5)", "0 0 0 4px rgba(6, 182, 212, 0.3)", "0 0 0 2px rgba(6, 182, 212, 0.5)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 border-2 border-cyan-500 rounded-lg pointer-events-none"
            />
            {/* Element tag badge */}
            <div className="absolute -top-3 left-2 px-2 py-0.5 bg-cyan-500 text-white text-[10px] font-medium rounded">
              button.submit-btn
            </div>
          </motion.div>

          {/* Other elements */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="h-10 bg-secondary-50 rounded-lg border border-secondary-200" />
              <div className="absolute inset-0 border-2 border-dashed border-secondary-200 rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative">
              <div className="h-10 bg-secondary-50 rounded-lg border border-secondary-200" />
              <div className="absolute inset-0 border-2 border-dashed border-secondary-200 rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Cursor */}
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-[85px] left-[180px]"
        >
          <MousePointer2 className="w-5 h-5 text-secondary-900 fill-white drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Inspector panel */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-secondary-900 rounded-b-xl p-4 border-t border-secondary-700"
      >
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-white">Element Inspector</span>
        </div>

        {/* Element details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-400">Tag</span>
            <code className="px-2 py-0.5 bg-secondary-800 rounded text-cyan-400 text-xs">button</code>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-400">Class</span>
            <code className="px-2 py-0.5 bg-secondary-800 rounded text-green-400 text-xs">.submit-btn</code>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-400">assistId</span>
            <div className="flex items-center gap-1">
              <code className="px-2 py-0.5 bg-cyan-500/20 rounded text-cyan-400 text-xs border border-cyan-500/30">
                submit-form-main
              </code>
              <button className="p-1 hover:bg-secondary-700 rounded">
                <Edit3 className="w-3 h-3 text-secondary-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Code preview */}
        <div className="bg-secondary-800 rounded-lg p-3 mb-4">
          <code className="text-xs text-secondary-300">
            <span className="text-purple-400">&lt;button</span>{" "}
            <span className="text-cyan-400">data-assist-id</span>=
            <span className="text-green-400">&quot;submit-form-main&quot;</span>
            <span className="text-purple-400">&gt;</span>
          </code>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 bg-cyan-600 text-white text-sm rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Accept
          </motion.button>
          <button className="px-4 py-2 bg-secondary-700 text-secondary-300 text-sm rounded-lg font-medium hover:bg-secondary-600">
            Rename
          </button>
          <button className="px-4 py-2 text-secondary-400 text-sm rounded-lg font-medium hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
