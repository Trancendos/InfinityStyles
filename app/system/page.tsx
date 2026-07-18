import type { Metadata } from "next"
import Link from "next/link"
import { SwatchGrid, TypeSpecimens } from "@/components/system/swatches"
import {
  SystemToggle,
  SystemSlider,
  SystemDial,
  SystemStepper,
  SystemStatus,
  SystemMeter,
} from "@/components/system/widgets"
import { GemCard, DataCard, TerminalCard, BlueprintCard } from "@/components/system/cards"
import { SpacingScale, GridBlueprint, TemplateSchematic, ClassReference } from "@/components/system/blueprints"

export const metadata: Metadata = {
  title: "SYSTEM — INFINITY Design System",
  description: "Interactive widgets, swatches, cards, blueprints, and templates from the INFINITY design system.",
}

function SectionHeader({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {index} / {note}
        </span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">{title}</h2>
      </div>
    </div>
  )
}

export default function SystemPage() {
  return (
    <main className="relative min-h-screen px-6 py-20 md:px-16 lg:px-24">
      {/* Page header */}
      <header className="mb-24">
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
        >
          {"<"} Return to Index
        </Link>
        <h1 className="mt-6 font-[var(--font-bebas)] text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight">
          SYSTEM
        </h1>
        <p className="mt-4 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
          The INFINITY component registry. Widgets, gems, swatches, blueprints, templates, and classes — all
          operational.
        </p>
        <div className="mt-8 inline-block border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          v.01 / Part of the Trancendos Network
        </div>
      </header>

      <div className="flex flex-col gap-28">
        {/* 01 Swatches */}
        <section aria-labelledby="swatches">
          <SectionHeader index="01" title="SWATCHES" note="Color Tokens" />
          <p className="mb-6 font-mono text-xs text-muted-foreground">Click a swatch to copy its value.</p>
          <SwatchGrid />
        </section>

        {/* 02 Styles */}
        <section aria-labelledby="styles">
          <SectionHeader index="02" title="STYLES" note="Typography" />
          <TypeSpecimens />
        </section>

        {/* 03 Widgets */}
        <section aria-labelledby="widgets">
          <SectionHeader index="03" title="WIDGETS" note="Interactive Controls" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-8 border border-border/50 p-6">
              <SystemToggle label="Transmission" defaultOn />
              <SystemToggle label="Noise Floor" />
              <SystemSlider label="Signal Gain" defaultValue={64} />
              <SystemStepper label="Channel Count" defaultValue={4} />
            </div>
            <div className="flex flex-col gap-8 border border-border/50 p-6">
              <div className="flex flex-wrap items-start justify-around gap-6">
                <SystemDial label="Frequency" defaultValue={45} />
                <SystemDial label="Amplitude" defaultValue={72} />
              </div>
              <SystemMeter label="Buffer Load" value={65} />
              <div className="flex flex-col gap-3">
                <SystemStatus label="Uplink" state="online" />
                <SystemStatus label="Relay 02" state="warning" />
                <SystemStatus label="Archive" state="offline" />
              </div>
            </div>
          </div>
        </section>

        {/* 04 Gems & Cards */}
        <section aria-labelledby="cards">
          <SectionHeader index="04" title="GEMS + CARDS" note="Surfaces" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <GemCard
              code="GEM-001"
              name="Obsidian"
              rarity="Core"
              description="Base surface unit. Zero radius, thin border, silent until engaged."
            />
            <GemCard
              code="GEM-002"
              name="Ember"
              rarity="Rare"
              description="Accent-charged variant. Activates the orange signal channel on contact."
            />
            <GemCard
              code="GEM-003"
              name="Static"
              rarity="Anomaly"
              description="Noise-born artifact. Appears only in controlled environments."
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <DataCard label="Active Signals" value="047" delta="+12 this cycle" />
            <DataCard label="Uptime" value="99.9" unit="%" delta="Stable" />
            <TerminalCard
              title="signal.log"
              lines={["initializing lattice...", "channel 45 locked", "transmission active_"]}
            />
          </div>
        </section>

        {/* 05 Blueprints */}
        <section aria-labelledby="blueprints">
          <SectionHeader index="05" title="BLUEPRINTS" note="Structure" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BlueprintCard title="Grid System" annotation="12-col / gap-2">
              <GridBlueprint />
            </BlueprintCard>
            <BlueprintCard title="Spacing Scale" annotation="4px base unit">
              <SpacingScale />
            </BlueprintCard>
          </div>
        </section>

        {/* 06 Templates */}
        <section aria-labelledby="templates">
          <SectionHeader index="06" title="TEMPLATES" note="Page Schematics" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TemplateSchematic
              title="Hero Template"
              blocks={[
                { label: "Display", span: "col-span-3", height: "h-20" },
                { label: "Meta", span: "col-span-1", height: "h-20" },
                { label: "Body", span: "col-span-2", height: "h-12" },
                { label: "CTA", span: "col-span-2", height: "h-12" },
              ]}
            />
            <TemplateSchematic
              title="Work Grid Template"
              blocks={[
                { label: "Feature", span: "col-span-2 row-span-2", height: "h-full min-h-20" },
                { label: "Card", span: "col-span-1", height: "h-12" },
                { label: "Card", span: "col-span-1", height: "h-12" },
                { label: "Wide", span: "col-span-2", height: "h-12" },
              ]}
            />
          </div>
        </section>

        {/* 07 Classes */}
        <section aria-labelledby="classes">
          <SectionHeader index="07" title="CLASSES" note="Utility Reference" />
          <ClassReference />
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-28 flex items-center justify-between border-t border-border/50 pt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          INFINITY SYSTEM v.01
        </span>
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
        >
          Return to Index
        </Link>
      </footer>
    </main>
  )
}
