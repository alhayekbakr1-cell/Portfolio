import React from 'react';

const Education = () => {
    const education = [
        {
            degree: "Doctor of Medicine (M.D.)",
            institution: "Hama University",
            location: "Syria",
            year: "2016 – 2022",
            details: "Graduated with Excellence (GPA 3.79/4).",
            credentials: ["ECFMG Certified (July 2023)", "USMLE Step 1, 2, 3 Cleared"]
        }
    ];

    const styles = {
        container: {
            padding: '100px 20px',
            background: 'var(--bg-primary)',
        },
        wrapper: {
            maxWidth: '1000px',
            margin: '0 auto',
        },
        card: {
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '40px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
        },
        header: {
            borderBottom: '2px solid var(--accent-light)',
            paddingBottom: '24px',
        },
        degree: {
            fontSize: '1.75rem',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            marginBottom: '8px',
            lineHeight: '1.2',
        },
        institution: {
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            fontWeight: '600',
            display: 'block',
        },
        year: {
            fontSize: '1rem',
            color: 'var(--accent-navy)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginTop: '8px',
            display: 'block',
        },
        body: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
        },
        section: {
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        label: {
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            fontWeight: '800',
            letterSpacing: '0.1em',
        },
        detail: {
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
        },
        credentialItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '1rem',
            color: 'var(--text-primary)',
            fontWeight: '500',
            background: 'var(--bg-muted)',
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            marginBottom: '8px',
        },
        icon: {
            color: 'var(--accent-navy)',
            fontSize: '1.1rem',
        }
    };

    return (
        <section id="education" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Academic Foundation</h2>
                {education.map((edu, index) => (
                    <div key={index} style={styles.card}>
                        <div style={styles.header}>
                            <h3 style={styles.degree}>{edu.degree}</h3>
                            <span style={styles.institution}>{edu.institution} | {edu.location}</span>
                            <span style={styles.year}>{edu.year}</span>
                        </div>

                        <div style={styles.body}>
                            <div style={styles.section}>
                                <span style={styles.label}>Academic Standing</span>
                                <p style={styles.detail}>{edu.details}</p>
                            </div>
                            <div style={styles.section}>
                                <span style={styles.label}>Professional Credentials</span>
                                {edu.credentials.map(cred => (
                                    <div key={cred} style={styles.credentialItem}>
                                        <span style={styles.icon}>✓</span>
                                        {cred}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;

