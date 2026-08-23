import { renderHook, act } from '@testing-library/react'
import { useToast, toast, reducer } from '../../hooks/use-toast'

describe('useToast hook', () => {
  beforeEach(() => {
    // Dismiss all toasts before each test to reset state
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.dismiss()
    })
  })

  it('should initialize with empty toasts', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toEqual([])
  })

  it('should add a toast', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: 'Test Toast', description: 'This is a test' })
    })

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Test Toast',
      description: 'This is a test',
      open: true,
    })
  })

  it('should dismiss a toast', () => {
    const { result } = renderHook(() => useToast())

    let toastId: string = ''
    act(() => {
      const newToast = toast({ title: 'To Dismiss' })
      toastId = newToast.id
    })

    expect(result.current.toasts[0].open).toBe(true)

    act(() => {
      result.current.dismiss(toastId)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })

  it('should update a toast', () => {
    const { result } = renderHook(() => useToast())

    let toastObj: ReturnType<typeof toast> | undefined
    act(() => {
      toastObj = toast({ title: 'Initial Title' })
    })

    expect(result.current.toasts[0].title).toBe('Initial Title')

    act(() => {
      if (toastObj) {
        toastObj.update({
          id: toastObj.id,
          title: 'Updated Title'
        })
      }
    })

    expect(result.current.toasts[0].title).toBe('Updated Title')
  })

  it('should limit the number of toasts', () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      toast({ title: 'Toast 1' })
      toast({ title: 'Toast 2' })
    })

    // TOAST_LIMIT is 1 in the hook
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Toast 2')
  })

  it('should verify listener lifecycle (mount/unmount)', () => {
    const hook1 = renderHook(() => useToast())

    act(() => {
      toast({ title: 'Shared state test' })
    })

    expect(hook1.result.current.toasts).toHaveLength(1)

    // Unmount hook1
    hook1.unmount()

    const hook2 = renderHook(() => useToast())

    act(() => {
      toast({ title: 'New toast after unmount' })
    })

    expect(hook2.result.current.toasts).toHaveLength(1)
    expect(hook2.result.current.toasts[0].title).toBe('New toast after unmount')
  })

  describe('reducer', () => {
    it('should handle REMOVE_TOAST without toastId', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Toast 1' }, { id: '2', title: 'Toast 2' }]
      }

      const newState = reducer(initialState, { type: 'REMOVE_TOAST' })
      expect(newState.toasts).toEqual([])
    })

    it('should handle REMOVE_TOAST with toastId', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Toast 1' }, { id: '2', title: 'Toast 2' }]
      }

      const newState = reducer(initialState, { type: 'REMOVE_TOAST', toastId: '1' })
      expect(newState.toasts).toHaveLength(1)
      expect(newState.toasts[0].id).toBe('2')
    })

    it('should partially update toast via UPDATE_TOAST', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Old Title', description: 'desc' }]
      }
      const newState = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'New Title' }
      })
      expect(newState.toasts[0]).toEqual({ id: '1', title: 'New Title', description: 'desc' })
    })

    it('should handle UPDATE_TOAST when toast id does not exist', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Toast 1' }]
      }
      const newState = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '2', title: 'Toast 2' }
      })
      expect(newState.toasts).toEqual(initialState.toasts)
    })
  })

  describe('addToRemoveQueue', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should dismiss and queue toast for removal, and then actually remove it', () => {
      const { result } = renderHook(() => useToast())

      let toastId: string = ''
      act(() => {
        const newToast = toast({ title: 'To Dismiss And Remove' })
        toastId = newToast.id
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        result.current.dismiss(toastId)
      })

      // Still in state but closed
      expect(result.current.toasts[0].open).toBe(false)
      expect(result.current.toasts).toHaveLength(1)

      // Fast-forward the removal delay (5000ms)
      act(() => {
        vi.advanceTimersByTime(5000)
      })

      // Now it should be completely removed from state
      expect(result.current.toasts).toHaveLength(0)
    })

    it('should dismiss and remove all toasts when no toastId is provided', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        toast({ title: 'Single Toast' })
      })

      expect(result.current.toasts).toHaveLength(1)

      act(() => {
        result.current.dismiss()
      })

      // Still in state but closed
      expect(result.current.toasts[0].open).toBe(false)

      act(() => {
        vi.advanceTimersByTime(5000)
      })

      expect(result.current.toasts).toHaveLength(0)
    })

    it('should not add multiple timeouts for the same toast', () => {
      const { result } = renderHook(() => useToast())

      let toastId: string = ''
      act(() => {
        const newToast = toast({ title: 'Multiple Dismiss' })
        toastId = newToast.id
      })

      const setTimeoutSpy = vi.spyOn(global, 'setTimeout')

      act(() => {
        result.current.dismiss(toastId)
      })

      const callCountAfterFirstDismiss = setTimeoutSpy.mock.calls.length

      act(() => {
        result.current.dismiss(toastId)
      })

      expect(setTimeoutSpy.mock.calls.length).toBe(callCountAfterFirstDismiss)

      setTimeoutSpy.mockRestore()
    })
  })

  describe('toast.onOpenChange', () => {
    it('should dismiss when onOpenChange is called with false', () => {
      const { result } = renderHook(() => useToast())

      let toastObj: ReturnType<typeof toast> | undefined
      act(() => {
        toastObj = toast({ title: 'Test onOpenChange' })
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        // @ts-expect-error simulating ui interaction
        result.current.toasts[0].onOpenChange?.(false)
      })

      expect(result.current.toasts[0].open).toBe(false)
    })

    it('should not dismiss when onOpenChange is called with true', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        toast({ title: 'Test onOpenChange true' })
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        // @ts-expect-error simulating ui interaction
        result.current.toasts[0].onOpenChange?.(true)
      })

      expect(result.current.toasts[0].open).toBe(true)
    })
  })

  describe('useToast multiple listeners', () => {
    it('should clean up listeners correctly when unmounting one out of multiple', () => {
      const hook1 = renderHook(() => useToast())
      const hook2 = renderHook(() => useToast())
      const hook3 = renderHook(() => useToast())

      act(() => {
        toast({ title: 'Testing multiple hooks' })
      })

      expect(hook1.result.current.toasts).toHaveLength(1)
      expect(hook2.result.current.toasts).toHaveLength(1)
      expect(hook3.result.current.toasts).toHaveLength(1)

      // Unmount the middle hook
      hook2.unmount()

      act(() => {
        toast({ title: 'New test after unmount' })
      })

      expect(hook1.result.current.toasts[0].title).toBe('New test after unmount')
      expect(hook3.result.current.toasts[0].title).toBe('New test after unmount')

      // hook2 still has the old state (since it stopped listening)
      expect(hook2.result.current.toasts[0].title).toBe('Testing multiple hooks')
    })
  })

  describe('coverage for missing branches', () => {
    it('forces branch t.id !== toastId in DISMISS_TOAST', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        toast({ title: 'Toast 1' })
      })

      act(() => {
        result.current.dismiss('non-existent-toast-id')
      })

      // The toast remains open because its ID didn't match
      expect(result.current.toasts[0].open).toBe(true)
    })

  })
})
