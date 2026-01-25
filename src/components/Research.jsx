import React from 'react';

const Research = () => {
    // Only Active / In Prep / Major Projects here. Published go to Publications.
    const projects = [
        {
            title: "Baseline Evaluation of Inappropriate HIT Testing to Inform Diagnostic Stewardship",
            role: "Project Lead",
            question: "To what extent is PF4 testing ordered inappropriately in a tertiary center, and what is the cost implication?",
            methods: "Retrospective chart review of 300+ assays; adjudication using 4T score pre-test probability.",
            impact: "Identified 70% inappropriate ordering rate; results driving new BPA implementation aimed at $15k/yr savings.",
            status: "Manuscript in Preparation"
        },
        {
            title: "Electrophysiologic Phenotype Outperforms LVEF for Mortality Risk Stratification",
            role: "First Author",
            question: "Is LVEF a sufficient predictor of mortality in ICI-associated myocarditis given the prevalence of preserved EF?",
            methods: "Systematic review and meta-analysis of 319 cases (global)",
            impact: "Demonstrated that conduction delays (arrhythmias) are superior predictors of death compared to LVEF drop.",
            status: "Under Review (JACC: CardioOnc)"
        },
        {
            title: "The Rhythms of Access: Deciphering Systemic Drivers of Cancer Seasonality",
            role: "Lead Investigator",
            question: "Does the 'Holiday Effect' in cancer diagnosis reflect patient biology or insurance/systemic barriers?",
            methods: "NCDB analysis proposal focusing on diagnosis dates vs insurance deductible cycles.",
            impact: "Potential to expose systemic structural barriers in oncology access.",
            status: "Proposal / Data Request Phase"
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
        },
        card: {
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        header: {
            marginBottom: '0.5rem',
        },
        title: {
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            fontWeight: '700',
            lineHeight: '1.4',
            marginBottom: '0.5rem',
        },
        tagRow: {
            display: 'flex',
            gap: '10px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
        },
        roleTag: {
            color: 'var(--accent-primary)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        statusTag: {
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2px 8px',
            borderRadius: '4px',
            color: 'var(--text-secondary)',
        },
        section: {
            borderTop: '1px solid var(--border-color)',
            paddingTop: '8px',
        },
        label: {
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'block',
            fontWeight: '600',
        },
        content: {
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            lineHeight: '1.5',
        }
    };

    return (
        <section id="research" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Active Investigations & Research</h2>
                <div style={styles.grid}>
                    {projects.map((proj, index) => (
                        <div key={index} style={styles.card}>
                            <div style={styles.header}>
                                <div style={styles.tagRow}>
                                    <span style={styles.roleTag}>{proj.role}</span>
                                    <span style={styles.statusTag}>{proj.status}</span>
                                </div>
                                <h3 style={styles.title}>{proj.title}</h3>
                            </div>

                            <div style={styles.section}>
                                <span style={styles.label}>Question</span>
                                <p style={styles.content}>{proj.question}</p>
                            </div>
                            <div style={styles.section}>
                                <span style={styles.label}>Methods / Data</span>
                                <p style={styles.content}>{proj.methods}</p>
                            </div>
                            <div style={{ ...styles.section, borderTop: '1px solid var(--accent-primary)' }}>
                                <span style={{ ...styles.label, color: 'var(--accent-primary)' }}>Clinical Impact</span>
                                <p style={styles.content}>{proj.impact}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
