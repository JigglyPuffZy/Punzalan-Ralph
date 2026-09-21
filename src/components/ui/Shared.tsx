import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";
import { SectionHeader } from "./SectionShell";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  showArrow?: boolean;
}

export function MagneticButton({
  children,
  href,
  download,
  target,
  rel,
  onClick,
  variant = "primary",
  className = "",
  showArrow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "border border-green/20 bg-green text-white shadow-md shadow-green/25 hover:border-green/30 hover:bg-green-dark hover:shadow-lg hover:shadow-green/30",
    secondary:
      "border border-border/80 bg-white text-text shadow-sm hover:border-green/30 hover:bg-green-pale hover:text-green-dark hover:shadow-md hover:shadow-green/10",
    ghost: "text-text hover:text-green-dark px-0 py-0",
  };

  const content = (
    <>
      {children}
      {showArrow && variant !== "ghost" && (
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`group ${baseStyles} ${variants[variant]} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={`group ${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </motion.button>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <SectionHeader
      id={id}
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={`${align === "left" ? "!text-left [&_.section-header-eyebrow]:!justify-start" : ""} ${className}`.trim()}
    />
  );
}
