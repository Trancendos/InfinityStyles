import { cn } from "@/lib/utils"

/* Spacing scale blueprint */
export function SpacingScale() {
  const steps = [
    { name: "1", px: 4 },
    { name: "2", px: 8 },
    { name: "4", px: 16 },
    { name: "6", px: 24 },
    { name: "8", px: 32 },
    { name: "12", px: 48 },
    { name: "16", px: 64 },
  ]
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step) => (
        <div key={step.name} className="flex items-center gap-4">
          <span className="w-8 font-mono text-[10px] text-muted-foreground tabular-nums">{step.name}</span>
          <span className="h-4 bg-accent/70" style={{ width: `${step.px * 2}px` }} />
          <span className="font-mono text-[10px] text-muted-foreground">{step.px}px</span>
        </div>
      ))}
    </div>
  )
}

/* Grid blueprint — 12-column diagram */
export function GridBlueprint() {
  return (
    <div className="grid grid-cols-12 gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex h-16 items-end justify-center border border-dashed border-border/60 bg-secondary/20 pb-1"
        >
          <span className="font-mono text-[10px] text-muted-foreground/60">{i + 1}</span>
        </div>
      ))}
    </div>
  )
}

/* Section template — miniature page schematic */
export function TemplateSchematic({
  title,
  blocks,
}: {
  title: string
  blocks: { label: string; span: string; height: string }[]
}) {
  return (
    <div className="flex flex-col gap-3 border border-border/50 p-4">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{title}</span>
      <div className="grid grid-cols-4 gap-2">
        {blocks.map((block, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-center border border-dashed border-accent/40 bg-accent/5",
              block.span,
              block.height,
            )}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{block.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Class reference table */
export function ClassReference() {
  const classes = [
    { name: ".label-caps", desc: "Mono uppercase micro-label", spec: "font-mono text-[10px] uppercase tracking-[0.3em]" },
    { name: ".display-xl", desc: "Bebas display heading", spec: "font-[var(--font-bebas)] tracking-tight" },
    { name: ".panel", desc: "Bordered zero-radius surface", spec: "border border-border/50 p-5" },
    { name: ".panel-active", desc: "Accent hover state", spec: "border-accent/60 bg-accent/5" },
    { name: ".grid-bg", desc: "60px blueprint grid backdrop", spec: "background-image: linear-gradient(...)" },
    { name: ".noise-overlay", desc: "Fractal noise texture layer", spec: "opacity: 0.03, fixed, z-1000" },
  ]
  return (
    <div className="overflow-x-auto border border-border/50">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border/50">
            <th className="p-3 font-mono text-[10px] uppercase tracking-widest text-accent font-normal">Class</th>
            <th className="p-3 font-mono text-[10px] uppercase tracking-widest text-accent font-normal">Purpose</th>
            <th className="hidden md:table-cell p-3 font-mono text-[10px] uppercase tracking-widest text-accent font-normal">
              Spec
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {classes.map((cls) => (
            <tr key={cls.name} className="transition-colors hover:bg-accent/5">
              <td className="p-3 font-mono text-xs text-foreground whitespace-nowrap">{cls.name}</td>
              <td className="p-3 font-mono text-xs text-muted-foreground">{cls.desc}</td>
              <td className="hidden md:table-cell p-3 font-mono text-[10px] text-muted-foreground/70">{cls.spec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
