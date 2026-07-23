/**
 * Publication Data - Centralized Source
 * Enhanced schema with meta data for filtering and search
 */

/**
 * Auto-tag publications based on keywords
 */
const autoTag = (title, journal = '') => {
    const tags = [];
    const text = (title + ' ' + journal).toLowerCase();

    // Topic tagging
    if (text.match(/checkpoint inhibitor|ici|immune|immunotherapy|pembrolizumab|nivolumab/i)) {
        tags.push('Immunotherapy');
    }
    if (text.match(/leukemia|myeloma|lymphoma|hematologic|neutropenia|anc/i)) {
        tags.push('Hematology');
    }
    if (text.match(/pancreatic|hepatocellular|hcc|biliary|colorectal|gi |gastro/i)) {
        tags.push('GI Oncology');
    }
    if (text.match(/myocarditis|cardio|cardiac/i)) {
        tags.push('Cardio-Oncology');
    }
    if (text.match(/case report|rare case/i)) {
        tags.push('Case Report');
    }
    if (text.match(/population|ncdb|seer|database/i)) {
        tags.push('Population Study');
    }
    if (text.match(/radiation|radiotherapy|ebrt/i)) {
        tags.push('Radiation Oncology');
    }
    if (text.match(/thyroid|anaplastic/i)) {
        tags.push('Head & Neck');
    }

    return tags.length > 0 ? tags : ['General Oncology'];
};

/**
 * Extract year from citation string
 */
const extractYear = (citation) => {
    const match = citation.match(/20\d{2}/);
    return match ? parseInt(match[0]) : new Date().getFullYear();
};

/**
 * Extract month from citation
 */
const extractMonth = (citation) => {
    const months = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };

    for (const [month, num] of Object.entries(months)) {
        if (citation.includes(month)) return month;
    }
    return null;
};

/**
 * Parse journal name from citation
 */
const extractJournal = (citation) => {
    // Extract text before year
    const match = citation.match(/^([^.]+)\./);
    return match ? match[1].trim() : citation.split('.')[0];
};

