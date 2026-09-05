import { motion } from "framer-motion";
import { Fragment, useEffect, useId, useState } from "react";
import { workflowPanels, type WorkflowStep } from "../data/workflow";
import { cn } from "../lib/utils";
import { ScrollReveal } from "./ui/ScrollReveal";
import { SectionContent, SectionIntro, SectionShell } from "./ui/SectionShell";

const FLOW_PATH = "M16.7 16.7 V50 V83.3 H50 V50 V16.7 H83.3 V50 V83.3";

const NODE_POSITIONS = [
  ["16.7", "16.7"],
  ["16.7", "50"],
  ["16.7", "83.3"],
  ["50", "50"],
  ["83.3", "16.7"],
  ["83.3", "50"],
  ["83.3", "83.3"],
] as const;

function useActiveStep(count: number, ms = 3000) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, ms);
    return () => window.clearInterval(id);
  }, [count, ms]);

  return active;
}

function WorkflowCanvas({
  steps,
  label,
  activeStep,
}: {
  steps: WorkflowStep[];
  label: string;
  activeStep: number;
}) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className="studio-workflow" aria-label={label}>
      <div className="studio-workflow__orb studio-workflow__orb--tl" aria-hidden="true" />
      <div className="studio-workflow__orb studio-workflow__orb--br" aria-hidden="true" />

      <div className="workflow-canvas">
        <svg className="workflow-map" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          <path className="workflow-path workflow-path--halo" d={FLOW_PATH} />
          <path className="workflow-path workflow-path--base" d={FLOW_PATH} />
          <path
            className="workflow-path workflow-path--glow"
            d={FLOW_PATH}
            pathLength={100}
            style={{ stroke: `url(#${gradientId})` }}
          />
          {NODE_POSITIONS.map(([cx, cy], i) => (
            <circle
              className={cn("workflow-node", i === activeStep && "workflow-node--active")}
              cx={cx}
              cy={cy}
              r="1.65"
              key={`${cx}-${cy}`}
            />
          ))}
        </svg>

        {steps.map((step, index) => (
          <WorkflowModule
            key={step.step}
            step={step}
            index={index}
            total={steps.length}
            isActive={index === activeStep}
          />
        ))}
      </div>
    </div>
  );
}

function WorkflowModule({
  step,
  index,
  total,
  isActive,
}: {
  step: WorkflowStep;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const Icon = step.icon;
  const isCenter = step.className === "workflow-module--design";

  return (
    <Fragment>
      <motion.article
        className={cn(
          "workflow-module",
          step.className,
          isActive && "workflow-module--pulse",
          isCenter && "workflow-module--hero",
        )}
        tabIndex={0}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
      >
        <span className="workflow-module__accent" aria-hidden="true" />
        <small>{step.step}</small>
        <span className="workflow-module__icon" aria-hidden="true">
          <Icon strokeWidth={1.85} />
        </span>
        <div>
          <span>{step.tag}</span>
          <strong>{step.title}</strong>
        </div>
        <p className="workflow-module__description">{step.description}</p>
      </motion.article>

      {index < total - 1 ? (
        <div className="workflow-connector" aria-hidden="true">
          <svg viewBox="0 0 40 40" preserveAspectRatio="none">
            <path className="workflow-path workflow-path--halo" d="M20 0 V40" />
            <path className="workflow-path workflow-path--base" d="M20 0 V40" />
            <path
              className="workflow-path workflow-path--glow"
              d="M20 0 V40"
              pathLength={100}
              style={{ animationDelay: `${index * 420}ms` }}
            />
            <circle
              className="workflow-node"
              cx="20"
              cy="20"
              r="2.2"
              style={{ animationDelay: `${index * 420 + 200}ms` }}
            />
          </svg>
        </div>
      ) : null}
    </Fragment>
  );
}

function WorkflowPanel({
  badge,
  title,
  description,
  label,
  steps,
}: {
  badge: string;
  title: string;
  description: string;
  label: string;
  steps: WorkflowStep[];
}) {
  const activeStep = useActiveStep(steps.length);

  return (
    <>
      <header className="dashboard-panel__header">
        <div className="dashboard-panel__intro">
          <span className="dashboard-panel__badge">{badge}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="dashboard-panel__progress" aria-hidden="true">
          {steps.map((step, i) => (
            <span
              key={step.step}
              className={cn("dashboard-panel__dot", i <= activeStep && "dashboard-panel__dot--filled")}
            />
          ))}
          <span className="dashboard-panel__step-count">
            {String(activeStep + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
          </span>
        </div>
      </header>
      <WorkflowCanvas steps={steps} label={label} activeStep={activeStep} />
    </>
  );
}

export function Workflow() {
  return (
    <SectionShell id="workflow" variant="muted" className="relative overflow-x-clip">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(34,197,94,0.07),transparent_65%)]"
        aria-hidden="true"
      />

      <SectionIntro section="workflow" />

      <SectionContent width="wide">
        <div className="workflow-section">
          {workflowPanels.map((panel, index) => (
            <ScrollReveal key={panel.id} delay={index * 0.05}>
              <section
                className="dashboard-panel dashboard-panel--approach"
                id={panel.id === "video" ? "video-workflow" : "workflow"}
              >
                <WorkflowPanel
                  badge={panel.badge}
                  title={panel.title}
                  description={panel.description}
                  label={panel.label}
                  steps={[...panel.steps]}
                />
              </section>
            </ScrollReveal>
          ))}
        </div>
      </SectionContent>
    </SectionShell>
  );
}
