export interface ExperienceAchievement {
  title: string;
  description: string;
  icon: "chart" | "rocket" | "layers" | "video" | "design" | "code";
}

import { experienceLogos } from "./experienceAssets";

export interface ExperienceRole {
  id: string;
  company: string;
  title: string;
  period: string;
  initials: string;
  logoSrc?: string;
  employmentType: string;
  location: string;
  duration: string;
  summary: string;
  isCurrent?: boolean;
  focusAreas: string[];
  technologies: string[];
  responsibilities: string[];
  achievements: ExperienceAchievement[];
}

/** @deprecated Use experienceRoles */
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description?: string;
  technologies?: string[];
  highlights: string[];
}

export const experienceRoles: ExperienceRole[] = [
  {
    id: "dost",
    company: "Department of Science and Technology Region II",
    title: "Web Developer & Video Editor",
    period: "March 2026 – June 2026",
    initials: "DS",
    logoSrc: experienceLogos.dost,
    employmentType: "Contract",
    location: "Region II, Philippines",
    duration: "4 months",
    summary:
      "Web developer and video editor supporting DOST Region II with dashboard development, data visualization, and multimedia content for public science programs.",
    isCurrent: true,
    focusAreas: ["Dashboards", "Data Viz", "Video Production"],
    technologies: ["React", "JavaScript", "HTML", "CSS", "Adobe Premiere Pro", "DaVinci Resolve"],
    responsibilities: [
      "Build and maintain web dashboards for regional science program reporting.",
      "Develop data visualization features for CEST and related initiatives.",
      "Produce and edit video content for public science communications.",
      "Collaborate with stakeholders to ship accessible, production-ready interfaces.",
    ],
    achievements: [
      {
        title: "CEST Dashboard",
        description: "Delivered an interactive dashboard for community science and technology tracking.",
        icon: "chart",
      },
      {
        title: "Reporting Features",
        description: "Implemented reporting workflows that improved data clarity for internal teams.",
        icon: "layers",
      },
      {
        title: "Video Production",
        description: "Produced edited content supporting DOST Region II public programs.",
        icon: "video",
      },
    ],
  },
  {
    id: "one-over-zero",
    company: "One Over Zero Technologies, Inc.",
    title: "Junior Front-End Developer",
    period: "January 2026 – June 2026",
    initials: "OZ",
    logoSrc: experienceLogos["one-over-zero"],
    employmentType: "Part-time",
    location: "Philippines",
    duration: "6 months",
    summary:
      "Front-end developer building scalable web applications with React, Next.js, TypeScript, and Tailwind CSS.",
    focusAreas: ["Front-End", "UI Systems", "Performance"],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    responsibilities: [
      "Develop responsive UI components with React and TypeScript.",
      "Implement designs using Next.js and Tailwind CSS best practices.",
      "Optimize front-end performance for production deployments.",
      "Contribute reusable UI patterns for faster team delivery.",
    ],
    achievements: [
      {
        title: "Performance Optimization",
        description: "Improved load and interaction performance across production pages.",
        icon: "rocket",
      },
      {
        title: "Production Delivery",
        description: "Shipped client-facing features on schedule with clean, maintainable code.",
        icon: "code",
      },
      {
        title: "Reusable UI Systems",
        description: "Built component patterns that reduced duplicate UI work across projects.",
        icon: "layers",
      },
    ],
  },
  {
    id: "va4u",
    company: "VA4U",
    title: "Front-End Developer",
    period: "October 2025",
    initials: "VA",
    logoSrc: experienceLogos.va4u,
    employmentType: "Project-Based",
    location: "Remote",
    duration: "1 month",
    summary:
      "Front-end developer working on the Australian Rewards Club platform with React and Tailwind CSS.",
    focusAreas: ["Landing Pages", "UX Polish", "React"],
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    responsibilities: [
      "Built landing page sections for the Australian Rewards Club platform.",
      "Refined UX details and responsive layouts across key user flows.",
      "Collaborated remotely with cross-functional team members on delivery.",
    ],
    achievements: [
      {
        title: "ARC Landing Page",
        description: "Delivered a polished marketing landing experience for the rewards platform.",
        icon: "design",
      },
      {
        title: "UX Improvements",
        description: "Enhanced clarity and usability across primary conversion sections.",
        icon: "layers",
      },
      {
        title: "Cross-Team Collaboration",
        description: "Coordinated with designers and stakeholders to ship on a tight timeline.",
        icon: "rocket",
      },
    ],
  },
  {
    id: "caribbean-led",
    company: "Caribbean LED Solutions",
    title: "Front-End Developer, UI/UX & Video Editor",
    period: "November 2024 – February 2026",
    initials: "CL",
    logoSrc: experienceLogos["caribbean-led"],
    employmentType: "Remote",
    location: "Remote",
    duration: "16 months",
    summary:
      "Front-end developer and UI/UX designer leading product interface work from Figma design through React implementation.",
    focusAreas: ["UI/UX", "Product UI", "Design Systems"],
    technologies: ["Figma", "React", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
    responsibilities: [
      "Translate Figma designs into responsive React interfaces.",
      "Improve usability and visual consistency across the Brioray platform.",
      "Maintain design system patterns for scalable product development.",
      "Support video and visual assets where product storytelling was needed.",
    ],
    achievements: [
      {
        title: "Brioray Platform",
        description: "Led front-end implementation for core product interface experiences.",
        icon: "code",
      },
      {
        title: "Usability Improvements",
        description: "Refined flows and layouts based on user feedback and design reviews.",
        icon: "design",
      },
      {
        title: "Design System Consistency",
        description: "Standardized UI components for faster, more cohesive product updates.",
        icon: "layers",
      },
    ],
  },
  {
    id: "dilg",
    company: "DILG",
    title: "Secretary / Social Media Manager",
    period: "August 2024 – November 2024",
    initials: "DI",
    logoSrc: experienceLogos.dilg,
    employmentType: "Full-time",
    location: "Philippines",
    duration: "4 months",
    summary:
      "Managed documentation, social campaigns, and operational support for internal and public-facing communications.",
    focusAreas: ["Documentation", "Social Media", "Operations"],
    technologies: ["Canva", "Microsoft Office", "Social Platforms"],
    responsibilities: [
      "Organized documentation systems for internal team workflows.",
      "Planned and published campaign creative across social channels.",
      "Supported day-to-day operational and communications tasks.",
    ],
    achievements: [
      {
        title: "Documentation Systems",
        description: "Structured internal records for clearer team coordination.",
        icon: "layers",
      },
      {
        title: "Campaign Creative",
        description: "Produced social content aligned with organizational messaging goals.",
        icon: "design",
      },
      {
        title: "Operational Support",
        description: "Kept communication and admin workflows running smoothly under deadlines.",
        icon: "rocket",
      },
    ],
  },
  {
    id: "lgu-sto-tomas",
    company: "LGU Sto. Tomas",
    title: "Social Media Manager / UI/UX Designer",
    period: "June 2024 – August 2024",
    initials: "LG",
    logoSrc: experienceLogos["lgu-sto-tomas"],
    employmentType: "Contract",
    location: "Sto. Tomas, Isabela",
    duration: "3 months",
    summary:
      "Redesigned internal UI patterns and managed public communications with consistent brand presentation.",
    focusAreas: ["UI Redesign", "Communications", "Branding"],
    technologies: ["Figma", "Canva", "Social Platforms"],
    responsibilities: [
      "Redesigned internal UI layouts for clearer navigation and usability.",
      "Managed public communications with consistent visual branding.",
      "Coordinated content delivery for municipal outreach initiatives.",
    ],
    achievements: [
      {
        title: "Internal UI Redesign",
        description: "Improved internal tool layouts for faster day-to-day use.",
        icon: "design",
      },
      {
        title: "Public Communications",
        description: "Maintained timely, on-brand messaging across public channels.",
        icon: "rocket",
      },
      {
        title: "Brand Consistency",
        description: "Unified visual standards across social and design deliverables.",
        icon: "layers",
      },
    ],
  },
  {
    id: "freelance",
    company: "Freelance / Client Projects",
    title: "Front-End Developer & UI/UX Designer",
    period: "November 2023 – June 2024",
    initials: "FL",
    logoSrc: experienceLogos.freelance,
    employmentType: "Freelance",
    location: "Philippines",
    duration: "8 months",
    summary:
      "Independent client work spanning UI prototyping, front-end foundations, and end-to-end product delivery.",
    focusAreas: ["Freelance Delivery", "Prototyping", "Front-End"],
    technologies: ["React", "Figma", "HTML", "CSS", "JavaScript"],
    responsibilities: [
      "Delivered client projects from concept and wireframes through front-end build.",
      "Created UI prototypes to validate ideas before development.",
      "Managed timelines and communication for independent client engagements.",
    ],
    achievements: [
      {
        title: "Independent Delivery",
        description: "Shipped multiple client projects with full ownership of UI and front-end work.",
        icon: "rocket",
      },
      {
        title: "UI Prototyping",
        description: "Used Figma prototypes to align stakeholders before writing code.",
        icon: "design",
      },
      {
        title: "Front-End Foundations",
        description: "Built scalable HTML, CSS, and React foundations for long-term client sites.",
        icon: "code",
      },
    ],
  },
];

export const experiences = experienceRoles.map((role) => ({
  id: role.id,
  company: role.company,
  role: role.title,
  period: role.period,
  type: `${role.employmentType} · ${role.location}`,
  description: role.summary,
  technologies: role.technologies,
  highlights: role.achievements.map((a) => a.title),
}));