// Peer-Reviewed Publications
export const peerReviewed = [

    {
        id: 'pub-auto-thyroid-immuno',
        title: "Advances in Immunotherapy for Thyroid Malignancies: Current Evidence, Biomarkers, and Future Horizons.",
        authors: ["Alhayek B", "Hadidi D", "Baidoun F", "Ramsakal A", "Abdel-Rahman O"],
        journal: "Frontiers in Oncology",
        journalAbbrev: "Front Oncol",
        citation: "Front Oncol. 2026 Feb; 16: 104829.",
        year: 2026,
        month: "Feb",
        volume: "16",
        issue: "",
        pages: "104829",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "Head & Neck",
        link: "https://pubmed.ncbi.nlm.nih.gov/",
        doi: "10.3389/fonc.2026.104829",
        pmid: "",
        pmc: "",
        tags: autoTag("Advances in Immunotherapy for Thyroid Malignancies: Current Evidence, Biomarkers, and Future Horizons.", "Frontiers in Oncology"),
        featured: true,
    },
    {
        id: 'pub-auto-41916426',
        title: "QIM26-292: Capturing a Potentially Life-Altering Missed Opportunity in Cancer Prevention: Implementing a Human Papillomavirus (HPV) Vaccination Program in an Internal Medicine Resident Ambulatory Care Clinic (IMRAC).",
        authors: ["Malone X", "Alhayek B", "Khan A", "Ramsakal A"],
        journal: "Journal of the National Comprehensive Cancer Network : JNCCN",
        journalAbbrev: "J Natl Compr Canc Netw",
        citation: "J Natl Compr Canc Netw. 2026 Mar; 24(3.5).",
        year: 2026,
        month: "Mar",
        volume: "24",
        issue: "3.5",
        pages: "",
        yourRole: "Co-Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/41916426/",
        doi: "10.6004/jnccn.2025.7378",
        pmid: "41916426",
        pmc: "",
        tags: autoTag("QIM26-292: Capturing a Potentially Life-Altering Missed Opportunity in Cancer Prevention: Implementing a Human Papillomavirus (HPV) Vaccination Program in an Internal Medicine Resident Ambulatory Care Clinic (IMRAC).", "J Natl Compr Canc Netw"),
        featured: false,
    },
    {
        id: 'pub-auto-41911821',
        title: "QIM26-288: Change Through Learning: Educational Interventions to Improve Cancer Pain Management.",
        authors: ["Alhayek B", "Malone X", "Alwan I", "Sepulveda L", "Kroker-Bode C", "Ramsakal A"],
        journal: "Journal of the National Comprehensive Cancer Network : JNCCN",
        journalAbbrev: "J Natl Compr Canc Netw",
        citation: "J Natl Compr Canc Netw. 2026 Mar; 24(3.5).",
        year: 2026,
        month: "Mar",
        volume: "24",
        issue: "3.5",
        pages: "",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/41911821/",
        doi: "10.6004/jnccn.2025.7401",
        pmid: "41911821",
        pmc: "",
        tags: autoTag("QIM26-288: Change Through Learning: Educational Interventions to Improve Cancer Pain Management.", "J Natl Compr Canc Netw"),
        featured: false,
    },
    {
        id: 'pub-auto-41473611',
        title: "Fulminant Immune Checkpoint Inhibitor-Induced Myocarditis and Complete Heart Block in Advanced Melanoma: A Case Report.",
        authors: ["Alhayek B", "Malone X", "Rashid MA", "Sepulveda L", "Ramsakal A"],
        journal: "Cureus",
        journalAbbrev: "Cureus",
        citation: "Cureus. 2025 Nov; 17(11): e98075.",
        year: 2025,
        month: "Nov",
        volume: "17",
        issue: "11",
        pages: "e98075",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/41473611/",
        doi: "10.7759/cureus.98075",
        pmid: "41473611",
        pmc: "PMC12746792",
        tags: autoTag("Fulminant Immune Checkpoint Inhibitor-Induced Myocarditis and Complete Heart Block in Advanced Melanoma: A Case Report.", "Cureus"),
        featured: true,
    },
    {
        id: 'pub-auto-41393639',
        title: "Mixed-Phenotype Acute Leukemia Transforming Into Acute Myelomonocytic Leukemia (AML M4): A Case Report and Therapeutic Challenges.",
        authors: ["Alhayek B", "Malone X", "Rabie T", "Brink R", "Gummalla R"],
        journal: "Cureus",
        journalAbbrev: "Cureus",
        citation: "Cureus. 2025 Nov; 17(11): e96576.",
        year: 2025,
        month: "Nov",
        volume: "17",
        issue: "11",
        pages: "e96576",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/41393639/",
        doi: "10.7759/cureus.96576",
        pmid: "41393639",
        pmc: "PMC12697381",
        tags: autoTag("Mixed-Phenotype Acute Leukemia Transforming Into Acute Myelomonocytic Leukemia (AML M4): A Case Report and Therapeutic Challenges.", "Cureus"),
        featured: false,
    },
    {
        id: 'pub-auto-41262800',
        title: "A Rare, Potentially Fatal Complication of a Common Virus: Epstein-Barr Virus-Induced Hemophagocytic Lymphohistiocytosis in Adolescence.",
        authors: ["Alhayek B", "Malone X", "Mislay JA", "Cardew RT", "Ramsakal A"],
        journal: "Cureus",
        journalAbbrev: "Cureus",
        citation: "Cureus. 2025 Oct; 17(10): e94918.",
        year: 2025,
        month: "Oct",
        volume: "17",
        issue: "10",
        pages: "e94918",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/41262800/",
        doi: "10.7759/cureus.94918",
        pmid: "41262800",
        pmc: "PMC12624068",
        tags: autoTag("A Rare, Potentially Fatal Complication of a Common Virus: Epstein-Barr Virus-Induced Hemophagocytic Lymphohistiocytosis in Adolescence.", "Cureus"),
        featured: false,
    },
    {
        id: 'pub-auto-40772694',
        title: "Impact of Intensive Multimodal Treatment on the Outcomes of Patients With Anaplastic Thyroid Cancer.",
        authors: ["Alhayek B", "Baidoun F", "Hadidi D", "Alhaj Moustafa M", "Abdel-Rahman O"],
        journal: "American journal of clinical oncology",
        journalAbbrev: "Am J Clin Oncol",
        citation: "Am J Clin Oncol. 2026 Mar; 49(3): 136-146.",
        year: 2026,
        month: "Mar",
        volume: "49",
        issue: "3",
        pages: "136-146",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/40772694/",
        doi: "10.1097/COC.0000000000001246",
        pmid: "40772694",
        pmc: "",
        tags: autoTag("Impact of Intensive Multimodal Treatment on the Outcomes of Patients With Anaplastic Thyroid Cancer.", "Am J Clin Oncol"),
        featured: false,
    },
    {
        id: 'pub-auto-40652209',
        title: "Radiation-induced temporal lobe necrosis in a nasopharyngeal cancer patient after external beam radiotherapy: a case report and review of literature.",
        authors: ["Jlailati A", "Al Sbenaty G", "Boali O", "Younes D", "Alhayek B", "Mozi B", "Al-Bitar A", "Bakkour M"],
        journal: "Journal of medical case reports",
        journalAbbrev: "J Med Case Rep",
        citation: "J Med Case Rep. 2025 Jul; 19(1): 339.",
        year: 2025,
        month: "Jul",
        volume: "19",
        issue: "1",
        pages: "339",
        yourRole: "Co-Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/40652209/",
        doi: "10.1186/s13256-025-05368-y",
        pmid: "40652209",
        pmc: "PMC12255967",
        tags: autoTag("Radiation-induced temporal lobe necrosis in a nasopharyngeal cancer patient after external beam radiotherapy: a case report and review of literature.", "J Med Case Rep"),
        featured: false,
    },
    {
        id: 'pub-auto-40621238',
        title: "Pancreatic Plasmacytoma Presenting as Acute Pancreatitis: An Unusual Extramedullary Onset of Multiple Myeloma.",
        authors: ["Alhayek B", "Malone X", "Khan A", "Gummalla R", "Brink R"],
        journal: "Cureus",
        journalAbbrev: "Cureus",
        citation: "Cureus. 2025 Jun; 17(6): e85455.",
        year: 2025,
        month: "Jun",
        volume: "17",
        issue: "6",
        pages: "e85455",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/40621238/",
        doi: "10.7759/cureus.85455",
        pmid: "40621238",
        pmc: "PMC12228989",
        tags: autoTag("Pancreatic Plasmacytoma Presenting as Acute Pancreatitis: An Unusual Extramedullary Onset of Multiple Myeloma.", "Cureus"),
        featured: false,
    },
    {
        id: 'pub-auto-40621233',
        title: "A Case of Spontaneous Tumor Lysis Syndrome With Acute Kidney Injury and the Timing of Chemotherapy.",
        authors: ["Malone X", "Alhayek B", "Telleria O", "Garza JF"],
        journal: "Cureus",
        journalAbbrev: "Cureus",
        citation: "Cureus. 2025 Jun; 17(6): e85342.",
        year: 2025,
        month: "Jun",
        volume: "17",
        issue: "6",
        pages: "e85342",
        yourRole: "Co-Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/40621233/",
        doi: "10.7759/cureus.85342",
        pmid: "40621233",
        pmc: "PMC12227330",
        tags: autoTag("A Case of Spontaneous Tumor Lysis Syndrome With Acute Kidney Injury and the Timing of Chemotherapy.", "Cureus"),
        featured: false,
    },
    {
        id: 'pub-auto-40476702',
        title: "Impact of Sequencing of Treatment Modalities on Survival in Nonmetastatic Hepatocellular Carcinoma.",
        authors: ["Alhayek B", "Baidoun F", "Hadidi D", "Moustafa MA", "Abdel-Rahman O"],
        journal: "American journal of clinical oncology",
        journalAbbrev: "Am J Clin Oncol",
        citation: "Am J Clin Oncol. 2025 Dec; 48(12): 600-609.",
        year: 2025,
        month: "Dec",
        volume: "48",
        issue: "12",
        pages: "600-609",
        yourRole: "First Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/40476702/",
        doi: "10.1097/COC.0000000000001221",
        pmid: "40476702",
        pmc: "",
        tags: autoTag("Impact of Sequencing of Treatment Modalities on Survival in Nonmetastatic Hepatocellular Carcinoma.", "Am J Clin Oncol"),
        featured: false,
    },
    {
        id: 'pub-auto-37593371',
        title: "Atypical distal tracheal fibrous bridge and bronchial stenosis in an adult patient with bronchopulmonary dysplasia.",
        authors: ["Wadiwala IJ", "Yu Lee-Mateus A", "Alhayek B", "Abia-Trujillo D", "Chadha R", "Hazelett BN", "Fernandez-Bussy S"],
        journal: "Respirology case reports",
        journalAbbrev: "Respirol Case Rep",
        citation: "Respirol Case Rep. 2023 Sep; 11(9): e01203.",
        year: 2023,
        month: "Sep",
        volume: "11",
        issue: "9",
        pages: "e01203",
        yourRole: "Co-Author",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/37593371/",
        doi: "10.1002/rcr2.1203",
        pmid: "37593371",
        pmc: "PMC10427834",
        tags: autoTag("Atypical distal tracheal fibrous bridge and bronchial stenosis in an adult patient with bronchopulmonary dysplasia.", "Respirol Case Rep"),
        featured: false,
    },
    // AUTO-SYNC-ANCHOR-DO-NOT-DELETE
];

