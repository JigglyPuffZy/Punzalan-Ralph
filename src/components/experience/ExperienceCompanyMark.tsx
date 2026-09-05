import { useState } from "react";
import { cn } from "../../lib/utils";

interface ExperienceCompanyMarkProps {
  company: string;
  initials: string;
  logoSrc?: string;
  isActive?: boolean;
  className?: string;
}

export function ExperienceCompanyMark({
  company,
  initials,
  logoSrc,
  isActive = false,
  className,
}: ExperienceCompanyMarkProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(logoSrc) && !logoFailed;

  return (
    <div
      aria-hidden="true"
      title={company}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 transition-all duration-300",
        showLogo
          ? cn(
              "bg-white ring-border/60",
              isActive && "ring-2 ring-green/40 shadow-sm shadow-green/10",
            )
          : cn(
              "bg-gradient-to-br from-green-pale to-green/10 font-heading text-xs font-bold text-green-dark ring-green/15",
              isActive && "bg-green text-white ring-green/30",
            ),
        className,
      )}
    >
      {showLogo ? (
        <img
          src={logoSrc}
          alt=""
          className="h-full w-full object-contain p-1.5"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}
