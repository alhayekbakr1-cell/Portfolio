import React from 'react';

const References = () => {
    const references = [
        {
            name: "Claudia Kroker-Bode, M.D., Ph.D.",
            title: "Program Director, Internal Medicine Residency",
            institution: "AdventHealth Tampa",
            email: "claudia.krokerbode.md@adventhealth.com"
        },
        {
            name: "Lidia Sepulveda Rubiera, M.D.",
            title: "Associate Program Director, Internal Medicine Residency",
            institution: "AdventHealth Tampa",
            email: "lidia.sepulvedarubiera.md@adventhealth.com"
        },
        {
            name: "Muhamad Alhaj Moustafa, M.D., M.S.",
            title: "Hematologist/Oncologist (Lymphoma & Cellular Therapy)",
            institution: "Mayo Clinic Florida",
            email: "alhajmoustafa.muhamad@mayo.edu"
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
            border: '1px solid var(--border-color)',
        },
        name: {
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
        },
        title: {
            color: 'var(--accent-primary)',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            display: 'block',
        },
        institution: {
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            display: 'block',
            fontStyle: 'italic',
        },
        email: {
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
        }
    };

    return (
        <section id="references" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">References</h2>
                <div style={styles.grid}>
                    {references.map((ref, index) => (
                        <div key={index} style={styles.card}>
                            <div style={styles.name}>{ref.name}</div>
                            <span style={styles.title}>{ref.title}</span>
                            <span style={styles.institution}>{ref.institution}</span>
                            <a href={`mailto:${ref.email}`} style={styles.email}>{ref.email}</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default References;
