"use client"

import { useEffect, useRef } from "react"

interface AnimatedNoiseProps {
  opacity?: number
  className?: string
}

export function AnimatedNoise({ opacity = 0.05, className }: AnimatedNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noiseDataRef = useRef<Uint32Array | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let frame = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth / 2
      canvas.height = canvas.offsetHeight / 2

      // Create a noise buffer that's double the size of the canvas to allow for random slicing
      const length = canvas.width * canvas.height * 4
      const noiseBuffer8 = new Uint8ClampedArray(length * 2)

      for (let i = 0; i < noiseBuffer8.length; i += 4) {
        const value = Math.random() * 255
        noiseBuffer8[i] = value
        noiseBuffer8[i + 1] = value
        noiseBuffer8[i + 2] = value
        noiseBuffer8[i + 3] = 255
      }
      noiseDataRef.current = new Uint32Array(noiseBuffer8.buffer)
    }

    const generateNoise = () => {
      if (!noiseDataRef.current) return

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data32 = new Uint32Array(imageData.data.buffer)

      // Randomly pick a starting point in the pre-calculated noise buffer
      // The offset is in 32-bit words, max offset is half the buffer length
      const offset = Math.floor(Math.random() * data32.length)

      // Copy the slice from the pre-calculated noise buffer to the image data
      data32.set(noiseDataRef.current.subarray(offset, offset + data32.length))

      ctx.putImageData(imageData, 0, 0)
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
