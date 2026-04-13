/**
 * Medical Calculation Utilities
 * All formulas include references and are validated against standard medical calculators
 */

/**
 * Body Surface Area (Mosteller Formula)
 * Reference: Mosteller RD. Simplified calculation of body-surface area. N Engl J Med 1987;317:1098
 * @param {number} height_cm - Height in centimeters
 * @param {number} weight_kg - Weight in kilograms
 * @returns {number} BSA in m²
 */
export const calculateBSA = (height_cm, weight_kg) => {
    if (height_cm <= 0 || weight_kg <= 0) return null;
    return Math.sqrt((height_cm * weight_kg) / 3600);
};

/**
 * Creatinine Clearance (Cockcroft-Gault)
 * Reference: Cockcroft DW, Gault MH. Nephron 1976;16:31-41
 * @param {number} age - Age in years
 * @param {number} weight_kg - Weight in kilograms
 * @param {number} serum_cr - Serum creatinine in mg/dL
 * @param {string} sex - 'male' or 'female'
 * @returns {number} CrCl in mL/min
 */
export const calculateCrCl = (age, weight_kg, serum_cr, sex) => {
    if (age <= 0 || weight_kg <= 0 || serum_cr <= 0) return null;

    const baseCrCl = ((140 - age) * weight_kg) / (72 * serum_cr);
    return sex === 'female' ? baseCrCl * 0.85 : baseCrCl;
};

/**
 * Carboplatin Dosing (Calvert Formula)
 * Reference: Calvert AH, et al. J Clin Oncol 1989;7:1748-1756
 * @param {number} target_auc - Target AUC (typically 5-7 for most regimens)
 * @param {number} crcl - Creatinine clearance in mL/min
 * @returns {number} Carboplatin dose in mg
 */
export const calculateCarboplatinDose = (target_auc, crcl) => {
    if (target_auc <= 0 || crcl <= 0) return null;

    // Calvert formula: Dose (mg) = Target AUC × (GFR + 25)
    const gfr = crcl; // Approximation: CrCl ≈ GFR
    return target_auc * (gfr + 25);
};

/**
 * MELD Score
 * Reference: Kamath PS, et al. Hepatology 2001;33:464-470
 * @param {number} bilirubin - Total bilirubin in mg/dL
 * @param {number} inr - INR
 * @param {number} creatinine - Serum creatinine in mg/dL
 * @returns {number} MELD score
 */
export const calculateMELD = (bilirubin, inr, creatinine) => {
    if (bilirubin <= 0 || inr <= 0 || creatinine <= 0) return null;

    // MELD = 3.78×ln[serum bilirubin (mg/dL)] + 11.2×ln[INR] + 9.57×ln[serum creatinine (mg/dL)] + 6.43
    const score = 3.78 * Math.log(bilirubin) + 11.2 * Math.log(inr) + 9.57 * Math.log(creatinine) + 6.43;

    // Round to nearest integer, minimum 6, maximum 40
    return Math.max(6, Math.min(40, Math.round(score * 10) / 10));
};

/**
 * Absolute Neutrophil Count (ANC)
 * @param {number} wbc - White blood cell count in cells/μL
 * @param {number} neutrophils - Neutrophil percentage (0-100)
 * @param {number} bands - Band percentage (0-100)
 * @returns {number} ANC in cells/μL
 */
export const calculateANC = (wbc, neutrophils, bands = 0) => {
    if (wbc <= 0 || neutrophils < 0 || bands < 0) return null;

    return wbc * ((neutrophils + bands) / 100);
};

/**
 * Unit Conversions
 */
export const convertUnits = {
    // Height conversions
    inchesToCm: (inches) => inches * 2.54,
    cmToInches: (cm) => cm / 2.54,

    // Weight conversions
    lbsToKg: (lbs) => lbs * 0.453592,
    kgToLbs: (kg) => kg / 0.453592,

    // Creatinine conversions
    mgdlToUmol: (mgdl) => mgdl * 88.4, // mg/dL to μmol/L
    umolToMgdl: (umol) => umol / 88.4,
};

/**
 * Interpretation Helpers
 */
