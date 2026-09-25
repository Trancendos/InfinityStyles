"use client"

import { useEffect, useRef } from "react"

interface AnimatedNoiseProps {
  opacity?: number
  className?: string
}

export function AnimatedNoise({ opacity = 0.05, className }: AnimatedNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let frame = 0

    // #146 and #123 both replace the per-frame Math.random() loop with a
    // pre-computed buffer sliced at a random offset, and both leave one half of
    // the cost in place: #146 copies byte by byte, #123 allocates a fresh
    // ImageData every frame. Taken together — one ImageData reused, and the
    // copy done 32 bits at a time — so the animation loop allocates nothing and
    // moves a quarter as many elements.
    //
    // The buffer is twice the canvas, so an offset anywhere in the first half
    // always has a full frame after it. Each pixel is grey (R=G=B) with alpha
    // 255, which is why one 32-bit word per pixel is the whole pixel.
    let noiseWords: Uint32Array | null = null
    let frameImageData: ImageData | null = null

    const resize = () => {
      canvas.width = canvas.offsetWidth / 2
      canvas.height = canvas.offsetHeight / 2

      const pixels = canvas.width * canvas.height
      if (pixels === 0) {
        noiseWords = null
        frameImageData = null
        return
      }

      frameImageData = ctx.createImageData(canvas.width, canvas.height)

      const bytes = new Uint8ClampedArray(pixels * 4 * 2)
      for (let i = 0; i < bytes.length; i += 4) {
        const value = Math.random() * 255
        bytes[i] = value // R
        bytes[i + 1] = value // G
        bytes[i + 2] = value // B
        bytes[i + 3] = 255 // A
      }
      noiseWords = new Uint32Array(bytes.buffer)
    }

    const generateNoise = () => {
      if (!noiseWords || !frameImageData) return

      const frameWords = new Uint32Array(
        frameImageData.data.buffer,
        frameImageData.data.byteOffset,
        frameImageData.data.byteLength / 4,
      )
      // noiseWords holds two frames' worth, so any offset up to one frame's
      // length still leaves a whole frame to copy.
      const offset = Math.floor(Math.random() * (noiseWords.length - frameWords.length + 1))
      frameWords.set(noiseWords.subarray(offset, offset + frameWords.length))
      ctx.putImageData(frameImageData, 0, 0)
    }

    const animate = () => {
      frame++
      // Update noise every 2 frames for performance while still looking animated
      if (frame % 2 === 0) {
        generateNoise()
      }
      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  )
}
