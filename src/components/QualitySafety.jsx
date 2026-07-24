import React from 'react';

const QualitySafety = () => {
    const projects = [
        {
            title: "Diagnostic Stewardship: Inappropriate HIT Testing",
            role: "Project Lead",
            problem: "70% rate of inappropriate PF4 testing for suspected Heparin-Induced Thrombocytopenia (HIT).",
            intervention: "EMR-based Best Practice Advisory (BPA) and physician education focused on 4T Score adjudication.",
            metrics: "40% reduction in inappropriate testing; $15k projected annual savings.",
            status: "In Progress",
            icon: "🧬"
        },
        {
            title: "Improving Cancer Pain Management",
            role: "Lead Author",
            problem: "Knowledge gaps in oncology opioid stewardship and complex regimen management.",
            intervention: "Multidisciplinary curriculum and workshops for Hem/Onc residents and faculty.",
            metrics: "32% improvement in mean knowledge scores; large effect size (d=0.96).",
            status: "Completed",
            icon: "📋"
        },
        {
            title: "HPV Vaccination in Resident Clinic",
            role: "Co-Investigator",
            problem: "Critical missed opportunities for adult cancer prevention (ages 18-45) in resident primary care.",
            intervention: "Rapid-cycle QI: Epic SlicerDicer identification and scripted outreach program.",
            metrics: "74% reach rate; 35% acceptance rate. Fully operationalized with positive margin.",
            status: "Pilot Success",
            icon: "💉"
        },
        {
            title: "Hypertension in Uninsured ED Patients",
            role: "Program Co-Lead",
            problem: "High 30-day ED revisit rates due to lack of monitoring tools and follow-up for uninsured patients.",
            intervention: "Distribution of home BP cuffs and dedicated referral pathway to GME clinic.",
            metrics: "Goal: 20% reduction in 30-day revisits. Active data collection phase.",
            status: "Active",
            icon: "💓"
        }
    ];

    const styles = {
        container: {
            padding: '100px 20px',
            background: 'transparent',
        },
        wrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
        },
        card: {
            background: 'var(--bg-card)',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 32px -6px rgba(10, 37, 64, 0.08)',
            transition: 'all 0.35s var(--motion-ease)',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1.5rem',
        },
        titleRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '4px',
        },
        icon: {
            fontSize: '1.5rem',
        },
        title: {
            fontSize: '1.25rem',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            lineHeight: '1.3',
            margin: 0,
        },
        status: {
            fontSize: '0.7rem',
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            padding: '3px 8px',
            borderRadius: '4px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        roleBadge: {
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
            marginBottom: '20px',
            display: 'block',
        },
        section: {
            marginBottom: '16px',
        },
        label: {
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            fontWeight: '700',
            letterSpacing: '0.1em',
            marginBottom: '6px',
            display: 'block',
        },
        text: {
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
        },
        metricsBox: {
            marginTop: 'auto',
            padding: '16px',
            background: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
        },
        metricsTitle: {
            fontSize: '0.75rem',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'block',
        },
        metricsValue: {
            fontSize: '0.95rem',
            color: 'var(--accent-navy)',
            fontWeight: '600',
            margin: 0,
        }
    };

    return (
        <section id="quality" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Quality, Safety & Population Health</h2>
                <div style={styles.grid}>
                    {projects.map((proj, index) => (
                        <div key={index} style={styles.card} className="quality-card">
                            <div style={styles.header}>
                                <div style={styles.titleRow}>
                                    <span style={styles.icon}>{proj.icon}</span>
                                    <h3 style={styles.title}>{proj.title}</h3>
                                </div>
                                <span style={styles.status}>{proj.status}</span>
                            </div>

                            <span style={styles.roleBadge}>Role: {proj.role}</span>

                            <div style={styles.section}>
                                <span style={styles.label}>The Problem</span>
                                <p style={styles.text}>{proj.problem}</p>
                            </div>

                            <div style={styles.section}>
                                <span style={styles.label}>Clinical Intervention</span>
                                <p style={styles.text}>{proj.intervention}</p>
                            </div>

                            <div style={styles.metricsBox}>
                                <span style={styles.metricsTitle}>Key Metrics / Impact</span>
                                <p style={styles.metricsValue}>{proj.metrics}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .quality-card:hover {
                    box-shadow: var(--shadow-md);
                    transform: translateY(-5px);
                    border-color: var(--accent-navy);
                }
            `}</style>
        </section>
    );
};

export default QualitySafety;

