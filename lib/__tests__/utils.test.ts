import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should merge tailwind classes properly', () => {
    expect(cn('p-4 p-2')).toBe('p-2');
  });

  it('should conditionally apply classes', () => {
    const hasClass2 = true;
    const hasClass3 = false;
    expect(cn('class1', hasClass2 && 'class2', hasClass3 && 'class3')).toBe('class1 class2');
  });

  it('should handle array inputs', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should handle object inputs', () => {
    expect(cn({'class1': true, 'class2': false, 'class3': true})).toBe('class1 class3');
  });

  it('should handle complex tailwind merges', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('text-sm text-center', 'text-lg')).toBe('text-center text-lg');
  });
});
