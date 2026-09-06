import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useIsMobile } from '../use-mobile'

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Reset matchMedia mock before each test
    vi.clearAllMocks()
    window.innerWidth = originalInnerWidth
  })

  afterEach(() => {
    window.innerWidth = originalInnerWidth
  })

  it('should return false when innerWidth is >= 768', () => {
    window.innerWidth = 800

    // Setup matchMedia mock to return matches: false
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock
    })

    const { result } = renderHook(() => useIsMobile())

    // The initial render will run useEffect which updates state,
    // so we get false because 800 >= 768
    expect(result.current).toBe(false)
  })

  it('should return true when innerWidth is < 768', () => {
    window.innerWidth = 500

    // Setup matchMedia mock to return matches: true
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should update when the window is resized (matchMedia change event fires)', () => {
    // Initial state: desktop
    window.innerWidth = 800

    let changeListener: EventListener | null = null

    const addEventListener = vi.fn((event, listener) => {
      if (event === 'change') {
        changeListener = listener
      }
    })

    const removeEventListener = vi.fn()

    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener,
      removeEventListener,
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock
    })

    const { result, unmount } = renderHook(() => useIsMobile())

    // Verify initial state
    expect(result.current).toBe(false)
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    // Simulate resize to mobile
    act(() => {
      window.innerWidth = 500
      // Fire the matchMedia change event
      if (changeListener) {
        changeListener(new Event('change'))
      }
    })

    // Verify updated state
    expect(result.current).toBe(true)

    // Test cleanup
    unmount()
    expect(removeEventListener).toHaveBeenCalledWith('change', changeListener)
  })
})
