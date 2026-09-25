import { render, cleanup } from "@testing-library/react"
import { AnimatedNoise } from "../animated-noise"

// The noise loop was rewritten to slice a pre-computed buffer at a random
// offset (#146 + #123). The offset arithmetic is the part that can be wrong
// quietly: `subarray` past the end returns a SHORT array, and `set` with a
// short source leaves the tail of the frame holding the previous frame's
// pixels — a visual artefact no type or build check can see. These tests drive
// the offset to both ends.
//
// jsdom has no 2d context, so one is stubbed. `frame % 2` in the component
// means noise is generated every other animation frame.
type Stub = {
  putImageData: ReturnType<typeof vi.fn>
  createImageData: (w: number, h: number) => ImageData
}

function stubCanvas(width: number, height: number, random: () => number) {
  const putImageData = vi.fn()
  const ctx: Stub = {
    putImageData,
    createImageData: (w: number, h: number) => ({
      width: w,
      height: h,
      colorSpace: "srgb",
      data: new Uint8ClampedArray(w * h * 4),
    }) as ImageData,
  }

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    ctx as unknown as CanvasRenderingContext2D,
  )
  vi.spyOn(HTMLCanvasElement.prototype, "offsetWidth", "get").mockReturnValue(width)
  vi.spyOn(HTMLCanvasElement.prototype, "offsetHeight", "get").mockReturnValue(height)
  vi.spyOn(Math, "random").mockImplementation(random)

  const frames: Array<() => void> = []
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    frames.push(() => cb(0))
    return frames.length
  })
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {})

  return { putImageData, frames }
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function runFrames(frames: Array<() => void>, count: number) {
  for (let i = 0; i < count; i += 1) {
    const next = frames.shift()
    if (!next) break
    next()
  }
}

it("fills every pixel of the frame when the offset is at the start", () => {
  const { putImageData, frames } = stubCanvas(40, 20, () => 0)
  render(<AnimatedNoise />)
  runFrames(frames, 4)

  expect(putImageData).toHaveBeenCalled()
  const image = putImageData.mock.calls[0][0] as ImageData
  // Alpha is 255 on every pixel of the pre-computed buffer, so a byte left at
  // its initial 0 is a pixel the copy never reached.
  for (let i = 3; i < image.data.length; i += 4) {
    expect(image.data[i]).toBe(255)
  }
})

it("fills every pixel when the offset is at the far end of the buffer", () => {
  // Math.random() is exclusive of 1; this is the largest value it can return.
  const { putImageData, frames } = stubCanvas(40, 20, () => 1 - Number.EPSILON / 2)
  render(<AnimatedNoise />)
  runFrames(frames, 4)

  const image = putImageData.mock.calls[0][0] as ImageData
  for (let i = 3; i < image.data.length; i += 4) {
    expect(image.data[i]).toBe(255)
  }
})

it("produces grey pixels, not coloured ones", () => {
  const { putImageData, frames } = stubCanvas(40, 20, () => 0.5)
  render(<AnimatedNoise />)
  runFrames(frames, 4)

  const image = putImageData.mock.calls[0][0] as ImageData
  for (let i = 0; i < image.data.length; i += 4) {
    expect(image.data[i + 1]).toBe(image.data[i])
    expect(image.data[i + 2]).toBe(image.data[i])
  }
})

it("does nothing when the canvas has no area", () => {
  const { putImageData, frames } = stubCanvas(0, 0, () => 0.5)
  render(<AnimatedNoise />)
  runFrames(frames, 4)

  expect(putImageData).not.toHaveBeenCalled()
})
