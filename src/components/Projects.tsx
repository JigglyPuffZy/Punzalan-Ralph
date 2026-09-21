import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clapperboard,
  Globe,
  LayoutTemplate,
  PenTool,
  Play,
  Smartphone,
} from "lucide-react";
import { useMemo, useRef, useState, type ElementType, type ReactNode } from "react";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "../data/projects";
import { getProjectImage, getProjectVideo } from "../data/projectAssets";
import { cn } from "../lib/utils";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";

const categoryIcons: Record<ProjectCategory, ElementType> = {
  web: Globe,
  mobile: Smartphone,
  uiux: PenTool,
  cms: LayoutTemplate,
  video: Clapperboard,
};

function getPreviewSizeClass(
  project: Project,
  variant: "hero" | "card" | "thumb",
) {
  const widePreview =
    project.category === "mobile" ||
    project.category === "uiux" ||
    project.category === "web" ||
    project.category === "cms";

  if (variant === "hero") {
    return "h-[168px] rounded-lg sm:aspect-[16/10] sm:h-auto sm:min-h-[240px]";
  }

  if (variant === "card") {
    return widePreview
      ? "aspect-[16/10] min-h-[150px] rounded-lg sm:min-h-[170px]"
      : "aspect-[4/3] min-h-[160px] rounded-lg";
  }

  return widePreview
    ? "aspect-[16/10] min-h-[72px] rounded-md sm:min-h-[88px]"
    : "aspect-[4/3] min-h-[88px] rounded-md sm:min-h-[100px]";
}

function getPreviewImageClass(project: Project, _variant: "hero" | "card" | "thumb") {
  const fitContain =
    project.category === "mobile" ||
    project.category === "uiux" ||
    project.category === "web" ||
    project.category === "cms";

  if (fitContain) {
    return cn(
      "h-full w-full object-contain object-center p-2 transition-transform duration-700 group-hover/preview:scale-[1.02] sm:p-2.5",
    );
  }

  return "h-full w-full object-cover object-top transition-transform duration-700 group-hover/preview:scale-[1.04]";
}

function usesRowLayout(category: ProjectCategory) {
  return category === "mobile" || category === "uiux" || category === "web" || category === "cms";
}

