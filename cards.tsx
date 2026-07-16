"use client"

import { useState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Gem card — collectible spec chip with hover reveal                  */
/* ------------------------------------------------------------------ */
export function GemCard({
  code,
  name,
  rarity,
  description,
}: {
  code: string
  name: string
  rarity: string
  description: string
}) {
  const [active, setActive] = useState(false)
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden border p-5 transition-all duration-300 cursor-pointer min-h-44",
        active ? "border-accent/70 bg-accent/5" : "border-border/50",
      )}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{code}</span>
        <span
          className={cn(
            "border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
            active ? "border-accent text-accent" : "border-border text-muted-foreground",
          )}
        >
          {rarity}
        </span>
      </div>
      <div>
        <h3
          className={cn(
            "font-[var(--font-bebas)] text-3xl tracking-tight transition-colors",
            active ? "text-accent" : "text-foreground",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-2 font-mono text-xs leading-relaxed text-muted-foreground transition-all duration-300",
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
          )}
        >
          {description}
        </p>
      </div>
      {/* Corner accents */}
      <span
        className={cn(
          "absolute left-0 top-0 h-3 w-3 border-l border-t transition-colors",
          active ? "border-accent" : "border-border",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute bottom-0 right-0 h-3 w-3 border-b border-r transition-colors",
          active ? "border-accent" : "border-border",
        )}
        aria-hidden="true"
      />
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Data card — telemetry readout                                       */
/* ------------------------------------------------------------------ */
export function DataCard({
  label,
  value,
  delta,
  unit,
}: {
  label: string
  value: string
  delta?: string
  unit?: string
}) {
  return (
    <article className="flex flex-col gap-3 border border-border/50 p-5 transition-colors hover:border-accent/50">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="font-[var(--font-bebas)] text-5xl tracking-tight text-foreground tabular-nums">{value}</span>
        {unit ? <span className="font-mono text-xs text-muted-foreground">{unit}</span> : null}
      </div>
      {delta ? <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{delta}</span> : null}
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Terminal card — log window                                          */
/* ------------------------------------------------------------------ */
export function TerminalCard({
  title,
  lines,
}: {
  title: string
  lines: string[]
}) {
  return (
    <article className="border border-border/50">
      <header className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{title}</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 bg-muted-foreground/40" />
          <span className="h-1.5 w-1.5 bg-accent" />
        </span>
      </header>
      <div className="flex flex-col gap-1.5 p-4">
        {lines.map((line, i) => (
          <p key={i} className="font-mono text-xs leading-relaxed">
            <span className="text-accent">{">"}</span>{" "}
            <span className={i === lines.length - 1 ? "text-foreground" : "text-muted-foreground"}>{line}</span>
          </p>
        ))}
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Blueprint card — annotated layout diagram                           */
/* ------------------------------------------------------------------ */
export function BlueprintCard({
  title,
  annotation,
  children,
}: {
  title: string
  annotation: string
  children: React.ReactNode
}) {
  return (
    <article className="relative border border-border/50 p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{title}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{annotation}</span>
      </div>
      <div className="mt-4">{children}</div>
    </article>
  )
}