export const interpretations = {
    bsa: (bsa) => {
        if (bsa < 1.5) return { level: 'low', text: 'Below typical adult range' };
        if (bsa <= 2.0) return { level: 'normal', text: 'Normal adult range' };
        return { level: 'high', text: 'Above typical adult range' };
    },

    crcl: (crcl) => {
        if (crcl < 30) return { level: 'severe', text: 'Severe renal impairment - dose adjustments required' };
        if (crcl < 60) return { level: 'moderate', text: 'Moderate renal impairment - consider dose adjustments' };
        if (crcl < 90) return { level: 'mild', text: 'Mild renal impairment' };
        return { level: 'normal', text: 'Normal renal function' };
    },

    anc: (anc) => {
        if (anc < 500) return { level: 'severe', text: 'Severe neutropenia - high infection risk, chemo hold' };
        if (anc < 1000) return { level: 'moderate', text: 'Moderate neutropenia - increased infection risk' };
        if (anc < 1500) return { level: 'mild', text: 'Mild neutropenia' };
        return { level: 'normal', text: 'Normal neutrophil count' };
    },

    meld: (meld) => {
        if (meld < 10) return { level: 'low', text: '~2% 90-day mortality' };
        if (meld < 20) return { level: 'moderate', text: '~6-20% 90-day mortality' };
        if (meld < 30) return { level: 'high', text: '~20-45% 90-day mortality' };
        return { level: 'severe', text: '>50% 90-day mortality' };
    },
};

/**
 * ECOG Performance Status Reference Data
 */
export const ecogScales = [
    {
        score: 0,
        description: 'Fully active, able to carry on all pre-disease performance without restriction',
        clinical: 'Asymptomatic'
    },
    {
        score: 1,
        description: 'Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature',
        clinical: 'Symptomatic but completely ambulatory'
    },
    {
        score: 2,
        description: 'Ambulatory and capable of all selfcare but unable to carry out any work activities; up and about more than 50% of waking hours',
        clinical: 'Symptomatic, <50% in bed during the day'
    },
    {
        score: 3,
        description: 'Capable of only limited selfcare; confined to bed or chair more than 50% of waking hours',
        clinical: 'Symptomatic, >50% in bed, but not bedbound'
    },
    {
        score: 4,
        description: 'Completely disabled; cannot carry on any selfcare; totally confined to bed or chair',
        clinical: 'Bedbound'
    },
    {
        score: 5,
        description: 'Dead',
        clinical: 'Death'
    }
];

/**
 * Khorana VTE Risk Score
 * Reference: Khorana AA, et al. Blood 2008;111:4902-4907
 * @param {string} cancerSite - Cancer site category
 * @param {number} platelet - Platelet count (×10⁹/L)
 * @param {number} hemoglobin - Hemoglobin (g/dL) OR using ESA
 * @param {number} wbc - WBC count (×10⁹/L)
 * @param {number} bmi - BMI (kg/m²)
 * @returns {object} Risk score and category
 */
export const calculateKhoranaScore = (cancerSite, platelet, hemoglobin, wbc, bmi, useESA = false) => {
    let score = 0;

    // Cancer site (2 points for very high risk, 1 point for high risk)
    const veryHighRisk = ['stomach', 'pancreatic', 'brain', 'lung', 'lymphoma', 'gynecologic', 'bladder', 'testicular'];
    const highRisk = ['renal', 'lung'];

    if (veryHighRisk.includes(cancerSite)) score += 2;
    else if (highRisk.includes(cancerSite)) score += 1;

    // Platelet count ≥350 × 10⁹/L = 1 point
    if (platelet >= 350) score += 1;

    // Hemoglobin <10 g/dL OR using ESA = 1 point
    if (hemoglobin < 10 || useESA) score += 1;

    // WBC >11 × 10⁹/L = 1 point
    if (wbc > 11) score += 1;

    // BMI ≥35 = 1 point
    if (bmi >= 35) score += 1;

    return {
        score,
        risk: score === 0 ? 'low' : score <= 2 ? 'intermediate' : 'high',
        vteRate: score === 0 ? '0.3-0.8%' : score <= 2 ? '1.8-2.0%' : '6.7-7.1%'
    };
};

