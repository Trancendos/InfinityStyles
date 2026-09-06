import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn() utility function', () => {
  it('merges class names correctly using clsx', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('filters out falsy values', () => {
    expect(cn('class1', null, undefined, false, 0, '')).toBe('class1');
    expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
  });

  it('handles tailwind class merging correctly', () => {
    // Both are text colors, the latter should win
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');

    // Padding, latter wins
    expect(cn('p-4', 'p-8')).toBe('p-8');

    // Specific padding wins over general padding
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2');
  });

  it('handles complex combinations', () => {
    const isHovered = true;
    const isDisabled = false;

    expect(
      cn(
        'base-class',
        isHovered && 'hover-class',
        isDisabled && 'disabled-class',
        {
          'active-class': true,
          'inactive-class': false,
        },
        ['array-class1', 'array-class2'],
        'text-red-500',
        'text-blue-500' // Should override text-red-500
      )
    ).toBe('base-class hover-class active-class array-class1 array-class2 text-blue-500');
  });
});
