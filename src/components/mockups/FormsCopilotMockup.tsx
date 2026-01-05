"use client";

import { motion } from "framer-motion";
import { Check, AlertCircle, Lightbulb, X } from "lucide-react";

const formFields = [
  { label: "Full Name", value: "John Smith", valid: true },
  { label: "Email Address", value: "john.smith@", valid: false, error: "Invalid email format", suggestion: "Did you mean john.smith@gmail.com?" },
  { label: "Phone Number", value: "+1 (555) 123-4567", valid: true },
  { label: "Company", value: "", valid: false, error: "This field is required", required: true },
];

export function FormsCopilotMockup() {
  const validFields = formFields.filter(f => f.valid).length;
  const progress = Math.round((validFields / formFields.length) * 100);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-xl border border-secondary-200 overflow-hidden">
        {/* Header with progress */}
        <div className="px-6 py-4 bg-secondary-50 border-b border-secondary-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-secondary-900">Contact Information</h3>
            <span className="text-sm text-secondary-500">{progress}% complete</span>
          </div>
          <div className="h-2 bg-secondary-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
            />
          </div>
        </div>

        {/* Form fields */}
        <div className="p-6 space-y-5">
          {formFields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-colors ${
                    field.valid
                      ? "border-green-300 bg-green-50/50"
                      : "border-red-300 bg-red-50/50"
                  }`}
                  placeholder={field.value === "" ? `Enter ${field.label.toLowerCase()}` : ""}
                />

                {/* Status icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {field.valid ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                    >
                      <X className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Error message */}
              {!field.valid && field.error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-600">{field.error}</span>
                  </div>

                  {/* Suggestion tooltip */}
                  {field.suggestion && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-800">{field.suggestion}</p>
                          <button className="mt-1 text-xs font-medium text-amber-700 hover:text-amber-900 underline">
                            Apply suggestion
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Submit button - disabled */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <button
              disabled
              className="w-full py-3 bg-secondary-200 text-secondary-500 rounded-xl font-medium cursor-not-allowed"
            >
              Submit Form
            </button>
            <p className="text-center text-xs text-secondary-500 mt-2">
              Fix 2 issues to enable submit
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating helper */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -right-4 top-1/3 transform translate-x-full"
      >
        <div className="bg-primary-600 text-white rounded-xl px-4 py-3 shadow-lg shadow-primary-500/30 max-w-[180px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium opacity-80">Forms Copilot</span>
          </div>
          <p className="text-sm">2 fields need attention to submit</p>
        </div>
        {/* Arrow */}
        <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 bg-primary-600 rotate-45" />
      </motion.div>
    </div>
  );
}
