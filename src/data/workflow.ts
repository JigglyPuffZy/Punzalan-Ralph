import {
  Code2,
  Eye,
  FolderOpen,
  Layers,
  Map,
  Megaphone,
  Music2,
  Palette,
  Rocket,
  Scissors,
  Send,
  Target,
  TestTube2,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type WorkflowModuleClass =
  | "workflow-module--start"
  | "workflow-module--discover"
  | "workflow-module--strategy"
  | "workflow-module--design"
  | "workflow-module--build"
  | "workflow-module--review"
  | "workflow-module--launch";

export interface WorkflowStep {
  className: WorkflowModuleClass;
  description: string;
  icon: LucideIcon;
  step: string;
  tag: string;
  title: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    className: "workflow-module--start",
    step: "01",
    tag: "Brief",
    title: "Project Brief",
    description: "Align on goals, scope, timeline, and success metrics before any design or build work begins.",
    icon: Megaphone,
  },
  {
    className: "workflow-module--discover",
    step: "02",
    tag: "Research",
    title: "User Goals",
    description: "Research audience needs, pain points, and the outcomes the product should deliver.",
    icon: Target,
  },
  {
    className: "workflow-module--strategy",
    step: "03",
    tag: "Plan",
    title: "Clear Roadmap",
    description: "Break the project into milestones, priorities, and a realistic delivery sequence.",
    icon: Map,
  },
  {
    className: "workflow-module--design",
    step: "04",
    tag: "Design",
    title: "Clean Interface",
    description: "Shape wireframes and polished UI that match the brand and keep the user flow intuitive.",
    icon: Layers,
  },
  {
    className: "workflow-module--build",
    step: "05",
    tag: "Build",
    title: "Working Product",
    description: "Develop responsive, performant features with clean, maintainable front-end code.",
    icon: Code2,
  },
  {
    className: "workflow-module--review",
    step: "06",
    tag: "Test",
    title: "Test & Improve",
    description: "QA across devices, gather feedback, fix issues, and refine details before launch.",
    icon: TestTube2,
  },
  {
    className: "workflow-module--launch",
    step: "07",
    tag: "Launch",
    title: "Go Live",
    description: "Deploy, monitor performance, and hand off with documentation and ongoing support.",
    icon: Rocket,
  },
];

export const videoWorkflowSteps: WorkflowStep[] = [
  {
    className: "workflow-module--start",
    step: "01",
    tag: "Vision",
    title: "Creative Vision",
    description: "Define the story, tone, pacing, and visual direction for the final edit.",
    icon: Eye,
  },
  {
    className: "workflow-module--discover",
    step: "02",
    tag: "Organize",
    title: "Asset Setup",
    description: "Import footage, organize bins, sync audio, and prepare a clean editing workspace.",
    icon: FolderOpen,
  },
  {
    className: "workflow-module--strategy",
    step: "03",
    tag: "Edit",
    title: "Rough Cut",
    description: "Assemble the narrative structure, timing, and first-pass sequence flow.",
    icon: Scissors,
  },
  {
    className: "workflow-module--design",
    step: "04",
    tag: "Motion",
    title: "Motion & VFX",
    description: "Add transitions, titles, motion graphics, and visual effects that support the story.",
    icon: Zap,
  },
  {
    className: "workflow-module--build",
    step: "05",
    tag: "Audio",
    title: "Sound Design",
    description: "Balance dialogue, music, and SFX for clarity, emotion, and professional polish.",
    icon: Music2,
  },
  {
    className: "workflow-module--review",
    step: "06",
    tag: "Color",
    title: "Color Correction",
    description: "Grade footage for consistency, mood, and a cohesive final look.",
    icon: Palette,
  },
  {
    className: "workflow-module--launch",
    step: "07",
    tag: "Deliver",
    title: "Final Delivery",
    description: "Export in the required formats and deliver the final cut ready for publishing.",
    icon: Send,
  },
];

export const workflowPanels = [
  {
    id: "product",
    badge: "Product",
    title: "Product Workflow",
    description: "From brief to launch — structured delivery for web and mobile products.",
    label: "Product studio workflow",
    steps: workflowSteps,
  },
  {
    id: "video",
    badge: "Video",
    title: "Video Editing Workflow",
    description: "From concept to final cut — a clear path through post-production.",
    label: "Video editing workflow",
    steps: videoWorkflowSteps,
  },
] as const;
