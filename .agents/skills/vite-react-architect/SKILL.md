---
name: vite-react-architect
description: Expert guidelines and patterns for Vite + React architecture, performance optimization, code splitting, and bundle size reduction in single-page applications.
risk: safe
source: "antigravity-web-skills"
---

# Vite & React Architecture Skill

## Overview
This skill provides production-grade architectural patterns, optimization strategies, and coding standards for Vite + React SPAs.

## Core Rules & Guidelines

### 1. Code Splitting & Dynamic Imports
- Lazy-load non-critical or heavy components using `React.lazy()` and `Suspense`.
- Split routes and modal dialogs so the initial JS bundle remains light (< 150KB gzipped).
- Example:
  ```jsx
  import React, { Suspense, lazy } from 'react';

  const ClinicalCalculators = lazy(() => import('./components/ClinicalCalculators'));
  const ToxicityVisualizer = lazy(() => import('./components/ToxicityVisualizer'));

  function App() {
    return (
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <ClinicalCalculators />
      </Suspense>
    );
  }
  ```

### 2. Asset Pipeline Optimization
- Keep heavy media assets (images, PDFs) compressed in `public/assets` or loaded via web workers / CDN.
- Use modern image formats (`.webp`, `.avif`) with explicit `width`, `height`, and `loading="lazy"` attributes.

### 3. State Management & Re-render Prevention
- Use custom hooks for isolated state (e.g., filter state, scroll position, local storage sync).
- Memoize expensive calculations (`useMemo`) and callbacks (`useCallback`) when passing down to heavy child components.

### 4. Vite Configuration Best Practices
- Configure manual chunking in `vite.config.js` for vendor dependencies:
  ```js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            lucide: ['lucide-react']
          }
        }
      }
    }
  });
  ```

### 5. Verification Commands
- Local Dev Server: `npm run dev`
- Production Build: `npm run build`
- Preview Build: `npm run preview`
