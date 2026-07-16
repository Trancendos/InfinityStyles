"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const tokens = [
  { name: "background", value: "oklch(0.08 0 0)", className: "bg-background" },
  { name: "foreground", value: "oklch(0.95 0 0)", className: "bg-foreground" },
  { name: "card", value: "oklch(0.12 0 0)", className: "bg-card" },
  { name: "secondary", value: "oklch(0.18 0 0)", className: "bg-secondary" },
  { name: "muted", value: "oklch(0.25 0 0)", className: "bg-muted" },
  { name: "muted-fg", value: "oklch(0.55 0 0)", className: "bg-muted-foreground" },
  { name: "accent", value: "oklch(0.7 0.2 45)", className: "bg-accent" },
  { name: "border", value: "oklch(0.25 0 0)", className: "bg-border" },
]

export function SwatchGrid() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (token: (typeof tokens)[number]) => {
    navigator.clipboard?.writeText(token.value)
    setCopied(token.name)
    setTimeout(() => setCopied(null), 1200)
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {tokens.map((token) => (
        <button
          key={token.name}
          type="button"
          onClick={() => copy(token)}
          className="group flex flex-col border border-border text-left transition-colors hover:border-accent/60"
        >
          <span className={cn("h-20 w-full border-b border-border", token.className)} />
          <span className="flex flex-col gap-1 p-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
              {copied === token.name ? "Copied" : token.name}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">{token.value}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

const typeStyles = [
  { label: "Display / Bebas Neue", sample: "SYSTEMS THAT BEHAVE", className: "font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight" },
  { label: "Heading / Bebas Neue", sample: "SIGNAL FIELD", className: "font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight" },
  { label: "Body / IBM Plex Sans", sample: "We design systems that behave, not just screens that display.", className: "font-sans text-sm leading-relaxed" },
  { label: "Mono / IBM Plex Mono", sample: "signal.transmit({ channel: 45 })", className: "font-mono text-xs text-muted-foreground" },
  { label: "Label / Mono Caps", sample: "01 / Experimental Build", className: "font-mono text-[10px] uppercase tracking-[0.3em] text-accent" },
]

export function TypeSpecimens() {
  return (
    <div className="flex flex-col divide-y divide-border border border-border">
      {typeStyles.map((style) => (
        <div key={style.label} className="flex flex-col gap-2 p-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{style.label}</span>
          <span className={style.className}>{style.sample}</span>
        </div>
      ))}
    </div>
  )
}
