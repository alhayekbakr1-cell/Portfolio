---
name: academic-portfolio-manager
description: Specialized workflows for updating medical research publications, clinical calculators, teaching & mentorship records, CV documents, and academic metrics for physician portfolios.
risk: safe
source: "antigravity-web-skills"
---

# Academic Portfolio Manager Skill

## Overview
Provides guidelines for maintaining and updating clinical, academic, and research content on `bakralhayek.com`.

## Content Management Guidelines

### 1. Research & Publications Data Structure
- Keep publication metadata structured with title, authors, journal, year, DOI, PubMed link, and citation count.
- Include categorization flags (e.g., Oncology, Cardiology, Quality Improvement, AI/Digital Health).

### 2. Clinical Calculators & Medical AI Tools
- Ensure all medical algorithms, clinical calculators, and toxicity visualizers specify:
  - Clinical indication & disclaimer
  - Reference guidelines/papers
  - Input validation bounds (prevent out-of-range clinical inputs)
  - Unit conversions (mg/dL vs mmol/L, etc.)

### 3. Curriculum Vitae (CV) & Documents
- Keep PDF downloads up to date in `public/` and reference them cleanly in `Hero.jsx` and `Header.jsx`.
- Use standard naming conventions: `Bakr_Alhayek_CV.pdf`.

### 4. Verification & Content Auditing
- Verify all outbound links (PubMed, DOI, GitHub, LinkedIn, Google Scholar) load without broken 404s.
- Ensure medical disclaimers remain visible on interactive tools.
