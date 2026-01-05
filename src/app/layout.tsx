import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flexdash - On-demand UI Support That Shows Users What To Do",
  description: "Stop telling users. Start guiding them. Flexdash highlights the right UI element, guides the next step, and confirms completion. Fewer support tickets, higher onboarding completion, and less form drop-off.",
  keywords: ["UI support", "user onboarding", "product tour", "in-app guidance", "customer support", "SaaS"],
  authors: [{ name: "Flexdash" }],
  openGraph: {
    title: "Flexdash - On-demand UI Support",
    description: "On-demand UI support that shows users what to do — inside your product.",
    type: "website",
    siteName: "Flexdash",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexdash - On-demand UI Support",
    description: "On-demand UI support that shows users what to do — inside your product.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
