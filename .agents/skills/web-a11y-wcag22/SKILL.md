---
name: web-a11y-wcag22
description: Accessibility engineering and WCAG 2.2 AA audit patterns for React interfaces including keyboard navigation, ARIA roles, high contrast ratio, and screen reader compatibility.
risk: safe
source: "antigravity-web-skills"
---

# Web Accessibility (WCAG 2.2 AA) Skill

## Overview
Ensures `bakralhayek.com` meets strict WCAG 2.2 Level AA accessibility standards across all device sizes and input modalities.

## Rules & Standards

### 1. Semantic HTML & ARIA Attributes
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` appropriately.
- Interactive elements must be `<button>` or `<a>` with meaningful text or `aria-label`.
- Decorative images must have `alt=""`, while informative images need descriptive `alt` text.

### 2. Keyboard Navigation & Focus Indicators
- All interactive elements (buttons, links, tab switches, filters, inputs) must be fully navigable with `Tab` and `Enter`/`Space`.
- Focus outlines must be visible and clear (e.g., `focus-visible:ring-2 focus-visible:ring-blue-500`).
- Modal dialogs and dropdown menus must trap keyboard focus when open and return focus on close.

### 3. Color Contrast & Dark Mode
- Body text contrast ratio must be at least **4.5:1** against the background.
- Large text (24px+ or 18px+ bold) contrast ratio must be at least **3.0:1**.
- UI component borders and icons must maintain at least **3.0:1** contrast.

### 4. Screen Reader Notifications
- Use `aria-live="polite"` for dynamic updates (such as filtering publication lists or search results).

### 5. Verification Checklist
- Run automated accessibility audits via Lighthouse or Axe Core.
- Test keyboard-only navigation without mouse/touch interaction.
