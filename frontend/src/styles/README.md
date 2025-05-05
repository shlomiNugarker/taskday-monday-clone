# TaskDay Style System

This document outlines the styling approach used in the TaskDay application, which is based on a combination of Tailwind CSS and custom utilities.

## Design Philosophy

Our design system aims to:

1. Maintain consistency across components
2. Facilitate reusability of styles
3. Make design updates easier by centralizing design tokens
4. Ensure accessibility and responsive design

## Core Components

### 1. Design Tokens

Design tokens are stored in `src/components/ui/DesignTokens.js` and serve as the source of truth for:

- Color palette
- Typography
- Spacing
- Shadow/elevation
- Border radius
- Z-index values
- Animation timing
- Breakpoints

These tokens are integrated with Tailwind CSS via the configuration file.

### 2. Common CSS Utilities

Common patterns are defined in `src/styles/components/common.css` as utility classes that complement Tailwind:

- Layout utilities (`layout-container`, `layout-section`)
- Typography utilities (`text-heading-1`, `text-body`)
- Flex patterns (`flex-center`, `flex-between`)
- Interaction states (`hover-highlight`, `focus-ring`)
- Animation utilities (`animate-fade-in`)

### 3. UI Components

Reusable UI components in `src/components/ui/` provide consistent styling for:

- Button (`UiButton`)
- Card (`UiCard`)
- Badge (`UiBadge`)
- Avatar (`UiAvatar`)
- More to come...

## Usage Guidelines

### Using Design Tokens

Tailwind classes reference our design tokens directly:

```html
<!-- Using color tokens -->
<div class="bg-primary-500 text-white"></div>

<!-- Using spacing tokens -->
<div class="p-4 my-5"></div>

<!-- Using elevation tokens -->
<div class="shadow-lg"></div>
```

### Using Common Utilities

```html
<!-- Layout utilities -->
<div class="layout-container">
  <section class="layout-section">
    <!-- Content here -->
  </section>
</div>

<!-- Typography utilities -->
<h1 class="text-heading-1">Title</h1>
<p class="text-body">Content</p>

<!-- Flex patterns -->
<div class="flex-between">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Interaction utilities -->
<button class="hover-highlight focus-ring">Click me</button>
```

### Using UI Components

```html
<!-- Button component -->
<UiButton 
  variant="primary" 
  size="md" 
  rounded="lg"
>
  Click Me
</UiButton>

<!-- Card component -->
<UiCard 
  elevation="md" 
  rounded="lg" 
  hoverable
>
  <template #header>
    Card Header
  </template>
  Card Content
</UiCard>

<!-- Badge component -->
<UiBadge 
  variant="success" 
  size="md"
>
  Completed
</UiBadge>

<!-- Avatar component -->
<UiAvatar 
  size="md" 
  imgSrc="/path/to/image.jpg" 
  alt="User"
  status="online"
/>
```

## Best Practices

1. Always use design tokens instead of arbitrary values
2. Choose common utility classes over repeated Tailwind combinations
3. Use the UI component library for consistent elements
4. Follow the existing patterns when creating new components
5. Update the design tokens when making design system changes

## Extending the System

When creating new components or styles:

1. Check if an existing pattern can be used
2. Use design tokens for values
3. Consider adding to the common utilities if a pattern repeats often
4. Document any new patterns or components

## Responsive Design

We follow a mobile-first approach with consistent breakpoints:

- xs: 480px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Use Tailwind's responsive prefixes (e.g., `md:flex-col`) for responsive design. 