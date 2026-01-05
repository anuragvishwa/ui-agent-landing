"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  grayscale?: boolean;
}

// React Logo
export function ReactLogo({ className, grayscale = true }: LogoProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn(
        "w-6 h-6 transition-all duration-300",
        grayscale ? "text-secondary-400 hover:text-[#61DAFB]" : "text-[#61DAFB]",
        className
      )}
      whileHover={{ scale: 1.1, rotate: 10 }}
    >
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 12 12)"
      />
    </motion.svg>
  );
}

// Next.js Logo
export function NextLogo({ className, grayscale = true }: LogoProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn(
        "w-6 h-6 transition-all duration-300",
        grayscale ? "text-secondary-400 hover:text-secondary-900" : "text-secondary-900",
        className
      )}
      whileHover={{ scale: 1.1 }}
    >
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5v-9l7 9h-2.5l-4.5-5.77v5.77h-2.5v-9h2.5l4.5 5.77V7.5h2.5v9h-7z"
      />
    </motion.svg>
  );
}

// Vue.js Logo
export function VueLogo({ className, grayscale = true }: LogoProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn(
        "w-6 h-6 transition-all duration-300",
        grayscale ? "text-secondary-400 hover:text-[#4FC08D]" : "text-[#4FC08D]",
        className
      )}
      whileHover={{ scale: 1.1 }}
    >
      <path
        fill="currentColor"
        d="M2 3h3.5L12 15 18.5 3H22L12 21 2 3zm6 0h2.5L12 6l1.5-3H16l-4 7.5L8 3z"
      />
    </motion.svg>
  );
}

// Angular Logo
export function AngularLogo({ className, grayscale = true }: LogoProps) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn(
        "w-6 h-6 transition-all duration-300",
        grayscale ? "text-secondary-400 hover:text-[#DD0031]" : "text-[#DD0031]",
        className
      )}
      whileHover={{ scale: 1.1 }}
    >
      <path
        fill="currentColor"
        d="M12 2L2 6.5l1.5 11L12 22l8.5-4.5 1.5-11L12 2zm0 2.25L19.5 7l-1.25 9L12 19.75 5.75 16 4.5 7 12 4.25zM12 6L7.5 16h2l.9-2.25h3.2l.9 2.25h2L12 6zm0 3.75l1.05 2.5h-2.1l1.05-2.5z"
      />
    </motion.svg>
  );
}

// Combined Framework Logos Component
interface FrameworkLogosProps {
  className?: string;
  showLabels?: boolean;
}

export function FrameworkLogos({ className, showLabels = false }: FrameworkLogosProps) {
  const frameworks = [
    { name: "React", Logo: ReactLogo },
    { name: "Next.js", Logo: NextLogo },
    { name: "Vue", Logo: VueLogo },
    { name: "Angular", Logo: AngularLogo },
  ];

  return (
    <div className={cn("flex items-center gap-6", className)}>
      {frameworks.map(({ name, Logo }) => (
        <div key={name} className="flex items-center gap-2 group cursor-pointer">
          <Logo />
          {showLabels && (
            <span className="text-sm font-medium text-secondary-400 group-hover:text-secondary-700 transition-colors hidden sm:inline">
              {name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
