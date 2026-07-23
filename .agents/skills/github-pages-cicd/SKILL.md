---
name: github-pages-cicd
description: Automated CI/CD workflows for building, testing, and deploying Vite React single-page applications to GitHub Pages with custom domains (bakralhayek.com).
risk: safe
source: "antigravity-web-skills"
---

# GitHub Pages CI/CD Skill

## Overview
Defines deployment workflows, GitHub Actions configuration, custom domain management (`bakralhayek.com`), and build validation.

## Architecture & Configuration

### 1. Custom Domain setup (`CNAME`)
- Ensure `public/CNAME` contains:
  ```text
  bakralhayek.com
  ```
- This ensures GitHub Pages maps custom DNS domain `bakralhayek.com` cleanly during automated builds.

### 2. GitHub Actions Deployment Workflow (`.github/workflows/deploy.yml`)
- Standard build & deploy workflow:
  ```yaml
  name: Deploy Portfolio Website

  on:
    push:
      branches: [ main ]
    workflow_dispatch:

  permissions:
    contents: read
    pages: write
    id-token: write

  concurrency:
    group: "pages"
    cancel-in-progress: true

  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout repository
          uses: actions/checkout@v4

        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: 'npm'

        - name: Install dependencies
          run: npm ci

        - name: Build site
          run: npm run build

        - name: Upload artifact
          uses: actions/upload-pages-artifact@v3
          with:
            path: './dist'

        - name: Deploy to GitHub Pages
          uses: actions/deploy-pages@v4
  ```

### 3. SPA Routing Fallback (`public/404.html`)
- Include a 404 page that redirects SPA paths to `index.html` to prevent 404 errors on page refreshes when using client-side routing.
