# Design System Guide - Complete Reference

## Overview

The InfinityStyles Design System is a comprehensive system for creating beautiful, consistent, and accessible user interfaces. It includes components, tokens, templates, and guidelines for building with modern web technologies.

## Components

### Available Component Categories

- **UI Components** - Basic building blocks (buttons, inputs, cards)
- **Layout Components** - Structural elements (containers, stacks, grids)
- **Form Components** - Input elements and form utilities
- **Navigation Components** - Menu and navigation elements
- **Feedback Components** - Alerts, badges, progress indicators
- **Overlay Components** - Modals, dropdowns, popovers
- **Animation Components** - Motion effects and transitions
- **Section Components** - Full-page sections and layouts
- **Widget Components** - Pre-built feature combinations
- **Ribbon Components** - Decorative ribbon elements

## Design Tokens

### Colors

The design system includes a comprehensive color palette with semantic naming:

- **Primary** - Main brand color (blue)
- **Secondary** - Supporting color (purple)
- **Accent** - Highlight color (orange)
- **Success/Warning/Error** - Status colors
- **Neutral** - Grayscale colors
- **Semantic** - Success, warning, error, info

### Typography

- **Font Families** - Sans, serif, mono, display
- **Font Sizes** - 12px to 60px
- **Font Weights** - 100 to 900
- **Line Heights** - 1 to 2
- **Letter Spacing** - Predefined values

### Spacing

Consistent spacing scale based on 4px increments:
- 0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 96px

### Border Radius

- **None** - 0px
- **Small** - 4px
- **Base** - 6px
- **Medium** - 8px
- **Large** - 12px
- **Extra Large** - 16px-24px
- **Full** - 9999px

### Shadows

- **None** - No shadow
- **XS to 2XL** - Progressive shadow depths
- **Glow** - Glowing effect
- **Glow LG** - Large glowing effect

### Transitions

- **Fast** - 150ms
- **Base** - 200ms (default)
- **Slow** - 300ms
- **Slower** - 500ms

## Color Swatches

Pre-configured color combinations for quick theming:

### Available Swatches

- **Light** - Default light theme
- **Dark** - Dark mode variant
- **Nature** - Green/teal palette
- **Ocean** - Blue/cyan palette
- **Sunset** - Orange/red palette
- **Purple** - Violet/indigo palette
- **Monochrome** - Grayscale
- **High Contrast** - Accessibility focused

### Using Swatches

```tsx
import { colorSwatches } from '@/lib/color-swatches'
import { useThemeSystem } from '@/lib/theme-system'

export function ThemeSwitcher() {
  const { setSwatch } = useThemeSystem()
  
  return (
    <div>
      {Object.keys(colorSwatches).map(swatch => (
        <button
          key={swatch}
          onClick={() => setSwatch(swatch as keyof typeof colorSwatches)}
        >
          {swatch}
        </button>
      ))}
    </div>
  )
}
```

## Theme System

### Light/Dark Mode

```tsx
import { ThemeSystemProvider, useThemeSystem } from '@/lib/theme-system'

// Provider setup
export function RootLayout({ children }) {
  return (
    <ThemeSystemProvider defaultTheme="system">
      {children}
    </ThemeSystemProvider>
  )
}

// Using themes
function Component() {
  const { theme, setTheme } = useThemeSystem()
  
  return (
    <button onClick={() => setTheme('dark')}>
      Toggle to Dark
    </button>
  )
}
```

### Custom Themes

Create custom themes by extending the base tokens:

```tsx
import { tokens } from '@/lib/design-tokens'

const customTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    primary: {
      // Your custom primary colors
    },
  },
}
```

## Icons

### Icon Library

Access 100+ icons from Lucide React:

```tsx
import { icons, getIcon } from '@/lib/icons'
import { Check, Heart, Settings } from 'lucide-react'

// Direct import
<Check size={24} />

// Dynamic import
const IconComponent = getIcon('check')
```

### Icon Sizes

- **xs** - 12px
- **sm** - 16px
- **md** - 20px
- **lg** - 24px
- **xl** - 32px
- **2xl** - 40px

### Icon Colors

- default, muted, primary, secondary, accent
- success, warning, error, info

