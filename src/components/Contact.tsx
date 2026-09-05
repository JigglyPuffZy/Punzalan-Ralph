import { AnimatePresence, motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { contactQuotes, socialLinks } from "../data/site";
import { SocialLinkButton } from "./ui/SocialIcon";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";
import { MagneticButton } from "./ui/Shared";

export function Contact() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % contactQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionShell id="contact" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-green-pale)_0%,_transparent_55%)]"
        aria-hidden="true"
      />

      <SectionIntro section="contact">
        <div className="mx-auto min-h-[4.5rem] max-w-xl">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quoteIndex}
              className="text-base italic leading-relaxed text-text-secondary sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              &ldquo;{contactQuotes[quoteIndex]}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </SectionIntro>

      <SectionContent width="narrow">
        <div className="flex w-full flex-col items-center gap-10">
          <ScrollReveal className="w-full text-center">
            <MagneticButton
              href="mailto:ralphmatthewpunzalan23@gmail.com"
              className="w-full justify-center sm:w-auto"
            >
              Let&apos;s Work Together
            </MagneticButton>

            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-text-secondary">
              <Clock className="h-4 w-4 shrink-0 text-green" />
              Usually replies within 24 hours
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} className="w-full">
            <div className="rounded-3xl border border-border bg-off-white p-6 text-center sm:p-8 lg:p-10">
              <ul className="space-y-6">
                <li>
                  <a
                    href="mailto:ralphmatthewpunzalan23@gmail.com"
                    className="group flex flex-col items-center gap-3 rounded-xl p-1 transition-colors sm:flex-row sm:items-start sm:text-left"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-pale text-green-dark">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Email
                      </p>
                      <p className="mt-1 break-all text-sm font-medium text-text transition-colors group-hover:text-green-dark sm:text-base">
                        ralphmatthewpunzalan23@gmail.com
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+639453386067"
                    className="group flex flex-col items-center gap-3 rounded-xl p-1 transition-colors sm:flex-row sm:items-start sm:text-left"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-pale text-green-dark">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Phone
                      </p>
                      <p className="mt-1 text-sm font-medium text-text transition-colors group-hover:text-green-dark sm:text-base">
                        0945 338 6067
                      </p>
                    </div>
                  </a>
                </li>
                <li className="flex flex-col items-center gap-3 p-1 sm:flex-row sm:items-start sm:text-left">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-pale text-green-dark">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="pt-0.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-medium text-text sm:text-base">
                      Centro Santo Tomas, Isabela, Philippines
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 border-t border-border pt-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Connect
                </p>
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
                  {socialLinks.map((link) => (
                    <SocialLinkButton key={link.label} href={link.href} label={link.label} variant="pill" />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionContent>
    </SectionShell>
  );
}
