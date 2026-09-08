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

    let noiseData: Uint8ClampedArray
    let targetImageData: ImageData

    const resize = () => {
      canvas.width = canvas.offsetWidth / 2
      canvas.height = canvas.offsetHeight / 2

      const width = canvas.width
      const height = canvas.height
      const pixelCount = width * height

      targetImageData = ctx.createImageData(width, height)

      const maxOffset = 100000
      noiseData = new Uint8ClampedArray((pixelCount + maxOffset) * 4)

      for (let i = 0; i < noiseData.length; i += 4) {
        const value = Math.random() * 255
        noiseData[i] = value
        noiseData[i + 1] = value
        noiseData[i + 2] = value
        noiseData[i + 3] = 255
      }
    }

    const generateNoise = () => {
      if (!noiseData || !targetImageData) return

      const maxOffset = (noiseData.length / 4) - (canvas.width * canvas.height)
      const offset = Math.floor(Math.random() * maxOffset) * 4

      targetImageData.data.set(noiseData.subarray(offset, offset + targetImageData.data.length))
      ctx.putImageData(targetImageData, 0, 0)
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
