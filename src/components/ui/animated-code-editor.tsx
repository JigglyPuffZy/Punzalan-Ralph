import { motion } from "framer-motion";

interface CodeLine {
  lineNum: number;
  tokens: { text: string; className: string }[];
}

export type CodeSnippetId = "hero" | "dashboard" | "ui" | "web";

const snippets: Record<CodeSnippetId, CodeLine[]> = {
  hero: [
    {
      lineNum: 1,
      tokens: [
        { text: "export ", className: "text-sky-300/90" },
        { text: "function ", className: "text-violet-300/90" },
        { text: "Hero", className: "text-amber-200" },
        { text: "() {", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 2,
      tokens: [
        { text: "  ", className: "" },
        { text: "return", className: "text-violet-300/90" },
        { text: " (", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 3,
      tokens: [
        { text: "    ", className: "" },
        { text: "<", className: "text-slate-400" },
        { text: "motion.section", className: "text-green-light" },
        { text: ">", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 4,
      tokens: [
        { text: "      ", className: "" },
        { text: "animate", className: "text-sky-300/90" },
        { text: "={{ y: ", className: "text-slate-400" },
        { text: "0", className: "text-amber-200" },
        { text: " }}", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 5,
      tokens: [
        { text: "      ", className: "" },
        { text: "className", className: "text-sky-300/90" },
        { text: '="hero"', className: "text-emerald-300/90" },
      ],
    },
    {
      lineNum: 6,
      tokens: [
        { text: "    ", className: "" },
        { text: "/>", className: "text-slate-400" },
      ],
    },
    { lineNum: 7, tokens: [{ text: "  );", className: "text-slate-400" }] },
    { lineNum: 8, tokens: [{ text: "}", className: "text-slate-400" }] },
  ],
  dashboard: [
    {
      lineNum: 1,
      tokens: [
        { text: "const ", className: "text-sky-300/90" },
        { text: "metrics", className: "text-amber-200" },
        { text: " = ", className: "text-slate-400" },
        { text: "await ", className: "text-violet-300/90" },
        { text: "fetch", className: "text-green-light" },
        { text: "()", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 2,
      tokens: [
        { text: "const ", className: "text-sky-300/90" },
        { text: "chart", className: "text-amber-200" },
        { text: " = ", className: "text-slate-400" },
        { text: "metrics", className: "text-amber-200" },
        { text: ".map", className: "text-green-light" },
        { text: "(m => ({", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 3,
      tokens: [
        { text: "  ", className: "" },
        { text: "label", className: "text-sky-300/90" },
        { text: ": m.", className: "text-slate-400" },
        { text: "name", className: "text-amber-200" },
        { text: ",", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 4,
      tokens: [
        { text: "  ", className: "" },
        { text: "value", className: "text-sky-300/90" },
        { text: ": m.", className: "text-slate-400" },
        { text: "total", className: "text-amber-200" },
        { text: ",", className: "text-slate-400" },
      ],
    },
    { lineNum: 5, tokens: [{ text: "}))", className: "text-slate-400" }] },
    {
      lineNum: 6,
      tokens: [
        { text: "return ", className: "text-violet-300/90" },
        { text: "<", className: "text-slate-400" },
        { text: "BarChart", className: "text-green-light" },
        { text: " ", className: "" },
        { text: "data", className: "text-sky-300/90" },
        { text: "={", className: "text-slate-400" },
        { text: "chart", className: "text-amber-200" },
        { text: "} />", className: "text-slate-400" },
      ],
    },
  ],
  ui: [
    {
      lineNum: 1,
      tokens: [
        { text: "const ", className: "text-sky-300/90" },
        { text: "tokens", className: "text-amber-200" },
        { text: " = {", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 2,
      tokens: [
        { text: "  ", className: "" },
        { text: "radius", className: "text-sky-300/90" },
        { text: ": ", className: "text-slate-400" },
        { text: '"1rem"', className: "text-emerald-300/90" },
        { text: ",", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 3,
      tokens: [
        { text: "  ", className: "" },
        { text: "green", className: "text-sky-300/90" },
        { text: ": ", className: "text-slate-400" },
        { text: '"#22C55E"', className: "text-emerald-300/90" },
        { text: ",", className: "text-slate-400" },
      ],
    },
    { lineNum: 4, tokens: [{ text: "}", className: "text-slate-400" }] },
    {
      lineNum: 5,
      tokens: [
        { text: "export ", className: "text-sky-300/90" },
        { text: "function ", className: "text-violet-300/90" },
        { text: "Card", className: "text-amber-200" },
        { text: "({ ...props }) {", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 6,
      tokens: [
        { text: "  ", className: "" },
        { text: "return", className: "text-violet-300/90" },
        { text: " <", className: "text-slate-400" },
        { text: "div", className: "text-green-light" },
        { text: " {...props} />", className: "text-slate-400" },
      ],
    },
    { lineNum: 7, tokens: [{ text: "}", className: "text-slate-400" }] },
  ],
  web: [
    {
      lineNum: 1,
      tokens: [
        { text: "export ", className: "text-sky-300/90" },
        { text: "async ", className: "text-violet-300/90" },
        { text: "function ", className: "text-violet-300/90" },
        { text: "Page", className: "text-amber-200" },
        { text: "() {", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 2,
      tokens: [
        { text: "  ", className: "" },
        { text: "const ", className: "text-sky-300/90" },
        { text: "data", className: "text-amber-200" },
        { text: " = ", className: "text-slate-400" },
        { text: "await ", className: "text-violet-300/90" },
        { text: "getData", className: "text-green-light" },
        { text: "()", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 3,
      tokens: [
        { text: "  ", className: "" },
        { text: "return", className: "text-violet-300/90" },
        { text: " (", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 4,
      tokens: [
        { text: "    ", className: "" },
        { text: "<", className: "text-slate-400" },
        { text: "main", className: "text-green-light" },
        { text: " ", className: "" },
        { text: "className", className: "text-sky-300/90" },
        { text: '="grid">', className: "text-emerald-300/90" },
      ],
    },
    {
      lineNum: 5,
      tokens: [
        { text: "      ", className: "" },
        { text: "<", className: "text-slate-400" },
        { text: "Hero", className: "text-green-light" },
        { text: " ", className: "" },
        { text: "items", className: "text-sky-300/90" },
        { text: "={", className: "text-slate-400" },
        { text: "data", className: "text-amber-200" },
        { text: "} />", className: "text-slate-400" },
      ],
    },
    {
      lineNum: 6,
      tokens: [
        { text: "    ", className: "" },
        { text: "</", className: "text-slate-400" },
        { text: "main", className: "text-green-light" },
        { text: ">", className: "text-slate-400" },
      ],
    },
    { lineNum: 7, tokens: [{ text: "  );", className: "text-slate-400" }] },
    { lineNum: 8, tokens: [{ text: "}", className: "text-slate-400" }] },
  ],
};

const scrollDistance: Record<CodeSnippetId, number> = {
  hero: 52,
  dashboard: 44,
  ui: 46,
  web: 52,
};

function CodeBlock({ lines }: { lines: CodeLine[] }) {
  return (
    <div className="space-y-[3px] px-2.5 py-2 font-mono text-[7px] leading-[1.55] sm:text-[7.5px] lg:text-[8px]">
      {lines.map((line) => (
        <div key={line.lineNum} className="flex gap-1.5 whitespace-nowrap">
          <span className="w-2.5 shrink-0 select-none text-right text-slate-600">
            {line.lineNum}
          </span>
          <span>
            {line.tokens.map((token, i) => (
              <span key={i} className={token.className}>
                {token.text}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

interface AnimatedCodeEditorProps {
  compact?: boolean;
  filename?: string;
  snippet?: CodeSnippetId;
}

export function AnimatedCodeEditor({
  compact = false,
  filename = "Hero.tsx",
  snippet = "hero",
}: AnimatedCodeEditorProps) {
  const lines = snippets[snippet];
  const scrollY = scrollDistance[snippet];

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0d1117] shadow-2xl shadow-green/20 ring-1 ring-green/25 ${
        compact ? "w-[168px] sm:w-[178px] lg:w-[188px]" : "w-[180px] sm:w-[200px] lg:w-[220px]"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-slate-700/60 bg-[#161b22] px-2.5 py-2">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-green/80" />
        </div>
        <span className="truncate font-mono text-[8px] text-slate-400">{filename}</span>
      </div>

      <div className="relative h-[108px] overflow-hidden sm:h-[112px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-[#0d1117] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-gradient-to-b from-transparent to-[#0d1117]" />

        <motion.div
          animate={{ y: [0, -scrollY] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <CodeBlock lines={lines} />
          <CodeBlock lines={lines} />
        </motion.div>

        <motion.span
          className="absolute bottom-3 left-[2.1rem] inline-block h-[9px] w-[5px] rounded-[1px] bg-green-light"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.55, 1] }}
        />
      </div>
    </div>
  );
}
