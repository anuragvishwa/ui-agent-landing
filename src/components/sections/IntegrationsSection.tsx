"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { fadeInUp, staggerContainer, cardHoverGlow } from "@/lib/animations";
import {
  IntercomLogo,
  ZendeskLogo,
  HelpScoutLogo,
  SegmentLogo,
  MixpanelLogo,
  OktaLogo,
  AzureLogo,
  GoogleLogo,
} from "@/components/illustrations/IntegrationLogos";
import {
  ReactLogo,
  NextLogo,
  VueLogo,
  AngularLogo,
} from "@/components/illustrations/FrameworkLogos";
import { Plug, ArrowRight } from "lucide-react";

const integrations = [
  {
    category: "Support",
    description: "Send context to your help desk",
    items: [
      { name: "Intercom", Logo: IntercomLogo },
      { name: "Zendesk", Logo: ZendeskLogo },
      { name: "Help Scout", Logo: HelpScoutLogo },
    ],
  },
  {
    category: "Analytics",
    description: "Track user behavior and events",
    items: [
      { name: "Segment", Logo: SegmentLogo },
      { name: "Mixpanel", Logo: MixpanelLogo },
    ],
  },
  {
    category: "SSO",
    description: "Enterprise authentication",
    items: [
      { name: "Okta", Logo: OktaLogo },
      { name: "Azure AD", Logo: AzureLogo },
      { name: "Google", Logo: GoogleLogo },
    ],
  },
  {
    category: "Frameworks",
    description: "Works with any DOM framework",
    items: [
      { name: "React", Logo: ReactLogo },
      { name: "Next.js", Logo: NextLogo },
      { name: "Vue", Logo: VueLogo },
      { name: "Angular", Logo: AngularLogo },
    ],
  },
];

export function IntegrationsSection() {
  return (
    <section className="section-padding bg-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          badge="Integrations"
          title="Works with your existing stack"
          description="Seamlessly integrate with your support, analytics, and authentication tools."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {integrations.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-secondary-200/80 shadow-soft hover:shadow-elevated hover:border-primary-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-secondary-900">
                  {category.category}
                </h3>
              </div>
              <p className="text-xs text-secondary-500 mb-4">
                {category.description}
              </p>
              <div className="space-y-2">
                {category.items.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary-50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-secondary-100 shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                      <item.Logo size={20} />
                    </div>
                    <span className="text-secondary-700 font-medium text-sm">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Works with anything */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-secondary-200 shadow-soft">
            <Plug className="w-4 h-4 text-primary-600" />
            <p className="text-secondary-600 text-sm">
              Works on{" "}
              <span className="font-semibold text-secondary-900">
                React, Next, Vue, Angular
              </span>{" "}
              — anything DOM-based
            </p>
            <ArrowRight className="w-4 h-4 text-primary-600" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
