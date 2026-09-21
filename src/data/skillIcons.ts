export interface SkillBrand {
  icon: string;
  darkIcon?: string;
  url: string;
  domain: string;
  accent: string;
}

function si(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}

function devicon(name: string, variant = "original") {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;
}

function favicon(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

export const skillBrands: Record<string, SkillBrand> = {
  Figma: {
    icon: devicon("figma"),
    url: "https://www.figma.com",
    domain: "figma.com",
    accent: "#F24E1E",
  },
  Canva: {
    icon: favicon("canva.com"),
    url: "https://www.canva.com",
    domain: "canva.com",
    accent: "#00C4CC",
  },
  Photoshop: {
    icon: devicon("photoshop", "plain"),
    url: "https://www.adobe.com/products/photoshop.html",
    domain: "adobe.com",
    accent: "#31A8FF",
  },
  "Framer Motion": {
    icon: si("framer", "0055FF"),
    url: "https://www.framer.com/motion/",
    domain: "framer.com",
    accent: "#0055FF",
  },
  "DaVinci Resolve": {
    icon: si("davinciresolve", "FF6B35"),
    url: "https://www.blackmagicdesign.com/products/davinciresolve",
    domain: "blackmagicdesign.com",
    accent: "#FF6B35",
  },
  CapCut: {
    icon: favicon("capcut.com"),
    url: "https://www.capcut.com",
    domain: "capcut.com",
    accent: "#000000",
  },

  React: {
    icon: devicon("react"),
    url: "https://react.dev",
    domain: "react.dev",
    accent: "#61DAFB",
  },
  TypeScript: {
    icon: devicon("typescript"),
    url: "https://www.typescriptlang.org",
    domain: "typescriptlang.org",
    accent: "#3178C6",
  },
  JavaScript: {
    icon: devicon("javascript"),
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    domain: "developer.mozilla.org",
    accent: "#F7DF1E",
  },
  "Tailwind CSS": {
    icon: devicon("tailwindcss"),
    url: "https://tailwindcss.com",
    domain: "tailwindcss.com",
    accent: "#06B6D4",
  },
  Vite: {
    icon: si("vite", "646CFF"),
    url: "https://vite.dev",
    domain: "vite.dev",
    accent: "#646CFF",
  },
  HTML: {
    icon: devicon("html5"),
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    domain: "developer.mozilla.org",
    accent: "#E34F26",
  },
  CSS: {
    icon: devicon("css3"),
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    domain: "developer.mozilla.org",
    accent: "#1572B6",
  },
  Angular: {
    icon: devicon("angular"),
    url: "https://angular.dev",
    domain: "angular.dev",
    accent: "#DD0031",
  },
  "React Native": {
    icon: devicon("reactnative"),
    url: "https://reactnative.dev",
    domain: "reactnative.dev",
    accent: "#61DAFB",
  },

  "Node.js": {
    icon: devicon("nodejs"),
    url: "https://nodejs.org",
    domain: "nodejs.org",
    accent: "#339933",
  },
  Express: {
    icon: si("express", "000000"),
    darkIcon: si("express", "FFFFFF"),
    url: "https://expressjs.com",
    domain: "expressjs.com",
    accent: "#000000",
  },
  Laravel: {
    icon: devicon("laravel"),
    url: "https://laravel.com",
    domain: "laravel.com",
    accent: "#FF2D20",
  },
  PHP: {
    icon: devicon("php"),
    url: "https://www.php.net",
    domain: "php.net",
    accent: "#777BB4",
  },
  MongoDB: {
    icon: devicon("mongodb"),
    url: "https://www.mongodb.com",
    domain: "mongodb.com",
    accent: "#47A248",
  },
  Supabase: {
    icon: devicon("supabase"),
    url: "https://supabase.com",
    domain: "supabase.com",
    accent: "#3FCF8E",
  },
  GitHub: {
    icon: si("github", "181717"),
    darkIcon: si("github", "FFFFFF"),
    url: "https://github.com",
    domain: "github.com",
    accent: "#181717",
  },
  Vercel: {
    icon: si("vercel", "000000"),
    darkIcon: si("vercel", "FFFFFF"),
    url: "https://vercel.com",
    domain: "vercel.com",
    accent: "#000000",
  },

  WordPress: {
    icon: devicon("wordpress"),
    url: "https://wordpress.org",
    domain: "wordpress.org",
    accent: "#21759B",
  },
  Webflow: {
    icon: si("webflow", "146EF5"),
    url: "https://webflow.com",
    domain: "webflow.com",
    accent: "#146EF5",
  },
  Divi: {
    icon: si("wordpress", "7D49F8"),
    url: "https://www.elegantthemes.com/gallery/divi/",
    domain: "elegantthemes.com",
    accent: "#7D49F8",
  },
  Elementor: {
    icon: si("elementor", "92003B"),
    url: "https://elementor.com",
    domain: "elementor.com",
    accent: "#92003B",
  },
  GoHighLevel: {
    icon: favicon("gohighlevel.com"),
    url: "https://www.gohighlevel.com",
    domain: "gohighlevel.com",
    accent: "#FF8800",
  },
  Flutter: {
    icon: devicon("flutter"),
    url: "https://flutter.dev",
    domain: "flutter.dev",
    accent: "#02569B",
  },
  "Expo Go": {
    icon: si("expo", "000020"),
    darkIcon: si("expo", "FFFFFF"),
    url: "https://expo.dev",
    domain: "expo.dev",
    accent: "#000020",
  },

  "Adobe Premiere Pro": {
    icon: devicon("premierepro", "plain"),
    url: "https://www.adobe.com/products/premiere.html",
    domain: "adobe.com",
    accent: "#9999FF",
  },
};

export function getSkillBrand(skill: string, prefersDark = false): SkillBrand | undefined {
  const brand = skillBrands[skill];
  if (!brand) return undefined;

  if (prefersDark && brand.darkIcon) {
    return { ...brand, icon: brand.darkIcon };
  }

  return brand;
}

export function getSkillInitials(skill: string) {
  const words = skill.replace(/[^a-zA-Z0-9\s]/g, "").trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return skill.slice(0, 2).toUpperCase();
}

export function getFaviconUrl(domain: string) {
  return favicon(domain);
}
