import { brandLogo } from "../../data/site";
import { cn } from "../../lib/utils";

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
};

export function BrandLogo({
  className,
  iconClassName,
  showWordmark = false,
}: BrandLogoProps) {
  return (
    <a
      href="#home"
      className={cn(
        "group inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]",
        className,
      )}
      aria-label="R4lph home"
    >
      <img
        src={brandLogo.src}
        alt=""
        width={44}
        height={44}
        className={cn(
          "h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11",
          iconClassName,
        )}
        decoding="async"
      />
      {showWordmark ? (
        <span className="sr-only">R4lph</span>
      ) : null}
    </a>
  );
}
