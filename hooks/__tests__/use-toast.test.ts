import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { toast, useToast } from '../use-toast'

describe('toast function', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      // Clear all toasts after each test using a generic dismiss
      const { result } = renderHook(() => useToast())
      if (result.current && typeof result.current.dismiss === 'function') {
        result.current.dismiss()
      }
    })

    act(() => {
      vi.runAllTimers()
    })
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('adds a toast and returns methods', () => {
    const { result } = renderHook(() => useToast())

    expect(result.current.toasts).toHaveLength(0)

    let toastObj: ReturnType<typeof toast>
    act(() => {
      toastObj = toast({ title: 'Test Toast', description: 'Testing addition' })
    })

    expect(toastObj!.id).toBeDefined()
    expect(typeof toastObj!.dismiss).toBe('function')
    expect(typeof toastObj!.update).toBe('function')
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
  })

  it('updates a toast properties using the returned update method', () => {
    const { result } = renderHook(() => useToast())

    let toastObj: ReturnType<typeof toast>
    act(() => {
      toastObj = toast({ title: 'Initial Title' })
    })

    expect(result.current.toasts[0].title).toBe('Initial Title')

    act(() => {
      toastObj.update({ title: 'Updated Title' })
    })

    expect(result.current.toasts[0].title).toBe('Updated Title')
  })

  it('dismisses a toast using the returned dismiss method', () => {
    const { result } = renderHook(() => useToast())

    let toastObj: ReturnType<typeof toast>
    act(() => {
      toastObj = toast({ title: 'To Dismiss' })
    })

    expect(result.current.toasts[0].open).toBe(true)

    act(() => {
      toastObj.dismiss()
    })

    expect(result.current.toasts[0].open).toBe(false)

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.toasts).toHaveLength(0)
  })
})
