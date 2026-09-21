import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Code2, MapPin, Palette } from "lucide-react";
import { useState } from "react";
import { profileImage } from "../data/site";
import { cn } from "../lib/utils";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";

type ModeId = "build" | "design" | "edit";

const modes: {
  id: ModeId;
  label: string;
  verb: string;
  icon: typeof Code2;
  headline: string;
  body: string;
  tags: string[];
  tint: string;
  glow: string;
  accent: string;
  chip: string;
}[] = [
  {
    id: "build",
    label: "Build",
    verb: "ship",
    icon: Code2,
    headline: "Production-ready interfaces, not just mockups.",
    body: "I write React and TypeScript, structure components cleanly, and care about performance, accessibility, and what happens after deploy.",
    tags: ["React", "TypeScript", "Tailwind", "Vite", "Supabase"],
    tint: "from-green/20 via-green/5 to-transparent",
    glow: "bg-green/25",
    accent: "text-green-dark",
    chip: "bg-green-pale text-green-dark ring-green/20 dark:bg-green/15",
  },
  {
    id: "design",
    label: "Design",
    verb: "craft",
    icon: Palette,
    headline: "Layouts that feel obvious the first time you use them.",
    body: "From wireframes to polished UI, I focus on hierarchy, spacing, and flows that make products easy to understand without a manual.",
    tags: ["Figma", "UI/UX", "Design systems", "Prototyping"],
    tint: "from-emerald-400/15 via-emerald-400/5 to-transparent",
    glow: "bg-emerald-400/20",
    accent: "text-emerald-600 dark:text-emerald-400",
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
  },
  {
    id: "edit",
    label: "Edit",
    verb: "tell",
    icon: Clapperboard,
    headline: "Stories cut with rhythm, clarity, and intent.",
    body: "Video editing and motion work that supports the message — pacing, transitions, and visuals that keep people watching until the end.",
    tags: ["Premiere Pro", "DaVinci Resolve", "CapCut", "Motion"],
    tint: "from-lime-400/15 via-lime-400/5 to-transparent",
    glow: "bg-lime-400/20",
    accent: "text-lime-700 dark:text-lime-300",
    chip: "bg-lime-50 text-lime-800 ring-lime-200/80 dark:bg-lime-500/10 dark:text-lime-300 dark:ring-lime-500/20",
  },
];

const stats = [
  { value: "3+", label: "Years" },
  { value: "20+", label: "Projects" },
  { value: "10+", label: "Clients" },
];

const principles = ["Problem solving", "Continuous learning", "Ship with care"];

