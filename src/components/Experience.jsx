import React from 'react';

const Experience = () => {
    const experiences = [
        {
            title: "Internal Medicine Resident Physician",
            institution: "AdventHealth Tampa – Tampa, FL",
            period: "2024 – Present",
            description: "High-acuity internal medicine training in a tertiary care setting.",
            metrics: [
                { label: "Daily Census", value: "16", icon: "👥" },
                { label: "Admissions", value: "Q4", icon: "🏥" },
                { label: "Night Float", value: "4 wk/yr", icon: "🌙" },
                { label: "Procedures", value: "14+", icon: "💉" },
            ],
            bullets: [
                "**Scope:** Primary decision-maker for high-acuity caseload on general medical floors and progressive care units.",
                "**Acuity:** Coordinate complex care for patients with multi-organ failure, sepsis, and oncologic emergencies.",
                "**Procedures:** Proficient in central line placement, arterial lines, and endotracheal intubation.",
                "**Leadership:** Lead daily bedside teaching rounds for medical students and interns.",
                "**Systems:** Drive safe discharge planning via multidisciplinary rounds; reduced LOS through early barrier identification."
            ],
            type: 'Clinical'
        },
        {
            title: "Clinical Research Associate – Hem/Onc",
            institution: "University of South Florida (USF) – Tampa, FL",
            period: "2023 – 2024",
            bullets: [
                "**Trial Coordination:** Coordinated 4 multicenter clinical trials in oncology, ensuring 100% protocol compliance.",
                "**Regulatory:** Managed IRB regulatory submissions and developed SOPs for trial workflows.",
                "**Recruitment:** Streamlined patient screening and enrollment processes for immunotherapy trials."
            ],
            type: 'Research'
        },
        {
            title: "Research Fellow – Hematology/Oncology",
            institution: "Mayo Clinic – Jacksonville, FL",
            period: "2022 – 2023",
            bullets: [
                "**Outcomes Research:** Conducted retrospective studies on hematologic malignancies with emphasis on survival analytics.",
                "**Biostatistics:** Performed advanced statistical modeling to interpret complex clinical datasets.",
                "**Collaboration:** Partnered with 5+ faculty mentors on high-impact oncology publications."
            ],
            type: 'Research'
        },
        {
            title: "Transitional Intern (Internal Medicine)",
            institution: "Damascus Hospital – Damascus, Syria",
            period: "2022",
            bullets: [
                "**Resource-Limited Care:** Rotated through cardiology and critical care in a high-pressure, resource-limited environment.",
                "**Acute Care:** Developed rapid clinical decision-making skills while managing acute emergencies and procedures."
            ],
            type: 'Clinical'
        }
    ];

    const styles = {
        container: {
            padding: '100px 20px',
            background: 'var(--bg-secondary)',
        },
        wrapper: {
            maxWidth: '1000px',
            margin: '0 auto',
        },
        timeline: {
            position: 'relative',
            padding: '20px 0',
        },
        line: {
            position: 'absolute',
            left: '31px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--border-color)',
        },
        expItem: {
            position: 'relative',
            marginBottom: '60px',
            paddingLeft: '80px',
        },
        dot: {
            position: 'absolute',
            left: '20px',
            top: '0',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '4px solid var(--accent-navy)',
            zIndex: 1,
        },
        period: {
            fontSize: '0.9rem',
            fontWeight: '700',
            color: 'var(--accent-navy)',
            marginBottom: '8px',
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        contentCard: {
            background: 'var(--bg-card)',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease',
        },
        header: {
            marginBottom: '1.5rem',
        },
        title: {
            fontSize: '1.4rem',
            color: 'var(--text-primary)',
            fontWeight: '800',
            marginBottom: '4px',
            lineHeight: '1.2',
        },
        institution: {
            fontSize: '1.05rem',
            color: 'var(--accent-navy)',
            fontWeight: '600',
            display: 'block',
        },
        metricsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            margin: '20px 0 24px',
        },
        metricCard: {
            background: 'var(--bg-muted)',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        metricIcon: {
            fontSize: '1.2rem',
            marginBottom: '4px',
        },
        metricValue: {
            fontSize: '1.1rem',
            fontWeight: '800',
            color: 'var(--accent-navy)',
        },
        metricLabel: {
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            fontWeight: '700',
            letterSpacing: '0.05em',
        },
        bulletList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        bulletItem: {
            marginBottom: '12px',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            position: 'relative',
            paddingLeft: '24px',
        },
        bulletPoint: {
            position: 'absolute',
            left: 0,
            color: 'var(--accent-navy)',
            fontWeight: 'bold',
        }
    };

    return (
        <section id="experience" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Clinical & Research Experience</h2>

                <div style={styles.timeline}>
                    <div style={styles.line}></div>

                    {experiences.map((exp, index) => (
                        <div key={index} style={styles.expItem}>
                            <div style={styles.dot}></div>
                            <span style={styles.period}>{exp.period}</span>

                            <div style={styles.contentCard} className="experience-card">
                                <div style={styles.header}>
                                    <h3 style={styles.title}>{exp.title}</h3>
                                    <span style={styles.institution}>{exp.institution}</span>
                                </div>

                                {exp.metrics && (
                                    <div style={styles.metricsGrid}>
                                        {exp.metrics.map((m, i) => (
                                            <div key={i} style={styles.metricCard}>
                                                <span style={styles.metricIcon}>{m.icon}</span>
                                                <span style={styles.metricValue}>{m.value}</span>
                                                <span style={styles.metricLabel}>{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <ul style={styles.bulletList}>
                                    {exp.bullets.map((bullet, i) => {
                                        const parts = bullet.split('**');
                                        return (
                                            <li key={i} style={styles.bulletItem}>
                                                <span style={styles.bulletPoint}>•</span>
                                                {parts.map((part, pi) =>
                                                    pi % 2 === 1 ? <strong key={pi} style={{ color: 'var(--text-primary)' }}>{part}</strong> : part
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .experience-card:hover {
                    box-shadow: var(--shadow-md);
                    transform: translateX(5px);
                    border-color: var(--accent-navy);
                }
                @media (max-width: 768px) {
                    #experience {
                        padding: 60px 16px !important;
                    }
                    .experience-card {
                        padding: 24px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Experience;

