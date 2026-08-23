import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('should merge basic strings', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should merge conditional classes using objects', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2')
  })

  it('should merge array of classes', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2')
  })

  it('should resolve tailwind class conflicts', () => {
    expect(cn('px-2 py-1', 'p-3')).toBe('p-3')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('should handle falsy values properly', () => {
    expect(cn('class1', null, undefined, false, '', 'class2')).toBe('class1 class2')
  })
})
