import { motion } from "framer-motion";

function WebPageContent() {
  return (
    <div className="space-y-2.5 px-2.5 pb-2.5 pt-2">
      {/* Nav */}
      <div className="flex items-center justify-between rounded-md border border-green/10 bg-white px-2 py-1.5 shadow-sm">
        <div className="h-1.5 w-6 rounded bg-green/40" />
        <div className="flex gap-1">
          <div className="h-1 w-3 rounded bg-border" />
          <div className="h-1 w-3 rounded bg-border" />
          <div className="h-1 w-3 rounded bg-border" />
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-lg bg-gradient-to-br from-green-pale to-green/15 px-2 py-3">
        <div className="mx-auto mb-1.5 h-2 w-2/3 rounded bg-green/30" />
        <div className="mx-auto h-1.5 w-1/2 rounded bg-border/80" />
        <div className="mx-auto mt-2 h-3 w-10 rounded-full bg-green/50" />
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-green/10 bg-white p-1.5">
            <div className="mb-1 aspect-square rounded bg-green-pale" />
            <div className="h-1 w-full rounded bg-border" />
          </div>
        ))}
      </div>

      {/* Text block */}
      <div className="space-y-1 rounded-lg border border-border/60 bg-off-white/80 p-2">
        <div className="h-1.5 w-full rounded bg-border" />
        <div className="h-1.5 w-5/6 rounded bg-border" />
        <div className="h-1.5 w-4/6 rounded bg-border" />
      </div>

      {/* Feature section */}
      <div className="flex gap-2">
        <div className="h-10 flex-1 rounded-lg bg-green/15" />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <div className="h-1.5 w-full rounded bg-green/25" />
          <div className="h-1 w-4/5 rounded bg-border" />
          <div className="h-1 w-3/5 rounded bg-border" />
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-md bg-text/5 px-2 py-2">
        <div className="mx-auto h-1 w-1/3 rounded bg-border" />
      </div>
    </div>
  );
}

interface AnimatedWebAppProps {
  compact?: boolean;
}

export function AnimatedWebApp({ compact = false }: AnimatedWebAppProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-green/15 bg-white shadow-2xl shadow-green/10 ring-1 ring-green/10 ${
        compact ? "w-[180px] lg:w-[200px]" : "w-[200px] sm:w-[210px] lg:w-[220px]"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-green/10 bg-green-pale/30 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-green" />
        </div>
        <span className="ml-1 truncate text-[10px] font-medium text-text-secondary">Web App</span>
      </div>

      <div className="relative bg-off-white/50">
        {/* Scroll viewport */}
        <div className="relative h-[132px] overflow-hidden sm:h-[136px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3 bg-gradient-to-b from-off-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-gradient-to-b from-transparent to-white" />

          <motion.div
            animate={{ y: [0, -168] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <WebPageContent />
            <WebPageContent />
          </motion.div>
        </div>

        {/* Scrollbar */}
        <div className="absolute right-1 top-2 bottom-2 z-20 w-1 rounded-full bg-border/40">
          <motion.div
            className="absolute left-0 w-full rounded-full bg-green/50"
            style={{ height: "28%" }}
            animate={{ top: ["0%", "72%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
