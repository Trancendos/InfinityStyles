/**
 * Ribbon Components - Decorative and informational ribbon elements
 * 
 * Ribbons are used to highlight, label, or decorate components.
 * They can be positioned in corners, edges, or overlaid on content.
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface RibbonProps {
  children: React.ReactNode
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  color?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

const colorClasses = {
  default: 'bg-primary text-primary-foreground',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-black',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
}

const positionClasses = {
  'top-left': 'top-0 left-0 -rotate-45 -translate-x-1/3 -translate-y-1/2',
  'top-right': 'top-0 right-0 rotate-45 translate-x-1/3 -translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 rotate-45 -translate-x-1/3 translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 -rotate-45 translate-x-1/3 translate-y-1/2',
}

export const Ribbon = React.forwardRef<HTMLDivElement, RibbonProps>(
  (
    {
      children,
      position = 'top-right',
      color = 'default',
      className,
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'absolute px-6 py-2 text-xs font-bold uppercase tracking-wider shadow-md',
        colorClasses[color],
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  )
)

Ribbon.displayName = 'Ribbon'

export const RibbonContainer = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode
    ribbon?: string
    ribbonPosition?: RibbonProps['position']
    ribbonColor?: RibbonProps['color']
    className?: string
  }
>(
  (
    {
      children,
      ribbon,
      ribbonPosition = 'top-right',
      ribbonColor = 'default',
      className,
    },
    ref
  ) => (
    <div ref={ref} className={cn('relative', className)}>
      {ribbon && (
        <Ribbon position={ribbonPosition} color={ribbonColor}>
          {ribbon}
        </Ribbon>
      )}
      {children}
    </div>
  )
)

RibbonContainer.displayName = 'RibbonContainer'

export type { RibbonProps }