function AvatarRing({ glowClass }: { glowClass: string }) {
  const [src, setSrc] = useState(profileImage.src);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative mx-auto h-[8.5rem] w-[8.5rem] sm:h-[9.5rem] sm:w-[9.5rem]">
      <div
        className={cn(
          "pointer-events-none absolute -inset-6 rounded-full blur-3xl transition-colors duration-700",
          glowClass,
        )}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-green/25 [animation-duration:22s]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-2 animate-spin rounded-full border border-green/15 [animation-direction:reverse] [animation-duration:14s]"
        aria-hidden="true"
      />
      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-green via-green-light to-green-pale p-[3px] shadow-[0_8px_32px_rgba(34,197,94,0.35)]">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-white dark:bg-[#0c121c]">
          {!loaded ? (
            <div className="absolute inset-0 animate-pulse bg-green-pale dark:bg-green/10" />
          ) : null}
          <img
            src={src}
            alt={profileImage.alt}
            className={cn(
              "h-full w-full object-cover object-[center_12%] transition-transform duration-700 hover:scale-105",
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
        </div>
      </div>
      <span className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-green/30 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-dark shadow-[0_4px_20px_rgba(34,197,94,0.2)] backdrop-blur-sm dark:bg-[#0c121c]/95">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
        </span>
        Open to work
      </span>
    </div>
  );
}

function ModePanel({ mode }: { mode: (typeof modes)[number] }) {
  return (
    <motion.div
      key={mode.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10"
    >
      <div className="min-w-0">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ring-1",
            mode.chip,
          )}
        >
          {mode.label} mode
        </span>
        <p className="mt-4 font-heading text-[clamp(1.45rem,3.2vw,2.15rem)] font-semibold leading-[1.2] tracking-tight text-text">
          {mode.headline}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-[1.85] text-text-secondary sm:text-[1.05rem]">
          {mode.body}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 lg:max-w-[220px] lg:flex-col lg:items-stretch">
        {mode.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
            className="rounded-xl border border-white/60 bg-white/80 px-3.5 py-2 text-xs font-semibold text-text-secondary shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function About() {
  const [activeMode, setActiveMode] = useState<ModeId>("build");
  const current = modes.find((m) => m.id === activeMode)!;

  return (
    <SectionShell id="about" variant="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-green/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-green-light/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <p className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(9rem,30vw,20rem)] font-bold leading-none text-green/[0.035] dark:text-green/[0.055]">
          R4
        </p>
      </div>

      <SectionIntro section="about" className="relative z-10" />

      <SectionContent width="wide" className="relative z-10 mt-6 sm:mt-8">
        <ScrollReveal>
          <div className="about-console relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_32px_80px_-24px_rgba(34,197,94,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0a1018]/80 sm:p-8 lg:p-11">
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br transition-all duration-700",
                current.tint,
              )}
            />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center text-center">
              <AvatarRing glowClass={current.glow} />

              <p className="mt-10 font-heading text-[clamp(1.85rem,4.5vw,3rem)] font-semibold tracking-tight text-text">
                R4lph Matthew{" "}
                <span className="bg-gradient-to-r from-green-dark to-green bg-clip-text text-transparent">
                  Punzalan
                </span>
              </p>

              <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-text-secondary sm:text-base">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/70 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                  <MapPin className="h-3.5 w-3.5 text-green-dark" strokeWidth={2} />
                  Isabela, Philippines
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-white/70 px-3 py-1.5 dark:border-white/10 dark:bg-white/5">
                  I
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.verb}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className={cn("font-bold capitalize", current.accent)}
                    >
                      {current.verb}
                    </motion.span>
                  </AnimatePresence>
                  digital products
                </span>
              </p>
            </div>

            <div className="relative mt-10 flex justify-center">
              <div
                className="inline-flex gap-1.5 overflow-x-auto rounded-2xl border border-border/50 bg-off-white/90 p-1.5 shadow-inner dark:border-white/10 dark:bg-black/20 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="What I do"
              >
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = activeMode === mode.id;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveMode(mode.id)}
                      className={cn(
                        "relative flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 transition-colors duration-300 sm:min-w-[130px] sm:flex-col sm:px-6 sm:py-4",
                        isActive ? "text-text" : "text-text-secondary hover:text-text",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="about-mode-pill"
                          className="absolute inset-0 rounded-xl border border-white/80 bg-white shadow-[0_8px_24px_-8px_rgba(34,197,94,0.35)] dark:border-white/15 dark:bg-[#111827]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                          isActive
                            ? cn("ring-1", mode.chip)
                            : "bg-white/60 dark:bg-white/5",
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="relative text-sm font-semibold sm:text-base">
                        {mode.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-10 rounded-[1.35rem] border border-border/40 bg-white/50 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
              <AnimatePresence mode="wait">
                <ModePanel mode={current} />
              </AnimatePresence>
            </div>

            <div className="relative mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="rounded-2xl border border-border/50 bg-gradient-to-b from-white to-green-pale/30 px-3 py-4 text-center shadow-sm transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/10 dark:from-white/5 dark:to-green/5 sm:px-4"
                  >
                    <p className="font-heading text-2xl font-bold text-green-dark sm:text-[1.65rem]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <blockquote className="rounded-2xl border border-green/15 bg-green-pale/40 px-5 py-4 dark:border-green/20 dark:bg-green/10 sm:max-w-xs">
                <p className="font-heading text-sm italic leading-relaxed text-text sm:text-[0.95rem]">
                  &ldquo;Every problem has a solution. Keep learning, keep building.&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="about-marquee relative mt-5 overflow-hidden rounded-full border border-green/15 bg-gradient-to-r from-white via-green-pale/40 to-white py-3.5 dark:from-[#0c121c] dark:via-green/10 dark:to-[#0c121c]">
            <div className="about-marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0c121c]" />
            <div className="about-marquee-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0c121c]" />
            <div className="about-marquee-track flex w-max items-center gap-10 px-6">
              {[...principles, ...principles].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.22em] text-green-dark/80"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-green/60" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionContent>
    </SectionShell>
  );
}
