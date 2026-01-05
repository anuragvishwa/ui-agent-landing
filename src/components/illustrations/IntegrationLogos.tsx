"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

// Intercom Logo
export function IntercomLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#1F8DED] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <rect width="24" height="24" rx="5" fill="currentColor" />
      <path
        d="M19 12.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V7.5c0-.28.22-.5.5-.5s.5.22.5.5v5zm-3 2c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-7c0-.28.22-.5.5-.5s.5.22.5.5v7zm-3 1c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-9c0-.28.22-.5.5-.5s.5.22.5.5v9zm-3-1c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-7c0-.28.22-.5.5-.5s.5.22.5.5v7zm-3-2c0 .28-.22.5-.5.5s-.5-.22-.5-.5V7.5c0-.28.22-.5.5-.5s.5.22.5.5v5z"
        fill="white"
      />
      <path
        d="M17.5 17c-.17 0-.34-.08-.44-.24C16.27 15.54 14.26 15 12 15s-4.27.54-5.06 1.76c-.15.24-.47.31-.7.16-.24-.15-.31-.46-.16-.7C7.08 14.64 9.47 14 12 14s4.92.64 5.92 2.22c.15.24.08.55-.16.7-.1.05-.2.08-.26.08z"
        fill="white"
      />
    </motion.svg>
  );
}

// Zendesk Logo
export function ZendeskLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#03363D] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5h-9l9-7v7zm-9-5v-5l9 5h-9z"
      />
    </motion.svg>
  );
}

// Segment Logo
export function SegmentLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#52BD95] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7 9h10M7 12h7M7 15h10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

// Okta Logo
export function OktaLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#007DC1] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <circle cx="12" cy="12" r="5" fill="white" />
    </motion.svg>
  );
}

// Google Logo
export function GoogleLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </motion.svg>
  );
}

// Help Scout Logo
export function HelpScoutLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#1292EE] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M12 6c-3.31 0-6 2.24-6 5 0 1.64.89 3.09 2.25 4.04L8 18l2.25-1.5c.56.1 1.15.17 1.75.17 3.31 0 6-2.24 6-5s-2.69-5-6-5z"
        fill="white"
      />
    </motion.svg>
  );
}

// Azure AD Logo
export function AzureLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#0078D4] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <path
        fill="currentColor"
        d="M5.5 3L2 18.5l7 2.5L22 3H5.5zm8.5 3l4 12-8-3 4-9z"
      />
    </motion.svg>
  );
}

// Mixpanel Logo
export function MixpanelLogo({ className, size = 24 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("text-secondary-400 hover:text-[#7856FF] transition-colors", className)}
      whileHover={{ scale: 1.1 }}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M8 14l4-6 4 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.svg>
  );
}

// Integration Logos Grid Component
export function IntegrationLogosGrid({ className }: { className?: string }) {
  const integrations = [
    { category: "Support", logos: [
      { name: "Intercom", Logo: IntercomLogo },
      { name: "Zendesk", Logo: ZendeskLogo },
      { name: "Help Scout", Logo: HelpScoutLogo },
    ]},
    { category: "Analytics", logos: [
      { name: "Segment", Logo: SegmentLogo },
      { name: "Mixpanel", Logo: MixpanelLogo },
    ]},
    { category: "SSO", logos: [
      { name: "Okta", Logo: OktaLogo },
      { name: "Azure AD", Logo: AzureLogo },
      { name: "Google", Logo: GoogleLogo },
    ]},
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {integrations.map((category) => (
        <div key={category.category}>
          <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider mb-3">
            {category.category}
          </p>
          <div className="flex items-center gap-4">
            {category.logos.map(({ name, Logo }) => (
              <div
                key={name}
                className="p-3 rounded-xl bg-white border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <Logo size={28} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
