---
name: stitch-to-code
description: Skill for converting Stitch designs into production-ready frontend code
---

# Stitch to Code Conversion Skill

Use this skill when converting Stitch screen designs into functional frontend code.

## Conversion Workflow

### Step 1: Fetch Design Data
1. Use `get_project` to retrieve the project and all screen instances
2. Use `get_screen` for each screen to get detailed component data
3. Use `list_design_systems` to get the active design system tokens

### Step 2: Analyze the Design
Before writing code, analyze:
- **Component hierarchy**: Identify parent-child relationships
- **Layout patterns**: Flexbox vs Grid, spacing, alignment
- **Design tokens**: Extract colors, fonts, spacing, border-radius from the design system
- **Responsive breakpoints**: Determine how the layout should adapt
- **Interactive states**: Hover, focus, active states

### Step 3: Generate CSS Variables
Map the Stitch design system to CSS custom properties:
```css
:root {
  /* Colors from design system */
  --color-primary: /* from design system */;
  --color-surface: /* from design system */;
  --color-on-surface: /* from design system */;
  
  /* Typography */
  --font-family: /* from design system */;
  
  /* Shape */
  --border-radius: /* from design system corner roundness */;
  
  /* Spacing scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}
```

### Step 4: Build Components
- Create semantic HTML structure matching the screen layout
- Use CSS Grid/Flexbox for responsive layouts
- Apply design tokens via CSS variables
- Add micro-animations and hover effects
- Ensure accessibility (ARIA labels, keyboard navigation, contrast)

### Step 5: Quality Checklist
Before delivering code, verify:
- [ ] All design system colors are used (no hardcoded hex values)
- [ ] Typography matches the design system font
- [ ] Corner radius matches the design system shape
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Interactive states (hover, focus) are implemented
- [ ] Semantic HTML structure
- [ ] Accessibility basics covered
- [ ] Smooth animations and transitions

## Code Patterns

### HTML Structure
```html
<!-- Use semantic elements -->
<header class="site-header">
  <nav class="nav">...</nav>
</header>
<main class="main-content">
  <section class="hero">...</section>
  <section class="features">...</section>
</main>
<footer class="site-footer">...</footer>
```

### CSS Architecture
```css
/* 1. Reset & Base */
/* 2. Design Tokens (CSS Variables) */
/* 3. Layout utilities */
/* 4. Component styles */
/* 5. Responsive overrides */
/* 6. Animations */
```

### Animation Patterns
```css
/* Fade in on scroll */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth hover lift */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}
```
