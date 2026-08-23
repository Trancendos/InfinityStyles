import { reducer } from './use-toast'
import type { ToastProps } from '@/components/ui/toast'
import type { ToastActionElement } from '@/components/ui/toast'

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type ActionType = {
  ADD_TOAST: 'ADD_TOAST'
  UPDATE_TOAST: 'UPDATE_TOAST'
  DISMISS_TOAST: 'DISMISS_TOAST'
  REMOVE_TOAST: 'REMOVE_TOAST'
}

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

describe('use-toast reducer', () => {
  it('ADD_TOAST should add a new toast and respect TOAST_LIMIT', () => {
    // Initial state with 1 toast, TOAST_LIMIT is 1
    const initialState: State = {
      toasts: [
        { id: '1', title: 'Old Toast' }
      ]
    }

    const action: Action = {
      type: 'ADD_TOAST',
      toast: { id: '2', title: 'New Toast' }
    }

    // @ts-expect-error Types are not fully exported, but testing internals
    const newState = reducer(initialState, action)

    // Should only have 1 toast due to TOAST_LIMIT
    expect(newState.toasts).toHaveLength(1)
    // Should be the newest toast
    expect(newState.toasts[0].id).toBe('2')
    expect(newState.toasts[0].title).toBe('New Toast')
  })

  it('UPDATE_TOAST should update an existing toast', () => {
    const initialState: State = {
      toasts: [
        { id: '1', title: 'Original Toast', description: 'Original description' }
      ]
    }

    const action: Action = {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated Toast' }
    }

    // @ts-expect-error Types are not fully exported, but testing internals
    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('1')
    expect(newState.toasts[0].title).toBe('Updated Toast')
    // Should preserve other properties
    expect(newState.toasts[0].description).toBe('Original description')
  })

  it('DISMISS_TOAST should set open to false for a specific toast', () => {
    const initialState: State = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true }
      ]
    }

    const action: Action = {
      type: 'DISMISS_TOAST',
      toastId: '1'
    }

    // @ts-expect-error Types are not fully exported, but testing internals
    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(2)
    expect(newState.toasts.find(t => t.id === '1')?.open).toBe(false)
    expect(newState.toasts.find(t => t.id === '2')?.open).toBe(true)
  })

  it('DISMISS_TOAST without toastId should set open to false for all toasts', () => {
    const initialState: State = {
      toasts: [
        { id: '1', title: 'Toast 1', open: true },
        { id: '2', title: 'Toast 2', open: true }
      ]
    }

    const action: Action = {
      type: 'DISMISS_TOAST'
    }

    // @ts-expect-error Types are not fully exported, but testing internals
    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(2)
    expect(newState.toasts.every(t => t.open === false)).toBe(true)
  })

  it('REMOVE_TOAST should remove a specific toast', () => {
    const initialState: State = {
      toasts: [
        { id: '1', title: 'Toast 1' },
        { id: '2', title: 'Toast 2' }
      ]
    }

    const action: Action = {
      type: 'REMOVE_TOAST',
      toastId: '1'
    }

    // @ts-expect-error Types are not fully exported, but testing internals
    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(1)
    expect(newState.toasts[0].id).toBe('2')
  })

  it('REMOVE_TOAST without toastId should clear all toasts', () => {
    const initialState: State = {
      toasts: [
        { id: '1', title: 'Toast 1' },
        { id: '2', title: 'Toast 2' }
      ]
    }

    const action: Action = {
      type: 'REMOVE_TOAST'
    }

    // @ts-expect-error Types are not fully exported, but testing internals
    const newState = reducer(initialState, action)

    expect(newState.toasts).toHaveLength(0)
  })
})
