import React, { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
// import ResearchMetrics from './ResearchMetrics';
import FeaturedProjects from './FeaturedProjects';

const Research = () => {

    // --- Phase 1: Clinical Trials (Registry & Pharma) ---
    const trials = [
        {
            title: "CorEvitas Inflammatory Bowel Disease (IBD) Registry",
            id: "NCT03162549",
            sponsor: "CorEvitas",
            role: "Participating Site", // Inferred standard role, or leave as Sponsor info
            description: "Longitudinal observational registry collecting real-world data on IBD treatment patterns and outcomes.",
            link: "https://clinicaltrials.gov/study/NCT03162549",
            lastUpdate: "Oct 2025"
        },
        {
            title: "CDC Hemophilia Community Counts",
            id: "Public Health Surveillance",
            sponsor: "CDC",
            role: "Surveillance Partner",
            description: "National public health monitoring program for bleeding disorders to identify health issues and gaps in care.",
            link: "https://www.cdc.gov/hemophilia-community-counts/php/about/index.html",
            lastUpdate: "Ongoing"
        },
        {
            title: "Recombinant AAV2/6 Human Factor 8 Gene Therapy (SB-525)",
            id: "NCT03061201",
            sponsor: "Pfizer",
            role: "Clinical Trial",
            description: "Gene therapy study (PF-07055480) evaluating safety and efficacy in subjects with severe Hemophilia A.",
            link: "https://clinicaltrials.gov/study/NCT03061201",
            lastUpdate: "Sep 2025"
        },
        {
            title: "Efficacy and Safety of Gibiterkin (PF-06741086)",
            id: "NCT03938792",
            sponsor: "Pfizer",
            role: "Clinical Trial",
            description: "Study in adult and teenage participants with Severe Hemophilia A or Moderately Severe to Severe Hemophilia B.",
            link: "https://clinicaltrials.gov/study/NCT03938792",
            lastUpdate: "Jun 2025"
        }
    ];

    // --- Phase 2: Academic Investigations ---
    const academicProjects = [
        {
            title: "State-level Colorectal Cancer Incidence: Poverty, Rurality, and COVID-19 Patterns",
            role: "Lead Investigator",
            question: "How did pandemic disruptions affecting CRC diagnosis vary across U.S. states based on poverty and rurality?",
            methods: "Analysis of NAACCR Incidence Data (1995–2022) across 50 states; geospatial modeling of poverty/rurality composition.",
            impact: "Found persistent shift toward late-stage diagnosis (2021-2022); state-level residual declines suggest unmeasured systemic barriers beyond case composition.",
            status: "Completed (Submitted to ASCO 2026)",
            type: "Epidemiology",
            tags: ["Health Equity", "NAACCR", "COVID-19", "Oncology"]
        },
        {
            title: "Red-Flag Score and All-Cause Mortality in ICI-Associated Myocarditis",
            role: "First Author",
            question: "Can a bedside 'Red-Flag' score stratify mortality risk better than LVEF in immune-related myocarditis?",
            methods: "Pooled case-level analysis (N=319) of published cases; cluster-robust logistic regression and ROC analysis.",
            impact: "Validation of an actionable scoring tool (RF ≥2); identified high-risk cohort (57% mortality vs 26%) with superior discrimination to LVEF alone.",
            status: "Under Review / Completed",
            type: "Meta-Analysis",
            tags: ["Cardio-Oncology", "Immunotherapy", "Risk Stratification"]
        },
        {
            title: "Advanced Immunotherapeutic Interventions in Anaplastic Thyroid Carcinoma (ATC)",
            role: "Co-Investigator",
            question: "How has the integration of BRAF/MEK inhibitors with immunotherapy changed ATC survival paradigms?",
            methods: "Comprehensive review of clinical outcomes and multimodal integration strategies.",
            impact: "Highlighted the 'epidemiologic paradox' in non-BRAF disease and the quadrupling of survival in BRAF-mutated cohorts via multimodal therapy.",
            status: "Drafting Phase",
            type: "Review",
            tags: ["Thyroid Cancer", "Targeted Therapy", "Immunotherapy"]
        },
        {
            title: "Guideline-Concordant Chemotherapy in Muscle-Invasive Bladder Cancer",
            role: "Lead Investigator",
            question: "Are real-world treatment patterns for bladder cancer concordant with guidelines for perioperative chemotherapy?",
            methods: "NCDB analysis (2004–2022) comparing radical cystectomy vs. definitive radiotherapy pathways.",
            impact: "Quantifying gaps in neoadjuvant chemotherapy use and the rising role of perioperative immunotherapy to inform quality improvement.",
            status: "Analysis Phase",
            type: "NCDB Analysis",
            tags: ["Bladder Cancer", "Health Services Research", "NCDB"]
        }
    ];

    const styles = {
        container: {
            padding: '100px 20px',
            background: 'var(--bg-primary)',
        },
        wrapper: {
            maxWidth: '1100px',
            margin: '0 auto',
        },
        intro: {
            textAlign: 'center',
            marginBottom: '4rem',
        },
        subsection: {
            marginBottom: '60px',
        },
        subsectionTitle: {
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            marginBottom: '30px',
            borderLeft: '5px solid var(--accent-navy)',
            paddingLeft: '16px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
        },
        // --- Trial Cards ---
        trialCard: {
            background: 'var(--bg-muted)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        trialHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
        },
        trialType: {
            fontSize: '0.7rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            color: 'var(--accent-navy)',
            background: 'var(--accent-light)',
            padding: '4px 8px',
            borderRadius: '4px',
        },
        trialTitle: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: '1.4',
        },
        trialMeta: {
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
        },
        trialId: {
            fontFamily: 'monospace',
            background: 'rgba(0,0,0,0.05)',
            padding: '2px 6px',
            borderRadius: '4px',
        },
        // --- Academic Cards ---
        card: {
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '32px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        header: {
            marginBottom: '1.5rem',
        },
        tagRow: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '12px',
        },
        badge: {
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        roleBadge: {
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
        },
        statusBadge: {
            background: 'var(--bg-badge)',
            color: 'var(--text-secondary)',
        },
        title: {
            fontSize: '1.25rem',
            color: 'var(--accent-navy)',
            fontWeight: '700',
            lineHeight: '1.4',
            margin: '0 0 1rem 0',
        },
        section: {
            marginBottom: '1.25rem',
        },
        label: {
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            fontWeight: '700',
            letterSpacing: '0.1em',
            marginBottom: '6px',
            display: 'block',
        },
        content: {
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            lineHeight: '1.6',
            margin: 0,
        },
        impactBox: {
            marginTop: 'auto',
            padding: '16px',
            background: 'var(--accent-light)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--accent-navy)',
        },
        impactTitle: {
            fontSize: '0.75rem',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'block',
        },
        topicTags: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginTop: '16px',
        },
        topicTag: {
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            background: 'var(--bg-muted)',
            border: '1px solid var(--border-color)',
            padding: '2px 6px',
            borderRadius: '3px',
        }
    };

    return (
        <section id="research" style={styles.container}>
            <div style={styles.wrapper}>
                <RevealOnScroll>
                    <div style={styles.intro}>
                        <h2 className="section-title">Research & Clinical Investigation</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
                            Bridging the gap between clinical trials and population-level health outcomes.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* --- Research Metrics Dashboard (Removed pending accurate data) --- */}
                {/* <ResearchMetrics /> */}

                {/* --- Featured Projects Section --- */}
                <FeaturedProjects />

                {/* --- Clinical Trials Section --- */}
                <div style={styles.subsection}>
                    <RevealOnScroll>
                        <h3 style={styles.subsectionTitle}>Clinical Trials & Registries</h3>
                    </RevealOnScroll>
                    <div style={styles.grid}>
                        {trials.map((trial, index) => (
                            <RevealOnScroll key={index} delay={index * 0.05}>
                                <div style={styles.trialCard}>
                                    <div style={styles.trialHeader}>
                                        <span style={styles.trialType}>{trial.role}</span>
                                        {trial.link && (
                                            <a href={trial.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textDecoration: 'none' }}>
                                                View ↗
                                            </a>
                                        )}
                                    </div>
                                    <h4 style={styles.trialTitle}>{trial.title}</h4>
                                    <div style={styles.trialMeta}>
                                        <span style={styles.trialId}>{trial.id}</span>
                                        <span>• {trial.sponsor}</span>
                                        <span>• Updated: {trial.lastUpdate}</span>
                                    </div>
                                    <p style={{ ...styles.content, marginTop: '12px', fontSize: '0.9rem' }}>
                                        {trial.description}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>

                {/* --- Academic Investigations Section --- */}
                <div style={styles.subsection}>
                    <RevealOnScroll>
                        <h3 style={styles.subsectionTitle}>Academic Investigations</h3>
                    </RevealOnScroll>
                    <div style={styles.grid}>
                        {academicProjects.map((proj, index) => (
                            <RevealOnScroll key={index} delay={index * 0.1}>
                                <div style={styles.card} className="research-card">
                                    <div style={styles.header}>
                                        <div style={styles.tagRow}>
                                            <span style={{ ...styles.badge, ...styles.roleBadge }}>{proj.role}</span>
                                            <span style={{ ...styles.badge, ...styles.statusBadge }}>{proj.status}</span>
                                        </div>
                                        <h3 style={styles.title}>{proj.title}</h3>
                                    </div>

                                    <div style={styles.section}>
                                        <span style={styles.label}>Primary Question</span>
                                        <p style={styles.content}>{proj.question}</p>
                                    </div>

                                    <div style={styles.section}>
                                        <span style={styles.label}>Methodology</span>
                                        <p style={styles.content}>{proj.methods}</p>
                                    </div>

                                    <div style={styles.impactBox}>
                                        <span style={styles.impactTitle}>Clinical Impact</span>
                                        <p style={{ ...styles.content, color: 'var(--accent-navy)', fontWeight: '500' }}>
                                            {proj.impact}
                                        </p>
                                    </div>

                                    <div style={styles.topicTags}>
                                        {proj.tags.map(tag => (
                                            <span key={tag} style={styles.topicTag}>#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .research-card:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--accent-navy);
                }
            `}</style>
        </section>
    );
};

export default Research;

