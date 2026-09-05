import { motion } from "framer-motion";

const areaPaths = [
  "M0 52 L18 44 L36 48 L54 32 L72 38 L90 26 L108 34 L126 28 L144 36 L162 30 L162 60 L0 60 Z",
  "M0 52 L18 38 L36 46 L54 28 L72 42 L90 30 L108 22 L126 36 L144 26 L162 34 L162 60 L0 60 Z",
  "M0 52 L18 42 L36 36 L54 40 L72 30 L90 38 L108 28 L126 32 L144 24 L162 38 L162 60 L0 60 Z",
  "M0 52 L18 44 L36 48 L54 32 L72 38 L90 26 L108 34 L126 28 L144 36 L162 30 L162 60 L0 60 Z",
];

const linePaths = [
  "M0 52 L18 44 L36 48 L54 32 L72 38 L90 26 L108 34 L126 28 L144 36 L162 30",
  "M0 52 L18 38 L36 46 L54 28 L72 42 L90 30 L108 22 L126 36 L144 26 L162 34",
  "M0 52 L18 42 L36 36 L54 40 L72 30 L90 38 L108 28 L126 32 L144 24 L162 38",
  "M0 52 L18 44 L36 48 L54 32 L72 38 L90 26 L108 34 L126 28 L144 36 L162 30",
];

const stats = [
  { label: "Users", value: "2.4k", trend: "+12%" },
  { label: "Sessions", value: "891", trend: "+5%" },
];

interface AnimatedDashboardProps {
  compact?: boolean;
}

export function AnimatedDashboard({ compact = false }: AnimatedDashboardProps) {
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
        <span className="ml-1 truncate text-[10px] font-medium text-text-secondary">
          Dashboard
        </span>
      </div>

      <div className="p-3">
        <div className="mb-2.5 grid grid-cols-2 gap-2">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-lg border border-green/10 bg-green-pale/40 px-2 py-1.5"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              <p className="text-[7px] font-medium uppercase tracking-wide text-text-secondary">
                {stat.label}
              </p>
              <div className="mt-0.5 flex items-baseline gap-1">
                <motion.span
                  className="text-[11px] font-bold text-text"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-[7px] font-semibold text-green-dark">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-lg border border-green/10 bg-off-white/80">
          <div className="absolute inset-0 flex flex-col justify-between px-1 py-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-px w-full bg-border/60" />
            ))}
          </div>

          <svg viewBox="0 0 162 60" className="relative h-[72px] w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            <motion.path
              fill="url(#areaGrad)"
              animate={{ d: areaPaths }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.path
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ d: linePaths }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.circle
              r="3"
              fill="#16a34a"
              stroke="white"
              strokeWidth="1.5"
              animate={{
                cx: [144, 126, 108, 126, 144],
                cy: [36, 28, 34, 28, 36],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">
            {["Mon", "Tue", "Wed"].map((day, i) => (
              <span
                key={day}
                className={`text-[6px] font-medium ${i === 2 ? "text-green-dark" : "text-text-secondary/60"}`}
              >
                {day}
              </span>
            ))}
          </div>
          <motion.span
            className="rounded-md bg-green/15 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-green-dark"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Live
          </motion.span>
        </div>
      </div>
    </div>
  );
}
