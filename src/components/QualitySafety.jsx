import React from 'react';

const QualitySafety = () => {
    const projects = [
        {
            title: "Diagnostic Stewardship: Inappropriate HIT Testing",
            problem: "Baseline data revealed 70% rate of inappropriate PF4 testing for suspected Heparin-Induced Thrombocytopenia (HIT), leading to excess costs and unnecessary anticoagulation.",
            intervention: "Collaborating with hospital IT and EPIC teams to implement an EMR-based best practice advisory (BPA) and resident education regarding the '4T Score' pre-test probability assessment.",
            metrics: "Reduced inappropriate testing by 40% (observed over 6 months); projected annual savings of $15k.",
            role: "Project Lead",
            status: "Manuscript in Preparation"
        },
        {
            title: "Change Through Learning: Educational Interventions to Improve Cancer Pain Management",
            problem: "Persistent knowledge gaps in cancer pain management (opioid stewardship, complex regimens) among healthcare providers affect patient quality of life.",
            intervention: "Designed and delivered a multidisciplinary curriculum with interactive workshops for Hematology-Oncology physicians and residents.",
            metrics: "Mean knowledge scores improved from 62% to 82% (p < 0.001); large effect size (d=0.96) across all training levels.",
            role: "Lead Author",
            status: "Completed Study"
        },
        {
            title: "Cancer Prevention: HPV Vaccination Program in Resident Clinic",
            problem: "Resident clinic (IMRAC) lacked HPV vaccine availability, representing a critical missed opportunity for adult cancer prevention (ages 18-45) given low national uptake (57%).",
            intervention: "4-month rapid-cycle QI: Procured vaccine stock, utilized Epic SlicerDicer to identify 240 eligible patients, and executed scripted outreach calls alongside daily clinic huddle reminders.",
            metrics: "178 patients contacted (74% reach rate); 35% acceptance rate among those reached. Successfully operationalized vaccine ordering with net positive financial margin.",
            role: "Co-Investigator",
            status: "Preliminary Data / Ongoing"
        },
        {
            title: "Health Equity: Hypertension Management in Uninsured ED Patients",
            problem: "Uninsured patients presenting to the ED with hypertensive urgency had high 30-day revisit rates due to lack of outpatient follow-up and monitoring tools.",
            intervention: "Distributed home BP cuffs and educational materials; established a referral pathway to the GME continuity clinic for 7-day follow-up.",
            metrics: "Target: Reduce 30-day ED revisits by 20%. Ongoing data collection.",
            role: "Program Co-Lead",
            status: "Planning"
        }
    ];

    const styles = {
        container: {
            padding: '80px 20px',
            background: 'var(--bg-primary)',
        },
        wrapper: {
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
        },
        card: {
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: '8px',
            borderTop: '4px solid var(--accent-primary)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '10px'
        },
        title: {
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            fontWeight: '700',
            flex: '1',
        },
        status: {
            fontSize: '0.8rem',
            background: 'rgba(100, 255, 218, 0.1)',
            color: 'var(--accent-primary)',
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
        },
        role: {
            display: 'block',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            fontStyle: 'italic',
        },
        detailRow: {
            marginBottom: '0.8rem',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            color: 'var(--text-secondary)',
        },
        label: {
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginRight: '6px',
        }
    };

    return (
        <section id="quality" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Quality & Patient Safety</h2>
                <div style={styles.grid}>
                    {projects.map((proj, index) => (
                        <div key={index} style={styles.card}>
                            <div style={styles.header}>
                                <h3 style={styles.title}>{proj.title}</h3>
                                <span style={styles.status}>{proj.status}</span>
                            </div>
                            <span style={styles.role}>Role: {proj.role}</span>

                            <div style={styles.detailRow}>
                                <span style={styles.label}>Problem:</span>
                                {proj.problem}
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.label}>Intervention:</span>
                                {proj.intervention}
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.label}>Metrics:</span>
                                {proj.metrics}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QualitySafety;