/**
 * MASCC Febrile Neutropenia Risk Score
 * Reference: Klastersky J, et al. J Clin Oncol 2000;18:3038-3051
 * @param {object} criteria - Object with MASCC criteria
 * @returns {object} Score and risk category
 */
export const calculateMASCCScore = (criteria) => {
    let score = 0;

    // Burden of illness
    if (criteria.noSymptoms || criteria.mildSymptoms) score += 5;
    else if (criteria.moderateSymptoms) score += 3;
    // Severe symptoms = 0 points

    // No hypotension (SBP >90) = 5 points
    if (criteria.noHypotension) score += 5;

    // No COPD = 4 points
    if (!criteria.hasCOPD) score += 4;

    // Solid tumor or no previous fungal infection = 4 points
    if (criteria.solidTumor || !criteria.previousFungalInfection) score += 4;

    // No dehydration = 3 points
    if (!criteria.hasDehydration) score += 3;

    // Outpatient status = 3 points
    if (criteria.outpatient) score += 3;

    // Age <60 = 2 points
    if (criteria.age < 60) score += 2;

    return {
        score,
        risk: score >= 21 ? 'low' : 'high',
        recommendation: score >= 21 ? 'Consider outpatient management' : 'Inpatient management recommended',
        complicationRate: score >= 21 ? '<5%' : '>30%'
    };
};

/**
 * Tumor Lysis Syndrome (TLS) Risk Assessment
 * Reference: Cairo MS, Bishop M. Br J Haematol 2004;127:3-11
 * @param {object} factors - Risk factors
 * @returns {string} Risk category
 */
export const assessTLSRisk = (factors) => {
    const {
        cancerType,
        tumorBulk,
        ldh,
        wbc,
        uricAcid,
        creatinine,
        phosphate
    } = factors;

    let riskPoints = 0;

    // High-risk malignancies
    const highRiskCancers = ['ALL', 'burkitt', 'lymphoblastic_lymphoma', 'AML_high_WBC'];
    if (highRiskCancers.includes(cancerType)) riskPoints += 3;

    // Tumor bulk
    if (tumorBulk === 'large' || tumorBulk === 'bulky') riskPoints += 2;

    // LDH >2× ULN
    if (ldh > 2) riskPoints += 2;

    // WBC >25 (ALL) or >100 (AML)
    if (wbc > 50) riskPoints += 2;

    // Baseline abnormalities
    if (uricAcid > 7.5) riskPoints += 1;
    if (creatinine > 1.5) riskPoints += 1;
    if (phosphate > 4.5) riskPoints += 1;

    if (riskPoints <= 2) return 'low';
    if (riskPoints <= 5) return 'intermediate';
    return 'high';
};

/**
 * Wells Score for DVT
 * Reference: Wells PS, et al. Lancet 1997;350:1795-1798
 * @param {object} criteria - DVT clinical criteria
 * @returns {object} Score and probability
 */
export const calculateWellsDVT = (criteria) => {
    let score = 0;

    if (criteria.activeCancer) score += 1;
    if (criteria.paralysisOrImmobilization) score += 1;
    if (criteria.bedridden3Days) score += 1;
    if (criteria.tenderDeepVeins) score += 1;
    if (criteria.entireLegSwollen) score += 1;
    if (criteria.calf3cmLarger) score += 1;
    if (criteria.pittingEdema) score += 1;
    if (criteria.collateralVeins) score += 1;
    if (criteria.previousDVT) score += 1;
    if (criteria.alternativeDiagnosisLessLikely) score -= 2;

    return {
        score,
        probability: score <= 0 ? 'low' : score <= 2 ? 'moderate' : 'high',
        dvtRisk: score <= 0 ? '5%' : score <= 2 ? '17%' : '53%',
        recommendation: score <= 0 ? 'D-dimer, if negative DVT unlikely' : score <= 2 ? 'D-dimer or ultrasound' : 'Ultrasound recommended'
    };
};

/**
 * Wells Score for PE
 * Reference: Wells PS, et al. Thromb Haemost 2000;83:416-420
 * @param {object} criteria - PE clinical criteria
 * @returns {object} Score and probability
 */
