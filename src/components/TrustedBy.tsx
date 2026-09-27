import { clientLogos } from "../data/hiring";

export function TrustedBy() {
  const marqueeLogos = [...clientLogos, ...clientLogos];

  return (
    <section
      aria-label="Clients and collaborators"
      className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-white via-green-pale/20 to-white py-7 dark:from-[#0a1018] dark:via-green/5 dark:to-[#0a1018] sm:py-9"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(34,197,94,0.06),transparent)]"
        aria-hidden="true"
      />
      <div className="section-container relative">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-green-dark">
          Trusted by teams from
        </p>

        <div className="relative mt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-[#0a1018]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-[#0a1018]" />
          <div className="logo-marquee-track flex w-max items-center gap-12 px-6 sm:gap-16">
            {marqueeLogos.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex h-12 w-[8.5rem] shrink-0 items-center justify-center rounded-xl border border-border/40 bg-white/80 px-4 py-2 shadow-sm transition-all duration-300 hover:border-green/25 hover:shadow-[0_8px_24px_-8px_rgba(34,197,94,0.25)] dark:border-white/10 dark:bg-white/[0.04] sm:h-14 sm:w-[9.5rem]"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-8 w-full object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:max-h-9"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
