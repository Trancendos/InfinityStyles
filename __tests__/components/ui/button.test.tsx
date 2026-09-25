import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies default classes correctly', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center', 'bg-primary')
  })

  it('applies custom variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toHaveClass('bg-destructive')
  })

  it('applies custom size classes', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button', { name: 'Small' })
    expect(button).toHaveClass('h-8', 'px-3')
  })

  it('forwards additional props correctly', () => {
    render(<Button data-testid="custom-button" disabled>Disabled</Button>)
    const button = screen.getByTestId('custom-button')
    expect(button).toBeDisabled()
  })

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/link')
    expect(link).toHaveClass('inline-flex') // Checks if styles are still applied
  })
})