// Submitted Publications
export const submitted = [
    {
        id: 'sub-002',
        title: "SGLT2 Inhibitors for Mitigation of Cancer Therapy-Related Cardiac Dysfunction (CTRCD): A Systematic Synthesis and Mechanistic Framework",
        authors: ["Alhayek B", "Cardio-Oncology Research Group"],
        journal: "JACC: CardioOncology",
        journalAbbrev: "JACC CardioOncol",
        citation: "Submitted to JACC: CardioOncology (2026).",
        year: 2026,
        yourRole: "First Author",
        type: "submitted",
        category: "Cardio-Oncology & Immune Toxicities",
        tags: autoTag("SGLT2 Inhibitors for Mitigation of Cancer Therapy-Related Cardiac Dysfunction CTRCD", "JACC CardioOncology"),
        featured: true,
    },
    {
        id: 'sub-001',
        title: "Electrophysiologic Phenotype Outperforms LVEF for Mortality Risk Stratification in ICI-Myocarditis",
        authors: ["Alhayek B", "Collaborators et al"],
        journal: "JACC: CardioOncology",
        journalAbbrev: "JACC CardioOncol",
        citation: "Submitted to JACC: CardioOncology.",
        year: 2025,
        yourRole: "First Author",
        type: "submitted",
        category: "Cardio-Oncology & Immune Toxicities",
        tags: autoTag("Electrophysiologic Phenotype LVEF Mortality ICI-Myocarditis", "JACC CardioOncology"),
        featured: true,
    },
];

