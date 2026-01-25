import React from 'react';

const Education = () => {
    const education = [
        {
            degree: "Doctor of Medicine (M.D.)",
            institution: "Hama University Faculty of Medicine, Syria",
            year: "2022",
            details: "Graduated with Excellence (GPA 3.79/4). ECFMG Certified (July 2023)."
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
            // Changed to single column center since we removed one side
            maxWidth: '800px',
            margin: '0 auto',
        },
        sectionHeader: {
            color: 'var(--accent-primary)',
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
        },
        item: {
            marginBottom: '1.5rem',
            borderLeft: '2px solid var(--border-color)',
            paddingLeft: '1rem',
        },
        title: {
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            fontWeight: '600',
        },
        subtitle: {
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            display: 'block',
        },
        score: {
            color: 'var(--accent-primary)',
            fontWeight: 'bold',
        }
    };

    return (
        <section id="education" style={styles.container}>
            <div style={styles.wrapper}>
                <div style={styles.grid}>
                    <div>
                        <h3 style={styles.sectionHeader}>Education</h3>
                        {education.map((edu, index) => (
                            <div key={index} style={styles.item}>
                                <div style={styles.title}>{edu.degree}</div>
                                <span style={styles.subtitle}>{edu.institution} | {edu.year}</span>
                                <p style={{ color: 'var(--text-secondary)' }}>{edu.details}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
