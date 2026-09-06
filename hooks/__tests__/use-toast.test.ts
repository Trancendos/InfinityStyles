import { reducer } from '../use-toast'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('use-toast reducer', () => {
  const initialState = { toasts: [] }

  it('should handle ADD_TOAST', () => {
    const action = {
      type: 'ADD_TOAST' as const,
      toast: { id: '1', title: 'Test Toast' },
    }
    const state = reducer(initialState, action)
    expect(state.toasts).toHaveLength(1)
    expect(state.toasts[0]).toEqual(action.toast)
  })

  it('should respect TOAST_LIMIT when adding toasts', () => {
    const state1 = reducer(initialState, {
      type: 'ADD_TOAST' as const,
      toast: { id: '1', title: 'First Toast' },
    })

    // The limit in use-toast.ts is TOAST_LIMIT = 1
    const state2 = reducer(state1, {
      type: 'ADD_TOAST' as const,
      toast: { id: '2', title: 'Second Toast' },
    })

    expect(state2.toasts).toHaveLength(1)
    expect(state2.toasts[0].id).toBe('2')
  })

  it('should handle UPDATE_TOAST', () => {
    const startState = {
      toasts: [{ id: '1', title: 'Original Title' }],
    }
    const action = {
      type: 'UPDATE_TOAST' as const,
      toast: { id: '1', title: 'Updated Title' },
    }
    const state = reducer(startState, action)
    expect(state.toasts[0].title).toBe('Updated Title')
  })

  it('should handle DISMISS_TOAST for a specific toast', () => {
    const startState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true }
      ],
    }
    const action = {
      type: 'DISMISS_TOAST' as const,
      toastId: '1',
    }
    const state = reducer(startState, action)
    expect(state.toasts.find(t => t.id === '1')?.open).toBe(false)
    expect(state.toasts.find(t => t.id === '2')?.open).toBe(true)
  })

  it('should handle DISMISS_TOAST for all toasts when toastId is undefined', () => {
    const startState = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true }
      ],
    }
    const action = {
      type: 'DISMISS_TOAST' as const,
    }
    const state = reducer(startState, action)
    expect(state.toasts.every(t => t.open === false)).toBe(true)
  })

  it('should handle REMOVE_TOAST for a specific toast', () => {
    const startState = {
      toasts: [
        { id: '1', title: 'Toast 1' },
        { id: '2', title: 'Toast 2' }
      ],
    }
    const action = {
      type: 'REMOVE_TOAST' as const,
      toastId: '1',
    }
    const state = reducer(startState, action)
    expect(state.toasts).toHaveLength(1)
    expect(state.toasts[0].id).toBe('2')
  })

  it('should handle REMOVE_TOAST for all toasts when toastId is undefined', () => {
    const startState = {
      toasts: [
        { id: '1', title: 'Toast 1' },
        { id: '2', title: 'Toast 2' }
      ],
    }
    const action = {
      type: 'REMOVE_TOAST' as const,
    }
    const state = reducer(startState, action)
    expect(state.toasts).toHaveLength(0)
  })
})
