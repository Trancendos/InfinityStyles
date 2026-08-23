import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../use-mobile';

describe('useIsMobile', () => {
  let matchMedia: any;
  let eventListeners: Record<string, Function[]> = {};

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => {
        matchMedia = {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn((event, callback) => {
            if (!eventListeners[event]) eventListeners[event] = [];
            eventListeners[event].push(callback);
          }),
          removeEventListener: jest.fn((event, callback) => {
            if (eventListeners[event]) {
              eventListeners[event] = eventListeners[event].filter(cb => cb !== callback);
            }
          }),
          dispatchEvent: jest.fn(),
        };
        return matchMedia;
      }),
    });
  });

  beforeEach(() => {
    eventListeners = {};
    window.innerWidth = 1024;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false when initial window width is desktop (>= 768)', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true when initial window width is mobile (< 768)', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should respond to window resize events changing from desktop to mobile', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 500;
      if (eventListeners['change']) {
        eventListeners['change'].forEach(cb => cb(new Event('change')));
      }
    });

    expect(result.current).toBe(true);
  });

  it('should respond to window resize events changing from mobile to desktop', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth = 1024;
      if (eventListeners['change']) {
        eventListeners['change'].forEach(cb => cb(new Event('change')));
      }
    });

    expect(result.current).toBe(false);
  });

  it('should properly clean up event listeners on unmount', () => {
    window.innerWidth = 1024;
    const { unmount } = renderHook(() => useIsMobile());

    expect(eventListeners['change']).toHaveLength(1);

    unmount();

    expect(eventListeners['change']).toHaveLength(0);
  });
});
