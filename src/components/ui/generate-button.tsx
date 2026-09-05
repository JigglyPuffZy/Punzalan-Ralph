import { useState, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface GenerateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hue?: number;
  variant?: "dark" | "green";
  isGenerating?: boolean;
  idleLabel?: string;
  activeLabel?: string;
}

export function GenerateButton({
  hue = 210,
  variant = "dark",
  isGenerating: controlledIsGenerating,
  idleLabel = "Generate",
  activeLabel = "Generating",
  className,
  onClick,
  ...props
}: GenerateButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isGenerating =
    controlledIsGenerating !== undefined ? controlledIsGenerating : isFocused;
  const minWidth = `${Math.max(idleLabel.length, activeLabel.length) * 0.55 + 2}em`;
  const isGreen = variant === "green";

  return (
    <div className="relative w-full sm:w-auto">
      <style>{`
        .gen-btn {
          --border-radius: ${isGreen ? "9999px" : "24px"};
          --padding: 4px;
          --transition: 0.4s;
          --button-color: ${isGreen ? "#16a34a" : "#101010"};
          --button-color-active: ${isGreen ? "#15803d" : "hsla(var(--highlight-color-hue), 50%, 20%, 0.5)"};
          --highlight-color-hue: ${isGreen ? "142" : hue}deg;
          --border-color: ${isGreen ? "rgba(74, 222, 128, 0.55)" : "rgba(255, 255, 255, 0.133)"};
          --letter-color: ${isGreen ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.333)"};
          --svg-fill: ${isGreen ? "#f0fdf4" : "#e8e8e8"};
          position: relative;
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.7em 1.15em 0.7em 1.15em;
          min-height: 3.25rem;
          width: 100%;
          font-family: "Inter", "Segoe UI", sans-serif;
          font-size: 1em;
          font-weight: 500;
          background: ${isGreen
            ? "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)"
            : "var(--button-color)"};
          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, ${isGreen ? "0.35" : "0.2"}),
            inset 0px 2px 2px rgba(255, 255, 255, ${isGreen ? "0.2" : "0.15"}),
            inset 0px 4px 4px rgba(255, 255, 255, ${isGreen ? "0.1" : "0.1"}),
            ${isGreen ? "0 6px 18px rgba(34, 197, 94, 0.32)," : ""}
            0px -1px 1px rgba(0, 0, 0, 0.02),
            0px -2px 2px rgba(0, 0, 0, 0.03),
            0px -4px 4px rgba(0, 0, 0, 0.05);
          border: solid 1px var(--border-color);
          border-radius: var(--border-radius);
          cursor: pointer;
          isolation: isolate;
          transition: box-shadow var(--transition), border var(--transition), background var(--transition), transform var(--transition);
        }
        @media (min-width: 640px) {
          .gen-btn { width: auto; }
        }
        .gen-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: calc(var(--border-radius) + var(--padding));
          pointer-events: none;
          background-image: ${isGreen
            ? "linear-gradient(0deg, rgba(21,128,61,0.5), rgba(34,197,94,0.85))"
            : "linear-gradient(0deg, rgba(0,0,0,0.267), rgba(0,0,0,0.667))"};
          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
          box-shadow: ${isGreen
            ? "0 8px 24px rgba(34, 197, 94, 0.35),"
            : "0 -8px 8px -6px rgba(0,0,0,0) inset, 0 -16px 16px -8px rgba(0,0,0,0) inset,"}
            1px 1px 1px rgba(255,255,255,0.133),
            2px 2px 2px rgba(255,255,255,0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-color-hue), 100%, ${isGreen ? "85%" : "70%"}),
            hsla(var(--highlight-color-hue), 100%, 70%, 50%),
            8%,
            transparent
          );
          opacity: ${isGreen ? "0.35" : "0"};
          transition: opacity var(--transition), filter var(--transition);
        }
        .gen-btn-letter {
          position: relative;
          display: inline-block;
          color: var(--letter-color);
          animation: gen-letter-anim 2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
        }
        @keyframes gen-letter-anim {
          50% { text-shadow: 0 0 6px rgba(255,255,255,0.8); color: #fff; }
        }
        .gen-btn-svg {
          flex-shrink: 0;
          height: 22px;
          width: 22px;
          margin-right: 0.5rem;
          fill: none;
          stroke: var(--svg-fill);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: gen-flicker 2s linear infinite;
          animation-delay: 0.5s;
          filter: drop-shadow(0 0 2px rgba(255,255,255,0.6));
          transition: stroke var(--transition), filter var(--transition), opacity var(--transition);
        }
        @keyframes gen-flicker { 50% { opacity: 0.3; } }
        .gen-txt-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          min-width: ${minWidth};
          height: 1.25em;
        }
        .gen-txt-1, .gen-txt-2 {
          position: absolute;
          left: 0;
          white-space: nowrap;
          word-spacing: -0.05em;
        }
        .gen-txt-1 { animation: gen-appear-anim 1s ease-in-out forwards; }
        .gen-txt-2 { opacity: 0; }
        @keyframes gen-appear-anim {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .gen-btn[data-generating="true"] .gen-txt-1 {
          animation: gen-opacity-anim 0.3s ease-in-out forwards;
          animation-delay: 1s;
        }
        .gen-btn[data-generating="true"] .gen-txt-2 {
          animation: gen-opacity-anim 0.3s ease-in-out reverse forwards;
          animation-delay: 1s;
        }
        @keyframes gen-opacity-anim {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .gen-btn[data-generating="true"] .gen-btn-letter {
          animation: gen-focused-letter-anim 1s ease-in-out forwards, gen-letter-anim 1.2s ease-in-out infinite;
          animation-delay: 0s, 1s;
        }
        @keyframes gen-focused-letter-anim {
          0%, 100% { filter: blur(0px); }
          50% {
            transform: scale(2);
            filter: blur(10px) brightness(150%) drop-shadow(-36px 12px 12px hsl(var(--highlight-color-hue), 100%, 70%));
          }
        }
        .gen-btn[data-generating="true"] .gen-btn-svg {
          animation-duration: 1.2s;
          animation-delay: 0.2s;
        }
        .gen-btn[data-generating="true"]::before {
          box-shadow: 0 -8px 12px -6px rgba(255,255,255,0.2) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 20%) inset,
            1px 1px 1px rgba(255,255,255,0.2),
            2px 2px 2px rgba(255,255,255,0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn[data-generating="true"]::after {
          opacity: 0.6;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .gen-btn-letter:nth-child(1) { animation-delay: 0s; }
        .gen-btn-letter:nth-child(2) { animation-delay: 0.08s; }
        .gen-btn-letter:nth-child(3) { animation-delay: 0.16s; }
        .gen-btn-letter:nth-child(4) { animation-delay: 0.24s; }
        .gen-btn-letter:nth-child(5) { animation-delay: 0.32s; }
        .gen-btn-letter:nth-child(6) { animation-delay: 0.4s; }
        .gen-btn-letter:nth-child(7) { animation-delay: 0.48s; }
        .gen-btn-letter:nth-child(8) { animation-delay: 0.56s; }
        .gen-btn-letter:nth-child(9) { animation-delay: 0.64s; }
        .gen-btn-letter:nth-child(10) { animation-delay: 0.72s; }
        .gen-btn-letter:nth-child(11) { animation-delay: 0.8s; }
        .gen-btn-letter:nth-child(12) { animation-delay: 0.88s; }
        .gen-btn-letter:nth-child(13) { animation-delay: 0.96s; }
        .gen-btn:hover {
          border: solid 1px ${isGreen ? "rgba(187, 247, 208, 0.9)" : "hsla(var(--highlight-color-hue), 100%, 80%, 40%)"};
          ${isGreen ? "transform: translateY(-1px); box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5), inset 0 1px 1px rgba(255,255,255,0.4);" : ""}
        }
        .gen-btn:hover::before {
          box-shadow: 0 -8px 8px -6px rgba(255,255,255,0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
            1px 1px 1px rgba(255,255,255,0.133),
            2px 2px 2px rgba(255,255,255,0.067),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn:hover::after { opacity: 1; mask-image: linear-gradient(0deg, #fff, transparent); }
        .gen-btn:hover .gen-btn-svg {
          stroke: #fff;
          filter: drop-shadow(0 0 3px hsl(var(--highlight-color-hue), 100%, 70%)) drop-shadow(0 -4px 6px rgba(0,0,0,0.6));
          animation: none;
        }
        .gen-btn:active {
          border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 70%);
          background: ${isGreen ? "linear-gradient(180deg, #16a34a 0%, #15803d 100%)" : "var(--button-color-active)"};
          ${isGreen ? "transform: translateY(0);" : ""}
        }
        .gen-btn:active::before {
          box-shadow: 0 -8px 12px -6px rgba(255,255,255,0.667) inset,
            0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 80%) inset,
            1px 1px 1px rgba(255,255,255,0.267),
            2px 2px 2px rgba(255,255,255,0.133),
            -1px -1px 1px rgba(0,0,0,0.133),
            -2px -2px 2px rgba(0,0,0,0.067);
        }
        .gen-btn:active::after { opacity: 1; mask-image: linear-gradient(0deg, #fff, transparent); filter: brightness(200%); }
        .gen-btn:active .gen-btn-letter {
          text-shadow: 0 0 1px hsla(var(--highlight-color-hue), 100%, 90%, 90%);
          animation: none;
        }
      `}</style>

      <button
        type="button"
        className={cn("gen-btn", className)}
        data-generating={isGenerating}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={(e) => {
          setIsFocused(true);
          onClick?.(e);
        }}
        {...props}
      >
        <svg className="gen-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
        <div className="gen-txt-wrapper">
          <div className="gen-txt-1">
            {idleLabel.split("").map((letter, i) => (
              <span key={`t1-${i}`} className="gen-btn-letter">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
          <div className="gen-txt-2">
            {activeLabel.split("").map((letter, i) => (
              <span key={`t2-${i}`} className="gen-btn-letter">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default GenerateButton;
