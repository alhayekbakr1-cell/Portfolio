import React, { useState } from 'react';
import {
    calculateBSA,
    calculateCrCl,
    calculateCarboplatinDose,
    calculateMELD,
    calculateANC,
    calculateKhoranaScore,
    calculateMASCCScore,
    assessTLSRisk,
    calculateWellsDVT,
    calculateWellsPE,
    calculateCHADS2VASc,
    convertUnits,
    interpretationsExtended,
    ecogScales
} from '../utils/medicalCalculations';



const ClinicalCalculators = () => {
    const [activeTab, setActiveTab] = useState('bsa');

    const styles = {
        container: {
            padding: '100px 20px 80px',
            background: 'var(--bg-primary)',
        },
        wrapper: {
            maxWidth: '1000px',
            margin: '0 auto',
        },
        intro: {
            textAlign: 'center',
            marginBottom: '3rem',
        },
        tabsContainer: {
            display: 'flex',
            gap: '8px',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '12px',
            borderBottom: '2px solid var(--border-color)',
            scrollbarWidth: 'thin',
        },
        tab: {
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        tabActive: {
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            borderBottom: '3px solid var(--accent-navy)',
        },
        calculatorCard: {
            background: 'var(--bg-card)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '48px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05)',
            minHeight: '500px',
            position: 'relative',
            overflow: 'hidden',
        },
        disclaimer: {
            marginTop: '3.5rem',
            padding: '20px 24px',
            background: 'var(--bg-muted)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            display: 'flex',
            gap: '12px',
        },
    };

    const tabs = [

        { id: 'bsa', label: 'BSA', icon: '📏' },
        { id: 'crcl', label: 'CrCl', icon: '🩺' },
        { id: 'carboplatin', label: 'Carboplatin', icon: '💊' },
        { id: 'anc', label: 'ANC', icon: '🔬' },
        { id: 'khorana', label: 'Khorana VTE', icon: '🩸' },
        { id: 'mascc', label: 'MASCC FN', icon: '🌡️' },
        { id: 'tls', label: 'TLS Risk', icon: '💎' },
        { id: 'wells-dvt', label: 'Wells DVT', icon: '🦵' },
        { id: 'wells-pe', label: 'Wells PE', icon: '🫁' },
        { id: 'chads', label: 'CHA₂DS₂-VASc', icon: '🧠' },
        { id: 'meld', label: 'MELD', icon: '🏥' },
        { id: 'ecog', label: 'ECOG', icon: '📋' },
    ];

    return (
        <section id="clinical-tools" style={styles.container} >
            <div style={styles.wrapper}>
                <div style={styles.intro}>
                    <h2 className="section-title">Clinical Decision Support</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                        Specialized oncology and internal medicine tools for rapid clinical assessment.
                    </p>
                </div>

                <div style={{ position: 'relative', marginBottom: '2.5rem' }} className="calculator-tabs-wrapper">
                    <div style={styles.tabsContainer} className="calculator-tabs-container">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === tab.id ? styles.tabActive : {})
                                }}
                                className="calculator-tab"
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.calculatorCard}>

                    {activeTab === 'bsa' && <BSACalculator />}
                    {activeTab === 'crcl' && <CrClCalculator />}
                    {activeTab === 'carboplatin' && <CarboplatinCalculator />}
                    {activeTab === 'anc' && <ANCCalculator />}
                    {activeTab === 'khorana' && <KhoranaCalculator />}
                    {activeTab === 'mascc' && <MASCCCalculator />}
                    {activeTab === 'tls' && <TLSRiskCalculator />}
                    {activeTab === 'wells-dvt' && <WellsDVTCalculator />}
                    {activeTab === 'wells-pe' && <WellsPECalculator />}
                    {activeTab === 'chads' && <CHADSVAScCalculator />}
                    {activeTab === 'meld' && <MELDCalculator />}
                    {activeTab === 'ecog' && <ECOGReference />}
                </div>

                <div style={styles.disclaimer}>
                    <strong>⚠️ Medical Disclaimer:</strong> These tools are for professional reference and educational purposes only. They do not constitute medical advice or a substitute for clinical judgment. Always verify results using institutional protocols and primary sources.
                </div>
            </div>

            <style>{`
                    .calculator-tabs-container::-webkit-scrollbar {
                    height: 4px;
                }
                .calculator-tabs-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                .calculator-tabs-container::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border-radius: 10px;
                }
                /* Fade edges for scroll indication */
                .calculator-tabs-wrapper::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 40px;
                    height: 100%;
                    background: linear-gradient(to right, transparent, var(--bg-primary));
                    pointer-events: none;
                }
            .calc-input, .calc-select {
                width: 100%;
                padding: 12px 16px;
                border-radius: 8px;
                background: var(--bg-muted);
                border: 1px solid var(--border-color);
                color: var(--text-primary);
                font-size: 1rem;
                outline: none;
                transition: border-color 0.2s ease;
            }
            .calc-input:focus, .calc-select:focus {
                border-color: var(--accent-navy);
            }
            .calculator-tab:hover {
                color: var(--accent-navy);
            background: var(--accent-light);
            transform: translateY(-1px);
                }
            .calc-input-group {
                display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
                }
            .calc-checkbox-group {
                display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 12px;
            margin: 20px 0;
                }
            .calc-checkbox-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 16px;
                background: var(--bg-muted);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s ease;
                color: var(--text-primary);
            }
            .calc-checkbox-item:hover {
                background: var(--bg-card);
                border-color: var(--border-dark);
            }
            .calc-button {
                background: var(--accent-navy);
                color: #FFFFFF;
            padding: 14px 28px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 1rem;
            border: none;
            box-shadow: 0 4px 6px rgba(30, 58, 138, 0.15);
            transition: all 0.2s ease;
            margin-top: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
                }
            .calc-button:hover {
                background: #1e40af;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(30, 58, 138, 0.2);
                }
            .calc-button:active {
                transform: translateY(0);
            }
            @media (max-width: 768px) {
                #clinical-tools {
                    padding: 40px 16px !important;
                }
                .calculator-tabs-wrapper::after {
                    width: 20px;
                }
                .calc-input-group {
                    grid-template-columns: 1fr;
                    gap: 16px;
                }
            }
            `}</style>
        </section >
    );
};