// Preprints
export const preprints = [
    {
        id: 'pre-001',
        title: "Impact of peri-operative chemotherapy on outcomes in non-metastatic biliary tract cancer",
        authors: ["Wilson D", "Alhayek B"],
        journal: "Preprint",
        journalAbbrev: "Preprint",
        citation: "Preprint (Aug 2025).",
        year: 2025,
        month: "Aug",
        yourRole: "Co-Author",
        type: "preprint",
        category: "Gastrointestinal Oncology",
        tags: autoTag("biliary tract cancer chemotherapy"),
    },
];

// Abstracts & Presentations
export const abstracts = [
    {
        id: 'abs-001',
        title: "Educational Interventions to Improve Cancer Pain Management",
        authors: ["Alhayek B", "Team"],
        journal: "JNCCN",
        journalAbbrev: "JNCCN",
        citation: "JNCCN 2024. (Abstract)",
        year: 2024,
        yourRole: "Lead Author",
        type: "abstract",
        category: "General & Supportive Care",
        tags: ['Education', 'Supportive Care'],
    },
    {
        id: 'abs-002',
        title: "Fulminant Immune Checkpoint Inhibitor-Induced Myocarditis",
        authors: ["Alhayek B"],
        journal: "JNCCN",
        journalAbbrev: "JNCCN",
        citation: "JNCCN 2024. (Abstract)",
        year: 2024,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Cardio-Oncology & Immune Toxicities",
        tags: autoTag("Immune Checkpoint Inhibitor Myocarditis"),
    },
    {
        id: 'abs-003',
        title: "Implementing an HPV Vaccination Program in a Resident Clinic",
        authors: ["Miller A", "Alhayek B"],
        journal: "JNCCN",
        journalAbbrev: "JNCCN",
        citation: "JNCCN 2024. (Abstract)",
        year: 2024,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Head & Neck / Thyroid",
        tags: ['Prevention', 'Head & Neck'],
    },
    {
        id: 'abs-004',
        title: "Rare Case of Metastatic Lung Cancer Presentation",
        authors: ["Thompson N", "Alhayek B"],
        journal: "JNCCN",
        journalAbbrev: "JNCCN",
        citation: "JNCCN 2024. (Abstract)",
        year: 2024,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Thoracic Oncology",
        tags: ['Thoracic Oncology', 'Case Report'],
    },
    {
        id: 'abs-005',
        title: "Unusual Hepatic Mucinous Cystic Neoplasm Causing Biliary Obstruction",
        authors: ["Clark R", "Alhayek B"],
        journal: "ACG",
        journalAbbrev: "ACG",
        citation: "ACG 2023. (Case Report)",
        year: 2023,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Gastrointestinal Oncology",
        tags: autoTag("Hepatic Biliary"),
    },
    {
        id: 'abs-006',
        title: "Primary Squamous Cell Carcinoma of the Small Intestine: A Population-Based Study",
        authors: ["Alhayek B", "Research Team"],
        journal: "ASCO GI",
        journalAbbrev: "ASCO GI",
        citation: "ASCO GI 2026. (Abstract)",
        year: 2026,
        yourRole: "Presenting Author",
        type: "abstract",
        category: "Gastrointestinal Oncology",
        tags: autoTag("Small Intestine population study"),
        featured: true,
    },
    {
        id: 'abs-007',
        title: "Early Peripheral Blood Neutrophil-to-Lymphocyte Ratio (NLR) Dynamics in mUC",
        authors: ["White J", "Alhayek B"],
        journal: "GU ASCO",
        journalAbbrev: "GU ASCO",
        citation: "GU ASCO 2025. Poster Presentation.",
        year: 2025,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Genitourinary Oncology",
        tags: ['GU Oncology', 'Biomarkers'],
    },
];

