import { renderHook, act } from '@testing-library/react';
import { useToast, toast, reducer } from '@/hooks/use-toast';

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Reset memoryState by dismissing all and waiting for removal
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.dismiss();
    });
    // Advance timers so they get removed
    act(() => {
      jest.advanceTimersByTime(5000); // TOAST_REMOVE_DELAY
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with empty toasts', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test', description: 'Description' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test');
    expect(result.current.toasts[0].description).toBe('Description');
    expect(result.current.toasts[0].open).toBe(true);
  });

  it('limits the number of toasts to TOAST_LIMIT (1 by default)', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test 1' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test 1');

    act(() => {
      toast({ title: 'Test 2' });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test 2');
  });

  it('dismisses a toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test 1' });
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });

  it('dismisses all toasts when no id is provided', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test 1' });
    });

    act(() => {
      result.current.dismiss();
    });

    result.current.toasts.forEach(t => {
      expect(t.open).toBe(false);
    });
  });

  it('updates a toast', () => {
    const { result } = renderHook(() => useToast());

    let updateToast: any;

    act(() => {
      const t = toast({ title: 'Original' });
      updateToast = t.update;
    });

    act(() => {
      updateToast({
        title: 'Updated'
      });
    });

    expect(result.current.toasts[0].title).toBe('Updated');
  });

  it('removes a toast after delay', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Test' });
    });

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.toasts[0].open).toBe(false);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('adds a listener on mount and removes it on unmount', () => {
    const { result, unmount } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Before Unmount' });
    });

    expect(result.current.toasts).toHaveLength(1);

    unmount();

    // We add another toast after unmounting
    act(() => {
      toast({ title: 'After Unmount' });
    });

    // The unmounted hook result shouldn't update
    expect(result.current.toasts[0].title).toBe('Before Unmount');
  });

  describe('reducer', () => {
    it('handles REMOVE_TOAST with undefined id (removes all)', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Test 1', open: false },
          { id: '2', title: 'Test 2', open: false }
        ]
      };

      const newState = reducer(state, { type: 'REMOVE_TOAST' });
      expect(newState.toasts).toEqual([]);
    });

    it('handles REMOVE_TOAST with specific id', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Test 1', open: false },
          { id: '2', title: 'Test 2', open: false }
        ]
      };

      const newState = reducer(state, { type: 'REMOVE_TOAST', toastId: '1' });
      expect(newState.toasts).toHaveLength(1);
      expect(newState.toasts[0].id).toBe('2');
    });
  });
});
