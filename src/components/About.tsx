import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { profileImage } from "../data/site";
import { cn } from "../lib/utils";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";

const highlights = [
  { value: "3+", label: "Years experience" },
  { value: "20+", label: "Web projects" },
  { value: "10+", label: "Clients served" },
];

const principles = ["Problem solving", "Continuous learning", "Ship with care"];

const focusTags = ["Web", "Mobile", "Video"];

function ProfilePhoto() {
  const [src, setSrc] = useState(profileImage.src);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px]">
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-green/20 via-green-pale/80 to-transparent"
          aria-hidden="true"
        />

        <div className="relative rounded-[1.65rem] bg-white p-2 pb-3 shadow-[0_24px_60px_-16px_rgba(34,197,94,0.35)] ring-1 ring-green/15">
          <div className="relative aspect-[3/4] min-h-[320px] overflow-hidden rounded-[1.25rem] bg-slate-200">
            {!loaded ? (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-green-pale to-slate-100" />
            ) : null}
            <img
              src={src}
              alt={profileImage.alt}
              className={cn(
                "relative z-[1] block h-full w-full object-cover object-[center_10%] transition-opacity duration-500",
                loaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setLoaded(true)}
              onError={() => {
                setLoaded(false);
                setSrc(profileImage.fallback);
              }}
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16 bg-gradient-to-t from-black/25 to-transparent" />
          </div>

          <div className="mt-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green/25 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-green-dark shadow-sm ring-1 ring-green/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              Open to Work
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 text-center">
        <p className="font-heading text-2xl font-semibold tracking-tight text-text sm:text-[1.65rem]">
          R4lph Matthew Punzalan
        </p>
        <p className="mt-1.5 text-sm font-medium text-text-secondary">
          Developer, Designer, Editor
        </p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <SectionShell id="about" variant="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_0%,rgba(34,197,94,0.08),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-green/5 blur-3xl"
        aria-hidden="true"
      />

      <SectionIntro section="about" />

      <SectionContent width="wide" className="mt-10 sm:mt-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-center lg:gap-16 xl:gap-20">
          <ScrollReveal className="min-w-0 lg:sticky lg:top-[6.5rem] lg:self-start">
            <ProfilePhoto />

            <div className="mt-8 grid grid-cols-3 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="rounded-2xl border border-green/15 bg-white/90 px-2 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-green/30 hover:shadow-md hover:shadow-green/10 sm:px-3 sm:py-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <p className="font-heading text-2xl font-bold text-green-dark sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium leading-snug text-text-secondary sm:text-[11px]">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <div className="min-w-0 space-y-5">
            <ScrollReveal delay={0.05}>
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white p-6 shadow-[0_12px_48px_rgba(15,23,42,0.06)] sm:p-8 lg:p-9">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-pale/80 blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-pale text-green-dark ring-1 ring-green/15">
                    <Sparkles className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-heading text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                      Hi, I&apos;m R4lph.
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      Front-end developer, UI/UX designer, and video editor in{" "}
                      <span className="font-medium text-green-dark">Isabela, Philippines</span>.
                    </p>
                  </div>
                </div>

                <p className="relative mt-6 text-base leading-[1.85] text-text-secondary sm:text-[1.05rem]">
                  I help brands and teams turn ideas into products people enjoy using. From the first
                  sketch to the final deploy, and the video cut that tells the story, I care about
                  how things{" "}
                  <span className="font-medium text-text">look</span>, how they{" "}
                  <span className="font-medium text-text">work</span>, and how they{" "}
                  <span className="font-medium text-text">feel</span>.
                </p>
                <p className="relative mt-4 text-base leading-[1.85] text-text-secondary sm:text-[1.05rem]">
                  My work spans web and mobile interfaces, front-end development, and video content.
                  I like clean layouts, thoughtful UX, and shipping work that holds up in the real
                  world.
                </p>

                <div className="relative mt-7 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-pale px-4 py-2 text-sm font-semibold text-green-dark ring-1 ring-green/20">
                    <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
                    Isabela, Philippines
                  </span>
                  {focusTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 bg-off-white px-4 py-2 text-sm font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <blockquote className="relative overflow-hidden rounded-2xl border border-green/20 bg-gradient-to-br from-white via-white to-green-pale/40 p-6 sm:p-8">
                <span
                  className="pointer-events-none absolute right-4 top-2 font-heading text-6xl leading-none text-green/[0.12] sm:text-7xl"
                  aria-hidden="true"
                >
                  &rdquo;
                </span>
                <p className="relative max-w-2xl font-heading text-lg italic leading-[1.75] text-text sm:text-xl">
                  &ldquo;Every problem has a solution. Keep learning, keep building, and never stop
                  improving.&rdquo;
                </p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {principles.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-green/15 bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-dark"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </SectionContent>
    </SectionShell>
  );
}
