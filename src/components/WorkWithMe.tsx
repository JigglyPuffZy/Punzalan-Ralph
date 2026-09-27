import { motion } from "framer-motion";
import { ArrowUpRight, Clapperboard, Code2, Palette } from "lucide-react";
import type { ReactNode } from "react";
import {
  availability,
  hireProcess,
  quickFacts,
  services,
  testimonials,
} from "../data/hiring";
import { githubUrl, hireMailto, linkedInUrl, portfolioRepoUrl } from "../data/site";
import { cn } from "../lib/utils";
import { platformFromLabel, SocialIcon } from "./ui/SocialIcon";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";
import { VideoShowreel } from "./VideoShowreel";

const serviceIcons = {
  dev: Code2,
  design: Palette,
  video: Clapperboard,
} as const;

const serviceAccent: Record<string, string> = {
  dev: "from-green/15 to-transparent group-hover:from-green/25",
  design: "from-emerald-400/12 to-transparent group-hover:from-emerald-400/20",
  video: "from-lime-400/12 to-transparent group-hover:from-lime-400/20",
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green-dark">{children}</p>
  );
}

export function WorkWithMe() {
  return (
    <SectionShell id="work-with-me" variant="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-green/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-green-light/10 blur-3xl"
        aria-hidden="true"
      />

      <SectionIntro section="trust" />

      <SectionContent width="wide" className="mt-6 sm:mt-8">
        <ScrollReveal>
          <div className="hire-console relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0a1018]/85 sm:p-8 lg:p-10">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgba(34,197,94,0.12),transparent_55%)]"
              aria-hidden="true"
            />

            {/* Availability hero */}
            <div className="relative border-b border-border/50 pb-8 dark:border-white/10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green-pale/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-green-dark shadow-sm dark:bg-green/10">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                    </span>
                    {availability.badge}
                  </span>
                  <h3 className="mt-4 font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tight text-text">
                    {availability.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {availability.roles.join(" · ")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {availability.modes.map((mode) => (
                      <span
                        key={mode}
                        className="rounded-full border border-green/15 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-green-dark shadow-sm dark:border-green/20 dark:bg-white/5 dark:text-green-light"
                      >
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:max-w-md lg:grid-cols-2">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-border/50 bg-gradient-to-b from-white to-green-pale/30 px-4 py-3.5 text-center shadow-sm dark:border-white/10 dark:from-white/[0.04] dark:to-green/5"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-text">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="relative border-b border-border/50 py-8 dark:border-white/10">
              <SectionLabel>What I can build for you</SectionLabel>
              <div className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-5">
                {services.map((service, index) => {
                  const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
                  return (
                    <motion.article
                      key={service.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.45 }}
                      className="group relative overflow-hidden rounded-[1.35rem] border border-border/50 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green/25 hover:shadow-[0_16px_40px_-16px_rgba(34,197,94,0.28)] dark:border-white/10 dark:bg-[#0c121c] sm:p-6"
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity duration-300",
                          serviceAccent[service.id],
                        )}
                      />
                      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-green-pale text-green-dark ring-1 ring-green/15 dark:bg-green/10">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <h4 className="relative mt-4 font-heading text-xl font-semibold text-text">
                        {service.title}
                      </h4>
                      <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">
                        {service.description}
                      </p>
                      <ul className="relative mt-4 flex flex-wrap gap-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="rounded-lg border border-border/50 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-text-secondary dark:border-white/10 dark:bg-white/5"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            {/* Process timeline */}
            <div className="relative border-b border-border/50 py-8 dark:border-white/10">
              <SectionLabel>How we work together</SectionLabel>
              <div className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div
                  className="pointer-events-none absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-green/30 to-transparent lg:block"
                  aria-hidden="true"
                />
                {hireProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="relative rounded-2xl border border-border/50 bg-off-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-5"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green text-xs font-bold text-white shadow-md shadow-green/30">
                      {step.step}
                    </span>
                    <h4 className="mt-4 font-semibold text-text">{step.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Video + testimonials */}
            <div className="relative grid gap-8 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
              <VideoShowreel />

              <div>
                <SectionLabel>Client feedback</SectionLabel>
                <p className="mt-2 text-sm text-text-secondary">
                  From government, agency, and freelance collaborations.
                </p>
                <div className="mt-5 space-y-4">
                  {testimonials.map((item, index) => (
                    <motion.blockquote
                      key={item.author}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      className="relative overflow-hidden rounded-2xl border border-border/50 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0c121c]"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-green via-green-light to-green/30" />
                      <p className="pl-3 text-sm leading-[1.75] text-text-secondary">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <footer className="mt-4 flex items-center gap-3 pl-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-pale text-xs font-bold text-green-dark dark:bg-green/10">
                          {item.author.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-text">{item.author}</p>
                          <p className="text-xs text-text-secondary">{item.role}</p>
                        </div>
                      </footer>
                    </motion.blockquote>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-[1.35rem] border border-green/20 bg-gradient-to-r from-green via-green-dark to-green p-[1px]">
              <div className="rounded-[1.3rem] bg-gradient-to-br from-green-pale/90 via-white to-white px-5 py-6 dark:from-[#0c121c] dark:via-[#0c121c] dark:to-green/10 sm:px-8 sm:py-7">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-heading text-xl font-semibold text-text sm:text-2xl">
                      Ready to hire or start a project?
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
                      Send your scope, timeline, and budget. I reply within 24 hours.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        { label: "LinkedIn", href: linkedInUrl },
                        { label: "GitHub", href: githubUrl },
                        { label: "Email", href: hireMailto },
                        { label: "Portfolio code", href: portfolioRepoUrl, platform: "github" as const },
                      ].map(({ label, href, platform }) => (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("mailto") ? undefined : "_blank"}
                          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/90 px-3.5 py-2 text-xs font-semibold text-text-secondary transition hover:border-green/30 hover:text-green-dark dark:border-white/10 dark:bg-white/5"
                        >
                          <SocialIcon
                            platform={platform ?? platformFromLabel(label)}
                            className="h-3.5 w-3.5"
                          />
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href={hireMailto}
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green/30 transition hover:bg-green-dark lg:w-auto"
                  >
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionContent>
    </SectionShell>
  );
}
