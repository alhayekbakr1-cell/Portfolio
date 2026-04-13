# Portfolio Maintenance Guide 👨‍⚕️💻

This guide explains how to update your academic portfolio without needing a software engineer.

## 1. Updating Your CV
When you have a new version of your CV:
1.  Name your file `Bakr_Alhayek_CV.pdf`.
2.  Replace the existing file in the `public/` folder.
    *   **Path:** `Resume/public/Bakr_Alhayek_CV.pdf`
3.  **Commit & Push** your changes to GitHub. The site updates automatically.

## 2. Adding a New Publication
To add a paper to the "Publications" dashboard:
1.  Open `src/components/Publications.jsx`.
2.  Find the `const publications = [...]` list (around line 10).
3.  Copy an existing entry and paste it at the top of the list.
4.  Update the fields:
    ```javascript
    {
        id: 7, // Increment this number
        title: "New Study Title Here",
        journal: "Journal Name",
        year: 2024, // Update year
        type: "Original Research", // or "Abstract", "Case Report"
        citation: "Alhayek B, et al. Journal. 2024...",
        link: "https://pubmed.ncbi.nlm.nih.gov/..."
    },
    ```

## 3. Adding a Research Project
To add a new ongoing project:
1.  Open `src/components/Research.jsx`.
2.  Find `const projects = [...]`.
3.  Add your new project:
    ```javascript
    {
        title: "New Quality Improvement Initiative",
        role: "Principal Investigator",
        question: "What is the clinical question?",
        methods: "Retrospective review...",
        impact: "Anticipated outcomes...",
        status: "Data Analysis",
        type: "Quality Improvement",
        tags: ["Cardiology", "AI"]
    },
    ```

## 4. Updates to Teaching or Experience
- **Teaching:** `src/components/TeachingMentorship.jsx`
- **Experience:** `src/components/Experience.jsx`
    *   *Tip:* These use simple lists. Just follow the pattern of the existing items.

## 5. Changing Your Profile Picture
1.  Save your new photo as `profile.png` (or `.jpg`).
2.  Replace the file in `src/assets/profile.png`.
3.  (Optional) If you change the filename, update the import in `src/components/Hero.jsx`.

## 6. How to Deploy (Make it Live)
If you are editing on your computer:
1.  Open Terminal in the project folder.
2.  Run: `npm run deploy`
3.  Wait for "Published" message.
4.  Your site at `bakralhayek.com` will update in ~2-5 minutes.

---
**Need Help?**
If the site breaks, you can visually check the error message in the terminal. Usually, it's a missing comma `,` or a missing closing bracket `}`.
