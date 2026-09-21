import { motion } from "framer-motion";
import { Bell, Home, Search, User } from "lucide-react";

function MobileScreenContent() {
  return (
    <div className="space-y-2 px-2 pb-3 pt-1">
      <div className="flex items-center justify-between">
        <div className="h-2 w-12 rounded bg-green/30" />
        <div className="h-4 w-4 rounded-full bg-green-pale ring-1 ring-green/20" />
      </div>

      <div className="rounded-xl bg-gradient-to-br from-green-pale to-green/20 p-2.5">
        <div className="mb-1 h-2 w-3/4 rounded bg-green/35" />
        <div className="h-1.5 w-1/2 rounded bg-border/80" />
        <div className="mt-2 h-4 w-14 rounded-full bg-green/45" />
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-green/10 bg-white p-1.5">
            <div className="mb-1 aspect-[4/3] rounded-md bg-green-pale" />
            <div className="h-1 w-full rounded bg-border" />
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-border/50">
            <div className="h-6 w-6 shrink-0 rounded-full bg-green/20" />
            <div className="flex-1 space-y-1">
              <div className="h-1 w-full rounded bg-border" />
              <div className="h-1 w-2/3 rounded bg-border/70" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-off-white p-2 ring-1 ring-border/60">
        <div className="mb-1 h-1.5 w-full rounded bg-border" />
        <div className="h-1.5 w-5/6 rounded bg-border" />
      </div>
    </div>
  );
}

const navItems = [
  { icon: Home, active: true },
  { icon: Search, active: false },
  { icon: Bell, active: false },
  { icon: User, active: false },
];

interface AnimatedMobileAppProps {
  compact?: boolean;
}

export function AnimatedMobileApp({ compact = false }: AnimatedMobileAppProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.6rem] border-[3px] border-text/10 bg-white shadow-2xl shadow-green/15 ring-1 ring-green/20 ${
        compact ? "w-[96px] max-[380px]:w-[88px] sm:w-[118px]" : "w-[130px] sm:w-[142px]"
      }`}
    >
      {/* Status bar / notch */}
      <div className="relative flex items-center justify-center bg-gradient-to-b from-green-pale/80 to-white py-2">
        <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-text/15" />
        <div className="mt-2 flex w-full items-center justify-between px-3">
          <div className="h-1 w-4 rounded bg-text/20" />
          <div className="flex gap-0.5">
            <div className="h-1 w-1 rounded-full bg-text/25" />
            <div className="h-1 w-1 rounded-full bg-text/25" />
            <div className="h-1 w-2 rounded-sm bg-text/20" />
          </div>
        </div>
      </div>

      {/* Scroll area */}
      <div className="relative h-[148px] overflow-hidden bg-off-white/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-b from-white/90 to-transparent" />

        <motion.div
          animate={{ y: [0, -152] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <MobileScreenContent />
          <MobileScreenContent />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Bottom navbar — fixed */}
      <div className="flex items-center justify-around border-t border-border/80 bg-white px-1 py-2">
        {navItems.map(({ icon: Icon, active }, i) => (
          <motion.div
            key={i}
            className={`flex flex-col items-center gap-0.5 ${active ? "text-green-dark" : "text-text-secondary/50"}`}
            animate={active ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-3 w-3" strokeWidth={active ? 2.5 : 2} />
            <span className={`h-0.5 w-0.5 rounded-full ${active ? "bg-green" : "bg-transparent"}`} />
          </motion.div>
        ))}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center bg-white pb-1.5 pt-0.5">
        <div className="h-0.5 w-8 rounded-full bg-text/15" />
      </div>
    </div>
  );
}
