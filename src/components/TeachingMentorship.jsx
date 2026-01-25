import React from 'react';

const TeachingMentorship = () => {
    const styles = {
        container: {
            padding: '80px 20px',
            background: 'var(--bg-secondary)',
        },
        wrapper: {
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
        },
        highlightCard: {
            background: 'rgba(100, 255, 218, 0.03)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--accent-primary)',
            marginTop: '1rem',
        },
        itemTitle: {
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            fontWeight: '600',
            marginBottom: '0.5rem',
        },
        itemDesc: {
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: '1.5',
        }
    };

    return (
        <section id="teaching" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Teaching & Mentorship</h2>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={styles.highlightCard}>
                        <div style={{ ...styles.itemTitle, color: 'var(--accent-primary)', fontSize: '1.25rem' }}>
                            Resident Research Handbook
                        </div>
                        <p style={styles.itemDesc}>
                            <strong>Author & Creator.</strong> Developed a comprehensive 50-page guide covering study design, biostatistics, IRB navigation, and manuscript writing.
                        </p>
                        <p style={{ ...styles.itemDesc, marginTop: '10px', fontStyle: 'italic' }}>
                            <strong>Impact:</strong> Adopted as the official research curriculum for the program. Directly contributed to a 40% increase in resident abstract acceptances in 2024-2025.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeachingMentorship;
