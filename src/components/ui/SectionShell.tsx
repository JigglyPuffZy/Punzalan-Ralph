import type { ReactNode } from "react";
import { sectionHeaders } from "../../data/site";
import { cn } from "../../lib/utils";
import { ScrollReveal } from "./ScrollReveal";

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "white" | "muted";
}

export function SectionShell({
  id,
  children,
  className = "",
  variant = "white",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-[5.5rem] py-16 sm:py-20 lg:py-28",
        variant === "muted" ? "bg-off-white" : "bg-white",
        className,
      )}
    >
      <div className="section-container">{children}</div>
    </section>
  );
}

type SectionContentWidth = "narrow" | "content" | "wide" | "full";

interface SectionContentProps {
  children: ReactNode;
  className?: string;
  width?: SectionContentWidth;
}

const contentWidthClass: Record<SectionContentWidth, string> = {
  narrow: "section-content-narrow",
  content: "section-content",
  wide: "section-content-wide",
  full: "section-content-full",
};

export function SectionContent({
  children,
  className = "",
  width = "content",
}: SectionContentProps) {
  return (
    <div className={`relative ${contentWidthClass[width]} ${className}`.trim()}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  children?: ReactNode;
}

interface SectionTitleProps {
  lead: string;
  accent: string;
  trailing?: string;
}

export function SectionTitle({ lead, accent, trailing = "" }: SectionTitleProps) {
  return (
    <>
      {lead}{" "}
      <span className="text-green-dark">{accent}</span>
      {trailing}
    </>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  className = "",
  children,
}: SectionHeaderProps) {
  return (
    <header
      className={cn("section-content-narrow mb-10 text-center sm:mb-14", className)}
    >
      {eyebrow && (
        <div className="section-header-eyebrow">
          <span className="section-header-line" aria-hidden="true" />
          <span className="section-header-badge">{eyebrow}</span>
          <span className="section-header-line" aria-hidden="true" />
        </div>
      )}

      {title ? (
        <h2
          id={id}
          className="font-heading text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.12] tracking-tight text-text md:text-5xl"
        >
          {title}
        </h2>
      ) : null}

      <div className="section-header-mark" aria-hidden="true" />

      {subtitle ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {subtitle}
        </p>
      ) : null}

      {children ? <div className="mt-5">{children}</div> : null}
    </header>
  );
}

export type SectionKey = keyof typeof sectionHeaders;

interface SectionIntroProps {
  section: SectionKey;
  id?: string;
  subtitle?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Unified section header — same eyebrow chip, title, mark, and subtitle on every section */
export function SectionIntro({
  section,
  id,
  subtitle,
  className,
  children,
}: SectionIntroProps) {
  const config = sectionHeaders[section];
  const trailing = "titleTrailing" in config ? config.titleTrailing : undefined;

  return (
    <ScrollReveal className={cn("w-full", className)}>
      <SectionHeader
        id={id}
        eyebrow={config.eyebrow}
        title={
          <SectionTitle
            lead={config.titleLead}
            accent={config.titleAccent}
            trailing={trailing}
          />
        }
        subtitle={subtitle ?? ("subtitle" in config ? config.subtitle : undefined)}
      >
        {children}
      </SectionHeader>
    </ScrollReveal>
  );
}
