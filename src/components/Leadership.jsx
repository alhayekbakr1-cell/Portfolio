import React from 'react';

const Leadership = () => {
    const roles = [
        {
            role: "Selected Chief Medical Resident (Research & Innovation), 2026–2027",
            focus: "Research & Quality Improvement",
            period: "Term begins July 2026",
            description: "",
            achievements: [
                "Selected to oversee all research and Quality Improvement (QI) projects within the residency program.",
                "Provide mentorship, structural improvements, and guidance to residents.",
                "Foster scholarly output and clinical excellence."
            ]
        },
        {
            role: "Founding Member – Internal Medicine Scholarly Activity Committee",
            focus: "AdventHealth Tampa",
            period: "2024 – Present",
            description: "Co-founded this resident-driven initiative during PGY-1 to organize and build the research environment. Connected residents with research mentors at AdventHealth Orlando.",
            achievements: [
                "Overseeing 20+ active resident projects and fostering a sustainable culture of inquiry.",
                "Increased resident scholarly output (national conference abstracts and planned publications).",
                "Mentoring peers in research design and quality improvement methodologies."
            ]
        },
        {
            role: "Clinical Artificial Intelligence Lead",
            focus: "AdventHealth Tampa",
            period: "2025 - Present",
            description: "Partnered with enterprise AI/analytics teams to implement clinical AI governance, safety review, equity checks, and evaluation metrics for LLM-enabled workflows.",
            achievements: [
                "Collaborating with OpenAI and hospital leadership to optimize the deployment of AI tools in clinical settings.",
                "Developing hospital-wide governance policies for the safe and ethical use of Generative AI in patient care.",
                "Leading 'AI in Medicine' grand rounds to educate staff on ethical use and implementation."
            ]
        }
    ];

    const styles = {
        container: {
            background: 'var(--bg-secondary)',
            padding: '80px 20px',
        },
        wrapper: {
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
        },
        roleCard: {
            borderLeft: '4px solid var(--accent-primary)',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            marginBottom: '2rem',
            borderRadius: '0 8px 8px 0',
        },
        roleHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '10px',
        },
        roleTitle: {
            fontSize: '1.75rem',
            color: 'var(--text-primary)',
        },
        rolePeriod: {
            color: 'var(--accent-primary)',
            fontFamily: 'monospace',
            fontWeight: '600',
        },
        roleSub: {
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            display: 'block',
        },
        list: {
            listStyle: 'disc',
            paddingLeft: '20px',
            color: 'var(--text-secondary)',
            marginTop: '1rem',
        },
        listItem: {
            marginBottom: '0.5rem',
        }
    };

    return (
        <section id="leadership" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Leadership & Institutional Impact</h2>
                <div>
                    {roles.map((item, index) => (
                        <div key={index} style={styles.roleCard}>
                            <div style={styles.roleHeader}>
                                <h3 style={styles.roleTitle}>{item.role}</h3>
                                <span style={styles.rolePeriod}>{item.period}</span>
                            </div>
                            <span style={styles.roleSub}>{item.focus}</span>
                            <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                            <ul style={styles.list}>
                                {item.achievements.map((ach, i) => (
                                    <li key={i} style={styles.listItem}>{ach}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leadership;
