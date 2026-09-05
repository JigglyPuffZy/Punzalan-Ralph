import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(event) =>
        toggleTheme({
          x: event.clientX,
          y: event.clientY,
        })
      }
      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-white/90 text-green-dark shadow-sm transition-all duration-300 hover:border-green/30 hover:bg-green-pale dark:border-white/10 dark:bg-white/5 dark:text-green-light dark:hover:border-green/30 dark:hover:bg-green/10 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        key={theme}
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {isDark ? (
          <Sun className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
        ) : (
          <Moon className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
        )}
      </motion.span>
    </button>
  );
}
