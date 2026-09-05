import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  Layers,
  MapPin,
  PenTool,
  Rocket,
  Video,
} from "lucide-react";
import { useCallback, useEffect } from "react";
import type { ExperienceAchievement } from "../data/experience";
import { experienceRoles } from "../data/experience";
import { resumeDownloadName, resumePdfUrl } from "../data/site";
import { useExperience } from "../hooks/useExperience";
import { cn } from "../lib/utils";
import { ExperienceCompanyMark } from "./experience/ExperienceCompanyMark";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";

function AchievementIcon({ icon }: { icon: ExperienceAchievement["icon"] }) {
  const props = { className: "h-4 w-4", strokeWidth: 1.75 };
  switch (icon) {
    case "chart":
      return <BarChart3 {...props} />;
    case "rocket":
      return <Rocket {...props} />;
    case "layers":
      return <Layers {...props} />;
    case "video":
      return <Video {...props} />;
    case "design":
      return <PenTool {...props} />;
    default:
      return <Code2 {...props} />;
  }
}

function RolePickerItem({
  role,
  isActive,
  onSelect,
}: {
  role: (typeof experienceRoles)[number];
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      data-role-id={role.id}
      aria-current={isActive ? "true" : undefined}
      aria-label={`${role.title} at ${role.company}, ${role.period}`}
      onClick={() => onSelect(role.id)}
      className={cn(
        "group flex min-w-[240px] shrink-0 items-center gap-3 rounded-2xl border bg-white p-3 text-left shadow-sm transition-all duration-300 sm:min-w-[260px] sm:p-3.5",
        isActive
          ? "border-green/30 shadow-md shadow-green/10 ring-1 ring-green/15"
          : "border-border/70 hover:border-green/20 hover:shadow-md hover:shadow-green/5",
      )}
    >
      <ExperienceCompanyMark
        company={role.company}
        initials={role.initials}
        logoSrc={role.logoSrc}
        isActive={isActive}
        className="h-11 w-11 transition-all duration-300"
      />
      <span className="min-w-0 flex-1">
        <strong className="block truncate text-sm font-semibold text-text">{role.company}</strong>
        <span className="mt-0.5 block truncate text-xs text-text-secondary">{role.title}</span>
        <em className="mt-1 block truncate text-[11px] not-italic text-green-dark/80">
          {role.period}
        </em>
      </span>
    </button>
  );
}

