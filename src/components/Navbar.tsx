import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../data/site";
import { cn } from "../lib/utils";
import { BrandLogo } from "./ui/BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

const leftNavLinks = navLinks.slice(0, 3);
const rightNavLinks = navLinks.slice(3);

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 lg:px-4",
        isActive
          ? "bg-green text-white shadow-md shadow-green/25"
          : "text-text-secondary hover:bg-green-pale hover:text-green-dark dark:hover:bg-green/10 dark:hover:text-green-light",
      )}
    >
      {label}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "section-container !max-w-[76rem] !px-0 transition-all duration-300",
          )}
        >
          <div
            className={cn(
              "relative flex h-[3.75rem] items-center rounded-2xl border px-3 sm:h-[4.25rem] sm:rounded-[1.25rem] sm:px-4",
              "backdrop-blur-xl transition-all duration-300",
              scrolled
                ? "border-green/20 bg-white/92 shadow-[0_10px_40px_-12px_rgba(34,197,94,0.18)] dark:border-green/25 dark:bg-[#0a101c]/92 dark:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.65)]"
                : "border-border/60 bg-white/75 dark:border-white/10 dark:bg-[#0a101c]/72",
            )}
          >
            {/* Desktop — split nav with centered logo */}
            <div className="hidden w-full grid-cols-[1fr_auto_1fr] items-center xl:grid">
              <nav className="flex items-center justify-end gap-0.5 pr-6" aria-label="Primary left">
                <ul className="flex items-center gap-0.5">
                  {leftNavLinks.map((link) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    return (
                      <li key={link.href}>
                        <NavLink href={link.href} label={link.label} isActive={isActive} />
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <BrandLogo />

              <div className="flex items-center justify-start gap-3 pl-6">
                <nav aria-label="Primary right">
                  <ul className="flex items-center gap-0.5">
                    {rightNavLinks.map((link) => {
                      const isActive = activeSection === link.href.replace("#", "");
                      return (
                        <li key={link.href}>
                          <NavLink href={link.href} label={link.label} isActive={isActive} />
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="ml-1 flex items-center gap-2 border-l border-border/70 pl-3 dark:border-white/10">
                  <ThemeToggle />
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-green px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-green/25 transition hover:bg-green-dark hover:shadow-lg hover:shadow-green/30"
                  >
                    Let&apos;s Talk
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile — centered logo */}
            <div className="flex w-full items-center justify-between xl:hidden">
              <ThemeToggle />

              <BrandLogo className="absolute left-1/2 -translate-x-1/2" />

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-white/90 text-text transition hover:border-green/30 hover:text-green-dark dark:border-white/10 dark:bg-white/5 dark:hover:border-green/30"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[110] bg-text/30 backdrop-blur-sm xl:hidden dark:bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[120] flex w-[min(100%,320px)] flex-col border-l border-border/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a101c] xl:hidden"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 dark:border-white/10">
                <BrandLogo />
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 text-text dark:border-white/10"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-1 p-4">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <a
                        href={link.href}
                        className={cn(
                          "block rounded-xl px-4 py-3.5 text-base font-medium transition",
                          isActive
                            ? "bg-green text-white shadow-md shadow-green/25"
                            : "text-text-secondary hover:bg-green-pale hover:text-text dark:hover:bg-green/10 dark:hover:text-green-light",
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="border-t border-border/80 p-4 dark:border-white/10">
                <a
                  href="#contact"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-green py-3 text-sm font-semibold text-white shadow-md shadow-green/25"
                  onClick={() => setMobileOpen(false)}
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
