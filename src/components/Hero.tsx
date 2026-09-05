import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { heroCopy, heroSocialLinks, resumeDownloadName, resumePdfUrl } from "../data/site";
import { HeroFloatingCardsDesktop, HeroFloatingCardsMobile } from "./HeroFloatingCards";
import { GenerateButton } from "./ui/generate-button";
import { SocialLinkButton } from "./ui/SocialIcon";
import { MagneticButton } from "./ui/Shared";

function HeroSocialLinks() {
  return (
    <motion.div
      className="mt-5 flex items-center justify-center gap-2.5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      {heroSocialLinks.map((link) => (
        <SocialLinkButton key={link.label} href={link.href} label={link.label} variant="icon" />
      ))}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-[5.5rem] min-h-[100svh] overflow-hidden bg-white pt-[5rem] sm:pt-[5.5rem]">
      <div className="pointer-events-none absolute inset-0 mesh-green" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-pale/70 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-green/5 blur-3xl" />
        <div className="dot-grid absolute inset-0 opacity-[0.28]" />
      </div>

      <HeroFloatingCardsDesktop />

      <div className="section-container relative z-10 flex min-h-[calc(100svh-5rem)] items-center justify-center pb-8 sm:min-h-[calc(100svh-5.5rem)] sm:pb-10">
        <div className="section-content-hero text-center">
          <motion.p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-green-dark sm:text-xs sm:tracking-[0.25em]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {heroCopy.tagline}
          </motion.p>

          <motion.h1
            className="font-heading text-[clamp(1.85rem,3.8vw+0.75rem,3.5rem)] font-semibold leading-[1.1] tracking-tight text-text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <span className="block">{heroCopy.headline.line1}</span>
            <span className="block">
              {heroCopy.headline.line2}.
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroCopy.description}
          </motion.p>

          <motion.div
            className="mx-auto mt-6 flex w-full max-w-lg flex-col items-center sm:mt-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              <GenerateButton
                variant="green"
                hue={142}
                idleLabel="View My Work"
                activeLabel="Opening..."
                onClick={() => {
                  window.setTimeout(() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }, 1100);
                }}
              />
              <MagneticButton
                href={resumePdfUrl}
                download={resumeDownloadName}
                variant="secondary"
                showArrow={false}
                className="h-[3.25rem] w-full px-8 sm:w-auto"
              >
                <Download className="h-4 w-4 shrink-0" />
                Download Resume
              </MagneticButton>
            </div>
          </motion.div>

          <HeroSocialLinks />

          <HeroFloatingCardsMobile />
        </div>
      </div>
    </section>
  );
}
