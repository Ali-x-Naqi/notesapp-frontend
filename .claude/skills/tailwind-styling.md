# Tailwind CSS v4 Styling Conventions

## v4 Key Differences from v3

- No `tailwind.config.js` — all config lives in `globals.css`
- Entry point: `@import 'tailwindcss';` in CSS
- Custom tokens: `@theme inline { --color-name: value; }` block in CSS
- PostCSS plugin: `@tailwindcss/postcss`

## CSS Variables (defined in src/app/globals.css)

```css
:root {
  --background: #030712;
  --foreground: #f9fafb;
}
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

Use as: `bg-background`, `text-foreground`

## Color Palette

| Class | Usage |
|-------|-------|
| `bg-gray-950` | Page background |
| `bg-gray-900` | Cards, inputs |
| `text-white` | Primary headings |
| `text-gray-300` | Labels |
| `text-gray-400` | Body text |
| `text-gray-500` | Placeholders |
| `text-red-400` | Error messages |
| `border-gray-800` | Default borders |
| `border-gray-700` | Input borders |

## Component Class Recipes

### Input
```
w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white
placeholder-gray-500 focus:border-gray-500 focus:outline-none
```

### Primary Button
```
rounded-lg bg-white px-6 py-2 text-sm font-medium text-gray-950
transition-opacity hover:opacity-90 disabled:opacity-50
```

### Card
```
rounded-lg border border-gray-800 bg-gray-900 p-4
```

### Nav Bar
```
sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur
```

### Error Message
```
mt-1 text-sm text-red-400
```

## Conventions

1. Never use inline `style={{}}` in JSX
2. Never create `.module.css` files — `globals.css` only
3. Use `transition-colors` or `transition-opacity` consistently for hover states
4. `disabled:opacity-50` for disabled buttons
