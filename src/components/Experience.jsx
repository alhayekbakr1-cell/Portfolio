import React from 'react';

const Experience = () => {
    const experiences = [
        {
            title: "Internal Medicine Resident Physician",
            institution: "AdventHealth Tampa – Tampa, FL",
            period: "2022 – Present",
            description: null, // Using bullets below
            metrics: [
                { label: "Census", value: "16/day" },
                { label: "Admissions", value: "Every 4th day" },
                { label: "Nights", value: "4 weeks/yr" },
                { label: "Procedures", value: "14 Total" },
            ],
            bullets: [
                "**Scope:** Manage high-acuity caseload (average census 16) on general medical floors and progressive care units. Primary decision-maker for admissions, daily care plans, and discharges.",
                "**Acuity:** Coordinate complex care for patients with multi-organ failure, sepsis, and oncologic emergencies, collaborating daily with 15+ subspecialty services.",
                "**Procedures:** Proficient in central line placement and arterial lines.",
                "**Throughput/Ops:** Drive safe discharge planning via multidisciplinary rounds; reduced length of stay for managed patients through early barrier identification.",
                "**Teaching:** Lead daily bedside teaching rounds for medical students and interns; deliver case-based chalk talks on common hospitalist pathologies."
            ]
        },
        {
            title: "Clinical Research Associate – Hematology & Oncology",
            institution: "University of South Florida (USF) – Tampa, FL",
            period: "Nov 2023 – June 2024",
            bullets: [
                "**Trial Coordination:** Coordinated 4 multicenter clinical trials in oncology, ensuring 100% protocol compliance.",
                "**Regulatory:** Managed IRB regulatory submissions and developed SOPs for trial workflows."
            ]
        },
        {
            title: "Research Fellow – Hematology/Oncology",
            institution: "Mayo Clinic – Jacksonville, FL",
            period: "Nov 2022 – Nov 2023",
            bullets: [
                "**Research:** Conducted retrospective studies on hematologic malignancies.",
                "**Analysis:** Performed statistical analyses to interpret clinical outcomes and survival data."
            ]
        },
        {
            title: "Transitional Intern (Internal Medicine)",
            institution: "Damascus Hospital – Damascus, Syria",
            period: "Mar 2022 – Oct 2022",
            bullets: [
                "**Rotations:** Completed a rigorous internship with rotations in general medicine, cardiology, critical care, and emergency medicine in a resource-limited setting.",
                "**Skills:** Gained hands-on procedural experience (central line insertion, thoracentesis, lumbar puncture) and acute care skills, while developing strong clinical decision-making under pressure."
            ]
        }
    ];

    const styles = {
        container: {
            padding: '80px 20px',
            background: 'var(--bg-secondary)',
        },
        wrapper: {
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
        },
        card: {
            borderLeft: '4px solid var(--accent-primary)',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '2rem',
            marginBottom: '2rem',
            borderRadius: '0 8px 8px 0',
        },
        header: {
            marginBottom: '1rem',
        },
        title: {
            fontSize: '1.4rem',
            color: 'var(--text-primary)',
            fontWeight: 'bold',
            marginBottom: '0.25rem',
        },
        institution: {
            fontSize: '1rem',
            color: 'var(--accent-primary)',
            fontWeight: '600',
            marginBottom: '0.25rem',
            display: 'block',
        },
        period: {
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic',
        },
        metricsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '10px',
            marginBottom: '1.5rem',
            marginTop: '1rem',
        },
        metricItem: {
            background: 'rgba(100, 255, 218, 0.05)',
            border: '1px solid var(--border-color)',
            padding: '10px',
            borderRadius: '4px',
            textAlign: 'center',
        },
        metricLabel: {
            display: 'block',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        metricValue: {
            display: 'block',
            fontSize: '1rem',
            color: 'var(--accent-primary)',
            fontWeight: 'bold',
            marginTop: '4px',
        },
        bulletList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        bulletItem: {
            marginBottom: '0.8rem',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: '1.6',
            position: 'relative',
            paddingLeft: '1.5rem',
        },
        bulletPoint: {
            position: 'absolute',
            left: 0,
            color: 'var(--accent-primary)',
            top: '0px',
        }
    };

    return (
        <section id="experience" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Clinical Experience</h2>
                {experiences.map((exp, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.header}>
                            <h3 style={styles.title}>{exp.title}</h3>
                            <span style={styles.institution}>{exp.institution}</span>
                            <span style={styles.period}>{exp.period}</span>
                        </div>

                        {exp.metrics && (
                            <div style={styles.metricsGrid}>
                                {exp.metrics.map((m, i) => (
                                    <div key={i} style={styles.metricItem}>
                                        <span style={styles.metricLabel}>{m.label}</span>
                                        <span style={styles.metricValue}>{m.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <ul style={styles.bulletList}>
                            {exp.bullets.map((bullet, i) => {
                                const [bold, text] = bullet.includes('**')
                                    ? bullet.split('**').filter(Boolean)
                                    : [null, bullet];

                                return (
                                    <li key={i} style={styles.bulletItem}>
                                        <span style={styles.bulletPoint}>▹</span>
                                        {bold ? <strong style={{ color: 'var(--text-primary)' }}>{bold}</strong> : null}
                                        {text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
