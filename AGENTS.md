# Project Guidelines & Strict Anti-Hallucination Protocol (bakralhayek.com)

## 🛡️ Anti-Hallucination & Data Integrity Directives

1. **Zero Unverified Data Insertion**:
   - NEVER add, invent, infer, or extrapolate publication titles, author lists, DOIs, PMIDs, journal names, citations, or clinical study metrics without direct, explicit user input.

2. **Explicit User Approval Gate**:
   - Before modifying any content or database file (such as `publicationData.js`, `newsData.js`, clinical calculator formulas, or bio text), present the exact proposed text/JSON to the user for explicit confirmation.

3. **No Filename Inference**:
   - NEVER infer publication details, co-authors, or manuscript status from file names or folder titles. Always inspect the exact text inside documents or request user verification.

4. **Link & Asset Verification**:
   - All URLs, DOIs, PMIDs, and downloadable PDF assets must be verified to exist before adding them to the site.

## Project Technical Stack
- **Framework**: React 18+ with Vite
- **Deployment**: GitHub Pages via GitHub Actions (`bakralhayek.com`)
- **Build Verification**: `npm run build`
