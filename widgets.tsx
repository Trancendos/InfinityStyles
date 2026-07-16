"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Toggle — industrial switch                                          */
/* ------------------------------------------------------------------ */
export function SystemToggle({
  label,
  defaultOn = false,
}: {
  label: string
  defaultOn?: boolean
}) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className="group flex items-center gap-4"
    >
      <span
        className={cn(
          "relative h-6 w-12 border transition-colors duration-200",
          on ? "border-accent bg-accent/10" : "border-border bg-secondary/50",
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] h-4 w-4 transition-all duration-200",
            on ? "left-[27px] bg-accent" : "left-[3px] bg-muted-foreground",
          )}
        />
      </span>
      <span className="flex flex-col items-start">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-widest transition-colors",
            on ? "text-accent" : "text-foreground/60",
          )}
        >
          {on ? "Active" : "Standby"}
        </span>
      </span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Slider — signal fader                                               */
/* ------------------------------------------------------------------ */
export function SystemSlider({
  label,
  defaultValue = 50,
  unit = "%",
}: {
  label: string
  defaultValue?: number
  unit?: string
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-accent tabular-nums">
          {String(value).padStart(3, "0")}
          {unit}
        </span>
      </div>
      <div className="relative flex h-8 items-center">
        {/* Tick marks */}
        <div className="pointer-events-none absolute inset-x-0 flex justify-between" aria-hidden="true">
          {Array.from({ length: 21 }).map((_, i) => (
            <span key={i} className={cn("w-px bg-border", i % 5 === 0 ? "h-3" : "h-1.5")} />
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label={label}
          onChange={(e) => setValue(Number(e.target.value))}
          className="system-slider relative z-10 w-full"
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Dial — rotary knob (drag vertically or use arrow keys)              */
/* ------------------------------------------------------------------ */
export function SystemDial({
  label,
  defaultValue = 40,
}: {
  label: string
  defaultValue?: number
}) {
  const [value, setValue] = useState(defaultValue)
  const dragging = useRef(false)
  const startY = useRef(0)
  const startValue = useRef(0)

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragging.current) return
    const delta = startY.current - e.clientY
    setValue(Math.min(100, Math.max(0, startValue.current + Math.round(delta / 2))))
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [onPointerMove, onPointerUp])

  const angle = -135 + (value / 100) * 270

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="slider"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        tabIndex={0}
        onPointerDown={(e) => {
          dragging.current = true
          startY.current = e.clientY
          startValue.current = value
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") setValue((v) => Math.min(100, v + 5))
          if (e.key === "ArrowDown" || e.key === "ArrowLeft") setValue((v) => Math.max(0, v - 5))
        }}
        className="relative h-20 w-20 cursor-ns-resize touch-none select-none border border-border bg-secondary/30 focus:outline-none focus:border-accent"
      >
        {/* Rotating indicator */}
        <div className="absolute inset-2 rounded-full border border-border/60" style={{ transform: `rotate(${angle}deg)` }}>
          <span className="absolute left-1/2 top-0.5 h-3 w-0.5 -translate-x-1/2 bg-accent" />
        </div>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-foreground tabular-nums">
          {String(value).padStart(3, "0")}
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stepper — increment counter                                         */
/* ------------------------------------------------------------------ */
export function SystemStepper({
  label,
  min = 0,
  max = 16,
  defaultValue = 4,
}: {
  label: string
  min?: number
  max?: number
  defaultValue?: number
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex items-stretch border border-border">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => setValue((v) => Math.max(min, v - 1))}
          className="px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          −
        </button>
        <span className="flex min-w-16 items-center justify-center border-x border-border font-mono text-sm tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => setValue((v) => Math.min(max, v + 1))}
          className="px-4 py-2 font-mono text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Status light — blinking indicator                                   */
/* ------------------------------------------------------------------ */
export function SystemStatus({
  label,
  state = "online",
}: {
  label: string
  state?: "online" | "warning" | "offline"
}) {
  const color =
    state === "online" ? "bg-accent" : state === "warning" ? "bg-foreground/70" : "bg-muted-foreground/40"
  return (
    <div className="flex items-center gap-3 border border-border px-4 py-2">
      <span className={cn("h-2 w-2", color, state !== "offline" && "animate-pulse")} />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-foreground/60">{state}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Meter — segmented level display                                     */
/* ------------------------------------------------------------------ */
export function SystemMeter({
  label,
  value,
  segments = 20,
}: {
  label: string
  value: number
  segments?: number
}) {
  const lit = Math.round((value / 100) * segments)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-foreground/60 tabular-nums">{value}%</span>
      </div>
      <div
        className="flex gap-1"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <span key={i} className={cn("h-4 flex-1 transition-colors", i < lit ? "bg-accent" : "bg-secondary")} />
        ))}
      </div>
    </div>
  )
}