function PreviewFrame({
  children,
  variant,
  label,
}: {
  children: ReactNode;
  variant: "hero" | "card" | "thumb";
  label?: string;
}) {
  if (variant === "thumb") {
    return <div className="overflow-hidden rounded-lg ring-1 ring-border/50">{children}</div>;
  }

  return (
    <div
      className={cn(
        "overflow-hidden bg-white ring-1 ring-border/60",
        variant === "hero"
          ? "rounded-xl shadow-[0_12px_32px_-16px_rgba(15,23,42,0.28)] sm:rounded-[1.15rem] sm:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]"
          : "rounded-xl shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]",
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-off-white/90 px-3 py-2 sm:px-4 sm:py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden="true" />
        {label && (
          <span className="ml-1 truncate rounded-md border border-border/60 bg-white px-2 py-0.5 text-[10px] font-medium text-text-secondary sm:ml-2 sm:px-2.5 sm:text-[11px]">
            {label}
          </span>
        )}
      </div>
      <div className="bg-off-white/50 p-0.5 sm:p-1.5">{children}</div>
    </div>
  );
}

function ProjectPreview({
  project,
  variant = "card",
}: {
  project: Project;
  variant?: "hero" | "card" | "thumb";
}) {
  const imageSrc = getProjectImage(project.id);
  const videoSrc = getProjectVideo(project.id);
  const isVideo = Boolean(videoSrc) || project.category === "video";
  const isUiUx = project.category === "uiux";

  const sizeClass = getPreviewSizeClass(project, variant);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleVideoEnter = () => {
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => undefined);
  };

  const handleVideoLeave = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  const wrap = (content: ReactNode, label?: string) => (
    <PreviewFrame variant={variant} label={label}>
      {content}
    </PreviewFrame>
  );

  if (videoSrc) {
    const video = (
      <div
        className={cn("group/preview relative w-full overflow-hidden bg-text", sizeClass)}
        onMouseEnter={handleVideoEnter}
        onMouseLeave={handleVideoLeave}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoReady(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            videoReady ? "opacity-100" : "opacity-0",
          )}
          aria-label={`${project.title} preview`}
        />
        {!videoReady && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-text-secondary/20 to-text/40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover/preview:opacity-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-white/95 text-green-dark shadow-xl ring-4 ring-white/30",
              variant === "hero" ? "h-14 w-14 sm:h-16 sm:w-16" : "h-10 w-10",
            )}
          >
            <Play className={cn("fill-current", variant === "hero" ? "ml-0.5 h-5 w-5 sm:h-6 sm:w-6" : "ml-0.5 h-4 w-4")} />
          </div>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          Video
        </span>
      </div>
    );

    return variant === "thumb" ? video : wrap(video, project.title);
  }

  if (imageSrc) {
    const image = (
      <div className={cn("group/preview relative w-full overflow-hidden bg-off-white", sizeClass)}>
        <img
          src={imageSrc}
          alt={project.title}
          loading="lazy"
          className={getPreviewImageClass(project, variant)}
        />
        {project.category !== "mobile" && project.category !== "uiux" ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"
            aria-hidden="true"
          />
        ) : null}
      </div>
    );

    return variant === "thumb" ? image : wrap(image, project.title);
  }

  return (
    <div
      className={cn("group/preview relative w-full overflow-hidden", sizeClass)}
      style={{
        background: isVideo
          ? `linear-gradient(135deg, ${project.accentSecondary} 0%, ${project.accent} 100%)`
          : `linear-gradient(145deg, ${project.accentSecondary} 0%, white 55%, ${project.accentSecondary} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8), transparent 45%), radial-gradient(circle at 80% 80%, rgba(34,197,94,0.15), transparent 40%)",
        }}
        aria-hidden="true"
      />

      {!isVideo && (
        <div
          className={cn(
            "absolute",
            variant === "hero" ? "inset-4 sm:inset-6" : variant === "card" ? "inset-3" : "inset-2",
          )}
        >
          <div className="flex h-full flex-col rounded-xl border border-white/80 bg-white/90 p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md sm:rounded-2xl sm:p-3.5">
            <div className="mb-2 flex shrink-0 items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green/60" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              {variant === "hero" && (
                <span className="ml-auto truncate text-[9px] font-medium text-text-secondary/70">
                  {project.title}
                </span>
              )}
            </div>
            {isUiUx ? (
              <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
                <div className="col-span-1 space-y-2">
                  <div className="h-2.5 w-full rounded-md bg-border/80" />
                  <div className="h-2.5 w-2/3 rounded-md bg-green/35" />
                  <div className="h-2.5 w-full rounded-md bg-border/60" />
                </div>
                <div className="col-span-2 rounded-xl border border-dashed border-green/35 bg-green-pale/50" />
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col justify-center space-y-2">
                <div className="h-5 w-2/3 rounded-lg bg-green/25 sm:h-7" />
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="aspect-square rounded-lg bg-border/45" />
                  ))}
                </div>
                <div className="h-2 w-full rounded bg-border/60" />
              </div>
            )}
          </div>
        </div>
      )}

      {isVideo && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent transition-opacity duration-500 group-hover/preview:from-black/45" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "flex items-center justify-center rounded-full bg-white/95 text-green-dark shadow-xl ring-4 ring-white/30 transition-all duration-500 group-hover/preview:scale-110 group-hover/preview:shadow-green/25",
                variant === "hero" ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-10 w-10",
              )}
            >
              <Play
                className={cn(
                  "fill-current",
                  variant === "hero" ? "ml-0.5 h-6 w-6" : "ml-0.5 h-4 w-4",
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const categoryLabels: Record<ProjectCategory, string> = {
  web: "Web",
  mobile: "Mobile",
  uiux: "UI/UX",
  cms: "CMS",
  video: "Video",
};

function projectLinkLabel(project: Project) {
  if (project.category === "uiux") return "View in Figma";
  if (project.category === "cms") return "Visit site";
  return "View project";
}

function CaseStudyRow({
  project,
  index,
  featured = true,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const reverse = index % 2 === 1;
  const Icon = categoryIcons[project.category];

  return (
    <article className="group relative">
      {index > 0 && <div className="section-divider mb-12 sm:mb-16" aria-hidden="true" />}

      <div className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm sm:glass-panel sm:border-transparent sm:p-7 sm:shadow-none lg:p-8">
          <div
            className={cn(
              "flex flex-col gap-5 sm:items-center sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-14",
            )}
          >
            <div
              className={cn(
                "order-1 flex min-w-0 flex-col lg:py-1",
                reverse ? "lg:order-1" : "lg:order-2",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                {featured ? (
                  <span className="inline-flex items-center rounded-full bg-green px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm shadow-green/25">
                    Featured
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-off-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                  <Icon className="h-3 w-3 text-green-dark/80" aria-hidden="true" />
                  {categoryLabels[project.category]}
                </span>
              </div>

              <h3 className="mt-3 font-heading text-2xl font-semibold leading-[1.15] text-text sm:mt-4 sm:text-[clamp(1.75rem,3vw,2.45rem)]">
                {project.title}
              </h3>

              {(project.role || project.period) && (
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
                  {[project.role, project.period].filter(Boolean).join(" · ")}
                </p>
              )}

              {project.description && (
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-text-secondary sm:mt-4 sm:rounded-2xl sm:bg-off-white/80 sm:px-4 sm:py-3.5 sm:text-base sm:leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-green/30 transition-all duration-300 hover:bg-green-dark sm:mt-6 sm:w-fit sm:justify-start lg:mt-7"
                >
                  {projectLinkLabel(project)}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>

            <div
              className={cn(
                "order-2 min-w-0 lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:-translate-y-1",
                reverse ? "lg:order-2" : "lg:order-1",
              )}
            >
              <ProjectPreview project={project} variant="hero" />
            </div>
          </div>
      </div>
    </article>
  );
}

function ProjectGridCard({ project }: { project: Project }) {
  const Icon = categoryIcons[project.category];
  const content = (
    <>
      <div className="p-3 pb-0 sm:p-4 sm:pb-0">
        <ProjectPreview project={project} variant="card" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-pale px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-dark">
            <Icon className="h-3 w-3" aria-hidden="true" />
            {categoryLabels[project.category]}
          </span>
          {project.url ? (
            <ArrowUpRight className="h-4 w-4 shrink-0 text-green opacity-0 transition-all duration-300 group-hover:opacity-100" />
          ) : null}
        </div>
        <h3 className="mt-2.5 font-heading text-lg font-semibold leading-snug text-text transition-colors duration-300 group-hover:text-green-dark sm:text-xl">
          {project.title}
        </h3>
        {(project.role || project.period) && (
          <p className="mt-1.5 text-sm text-text-secondary">
            {[project.role, project.period].filter(Boolean).join(" · ")}
          </p>
        )}
        {project.description && (
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-text-secondary">
            {project.description}
          </p>
        )}
        {project.url ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-green-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {projectLinkLabel(project)}
          </p>
        ) : null}
      </div>
    </>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(34,197,94,0.2)]"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(34,197,94,0.2)]">
      {content}
    </article>
  );
}

function CategoryFilterNav({
  activeCategory,
  onSelect,
  counts,
  layout = "horizontal",
}: {
  activeCategory: ProjectCategory;
  onSelect: (id: ProjectCategory) => void;
  counts: Record<ProjectCategory, number>;
  layout?: "horizontal" | "vertical";
}) {
  return (
    <nav
      className={cn(
        "flex gap-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        layout === "horizontal"
          ? "-mx-1 snap-x snap-mandatory overflow-x-auto scroll-pl-4 px-1 pb-0.5"
          : "mx-0 mt-3 flex-col overflow-visible px-0 pb-0",
      )}
      aria-label="Project categories"
    >
      {projectCategories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const Icon = categoryIcons[cat.id];

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={cn(
              "relative flex shrink-0 snap-start items-center gap-2 overflow-hidden rounded-full px-3.5 py-2 text-left text-sm font-medium transition-all duration-300 sm:px-4 sm:py-2.5",
              layout === "vertical" && "w-full rounded-xl py-3",
              isActive
                ? "bg-green text-white shadow-md shadow-green/25"
                : "border border-border/70 bg-white text-text-secondary hover:border-green/30 hover:text-green-dark dark:border-white/10 dark:bg-[#111827]",
            )}
          >
            {isActive && layout === "vertical" && (
              <span
                className="absolute inset-y-2 left-1 w-1 rounded-full bg-white/70"
                aria-hidden="true"
              />
            )}
            <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-green-dark/70")} />
            <span>{cat.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
                layout === "vertical" && "ml-auto px-2",
                isActive ? "bg-white/20 text-white" : "bg-green-pale text-green-dark dark:bg-green/10",
              )}
            >
              {counts[cat.id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function CategorySidebar({
  activeCategory,
  onSelect,
  counts,
}: {
  activeCategory: ProjectCategory;
  onSelect: (id: ProjectCategory) => void;
  counts: Record<ProjectCategory, number>;
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="lg:glass-panel lg:rounded-2xl lg:p-5">
        <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary lg:block">
          Browse by discipline
        </p>
        <CategoryFilterNav
          activeCategory={activeCategory}
          onSelect={onSelect}
          counts={counts}
          layout="vertical"
        />
      </div>

      <div className="glass-panel-soft mt-5 hidden rounded-2xl p-5 lg:block">
        <p className="font-heading text-lg font-semibold text-text">Selected work</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Web, mobile, UI/UX, CMS, and video projects built with clarity and polish.
        </p>
      </div>
    </aside>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("web");

  const counts = useMemo(() => {
    const tally = {} as Record<ProjectCategory, number>;
    for (const cat of projectCategories) {
      tally[cat.id] = projects.filter((p) => p.category === cat.id).length;
    }
    return tally;
  }, []);

  const filtered = useMemo(
    () => projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const totalFeatured = projects.filter((p) => p.featured).length;
  const archiveUsesRows = usesRowLayout(activeCategory);

  return (
    <SectionShell id="projects" variant="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,rgba(34,197,94,0.07),transparent)]"
        aria-hidden="true"
      />

      <SectionIntro section="projects" id="projects-title" className="[&_header]:mb-6 sm:[&_header]:mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 px-1 sm:gap-2.5">
          <span className="rounded-full border border-border/70 bg-white px-3 py-1.5 text-xs font-medium text-text sm:px-4 sm:py-2 sm:text-sm">
            {projects.length} total projects
          </span>
          <span className="rounded-full border border-green/20 bg-green-pale px-3 py-1.5 text-xs font-medium text-green-dark sm:px-4 sm:py-2 sm:text-sm">
            {totalFeatured} featured case studies
          </span>
        </div>
      </SectionIntro>

      <div className="sticky top-[4.75rem] z-30 -mx-[clamp(1.25rem,4vw,2rem)] border-y border-border/50 bg-off-white/95 px-[clamp(1.25rem,4vw,2rem)] py-3 backdrop-blur-md sm:top-[5.25rem] lg:hidden">
        <CategoryFilterNav
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          counts={counts}
          layout="horizontal"
        />
      </div>

      <SectionContent width="wide" className="relative mt-4 sm:mt-6">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,17.5rem)_1fr] xl:gap-14">
          <div className="hidden lg:block">
            <CategorySidebar
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              counts={counts}
            />
          </div>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8 sm:space-y-14"
              >
                {filtered.length === 0 ? (
                  <p className="rounded-2xl border border-border bg-white py-16 text-center text-text-secondary">
                    No projects in this category yet.
                  </p>
                ) : (
                  <>
                    {featured.length > 0 && (
                      <div>
                        {featured.map((project, i) => (
                          <ScrollReveal key={project.id} delay={i * 0.06}>
                            <CaseStudyRow project={project} index={i} />
                          </ScrollReveal>
                        ))}
                      </div>
                    )}

                    {rest.length > 0 && (
                      <>
                        {(featured.length > 0 || archiveUsesRows) && (
                          <div
                            className={cn(
                              "flex items-end justify-between gap-4",
                              archiveUsesRows ? "mb-8 sm:mb-10" : "mb-5 border-b border-border/60 pb-5",
                              featured.length > 0 && archiveUsesRows
                                ? "mt-10 border-t border-border/60 pt-8 sm:mt-12 sm:pt-10"
                                : "",
                            )}
                          >
                            <div>
                              {featured.length > 0 ? (
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-dark">
                                  Archive
                                </p>
                              ) : null}
                              <h3
                                className={cn(
                                  "font-heading font-semibold text-text",
                                  featured.length > 0 ? "mt-1 text-2xl" : "text-[clamp(1.5rem,3vw,2rem)]",
                                )}
                              >
                                {featured.length > 0 ? "More projects" : "Projects"}
                              </h3>
                            </div>
                            <span className="rounded-full bg-green-pale px-3 py-1 text-xs font-semibold text-green-dark">
                              {rest.length} items
                            </span>
                          </div>
                        )}

                        {archiveUsesRows ? (
                          <div>
                            {rest.map((project, i) => (
                              <ScrollReveal key={project.id} delay={i * 0.04}>
                                <CaseStudyRow project={project} index={i} featured={false} />
                              </ScrollReveal>
                            ))}
                          </div>
                        ) : (
                          <div className="glass-panel-soft rounded-[1.75rem] p-4 sm:p-6">
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                              {rest.map((project, i) => (
                                <ScrollReveal key={project.id} delay={i * 0.03}>
                                  <ProjectGridCard project={project} />
                                </ScrollReveal>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionContent>
    </SectionShell>
  );
}