## Typography

### Text Styles

```tsx
import { typographySystem } from '@/lib/typography'

// Predefined styles
<div style={typographySystem.styles.h1}>
  Heading 1
</div>

// Tailwind classes
<h1 className={typographySystem.classes.h1}>
  Heading 1
</h1>
```

### Available Styles

- **h1-h6** - Heading levels
- **body** - Regular body text
- **bodySm** - Small body text
- **bodyXs** - Extra small body text
- **caption** - Caption text (uppercase)
- **mono** - Monospace text

## Widgets

Pre-built UI combinations for common use cases:

### StatWidget

Display metrics and KPIs:

```tsx
import { StatWidget } from '@/components/widgets'
import { TrendingUp } from 'lucide-react'

<StatWidget
  label="Revenue"
  value="$45,231"
  change={12}
  description="Up from last month"
  icon={<TrendingUp />}
/>
```

### FeatureWidget

Showcase features:

```tsx
import { FeatureWidget } from '@/components/widgets'

<FeatureWidget
  title="Feature Name"
  description="Feature description"
  action={{ label: 'Learn More', onClick: () => {} }}
/>
```

### TimelineItem

Create timelines:

```tsx
import { TimelineItem } from '@/components/widgets'

<TimelineItem
  date="2024-01-15"
  title="Milestone"
  description="Completed feature"
  status="completed"
/>
```

### ListItem

Build lists:

```tsx
import { ListItem } from '@/components/widgets'

<ListItem
  title="Item"
  description="Description"
  badge="New"
  onClick={() => {}}
/>
```

## Ribbons

Decorative elements for highlighting content:

```tsx
import { Ribbon, RibbonContainer } from '@/components/ribbons'

<RibbonContainer
  ribbon="New"
  ribbonPosition="top-right"
  ribbonColor="success"
  className="p-4 border rounded-lg"
>
  Content
</RibbonContainer>
```

### Ribbon Positions

- top-left, top-right, bottom-left, bottom-right

### Ribbon Colors

- default, success, warning, error, info

## Building Blocks

Basic layout components for composition:

```tsx
import {
  Container,
  VStack,
  HStack,
  Center,
  Spacer,
} from '@/components/design-system'

<Container>
  <Center>
    <VStack gap="lg">
      <h1>Title</h1>
      <Spacer size="md" />
      <p>Content</p>
    </VStack>
  </Center>
</Container>
```

## Dark/Light Mode

### Automatic Detection

The theme system automatically detects system preference:

```tsx
// Uses system preference by default
<ThemeSystemProvider defaultTheme="system">
  {children}
</ThemeSystemProvider>
```

### Manual Control

```tsx
function ThemeToggle() {
  const { theme, setTheme } = useThemeSystem()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
```

## Schemas & Validation

Use Zod for schema definition and validation:

```tsx
import * as z from 'zod'

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive(),
})

type User = z.infer<typeof userSchema>
```

## Best Practices

### Component Composition

Build complex UIs by combining simple components:

```tsx
<Container>
  <HStack gap="md">
    <VStack gap="sm" className="flex-1">
      <h1>Title</h1>
      <p>Subtitle</p>
    </VStack>
    <Button>Action</Button>
  </HStack>
</Container>
```

### Consistent Spacing

Use the spacing scale from design tokens:

```tsx
<div className="p-6 gap-4">
  {/* Uses spacing from tokens */}
</div>
```

### Type Safety

Always define component prop types:

```tsx
interface MyComponentProps {
  title: string
  description?: string
  onAction: () => void
}

export function MyComponent({
  title,
  description,
  onAction,
}: MyComponentProps) {
  // Implementation
}
```

### Accessibility

- Use semantic HTML
- Provide ARIA labels
- Ensure color contrast
- Support keyboard navigation
- Test with screen readers

## Resources

- [API Documentation](API.md)
- [Component Examples](COMPONENT_EXAMPLES.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Architecture Guide](../ARCHITECTURE.md)

## Support

For questions or issues:
1. Check the API documentation
2. Review component examples
3. Read the architecture guide
4. Open a GitHub issue

---

**InfinityStyles Design System** - Built for modern web development
