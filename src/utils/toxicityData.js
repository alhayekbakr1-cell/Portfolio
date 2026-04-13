
// Map of chemotherapy drugs to organ toxicity levels (0.0 - 1.0)
// 1.0 = Severe Toxicity (Red), 0.5 = Moderate (Yellow), 0.0 = Safe (Green/Blue)

export const DRUG_DATA = {
    "Cisplatin": {
        kidneys: 0.9, // Nephrotoxicity
        ears: 0.7,    // Ototoxicity
        nerves: 0.4,  // Peripheral Neuropathy
        description: "Highly nephrotoxic and ototoxic. Requires aggressive pre-hydration."
    },
    "Doxorubicin": {
        heart: 0.95,  // Cardiotoxicity (anthracycline)
        boneMarrow: 0.6,
        description: "Dose-dependent cardiotoxicity. Monitor EF. 'The Red Devil'."
    },
    "Bleomycin": {
        lungs: 0.9,   // Pulmonary Fibrosis
        skin: 0.3,
        description: "Risk of fatal pulmonary fibrosis. Pulmonary Function Tests (PFTs) required."
    },
    "Vincristine": {
        nerves: 0.9,  // Peripheral Neuropathy
        constipation: 0.5, // Autonomic neuropathy
        description: "Significant peripheral neuropathy. Fatal if given intrathecally."
    },
    "Paclitaxel": {
        nerves: 0.7,
        boneMarrow: 0.6,
        description: "Neuropathy (stocking-glove) and hypersensitivity reactions."
    },
    "Cyclophosphamide": {
        bladder: 0.8, // Hemorrhagic Cystitis
        boneMarrow: 0.5,
        description: "Hemorrhagic cystitis risk. Mesna may be required with high doses."
    },
    "Methotrexate": {
        liver: 0.6,
        kidneys: 0.6,
        lungs: 0.4,
        description: "Renal and hepatic toxicity. Mucositis common."
    },
    "5-Fluorouracil": {
        heart: 0.4,   // Coronary vasospasm
        gut: 0.7,     // Diarrhea/Mucositis
        skin: 0.5,     // Hand-Foot Syndrome
        description: "Coronary vasospasm risk. Significant GI toxicity."
    }
};

export const ORGAN_LOCATIONS = {
    // Head & Neck (Y ~ 4.3)
    brain: { position: [0, 4.35, 0], color: '#ff99cc', label: "Brain/CNS" },
    ears: { position: [0, 4.35, 0.6], color: '#ccccff', label: "Ears (CN VIII)" },

    // Chest Cavity (Y ~ 2.3)
    heart: { position: [0.2, 2.4, 0.4], color: '#ff4d4d', label: "Heart" },
    lungs: { position: [-0.35, 2.5, 0.3], color: '#ffb3b3', label: "Lungs" },

    // Abdomen (Y ~ 0.9)
    liver: { position: [0.35, 1.3, 0.35], color: '#cc6600', label: "Liver" },
    kidneys: { position: [-0.3, 1.0, -0.3], color: '#e6b800', label: "Kidneys" },
    gut: { position: [0, 0.4, 0.45], color: '#ffcc99', label: "GI Tract" },

    // Pelvis (Y ~ -0.2)
    bladder: { position: [0, -0.4, 0.5], color: '#ffff4d', label: "Bladder" },

    // Systemic / General
    nerves: { position: [0, -2.5, 0], color: '#cc99ff', label: "Peripheral Nerves" },
    boneMarrow: { position: [0, 2.0, -0.5], color: '#ffcccc', label: "Bone Marrow (Sternum/Spine)" }
};
