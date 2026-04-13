/**
 * Clinical Knowledge Base
 * A curated 'Local RAG' database for the Medical AI Lab.
 * Contains evidence-based summaries derived from common guidelines (NCCN, ASCO, ESC).
 */

export const knowledgeBase = [
    // --- IMMUNOTHERAPY TOXICITIES ---
    {
        id: 'irae-myocarditis',
        keywords: ['myocarditis', 'heart', 'cardiac', 'troponin', 'arrhythmia', 'ici-myocarditis'],
        title: 'ICI-Associated Myocarditis',
        category: 'Cardio-Oncology',
        summary: 'A rare (<1%) but fulminant immune-related adverse event (irAE) with a fatality rate of 30-50%. Often occurs early (median 30 days) after ICI initiation.',
        keyPoints: [
            'Presentation: Fatigue, chest pain, arrhythmias, or asymptomatic troponin elevation.',
            'Diagnostic Workup: Troponin T/I, BNP, EKG, TTE (often normal LVEF), Cardiac MRI (Gold Standard).',
            'Pathology: Lymphocytic infiltration of the myocardium.'
        ],
        management: [
            'HOLD Immunotherapy Immediately.',
            'High-dose Steroids: Methylprednisolone 1g IV daily x 3-5 days.',
            'Second-line: Abatacept, Alemtuzumab, or JAK Inhibitors (Ruxolitinib) for steroid-refractory cases.'
        ],
        source: 'ASCO Guidelines 2024; Bonaca et al. Circulation 2019.'
    },
    {
        id: 'irae-colitis',
        keywords: ['colitis', 'diarrhea', 'stool', 'gi toxicity', 'enterocolitis'],
        title: 'ICI-Induced Colitis & Diarrhea',
        category: 'GI Oncology',
        summary: 'Common irAE, especially with CTLA-4 inhibitors (ipilimumab). Severity is graded by stool frequency over baseline.',
        keyPoints: [
            'Grade 2: 4-6 stools/day over baseline.',
            'Grade 3: ≥7 stools/day, incontinence, or hospitalization.',
            'Workup: Stool studies (r/o infectious causes/C.diff), CT Abdomen, Flex Sig/Colonoscopy.'
        ],
        management: [
            'Grade 1: Supportive care, hydration.',
            'Grade 2: Prednisone 1 mg/kg/day.',
            'Grade 3-4: Methylprednisolone 1-2 mg/kg IV + Infliximab or Vedolizumab for refractory cases.'
        ],
        source: 'NCCN Management of Immunotherapy-Related Toxicities v1.2024.'
    },
    {
        id: 'irae-pneumonitis',
        keywords: ['pneumonitis', 'lung', 'cough', 'dyspnea', 'hypoxia', 'sob'],
        title: 'ICI-Induced Pneumonitis',
        category: 'Thoracic Oncology',
        summary: 'Inflammation of lung parenchyma. Incidence 3-5% with PD-1 monotherapy, higher with combos.',
        keyPoints: [
            'Presentation: Dry cough, dyspnea, hypoxia. fever.',
            'Imaging: Ground-glass opacities (GGO), consolidations on Chest CT.',
            'Differential: R/o Pneumonia, disease progression, PE.'
        ],
        management: [
            'Grade 1 (Asymptomatic): Hold ICI, monitor close.',
            'Grade 2 (Symptomatic): Prednisone 1 mg/kg/day taper over 4-6 weeks.',
            'Grade 3-4 (Hypoxia): Methylprednisolone IV, Hospitalize, +/- Infliximab/IVIG.'
        ],
        source: 'ASCO/NCCN Guidelines 2024.'
    },
    {
        id: 'onc-fn',
        keywords: ['neutropenic fever', 'febrile neutropenia', 'fever', 'anc', 'neutropenia'],
        title: 'Febrile Neutropenia',
        category: 'Oncology Emergency',
        summary: 'Oncologic emergency defined as single temp >38.3°C (101°F) or >38.0°C (100.4°F) sustained for 1hr + ANC <500.',
        keyPoints: [
            'Risk Stratification: Calculate MASCC score. Score ≥21 indicates low risk (eligible for oral abx).',
            'Common Pathogens: Gram-positives (CoNS, Staph) are most common, but Gram-negatives (Pseudomonas) cause highest mortality.',
        ],
        management: [
            'High Risk: Admit for IV Cefepime 2g q8h or Zosyn. Add Vancomycin only if indication (mucositis, line infection, unstable).',
            'Low Risk (MASCC ≥21): Discharge on Cipro + Augmentin.'
        ],
        source: 'IDSA/ASCO Guidelines for Neutropenic Fever.'
    },
    {
        id: 'onc-hyperca',
        keywords: ['hypercalcemia', 'calcium', 'malignancy', 'bones'],
        title: 'Hypercalcemia of Malignancy',
        category: 'Oncology Emergency',
        summary: 'Occurs in 20-30% of cancers (esp. Myeloma, Breast, Lung). Driven by PTHrP (humoral) or bone mets (osteolytic).',
        keyPoints: [
            'Symptoms: "Bones, Stones, Groans, Psychiatric Overtones".',
            'Severity: Mild (<12), Moderate (12-14), Severe (>14). Correct for albumin!',
        ],
        management: [
            '1. Aggressive Hydration: IV Normal Saline (200-500 mL/hr).',
            '2. Bisphosphonates: Zoledronic Acid 4mg IV (check Cr).',
            '3. Calcitonin: For rapid correction (tachyphylaxis after 48h).',
            '4. Steroids: Only effective for lymphoma/myeloma (1,25-OH Vit D driven).'
        ],
        source: 'Endocrine Society / ASCO Clinical Practice Guidelines.'
    },

    // --- INTERNAL MEDICINE ---
    {
        id: 'med-pe',
        keywords: ['pe', 'embolism', 'bood clot', 'dv', 'chest pain', 'tachycardia'],
        title: 'Pulmonary Embolism (PE)',
        category: 'Internal Medicine',
        summary: 'Obstruction of pulmonary artery. Cancer is a major risk factor (hypercoagulable state).',
        keyPoints: [
            'Wells Score: >4 points = PE likely -> CTA Chest.',
            'PERC Rule: Used to rule-out PE in low risk patients without imaging.',
            'Massive PE: Hypotension (SBP <90). Submassive PE: RV dysfunction + Troponin elevation.'
        ],
        management: [
            'Stable: LMWH (Lovenox) or DOAC (Apixaban/Rivaroxaban).',
            'Submassive/Massive: Heparin drip. Consider Thrombolytics (tPA) or Thrombectomy for hypotension.'
        ],
        source: 'CHEST Guidelines 2021.'
    },
    {
        id: 'med-sepsis',
        keywords: ['sepsis', 'infection', 'shock', 'lactic', 'lactate', 'hypotension'],
        title: 'Sepsis & Septic Shock',
        category: 'Internal Medicine',
        summary: 'Life-threatening organ dysfunction caused by dysregulated host response to infection (SOFA score increase ≥2).',
        keyPoints: [
            'Septic Shock: Sepsis + Vasopressors needed for MAP≥65 + Lactate >2 despite hydration.',
            'CMS Sepsis Core Measure (SEP-1): 3-hour bundle compliance is critical.'
        ],
        management: [
            '1. Measure Lactate.',
            '2. Blood Cultures x2 BEFORE antibiotics.',
            '3. Broad Spectrum Abx (Vanc/Zosyn) within 1 hour.',
            '4. 30cc/kg IV Crystalloid bolus for hypotension or Lactate ≥4.'
        ],
        source: 'Surviving Sepsis Campaign Guidelines 2021.'
    },
    {
        id: 'med-hypona',
        keywords: ['sodium', 'hyponatremia', 'siadh', 'low sodium', 'salt'],
        title: 'Hyponatremia Workup',
        category: 'Internal Medicine',
        summary: 'Serum Na < 135 mEq/L. Critical to assess Volume Status and Osmolality to distinguish etiology.',
        keyPoints: [
            'Step 1: Check Serum Osmolality. Low (<275) = True HypoNa.',
            'Step 2: Check Volume Status (Hypovolemic vs Euvolemic vs Hypervolemic).',
            'Step 3: If Euvolemic, check Urine Na (>40 = SIADH) and Urine Osm (>100).'
        ],
        management: [
            'Hypovolemic: IVF (Normal Saline).',
            'Euvolemic (SIADH): Fluid Restriction <1.5L. Salt Tabs. Loop Diuretics.',
            'Severe/Symptomatic (<120 or seizures): Hypertonic Saline (3%) bolus.'
        ],
        source: 'Pocket Medicine / Endocrine Society Guidelines.'
    },
    {
        id: 'med-afib',
        keywords: ['afib', 'atrial fibrillation', 'rvr', 'heart rate', 'arrhythmia'],
        title: 'Atrial Fibrillation with RVR',
        category: 'Cardiology',
        summary: 'Supraventricular tachyarrhythmia with uncoordinated atrial activation. Acute management focuses on Rate Control and Stroke Prevention.',
        keyPoints: [
            'Goal: Resting HR <110 bpm (RACE II trial).',
            'Stroke Risk: Calculate CHA2DS2-VASc score to determine anticoagulation need.'
        ],
        management: [
            '1. Metoprolol Tartrate 5mg IV x3 q5min.',
            '2. Diltiazem 10-20mg IV Bolus -> Drip (Avoid in HFrEF).',
            '3. Digoxin or Amiodarone if Hypotensive/HFrEF.'
        ],
        source: 'AHA/ACC/HRS Guidelines for Atrial Fibrillation.'
    },
    {
        id: 'med-dka',
        keywords: ['dka', 'diabetic', 'ketoacidosis', 'insulin', 'sugar', 'glucose'],
        title: 'Diabetic Ketoacidosis (DKA)',
        category: 'Endocrinology',
        summary: 'Life-threatening complication of diabetes defined by Hyperglycemia (>250), Metabolic Acidosis (pH <7.3, Gap >12), and Ketosis.',
        keyPoints: [
            'Monitor: Gap closure is the goal, not just glucose normalization.',
            'Potassium: MUST be >3.3 before starting insulin.'
        ],
        management: [
            '1. Aggressive Fluids: NS 1L bolus, then maintenance.',
            '2. Insulin Drip: 0.1 units/kg/hr.',
            '3. Potasium/Phos Repletion.',
            '4. Transition: Overlap drip with SubQ basal insulin by 2 hours once Gap closed.'
        ],
        source: 'ADA Standards of Care in Diabetes.'
    },

    // --- ONCOLOGY EXPANSION ---
    {
        id: 'onc-tls',
        keywords: ['tls', 'tumor lysis', 'uric acid', 'rasburicase', 'emergency'],
        title: 'Tumor Lysis Syndrome (TLS)',
        category: 'Oncology Emergency',
        summary: 'Massive release of intracellular contents (K, Phos, Uric Acid) from dying tumor cells. Common in Leukemia/Lymphoma.',
        keyPoints: [
            'Cairo-Bishop Criteria: Lab TLS vs Clinical TLS (Arrhythmia, Seizure, Renal Failure).',
            'Labs: High K, High Phos, High Uric Acid, LOW Calcium.'
        ],
        management: [
            'Prophylaxis: Hydration + Allopurinol.',
            'Treatment: Rasburicase (if Uric Acid >8 or high risk).',
            'Monitor: Telemetry (Hyperkalemia) and Urine Output.'
        ],
        source: 'ASCO Guidelines for TLS.'
    },
    {
        id: 'onc-lung',
        keywords: ['nsclc', 'lung cancer', 'staging', 'tnm', 'mass'],
        title: 'NSCLC Clinical Staging Basics',
        category: 'Thoracic Oncology',
        summary: 'Non-Small Cell Lung Cancer staging dictates treatment (Surg vs ChemoRad vs Systemic).',
        keyPoints: [
            'Stage I/II: Localized. Primary Tx: Surgery (Lobectomy).',
            'Stage III (Locally Advanced): N2/N3 nodes. Primary Tx: Concurrent Chemo-Radiation + Durvalumab (Pacific Trial).',
            'Stage IV (Metastatic): Systemic Therapy (Chemo/IO/Targeted).'
        ],
        management: [
            'Look for Driver Mutations (EGFR, ALK, ROS1) in ALL non-squamous metastatic cases.'
        ],
        source: 'NCCN Guidelines for NSCLC.'
    },
    {
        id: 'onc-gibleed',
        keywords: ['gi bleed', 'melena', 'hematochezia', 'blood'],
        title: 'Acute GI Bleeding',
        category: 'Gastroenterology',
        summary: 'Upper (UGIB) vs Lower (LGIB) bleeding management and stabilization.',
        keyPoints: [
            'UGIB: Melena, Coffee-ground emesis. Causes: Peptic Ulcer, Varices.',
            'LGIB: Hematochezia. Causes: Diverticulosis, Malignancy, Ischemia.'
        ],
        management: [
            '1. 2 Large Bore IVs + Type & Screen.',
            '2. PPI Bolus + Drip (Protonix) for UGIB.',
            '3. Octreotide (if Variceal suspect).',
            '4. Transfuse if Hgb <7 (or <9 in CAD). GI Consult.'
        ],
        source: 'ACG Guidelines for GI Bleeding.'
    },
    {
        id: 'res-nlr',
        keywords: ['nlr', 'neutrophil', 'lymphocyte', 'ratio', 'biomarker', 'prognostic'],
        title: 'Neutrophil-to-Lymphocyte Ratio (NLR)',
        category: 'Research',
        summary: 'An inflammatory biomarker reflecting the balance between pro-tumor inflammation (Neutrophils) and anti-tumor immune response (Lymphocytes).',
        keyPoints: [
            'High NLR (often >3-5) correlates with poor survival in solid tumors.',
            'My Research: Investigating "Early NLR Dynamics" (Week 6 vs Baseline) as a superior predictor of response in Metastatic Urothelial Carcinoma compared to PD-L1 status.',
            'Utility: Readily available from CBC, zero cost.'
        ],
        management: [
            'NLR is currently a prognostic marker, not yet a predictive driver for treatment selection.'
        ],
        source: 'Alhayek et al. GU ASCO 2025 (Abstract); Templeton et al. JNCI.'
    },
    {
        id: 'res-lvef-ep',
        keywords: ['lvef', 'ejection fraction', 'ep', 'electrophysiologic', 'phenotype', 'myocarditis research'],
        title: 'Electrophysiologic vs. Functional Mortality Risk',
        category: 'Research',
        summary: 'A systematic review led by Dr. Alhayek comparing mortality predictors in ICI-Myocarditis.',
        keyPoints: [
            'Finding: Preserved LVEF (>50%) does NOT guarantee safety. nearly 40-50% of fatal cases have normal LVEF.',
            'Better Predictor: "Electrophysiologic Phenotype" (Complete Heart Block, VT/VF) is a stronger predictor of mortality than LVEF drop.',
            'Implication: Monitoring EKG/Telemetry is as vital as Echocardiography.'
        ],
        management: [
            'Maintain low threshold for telemetry even if Echo is normal.'
        ],
        source: 'Alhayek et al. Submitted to JACC: CardioOncology 2025.'
    },

    // --- GENERAL ---
    {
        id: 'gen-consult',
        keywords: ['consult', 'contact', 'referral', 'clinic', 'appointment'],
        title: 'Clinical Consultation',
        category: 'General',
        summary: 'Dr. Alhayek serves as an Academic Hospitalist and Researcher at AdventHealth Tampa.',
        keyPoints: [
            'For clinical matters, please contact the AdventHealth GME office.',
            'For research collaborations, use the "Contact" form below.',
        ],
        management: [],
        source: 'Professional Portfolio'
    }
];

// --- LOGIC ENGINE ---

/**
 * Semantic Matcher
 * Returns the best matching topic based on keyword overlap scoring.
 */
export const findBestMatch = (query) => {
    const tokens = query.toLowerCase().split(/[\s,?.!-]+/);
    let bestMatch = null;
    let highestScore = 0;

    knowledgeBase.forEach(topic => {
        let score = 0;
        // Exact match points
        topic.keywords.forEach(keyword => {
            if (query.toLowerCase().includes(keyword)) {
                score += 10; // High value for phrase match
            }
        });

        // Token match points
        tokens.forEach(token => {
            if (token.length > 3 && topic.keywords.some(k => k.includes(token))) {
                score += 3;
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestMatch = topic;
        }
    });

    // Threshold for relevance
    if (highestScore < 5) return null;
    return bestMatch;
};