// Combined all publications
export const allPublications = [
    ...peerReviewed,
    ...submitted,
    ...preprints,
    ...abstracts,
];

/**
 * Get unique values for filters
 */
export const getFilterOptions = () => {
    const years = [...new Set(allPublications.map(p => p.year))].sort((a, b) => b - a);
    const types = [...new Set(allPublications.map(p => p.type))];
    const roles = [...new Set(allPublications.map(p => p.yourRole))];
    const allTags = allPublications.flatMap(p => p.tags || []);
    const topics = [...new Set(allTags)].sort();

    return { years, types, roles, topics };
};

/**
 * Get summary statistics
 */
export const getPublicationStats = (publications = allPublications) => {
    const currentYear = new Date().getFullYear();

    return {
        total: publications.length,
        firstAuthor: publications.filter(p => p.yourRole === 'First Author' || p.yourRole === 'Lead Author').length,
        peerReviewed: publications.filter(p => p.type === 'peer-reviewed').length,
        thisYear: publications.filter(p => p.year === currentYear).length,
        byYear: publications.reduce((acc, p) => {
            acc[p.year] = (acc[p.year] || 0) + 1;
            return acc;
        }, {}),
        byType: publications.reduce((acc, p) => {
            acc[p.type] = (acc[p.type] || 0) + 1;
            return acc;
        }, {}),
        byTopic: publications.flatMap(p => p.tags || []).reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {}),
    };
};

export default allPublications;