// --- Reusable UI Sub-components ---

const CalculatorTemplate = ({ title, subtitle, reference, children }) => (
    <div className="fade-in">
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
            {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.2rem', fontWeight: '500' }}>
            {subtitle}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', fontStyle: 'italic' }}>
            {reference}
        </p>
        {children}
    </div>
);

const InputGroup = ({ label, required, children }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>
            {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
        <div style={{ display: 'flex', gap: '12px' }}>
            {children}
        </div>
    </div>
);

const ResultDisplay = ({ value, interpretation, normalRange, label = "Calculated Value" }) => (
    <div style={{
        marginTop: '32px',
        padding: '32px',
        background: getInterpretationColor(interpretation.level),
        borderRadius: '16px',
        border: `1px solid ${getInterpretationBorderColor(interpretation.level)}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {label}
        </div>
        <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {value}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'var(--bg-card)', borderRadius: '30px', border: `1px solid ${getInterpretationBorderColor(interpretation.level)}`, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getInterpretationBorderColor(interpretation.level) }}></span>
            {interpretation.text}
        </div>
        {normalRange && (
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ opacity: 0.6 }}>Reference Range:</span>
                <span style={{ fontWeight: '600' }}>{normalRange}</span>
            </div>
        )}
    </div>
);

// --- Individual Calculators ---

const BSACalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [result, setResult] = useState(null);

    const calculate = () => {
        let h = parseFloat(height);
        let w = parseFloat(weight);
        if (!h || !w) return;
        if (heightUnit === 'in') h = convertUnits.inchesToCm(h);
        if (weightUnit === 'lbs') w = convertUnits.lbsToKg(w);
        const bsa = calculateBSA(h, w);
        setResult({ value: bsa, interpretation: interpretationsExtended.bsa(bsa) });
    };

    return (
        <CalculatorTemplate title="Body Surface Area (BSA)" subtitle="Mosteller Formula (1987)" reference="Mosteller RD. N Engl J Med 1987;317:1098">
            <div className="calc-input-group">
                <InputGroup label="Height" required>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height" className="calc-input" />
                    <select value={heightUnit} onChange={e => setHeightUnit(e.target.value)} className="calc-select" style={{ maxWidth: '100px' }}>
                        <option value="cm">cm</option>
                        <option value="in">in</option>
                    </select>
                </InputGroup>
                <InputGroup label="Weight" required>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight" className="calc-input" />
                    <select value={weightUnit} onChange={e => setWeightUnit(e.target.value)} className="calc-select" style={{ maxWidth: '100px' }}>
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                </InputGroup>
            </div>
            <button onClick={calculate} className="calc-button">Calculate BSA</button>
            {result && <ResultDisplay value={`${result.value.toFixed(2)} m²`} interpretation={result.interpretation} normalRange="Avg Adult: 1.6-1.9 m²" />}
        </CalculatorTemplate>
    );
};

const CrClCalculator = () => {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [creatinine, setCreatinine] = useState('');
    const [sex, setSex] = useState('male');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const crcl = calculateCrCl(parseFloat(age), parseFloat(weight), parseFloat(creatinine), sex);
        if (crcl) setResult({ value: crcl, interpretation: interpretationsExtended.crcl(crcl) });
    };

    return (
        <CalculatorTemplate title="Creatinine Clearance" subtitle="Cockcroft-Gault Equation" reference="Cockcroft DW, Gault MH. Nephron 1976;16:31-41">
            <div className="calc-input-group">
                <InputGroup label="Age (years)" required><input type="number" value={age} onChange={e => setAge(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="Weight (kg)" required><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="Serum Cr (mg/dL)" required><input type="number" step="0.1" value={creatinine} onChange={e => setCreatinine(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="Sex" required>
                    <select value={sex} onChange={e => setSex(e.target.value)} className="calc-select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </InputGroup>
            </div>
            <button onClick={calculate} className="calc-button">Calculate CrCl</button>
            {result && <ResultDisplay value={`${result.value.toFixed(1)} mL/min`} interpretation={result.interpretation} normalRange="Normal >90 mL/min" />}
        </CalculatorTemplate>
    );
};

const CarboplatinCalculator = () => {
    const [auc, setAuc] = useState('5');
    const [crcl, setCrcl] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const dose = calculateCarboplatinDose(parseFloat(auc), parseFloat(crcl));
        if (dose) setResult({ value: dose });
    };

    return (
        <CalculatorTemplate title="Carboplatin Dosing" subtitle="Calvert Formula" reference="Calvert AH, et al. J Clin Oncol 1989;7:1748">
            <div className="calc-input-group">
                <InputGroup label="Target AUC" required>
                    <select value={auc} onChange={e => setAuc(e.target.value)} className="calc-select">
                        <option value="4">AUC 4</option>
                        <option value="5">AUC 5</option>
                        <option value="6">AUC 6</option>
                    </select>
                </InputGroup>
                <InputGroup label="CrCl (mL/min)" required><input type="number" value={crcl} onChange={e => setCrcl(e.target.value)} placeholder="From CG formula" className="calc-input" /></InputGroup>
            </div>
            <button onClick={calculate} className="calc-button">Calculate Dose</button>
            {result && <ResultDisplay value={`${Math.round(result.value)} mg`} interpretation={{ level: 'info', text: 'Calvert formula: Dose = AUC × (GFR + 25)' }} label="Total Dose" />}
        </CalculatorTemplate>
    );
};

const ANCCalculator = () => {
    const [wbc, setWbc] = useState('');
    const [neut, setNeut] = useState('');
    const [bands, setBands] = useState('0');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const anc = calculateANC(parseFloat(wbc), parseFloat(neut), parseFloat(bands));
        if (anc !== null) setResult({ value: anc, interpretation: interpretationsExtended.anc(anc) });
    };

    return (
        <CalculatorTemplate title="ANC" subtitle="Absolute Neutrophil Count" reference="ANC = WBC × (%Neutrophils + %Bands) / 100">
            <div className="calc-input-group">
                <InputGroup label="WBC (cells/μL)" required><input type="number" value={wbc} onChange={e => setWbc(e.target.value)} placeholder="e.g. 5000" className="calc-input" /></InputGroup>
                <InputGroup label="Neutrophils (%)" required><input type="number" value={neut} onChange={e => setNeut(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="Bands (%)"><input type="number" value={bands} onChange={e => setBands(e.target.value)} className="calc-input" /></InputGroup>
            </div>
            <button onClick={calculate} className="calc-button">Calculate ANC</button>
            {result && <ResultDisplay value={`${Math.round(result.value)} cells/μL`} interpretation={result.interpretation} normalRange="Normal >1500" />}
        </CalculatorTemplate>
    );
};

const KhoranaCalculator = () => {
    const [site, setSite] = useState('other');
    const [plt, setPlt] = useState('');
    const [hgb, setHgb] = useState('');
    const [wbc, setWbc] = useState('');
    const [bmi, setBmi] = useState('');
    const [esa, setEsa] = useState(false);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const res = calculateKhoranaScore(site, parseFloat(plt), parseFloat(hgb), parseFloat(wbc), parseFloat(bmi), esa);
        setResult({ score: res.score, interpretation: interpretationsExtended.khorana(res.score) });
    };

    return (
        <CalculatorTemplate title="Khorana Score" subtitle="VTE Risk in Cancer Patients" reference="Khorana AA, et al. Blood 2008;111:4902">
            <div className="calc-input-group">
                <InputGroup label="Primary Tumor Site" required>
                    <select value={site} onChange={e => setSite(e.target.value)} className="calc-select">
                        <option value="other">Low risk (Other)</option>
                        <option value="stomach">Very High (Stomach/Pancreas)</option>
                        <option value="lung">High (Lung/Lymphoma/GYN/Bladder/Testicular)</option>
                    </select>
                </InputGroup>
                <InputGroup label="Platelet count (×10⁹/L)" required><input type="number" value={plt} onChange={e => setPlt(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="Hemoglobin (g/dL)" required><input type="number" value={hgb} onChange={e => setHgb(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="WBC count (×10⁹/L)" required><input type="number" value={wbc} onChange={e => setWbc(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="BMI (kg/m²)" required><input type="number" value={bmi} onChange={e => setBmi(e.target.value)} className="calc-input" /></InputGroup>
            </div>
            <div className="calc-checkbox-group">
                <label className="calc-checkbox-item">
                    <input type="checkbox" checked={esa} onChange={e => setEsa(e.target.checked)} />
                    Using Erythropoiesis-stimulating agent (ESA)?
                </label>
            </div>
            <button onClick={calculate} className="calc-button">Calculate Khorana Score</button>
            {result && <ResultDisplay value={result.score} interpretation={result.interpretation} label="Total Score" />}
        </CalculatorTemplate>
    );
};

const MASCCCalculator = () => {
    const [criteria, setCriteria] = useState({
        noSymptoms: false, mildSymptoms: false, moderateSymptoms: false,
        noHypotension: true, hasCOPD: false, solidTumor: true,
        previousFungalInfection: false, hasDehydration: false,
        outpatient: true, age: ''
    });
    const [result, setResult] = useState(null);

    const calculate = () => {
        const res = calculateMASCCScore(criteria);
        setResult({ score: res.score, interpretation: interpretationsExtended.mascc(res.score) });
    };

    const toggle = (field) => setCriteria({ ...criteria, [field]: !criteria[field] });

    return (
        <CalculatorTemplate title="MASCC Score" subtitle="Febrile Neutropenia Outcomes" reference="Klastersky J, et al. J Clin Oncol 2000;18:3038">
            <InputGroup label="Age"><input type="number" value={criteria.age} onChange={e => setCriteria({ ...criteria, age: e.target.value })} className="calc-input" /></InputGroup>
            <div className="calc-checkbox-group">
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.noSymptoms} onChange={() => toggle('noSymptoms')} /> No/Mild symptoms</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.noHypotension} onChange={() => toggle('noHypotension')} /> No Hypotension (SBP &gt;90)</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={!criteria.hasCOPD} onChange={() => toggle('hasCOPD')} /> No COPD history</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.solidTumor} onChange={() => toggle('solidTumor')} /> Solid Tumor</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={!criteria.hasDehydration} onChange={() => toggle('hasDehydration')} /> No Dehydration</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.outpatient} onChange={() => toggle('outpatient')} /> Outpatient status</label>
            </div>
            <button onClick={calculate} className="calc-button">Calculate MASCC Score</button>
            {result && <ResultDisplay value={result.score} interpretation={result.interpretation} normalRange="High-risk &lt; 21, Low-risk ≥ 21" />}
        </CalculatorTemplate>
    );
};

const TLSRiskCalculator = () => {
    const [factors, setFactors] = useState({
        cancerType: 'other', tumorBulk: 'normal', ldh: '', wbc: '', uricAcid: '', creatinine: '', phosphate: ''
    });
    const [result, setResult] = useState(null);

    const calculate = () => {
        const risk = assessTLSRisk(factors);
        setResult({ risk, interpretation: interpretationsExtended.tls(risk) });
    };

    return (
        <CalculatorTemplate title="TLS Risk Assessment" subtitle="Tumor Lysis Syndrome Stratification" reference="Cairo MS, Bishop M. Br J Haematol 2004;127:3">
            <div className="calc-input-group">
                <InputGroup label="Malignancy Type">
                    <select value={factors.cancerType} onChange={e => setFactors({ ...factors, cancerType: e.target.value })} className="calc-select">
                        <option value="other">Other Solid Tumor</option>
                        <option value="ALL">ALL / Burkitt / Lymphoblastic</option>
                        <option value="AML_high_WBC">AML (High WBC)</option>
                    </select>
                </InputGroup>
                <InputGroup label="Tumor Bulk">
                    <select value={factors.tumorBulk} onChange={e => setFactors({ ...factors, tumorBulk: e.target.value })} className="calc-select">
                        <option value="normal">Normal</option>
                        <option value="large">Large/Bulky (&gt;10cm)</option>
                    </select>
                </InputGroup>
            </div>
            <button onClick={calculate} className="calc-button">Assess TLS Risk</button>
            {result && <ResultDisplay value={result.risk.toUpperCase()} interpretation={result.interpretation} label="Risk Category" />}
        </CalculatorTemplate>
    );
};

const WellsDVTCalculator = () => {
    const [criteria, setCriteria] = useState({
        activeCancer: false, paralysisOrImmobilization: false, bedridden3Days: false,
        tenderDeepVeins: false, entireLegSwollen: false, calf3cmLarger: false,
        pittingEdema: false, collateralVeins: false, previousDVT: false,
        alternativeDiagnosisLessLikely: false
    });
    const [result, setResult] = useState(null);

    const calculate = () => {
        const res = calculateWellsDVT(criteria);
        setResult({ score: res.score, probability: res.probability, interpretation: interpretationsExtended.wells(res.probability) });
    };

    const toggle = (field) => setCriteria({ ...criteria, [field]: !criteria[field] });

    return (
        <CalculatorTemplate title="Wells Criteria for DVT" subtitle="Deep Vein Thrombosis Probability" reference="Wells PS, et al. Lancet 1997;350:1795">
            <div className="calc-checkbox-group">
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.activeCancer} onChange={() => toggle('activeCancer')} /> Active cancer</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.paralysisOrImmobilization} onChange={() => toggle('paralysisOrImmobilization')} /> Paralysis/Immobilization</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.bedridden3Days} onChange={() => toggle('bedridden3Days')} /> Bedridden &gt;3 days / Surgery</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.tenderDeepVeins} onChange={() => toggle('tenderDeepVeins')} /> Tenderness along deep veins</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.entireLegSwollen} onChange={() => toggle('entireLegSwollen')} /> Entire leg swollen</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.calf3cmLarger} onChange={() => toggle('calf3cmLarger')} /> Calf swelling &gt;3cm</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.alternativeDiagnosisLessLikely} onChange={() => toggle('alternativeDiagnosisLessLikely')} /> Alternative diagnosis less likely (-2)</label>
            </div>
            <button onClick={calculate} className="calc-button">Calculate Wells DVT</button>
            {result && <ResultDisplay value={`${result.score}`} interpretation={result.interpretation} label="Probability Score" />}
        </CalculatorTemplate>
    );
};

const WellsPECalculator = () => {
    const [criteria, setCriteria] = useState({
        clinicalDVTSigns: false, peMoreLikelyThanAlternative: false, heartRate100: false,
        immobilizationOrSurgery: false, previousDVTPE: false, hemoptysis: false, malignancy: false
    });
    const [result, setResult] = useState(null);

    const calculate = () => {
        const res = calculateWellsPE(criteria);
        setResult({ score: res.score, probability: res.probability, interpretation: interpretationsExtended.wells(res.probability) });
    };

    const toggle = (field) => setCriteria({ ...criteria, [field]: !criteria[field] });

    return (
        <CalculatorTemplate title="Wells Criteria for PE" subtitle="Pulmonary Embolism Probability" reference="Wells PS, et al. Thromb Haemost 2000;83:416">
            <div className="calc-checkbox-group">
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.clinicalDVTSigns} onChange={() => toggle('clinicalDVTSigns')} /> Clinical signs of DVT (+3)</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.peMoreLikelyThanAlternative} onChange={() => toggle('peMoreLikelyThanAlternative')} /> PE more likely than alternative (+3)</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.heartRate100} onChange={() => toggle('heartRate100')} /> Heart rate &gt;100 (+1.5)</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.immobilizationOrSurgery} onChange={() => toggle('immobilizationOrSurgery')} /> Immobilization/Surgery (+1.5)</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={criteria.malignancy} onChange={() => toggle('malignancy')} /> Malignancy (+1)</label>
            </div>
            <button onClick={calculate} className="calc-button">Calculate Wells PE</button>
            {result && <ResultDisplay value={`${result.score}`} interpretation={result.interpretation} label="Probability Score" />}
        </CalculatorTemplate>
    );
};

const CHADSVAScCalculator = () => {
    const [factors, setFactors] = useState({
        chf: false, hypertension: false, age: '', diabetes: false, stroke: false, tia: false, vascularDisease: false, sex: 'male'
    });
    const [result, setResult] = useState(null);

    const calculate = () => {
        const res = calculateCHADS2VASc({ ...factors, age: parseInt(factors.age) });
        setResult(res);
    };

    const toggle = (field) => setFactors({ ...factors, [field]: !factors[field] });

    return (
        <CalculatorTemplate title="CHA₂DS₂-VASc Score" subtitle="Stroke Risk in Atrial Fibrillation" reference="Lip GY, et al. Chest 2010;137:263">
            <div className="calc-input-group">
                <InputGroup label="Age"><input type="number" value={factors.age} onChange={e => setFactors({ ...factors, age: e.target.value })} className="calc-input" /></InputGroup>
                <InputGroup label="Sex">
                    <select value={factors.sex} onChange={e => setFactors({ ...factors, sex: e.target.value })} className="calc-select">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </InputGroup>
            </div>
            <div className="calc-checkbox-group">
                <label className="calc-checkbox-item"><input type="checkbox" checked={factors.chf} onChange={() => toggle('chf')} /> CHF / LVD History</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={factors.hypertension} onChange={() => toggle('hypertension')} /> Hypertension history</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={factors.diabetes} onChange={() => toggle('diabetes')} /> Diabetes mellitus</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={factors.stroke} onChange={() => toggle('stroke')} /> Stroke / TIA / Thromboembolism (+2)</label>
                <label className="calc-checkbox-item"><input type="checkbox" checked={factors.vascularDisease} onChange={() => toggle('vascularDisease')} /> Vascular disease (PAD, MI, aortic plaque)</label>
            </div>
            <button onClick={calculate} className="calc-button">Calculate CHA₂DS₂-VASc</button>
            {result && (
                <div style={{ marginTop: '25px', padding: '20px', background: 'var(--accent-light)', borderRadius: '8px', borderLeft: '5px solid var(--accent-navy)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-navy)' }}>Score: {result.score}</div>
                    <div style={{ marginTop: '5px', color: 'var(--text-primary)' }}><strong>Est. Stroke Risk:</strong> {result.annualStrokeRisk} annual risk</div>
                    <div style={{ marginTop: '5px', color: 'var(--text-secondary)' }}><strong>Recommendation:</strong> {result.recommendation}</div>
                </div>
            )}
        </CalculatorTemplate>
    );
};

const MELDCalculator = () => {
    const [bili, setBili] = useState('');
    const [inr, setInr] = useState('');
    const [cr, setCr] = useState('');
    const [result, setResult] = useState(null);

    const calculate = () => {
        const meld = calculateMELD(parseFloat(bili), parseFloat(inr), parseFloat(cr));
        if (meld !== null) setResult({ value: meld, interpretation: interpretationsExtended.meld(meld) });
    };

    return (
        <CalculatorTemplate title="MELD Score" subtitle="Liver Disease Mortality" reference="Kamath PS, et al. Hepatology 2001;33:464">
            <div className="calc-input-group">
                <InputGroup label="Bilirubin (mg/dL)" required><input type="number" step="0.1" value={bili} onChange={e => setBili(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="INR" required><input type="number" step="0.1" value={inr} onChange={e => setInr(e.target.value)} className="calc-input" /></InputGroup>
                <InputGroup label="Creatinine (mg/dL)" required><input type="number" step="0.1" value={cr} onChange={e => setCr(e.target.value)} className="calc-input" /></InputGroup>
            </div>
            <button onClick={calculate} className="calc-button">Calculate MELD</button>
            {result && <ResultDisplay value={result.value} interpretation={result.interpretation} normalRange="Score 6-40" />}
        </CalculatorTemplate>
    );
};

const ECOGReference = () => (
    <CalculatorTemplate title="ECOG Performance Status" subtitle="Functionality Reference" reference="Oken MM, et al. Am J Clin Oncol 1982;5:649">
        <div style={{ marginTop: '20px' }}>
            {ecogScales.map((scale) => (
                <div key={scale.score} style={{ marginBottom: '15px', padding: '15px', background: 'var(--bg-muted)', borderLeft: `6px solid ${getECOGColor(scale.score)}`, borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: getECOGColor(scale.score), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{scale.score}</div>
                        <div>
                            <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{scale.clinical}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{scale.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </CalculatorTemplate>
);

// --- Global Helpers ---

const getECOGColor = (s) => ['#10B981', '#84CC16', '#F59E0B', '#EF4444', '#7F1D1D', '#64748B'][s] || '#64748B';
const getInterpretationColor = (l) => 'var(--bg-muted)';
const getInterpretationBorderColor = (l) => ({ normal: '#BBF7D0', low: 'var(--border-color)', mild: '#FEF08A', moderate: '#FED7AA', high: '#FECDD3', severe: '#FCA5A1', info: '#BFDBFE' }[l] || 'var(--border-color)');

export default ClinicalCalculators;