export function Experience() {
  const { activeExperience, activeExperienceId, setActiveExperienceId } = useExperience();
  const carouselRoles = [...experienceRoles, ...experienceRoles];

  const activeIndex = experienceRoles.findIndex((role) => role.id === activeExperienceId);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;

  const goToRole = useCallback(
    (index: number) => {
      const role = experienceRoles[index];
      if (role) setActiveExperienceId(role.id);
    },
    [setActiveExperienceId],
  );

  const goPrev = useCallback(() => {
    const nextIndex = safeIndex === 0 ? experienceRoles.length - 1 : safeIndex - 1;
    goToRole(nextIndex);
  }, [goToRole, safeIndex]);

  const goNext = useCallback(() => {
    const nextIndex = safeIndex === experienceRoles.length - 1 ? 0 : safeIndex + 1;
    goToRole(nextIndex);
  }, [goToRole, safeIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <SectionShell id="experience" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-green/5 blur-3xl" />
        <span className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-green-pale blur-3xl" />
      </div>

      <SectionIntro section="experience" id="experience-title" />

      <SectionContent width="wide">
        <div className="relative w-full">
        <nav className="relative" aria-label="Experience roles">
          <button
            type="button"
            aria-label="Previous role"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-white text-text-secondary shadow-sm transition-colors hover:border-green/25 hover:text-green-dark"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label="Next role"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-white text-text-secondary shadow-sm transition-colors hover:border-green/25 hover:text-green-dark"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="exp-picker-viewport overflow-hidden px-10 sm:px-12">
            <div className="exp-picker-track flex w-max flex-nowrap gap-3 pb-1">
              {carouselRoles.map((role, index) => (
                <RolePickerItem
                  key={`${role.id}-${index}`}
                  role={role}
                  isActive={activeExperienceId === role.id}
                  onSelect={setActiveExperienceId}
                />
              ))}
            </div>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeExperienceId}
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden rounded-[1.75rem] border border-border/70 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3 sm:px-6">
              <button
                type="button"
                aria-label="Previous role"
                onClick={goPrev}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-green-pale hover:text-green-dark"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {safeIndex + 1} of {experienceRoles.length}
              </span>
              <button
                type="button"
                aria-label="Next role"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-green-pale hover:text-green-dark"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <header className="border-b border-border/60 p-5 text-center sm:p-7 lg:p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex w-full max-w-2xl flex-col items-center gap-5">
                  <ExperienceCompanyMark
                    company={activeExperience.company}
                    initials={activeExperience.initials}
                    logoSrc={activeExperience.logoSrc}
                    isActive
                    className="h-16 w-16 rounded-2xl text-base"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap justify-center gap-2">
                      {activeExperience.isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-pale px-3 py-1 text-[11px] font-semibold text-green-dark ring-1 ring-green/15">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-40" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                          </span>
                          Current Role
                        </span>
                      ) : null}
                      <span className="rounded-full border border-border/80 bg-off-white px-3 py-1 text-[11px] font-semibold text-text-secondary">
                        {activeExperience.employmentType}
                      </span>
                      <span className="rounded-full border border-green/10 bg-green-pale/50 px-3 py-1 text-[11px] font-semibold text-green-dark">
                        {activeExperience.duration}
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-2xl font-semibold text-text sm:text-3xl">
                      {activeExperience.title}
                    </h3>
                    <p className="mt-1 text-base font-medium text-text-secondary">
                      {activeExperience.company}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-text-secondary">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 shrink-0 text-green-dark/70" strokeWidth={2} />
                        {activeExperience.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 shrink-0 text-green-dark/70" strokeWidth={2} />
                        {activeExperience.period}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={resumePdfUrl}
                  download={resumeDownloadName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-green/20 bg-white px-4 py-2.5 text-sm font-semibold text-text shadow-sm transition-all hover:border-green/35 hover:bg-green-pale hover:text-green-dark hover:shadow-md hover:shadow-green/10 sm:px-5 sm:py-3"
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Download Resume
                </a>
              </div>

              <p className="mt-6 text-base leading-[1.85] text-text-secondary">
                {activeExperience.summary}
              </p>

              <div className="mt-6 flex flex-col items-center gap-5 border-t border-border/60 pt-6 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
                <div className="min-w-0 flex-1 text-center lg:max-w-sm">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    Focus
                  </span>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {activeExperience.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-green/15 bg-green-pale/60 px-3 py-1 text-xs font-medium text-green-dark"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden w-px self-stretch bg-border/60 lg:block" aria-hidden="true" />

                <div className="min-w-0 flex-1 text-center lg:max-w-sm">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    Stack
                  </span>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {activeExperience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/80 bg-off-white px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <div className="grid gap-0 lg:grid-cols-2">
              <section className="border-b border-border/60 p-5 text-center sm:p-7 lg:border-b-0 lg:border-r lg:text-left">
                <h4 className="font-heading text-lg font-semibold text-text">Key Responsibilities</h4>
                <ul className="mt-4 space-y-3">
                  {activeExperience.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-left text-sm leading-relaxed text-text-secondary lg:text-left"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-pale text-green-dark"
                        aria-hidden="true"
                      >
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="p-5 text-center sm:p-7 lg:text-left">
                <h4 className="font-heading text-lg font-semibold text-text">Key Achievements</h4>
                <div className="mt-4 space-y-3">
                  {activeExperience.achievements.map((achievement) => (
                    <article
                      key={achievement.title}
                      className="flex gap-3 rounded-2xl border border-border/60 bg-off-white/50 p-4 text-left transition-colors hover:border-green/20 hover:bg-green-pale/30"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-dark ring-1 ring-green/10"
                        aria-hidden="true"
                      >
                        <AchievementIcon icon={achievement.icon} />
                      </span>
                      <div className="min-w-0">
                        <strong className="block text-sm font-semibold text-text">
                          {achievement.title}
                        </strong>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                          {achievement.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </motion.article>
        </AnimatePresence>
        </div>
      </SectionContent>
    </SectionShell>
  );
}
