import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  getFaviconUrl,
  getSkillBrand,
  getSkillInitials,
} from "../../data/skillIcons";
import { cn } from "../../lib/utils";

function SkillLogo({
  name,
  className = "h-7 w-7",
}: {
  name: string;
  className?: string;
}) {
  const { theme } = useTheme();
  const [failed, setFailed] = useState(false);
  const brand = getSkillBrand(name, theme === "dark");

  if (!brand || failed) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-green-pale font-heading text-[10px] font-bold text-green-dark",
          className,
        )}
        aria-hidden="true"
      >
        {getSkillInitials(name)}
      </span>
    );
  }

  return (
    <img
      src={brand.icon}
      alt=""
      className={cn("shrink-0 object-contain", className)}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function SkillPreviewPanel({
  name,
  sectionTitle,
}: {
  name: string | null;
  sectionTitle?: string;
}) {
  const brand = name ? getSkillBrand(name) : null;
  const [showFallback, setShowFallback] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!name || !brand) {
      setShowFallback(true);
      return;
    }

    setShowFallback(false);
    timerRef.current = window.setTimeout(() => setShowFallback(true), 2000);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [name, brand]);

  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.03] dark:border-white/10 dark:bg-[#0c121c] dark:shadow-[0_16px_48px_-20px_rgba(0,0,0,0.5)] dark:ring-white/5"
    >
      <div className="border-b border-border/50 bg-gradient-to-r from-green-pale/80 via-white to-white px-4 py-3 dark:border-white/10 dark:from-green/10 dark:via-[#0c121c] dark:to-[#0c121c]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          {sectionTitle ? `${sectionTitle} preview` : "Tool preview"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {name && brand ? (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 border-b border-border/50 bg-off-white/90 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <div className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border/50 bg-white px-2 py-1 dark:border-white/10 dark:bg-white/5">
                <img
                  src={getFaviconUrl(brand.domain)}
                  alt=""
                  className="h-3.5 w-3.5 shrink-0"
                  loading="lazy"
                />
                <span className="truncate text-[11px] font-medium text-text-secondary">
                  {brand.domain}
                </span>
              </div>
            </div>

            <div className="relative h-40 overflow-hidden bg-white dark:bg-[#0a0f18]">
              {!showFallback ? (
                <iframe
                  src={brand.url}
                  title={`${name} preview`}
                  className="h-[200%] w-[200%] origin-top-left scale-50 border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className="flex h-full flex-col items-center justify-center gap-2.5 p-5 text-center"
                  style={{
                    background: `linear-gradient(165deg, ${brand.accent}20 0%, #ffffff 50%, ${brand.accent}08 100%)`,
                  }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.15)] ring-1 ring-black/[0.04]">
                    <SkillLogo name={name} className="h-8 w-8" />
                  </div>
                  <p className="font-heading text-base font-semibold text-text">{name}</p>
                  <p className="text-xs text-text-secondary">{brand.domain}</p>
                </div>
              )}
            </div>

            <a
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 bg-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-dark"
            >
              Visit {name}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[15rem] flex-col items-center justify-center gap-2 px-5 py-8 text-center"
          >
            <p className="font-heading text-base font-semibold text-text">Pick a tool</p>
            <p className="text-sm leading-relaxed text-text-secondary">
              {sectionTitle
                ? `Hover or click a tool in ${sectionTitle} to preview it here.`
                : "Hover or click any tool to preview its official site."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SkillChip({
  name,
  active,
  onSelect,
}: {
  name: string;
  active?: boolean;
  onSelect?: (skill: string) => void;
}) {
  const brand = getSkillBrand(name);
  const url = brand?.url;

  if (!url) {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-off-white/60 px-3 py-2 opacity-60">
        <SkillLogo name={name} className="h-5 w-5" />
        <span className="text-sm font-medium text-text">{name}</span>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Open ${name}`}
      onMouseEnter={() => onSelect?.(name)}
      onFocus={() => onSelect?.(name)}
      onClick={() => onSelect?.(name)}
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-green/35 hover:shadow-[0_8px_20px_-10px_rgba(34,197,94,0.3)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/40",
        "dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-green/10",
        active
          ? "border-green/40 bg-green-pale ring-2 ring-green/15 dark:bg-green/10"
          : "border-border/55",
      )}
    >
      <SkillLogo name={name} className="h-5 w-5" />
      <span className="text-sm font-medium text-text">{name}</span>
      <ExternalLink className="h-3 w-3 shrink-0 text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
    </a>
  );
}

const groupAccent: Record<string, string> = {
  design: "bg-[#F24E1E]",
  frontend: "bg-[#0ea5e9]",
  backend: "bg-[#22c55e]",
  platforms: "bg-[#21759B]",
  video: "bg-[#8b5cf6]",
};

export function SkillSectionCard({
  id,
  title,
  skills,
  description,
  activeSkill,
  onSkillSelect,
}: {
  id: string;
  title: string;
  skills: string[];
  description: string;
  activeSkill: string | null;
  onSkillSelect: (skill: string) => void;
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-white p-5 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] sm:p-6",
        "dark:border-white/10 dark:bg-[#0c121c] dark:shadow-[0_8px_30px_-18px_rgba(0,0,0,0.45)]",
      )}
    >
      <div
        className={cn(
          "absolute inset-y-5 left-0 w-1 rounded-r-full sm:inset-y-6",
          groupAccent[id] ?? groupAccent.backend,
        )}
        aria-hidden="true"
      />

      <div className="mb-4 pl-3 sm:mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
          {skills.length} tools
        </p>
        <h3 className="mt-0.5 font-heading text-xl font-semibold text-text sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 pl-3">
        {skills.map((skill) => (
          <SkillChip
            key={skill}
            name={skill}
            active={activeSkill === skill}
            onSelect={onSkillSelect}
          />
        ))}
      </div>
    </article>
  );
}
