# UX/UI Enhancement Guide

Complete guide for leveraging the advanced UX/UI features in InfinityStyles.

## Design Principles

### 1. Consistency

- Use design tokens for all values
- Apply consistent spacing and sizing
- Maintain visual hierarchy

### 2. Accessibility

- Semantic HTML
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast ratios

### 3. Performance

- Code-split components
- Lazy loading for animations
- Optimized images
- Reduced motion support

### 4. Responsiveness

- Mobile-first approach
- Flexible layouts
- Breakpoint-aware components
- Touch-friendly interfaces

## Advanced Patterns

### Responsive Grid System

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>
```

### Dark Mode Support

All components automatically support dark mode:

```tsx
// Dark mode is handled by next-themes
// Components use CSS variables that change based on theme

// In your CSS:
:root {
  --background: #fff;
}

[data-theme='dark'] {
  --background: #000;
}
```

### Custom Theme Creation

```tsx
import { colorSwatches, getSwatchCSSVariables } from '@/lib/color-swatches'

function CustomThemeProvider() {
  const customSwatch = {
    primary: '#your-color',
    secondary: '#your-color',
    // ... more colors
  }

  const cssVariables = getSwatchCSSVariables(customSwatch)
  
  return (
    <style>{`
      :root {
        ${cssVariables}
      }
    `}</style>
  )
}
```

### Animation Best Practices

```tsx
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedCard({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Micro-interactions

```tsx
import { useState } from 'react'

export function InteractiveButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        transition-all duration-200
        ${isHovered ? 'scale-105 shadow-lg' : 'scale-100'}
      `}
    >
      Hover me
    </button>
  )
}
```

## Services & Tools

### Component Service Pattern

Create services for complex component logic:

```tsx
// lib/services/card-service.ts
export const cardService = {
  getCardVariant(type: string) {
    // Logic to determine card variant
  },
  
  calculateDimensions(size: string) {
    // Logic to calculate card dimensions
  },

  validateCardData(data: unknown) {
    // Validation logic
  },
}
```

### State Management Patterns

```tsx
import { useReducer } from 'react'

function componentReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

export function Component() {
  const [state, dispatch] = useReducer(componentReducer, {
    isOpen: false,
  })

  return (
    <button onClick={() => dispatch({ type: 'TOGGLE' })}>
      Toggle
    </button>
  )
}
```

## Templates & Wireframes

### Page Template

```tsx
// templates/page-layout.tsx
import { Container, VStack, HStack } from '@/components/design-system'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { Sidebar } from '@/components/sections/sidebar'

export function PageLayout({ children }) {
  return (
    <VStack className="min-h-screen">
      <Header />
      <HStack className="flex-1">
        <Sidebar />
        <Container className="flex-1">
          {children}
        </Container>
      </HStack>
      <Footer />
    </VStack>
  )
}
```

### Dashboard Template

```tsx
import { StatWidget } from '@/components/widgets'
import { Card } from '@/components/ui/card'

export function DashboardTemplate({ stats, charts, tables }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <StatWidget key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map(chart => (
          <Card key={chart.id}>{chart.content}</Card>
        ))}
      </div>

      <div className="space-y-4">
        {tables.map(table => (
          <Card key={table.id}>{table.content}</Card>
        ))}
      </div>
    </div>
  )
}
```

### Form Template

```tsx
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FormTemplate({ onSubmit }) {
  const form = useForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormDescription>Your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Toolkits

### Component Toolkit

Complete set of prebuilt components:
- All UI primitives
- Form components
- Layout components
- Navigation components
- Feedback components
- Overlay components

### Animation Toolkit

- Smooth transitions
- Scroll triggers
- Parallax effects
- Text animations
- Staggered animations

### Validation Toolkit

- Zod schemas
- Form validation
- Real-time validation
- Custom validators

## Bricks & Building Blocks

### Layout Bricks

- Container
- Grid
- Flex (HStack/VStack)
- Spacer

### Content Bricks

- Card
- Badge
- Alert
- Progress

### Interaction Bricks

- Button
- Input
- Select
- Checkbox
- Toggle

### Navigation Bricks

- Tabs
- Breadcrumb
- Pagination
- Menu

## Design Guidance

### Color Usage

- **Primary** - Main CTA, key elements
- **Secondary** - Supporting actions
- **Accent** - Highlights, accents
- **Success/Error/Warning** - Status only
- **Neutral** - Text, backgrounds

### Typography Hierarchy

1. **Headlines** - H1/H2 for page titles
2. **Subheadings** - H3/H4 for sections
3. **Body** - Regular text content
4. **Captions** - Secondary info, labels
5. **Mono** - Code, technical content

### Spacing Rules

- Use spacing scale (4px increments)
- Consistent padding within components
- Consistent gaps between elements
- Breathing room for readability

### Interactive States

- **Hover** - Subtle background or color change
- **Active** - Distinct visual feedback
- **Disabled** - Reduced opacity, no pointer
- **Focus** - Focus ring for keyboard users
- **Loading** - Spinner or skeleton

## Accessibility Checklist

- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus visible
- [ ] Alt text for images
- [ ] Form labels associated
- [ ] Error messages clear
- [ ] Reduced motion respected
- [ ] Screen reader tested

## Performance Tips

- Code split by route
- Lazy load images
- Optimize animations
- Minimize bundle size
- Use CSS-in-JS sparingly
- Preload critical fonts
- Monitor Core Web Vitals

---

**Next Steps:** Review component examples and apply patterns to your project.
