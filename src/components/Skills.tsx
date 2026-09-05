import { useCallback, useMemo, useRef, useState } from "react";
import { skillGroups } from "../data/site";
import { SkillPreviewPanel, SkillSectionCard } from "./skills/SkillTile";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";
const groupDescriptions: Record<string, string> = {
  design: "Design systems, interfaces, and creative tooling.",
  frontend: "Interfaces and experiences shipped to production.",
  backend: "APIs, databases, and deployment workflows.",
  platforms: "CMS platforms and no-code / low-code builds.",
  video: "Editing, motion, and post-production tools.",
};

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);

  const activeSectionTitle = useMemo(() => {
    if (!activeSkill) return undefined;
    return skillGroups.find((group) => group.skills.includes(activeSkill))?.title;
  }, [activeSkill]);

  const handleSkillSelect = useCallback((skill: string) => {
    setActiveSkill(skill);

    requestAnimationFrame(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const target = isDesktop ? previewRef.current : mobilePreviewRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const navClearance = 96;
      const inView = rect.top >= navClearance && rect.bottom <= window.innerHeight - 16;

      if (!inView) {
        target.scrollIntoView({ behavior: "smooth", block: isDesktop ? "nearest" : "nearest" });
      }
    });
  }, []);

  return (
    <SectionShell id="skills" variant="muted" className="relative overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.32) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(34,197,94,0.08),transparent_65%)]"
        aria-hidden="true"
      />

      <SectionIntro section="skills" />

      <SectionContent width="wide">
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="flex flex-col gap-8 sm:gap-10">
            {skillGroups.map((group, index) => (
              <ScrollReveal key={group.id} delay={index * 0.05}>
                <SkillSectionCard
                  id={group.id}
                  title={group.title}
                  skills={group.skills}
                  description={groupDescriptions[group.id]}
                  activeSkill={activeSkill}
                  onSkillSelect={handleSkillSelect}
                />
              </ScrollReveal>
            ))}
          </div>

          <div ref={previewRef} className="relative hidden self-stretch lg:block">
            <div className="sticky top-24 z-10">
              <SkillPreviewPanel name={activeSkill} sectionTitle={activeSectionTitle} />
            </div>
          </div>
        </div>

        <div ref={mobilePreviewRef} className="mt-8 scroll-mt-28 lg:hidden">
          <SkillPreviewPanel name={activeSkill} sectionTitle={activeSectionTitle} />
        </div>
      </SectionContent>
    </SectionShell>
  );
}
