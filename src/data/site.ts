import profilePhoto from "../assets/profile.jpg";

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "design",
    title: "Design & Creative",
    skills: ["Figma", "Canva", "Photoshop", "Framer Motion", "DaVinci Resolve", "CapCut"],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
      "HTML",
      "CSS",
      "Angular",
      "React Native",
    ],
  },
  {
    id: "backend",
    title: "Backend & DevOps",
    skills: ["Node.js", "Express", "Laravel", "PHP", "MongoDB", "Supabase", "GitHub", "Vercel"],
  },
  {
    id: "platforms",
    title: "Platforms & CMS",
    skills: [
      "WordPress",
      "Webflow",
      "Divi",
      "Elementor",
      "GoHighLevel",
      "Flutter",
      "Expo Go",
    ],
  },
  {
    id: "video",
    title: "Video",
    skills: ["Adobe Premiere Pro", "DaVinci Resolve", "CapCut"],
  },
];

export const productWorkflow = [
  "Project Brief",
  "User Goals",
  "Clear Roadmap",
  "Clean Interface",
  "Working Product",
  "Test & Improve",
  "Go Live",
];

export const videoWorkflow = [
  "Creative Vision",
  "Asset Setup",
  "Rough Cut",
  "Motion & VFX",
  "Sound Design",
  "Color Correction",
  "Final Delivery",
];

export const contactQuotes = [
  "Great products start with a clear idea and a conversation worth having.",
  "Design with purpose. Build with care. Ship with confidence.",
  "If you have a vision, let's shape it into something people enjoy using.",
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

/** Shared section header copy — eyebrow matches nav labels; title uses green accent word(s) */
export const sectionHeaders = {
  about: {
    eyebrow: "About",
    titleLead: "About",
    titleAccent: "Me",
    subtitle:
      "Front-end developer, UI/UX designer, and video editor based in Isabela, Philippines.",
  },
  experience: {
    eyebrow: "Experience",
    titleLead: "Career",
    titleAccent: "Journey",
    subtitle: "Select a role to review responsibilities, tools, and outcomes.",
  },
  projects: {
    eyebrow: "Projects",
    titleLead: "Selected Work Across",
    titleAccent: "Digital & Video",
    subtitle:
      "Case studies and project highlights from web, mobile, UI/UX, CMS, and video work.",
  },
  skills: {
    eyebrow: "Skills",
    titleLead: "Tools &",
    titleAccent: "Technologies",
    subtitle:
      "From design systems to production code — a stack built for shipping polished digital experiences.",
  },
  workflow: {
    eyebrow: "Workflow",
    titleLead: "From Idea to",
    titleAccent: "Launch",
    subtitle:
      "How I move from concept to shipped product — and from raw footage to final cut.",
  },
  contact: {
    eyebrow: "Contact",
    titleLead: "Have a",
    titleAccent: "Project",
    titleTrailing: " in Mind?",
    subtitle: undefined,
  },
} as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const contactEmail = "ralphmatthewpunzalan23@gmail.com";

export const resumePdfUrl = "#";
export const resumeDownloadName = "R4lph-Punzalan-Resume.pdf";

export const heroSocialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Email", href: `mailto:${contactEmail}` },
];

export const heroCopy = {
  tagline: "Front-End Developer · UI/UX Designer · Video Editor",
  headline: {
    line1: "Building Digital Products That",
    line2: "Look Refined and Work Seamlessly",
  },
  description:
    "I develop responsive websites and applications, design intuitive user interfaces, and produce professional video content for clients who value clarity, quality, and reliable delivery.",
};

/** Profile photo for About section */
export const profileImage = {
  src: profilePhoto,
  fallback: "/images/profile.jpg",
  alt: "R4lph Matthew Punzalan — Front-end Developer, UI/UX Designer & Video Editor",
};

export const brandLogo = {
  src: "/images/logo.png",
  alt: "R4lph — Front-end Developer, UI/UX Designer & Video Editor",
};