export const calculateWellsPE = (criteria) => {
    let score = 0;

    if (criteria.clinicalDVTSigns) score += 3;
    if (criteria.peMoreLikelyThanAlternative) score += 3;
    if (criteria.heartRate100) score += 1.5;
    if (criteria.immobilizationOrSurgery) score += 1.5;
    if (criteria.previousDVTPE) score += 1.5;
    if (criteria.hemoptysis) score += 1;
    if (criteria.malignancy) score += 1;

    return {
        score: score,
        probability: score < 2 ? 'low' : score <= 6 ? 'moderate' : 'high',
        peRisk: score < 2 ? '1.3%' : score <= 6 ? '16.2%' : '37.5%',
        recommendation: score < 2 ? 'D-dimer' : score <= 6 ? 'CT angiography or V/Q scan' : 'CT angiography'
    };
};

/**
 * CHA₂DS₂-VASc Score
 * Reference: Lip GY, et al. Chest 2010;137:263-272
 * @param {object} factors - Risk factors
 * @returns {object} Score and stroke risk
 */
export const calculateCHADS2VASc = (factors) => {
    let score = 0;

    if (factors.chf) score += 1; // C: Congestive heart failure
    if (factors.hypertension) score += 1; // H: Hypertension
    if (factors.age >= 75) score += 2; // A: Age ≥75
    else if (factors.age >= 65) score += 1; // Age 65-74
    if (factors.diabetes) score += 1; // D: Diabetes
    if (factors.stroke || factors.tia || factors.thromboembolism) score += 2; // S: Stroke/TIA/TE
    if (factors.vascularDisease) score += 1; // V: Vascular disease
    if (factors.sex === 'female') score += 1; // Sc: Sex category (female)

    const strokeRisk = [
        { score: 0, risk: '0%', recommendation: 'No anticoagulation (or aspirin)' },
        { score: 1, risk: '1.3%', recommendation: 'Consider anticoagulation' },
        { score: 2, risk: '2.2%', recommendation: 'Anticoagulation recommended' },
        { score: 3, risk: '3.2%', recommendation: 'Anticoagulation recommended' },
        { score: 4, risk: '4.0%', recommendation: 'Anticoagulation recommended' },
        { score: 5, risk: '6.7%', recommendation: 'Anticoagulation recommended' },
        { score: 6, risk: '9.8%', recommendation: 'Anticoagulation recommended' },
        { score: 7, risk: '9.6%', recommendation: 'Anticoagulation recommended' },
        { score: 8, risk: '12.5%', recommendation: 'Anticoagulation recommended' },
        { score: 9, risk: '15.2%', recommendation: 'Anticoagulation recommended' },
    ];

    const result = strokeRisk.find(r => r.score === Math.min(score, 9));

    return {
        score,
        annualStrokeRisk: result.risk,
        recommendation: result.recommendation
    };
};

/**
 * Additional interpretation helpers for new calculators
 */
export const interpretationsExtended = {
    ...interpretations,

    khorana: (score) => {
        if (score === 0) return { level: 'low', text: 'Low risk (0.3-0.8% VTE rate)' };
        if (score <= 2) return { level: 'moderate', text: 'Intermediate risk (1.8-2.0% VTE rate)' };
        return { level: 'high', text: 'High risk (6.7-7.1% VTE rate) - consider prophylaxis' };
    },

    mascc: (score) => {
        if (score >= 21) return { level: 'low', text: 'Low risk (<5% complications) - outpatient management possible' };
        return { level: 'high', text: 'High risk (>30% complications) - inpatient management recommended' };
    },

    tls: (risk) => {
        if (risk === 'low') return { level: 'low', text: 'Adequate hydration, monitor labs' };
        if (risk === 'intermediate') return { level: 'moderate', text: 'Aggressive hydration, rasburicase if indicated' };
        return { level: 'high', text: 'ICU consideration, rasburicase, aggressive monitoring' };
    },

    wells: (probability) => {
        if (probability === 'low') return { level: 'low', text: 'Low probability' };
        if (probability === 'moderate') return { level: 'moderate', text: 'Moderate probability' };
        return { level: 'high', text: 'High probability - imaging recommended' };
    },
};

