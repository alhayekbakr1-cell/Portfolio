export const activeLabProjects = [
    {
        id: "hit-overdiagnosis",
        title: "Overdiagnosing HIT: A Quality Improvement Initiative",
        clinicalFocus: "Hematology",
        technicalFocus: "Quality Improvement",
        description: "Investigating the systemic overdiagnosis of Heparin-Induced Thrombocytopenia and implementing clinical decision support tools to improve the 4T scoring accuracy in the wards.",
        requiredSkills: ["Chart Review", "Clinical Reasoning", "Data Abstraction"],
        preferredRole: ["Resident", "Fellow"],
        matchThreshold: 1, // Number of matching skills needed
        bgColor: "var(--accent-navy)",
        isHighPriority: true
    },
    {
        id: "ai-precision-nutrition",
        title: "Generative AI in Precision Nutrition",
        clinicalFocus: "Internal Medicine",
        technicalFocus: "Artificial Intelligence",
        description: "Evaluating the efficacy of LLMs in parsing continuous glucose monitor (CGM) data to generate personalized, dynamic nutritional pathways for diabetic patients.",
        requiredSkills: ["Python", "Machine Learning", "Literature Review", "Biostatistics"],
        preferredRole: ["Data Scientist", "Medical Student", "Resident"],
        matchThreshold: 2,
        bgColor: "var(--accent-teal)",
        isHighPriority: false
    },
    {
        id: "cv-readmission-ml",
        title: "Predictive Models for Cardiovascular Readmissions",
        clinicalFocus: "Cardiology",
        technicalFocus: "Data Science",
        description: "Building predictive random-forest models using Epic EMR data to identify heart failure patients at high risk of 30-day readmission prior to discharge.",
        requiredSkills: ["R", "Python", "Epic EMR", "Biostatistics"],
        preferredRole: ["Data Scientist", "Fellow"],
        matchThreshold: 2,
        bgColor: "#3b82f6", // Blue
        isHighPriority: true
    },
    {
        id: "med-ed-vr",
        title: "Virtual Reality in Medical Education Diagnostics",
        clinicalFocus: "Medical Education",
        technicalFocus: "HCI / UX",
        description: "Designing a randomized control trial to evaluate the pedagogical impact of VR simulators vs traditional case-files for 3rd-year medical student OSCE training.",
        requiredSkills: ["Literature Review", "Clinical Reasoning", "RedCap"],
        preferredRole: ["Medical Student"],
        matchThreshold: 1,
        bgColor: "#8b5cf6", // Purple
        isHighPriority: false
    }
];

// Helper dictionaries for the frontend UI chips
export const availableRoles = [
    "Medical Student", "Resident", "Fellow", "Data Scientist", "Attending"
];

export const availableSkills = [
    "Python", "R", "Chart Review", "Clinical Reasoning", 
    "Machine Learning", "Literature Review", "Biostatistics", 
    "Data Abstraction", "RedCap", "Epic EMR"
];

export const availableInterests = [
    "Internal Medicine", "Hematology", "Cardiology", 
    "Artificial Intelligence", "Quality Improvement", "Medical Education"
];
