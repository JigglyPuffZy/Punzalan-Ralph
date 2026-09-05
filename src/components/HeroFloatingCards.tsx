import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { AnimatedCodeEditor } from "./ui/animated-code-editor";
import { AnimatedDashboard } from "./ui/animated-dashboard";
import { AnimatedMobileApp } from "./ui/animated-mobile-app";
import { AnimatedWebApp } from "./ui/animated-web-app";

type CardVariant = "code" | "webapp" | "mobileapp" | "analytics";

interface ProductCardProps {
  variant: CardVariant;
  label: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  compact?: boolean;
}

function CardLabel({ label }: { label: string }) {
  return (
    <p className="mt-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
      <span className="text-green-dark">{label.split(" ")[0]}</span>
      {label.includes(" ") ? ` ${label.split(" ").slice(1).join(" ")}` : ""}
    </p>
  );
}

function ProductCard({
  variant,
  label,
  className = "",
  style,
  delay = 0,
  compact = false,
}: ProductCardProps) {
  const renderCard = () => {
    switch (variant) {
      case "code":
        return <AnimatedCodeEditor compact={compact} filename="Hero.tsx" snippet="hero" />;
      case "webapp":
        return <AnimatedWebApp compact={compact} />;
      case "mobileapp":
        return <AnimatedMobileApp compact={compact} />;
      case "analytics":
        return <AnimatedDashboard compact={compact} />;
    }
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 2,
        }}
      >
        {renderCard()}
        <CardLabel label={label} />
      </motion.div>
    </motion.div>
  );
}

const desktopCards = [
  {
    variant: "code" as const,
    label: "Live Code",
    rotate: -8,
    delay: 0.15,
    position: "left-0 top-[14%] xl:top-[16%]",
  },
  {
    variant: "mobileapp" as const,
    label: "Mobile App",
    rotate: 7,
    delay: 0.35,
    position: "left-0 bottom-[12%] xl:bottom-[14%]",
  },
  {
    variant: "webapp" as const,
    label: "Web App",
    rotate: 8,
    delay: 0.2,
    position: "right-0 top-[14%] xl:top-[16%]",
  },
  {
    variant: "analytics" as const,
    label: "Dashboard",
    rotate: -7,
    delay: 0.4,
    position: "right-0 bottom-[12%] xl:bottom-[14%]",
  },
];

export function HeroFloatingCardsDesktop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden justify-center overflow-hidden lg:flex"
      aria-hidden="true"
    >
      <div className="section-container relative h-full">
      {desktopCards.map((card) => (
        <div key={card.label} className={`absolute ${card.position} origin-center scale-[0.88] xl:scale-95 2xl:scale-100`}>
          <ProductCard
            variant={card.variant}
            label={card.label}
            compact
            delay={card.delay}
            style={{ rotate: `${card.rotate}deg` }}
          />
        </div>
      ))}
      </div>
    </div>
  );
}

export function HeroFloatingCardsMobile() {
  return (
    <div
      className="relative mx-auto mt-12 flex w-full max-w-sm items-start justify-center gap-8 lg:hidden"
      aria-hidden="true"
    >
      <motion.div
        className="-rotate-6"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
      >
        <AnimatedCodeEditor compact filename="Hero.tsx" snippet="hero" />
        <CardLabel label="Live Code" />
      </motion.div>
      <motion.div
        className="rotate-6"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45 }}
      >
        <AnimatedMobileApp compact />
        <CardLabel label="Mobile App" />
      </motion.div>
    </div>
  );
}
