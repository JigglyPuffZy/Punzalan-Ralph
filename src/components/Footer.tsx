import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { contactEmail, heroCopy, navLinks, socialLinks } from "../data/site";
import { BrandLogo } from "./ui/BrandLogo";
import { SocialLinkButton } from "./ui/SocialIcon";
import { SectionContent, SectionShell } from "./ui/SectionShell";

const footerNavLinks = navLinks.filter((link) => link.label !== "Skills");

const contactItems = [
  {
    label: "Email",
    href: `mailto:${contactEmail}`,
    value: contactEmail,
    icon: Mail,
    external: false,
  },
  {
    label: "Phone",
    href: "tel:+639453386067",
    value: "0945 338 6067",
    icon: Phone,
    external: false,
  },
  {
    label: "Location",
    href: undefined,
    value: "Centro Santo Tomas, Isabela, Philippines",
    icon: MapPin,
    external: false,
  },
] as const;

function FooterBrand() {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:max-w-xs">
      <BrandLogo />
      <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary">
        {heroCopy.tagline}
      </p>
      <p className="mt-3 hidden text-sm leading-relaxed text-text-secondary sm:block">
        Building refined digital products and professional video content with clarity and care.
      </p>
    </div>
  );
}

function FooterNav() {
  return (
    <nav aria-label="Footer navigation" className="w-full">
      <h2 className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary sm:text-left">
        Navigate
      </h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1 sm:gap-y-2">
        {footerNavLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="block rounded-md px-1 py-1 text-center text-sm text-text-secondary transition-colors hover:text-green-dark sm:text-left"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterContact() {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary sm:text-left">
        Contact
      </h2>
      <ul className="space-y-3">
        {contactItems.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-pale text-green-dark dark:bg-green/10">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                  {item.label}
                </span>
                <span className="mt-0.5 block break-all text-sm font-medium text-text transition-colors group-hover:text-green-dark">
                  {item.value}
                </span>
              </span>
            </>
          );

          return (
            <li key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  className="group flex items-start justify-center gap-3 rounded-xl p-1 transition-colors sm:justify-start"
                >
                  {content}
                </a>
              ) : (
                <div className="group flex items-start justify-center gap-3 rounded-xl p-1 sm:justify-start">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FooterSocial() {
  return (
    <div className="flex w-full flex-col items-center sm:items-start">
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
        Connect
      </h2>
      <div className="flex flex-wrap justify-center gap-2.5 sm:justify-start">
        {socialLinks.map((link) => (
          <SocialLinkButton key={link.label} href={link.href} label={link.label} variant="icon" />
        ))}
      </div>
      <a
        href="#contact"
        className="mt-6 inline-flex w-full max-w-xs items-center justify-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text transition-all hover:border-green/35 hover:bg-green-pale hover:text-green-dark dark:border-white/10 dark:bg-[#111827] sm:w-auto sm:justify-start"
      >
        Start a project
      </a>
    </div>
  );
}

function BackToTop() {
  return (
    <a
      href="#home"
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:border-green/35 hover:bg-green-pale hover:text-green-dark dark:border-white/10 dark:bg-[#111827]"
    >
      Back to top
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-off-white dark:bg-[#0a0f18]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green/40 to-transparent"
        aria-hidden="true"
      />

      <SectionShell className="!py-10 sm:!py-12 lg:!py-14">
        <SectionContent width="wide">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-8 xl:gap-10">
            <div className="sm:col-span-2 lg:col-span-1">
              <FooterBrand />
            </div>
            <div>
              <FooterNav />
            </div>
            <div>
              <FooterContact />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <FooterSocial />
            </div>
          </div>

          <div className="section-divider mt-10 w-full sm:mt-12" />

          <div className="mt-6 flex flex-col items-center gap-4 text-center sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="max-w-prose text-xs leading-relaxed text-text-secondary">
              © {year} R4lph Matthew Punzalan. All rights reserved.
            </p>
            <BackToTop />
          </div>
        </SectionContent>
      </SectionShell>
    </footer>
  );
}
