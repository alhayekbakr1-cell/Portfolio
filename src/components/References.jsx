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
        },
        {
            name: "Firas Baidoun, M.D.",
            title: "Assistant Professor",
            institution: "University of Alabama Health Services Foundation (UAHSF)",
            email: "firas92@uabmc.edu"
        },
        {
            name: "Omar M Abdel-Rahman Abdelselam",
            title: "Assistant Professor, Division of Medical Oncology, Department of Oncology",
            institution: "University of Alberta",
            email: "omar.abdelrhman@med.uau.edu.ca"
        },
        {
            name: "Guru P. Sonpavde, M.D.",
            title: "Medical Director of Genitourinary (GU) Oncology, Assistant Director of the Clinical Research Unit",
            institution: "AdventHealth Cancer Institute",
            email: "Guru.Sonpavde.MD@AdventHealth.com"
        }
    ];

    const styles = {
        container: {
            padding: '100px 20px',
            background: 'var(--bg-secondary)',
        },
        wrapper: {
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginTop: '3rem',
        },
        card: {
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease',
        },
        name: {
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            fontWeight: '600',
            marginBottom: '0.75rem',
            fontFamily: 'var(--font-serif)',
        },
        title: {
            color: 'var(--accent-navy)',
            fontSize: '1rem',
            marginBottom: '0.5rem',
            display: 'block',
            fontWeight: '500',
        },
        institution: {
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
            display: 'block',
            fontSize: '0.95rem',
        },
        email: {
            color: 'var(--accent-blue)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'color 0.2s ease',
        },
        note: {
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginTop: '2rem',
            fontStyle: 'italic',
        }
    };

    const hoverStyle = `
        .reference-card:hover {
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
        }
        .reference-email:hover {
            color: var(--accent-navy);
        }
    `;

    return (
        <>
            <style>{hoverStyle}</style>
            <section id="references" style={styles.container}>
                <div style={styles.wrapper}>
                    <h2 className="section-title">References</h2>
                    <div style={styles.grid}>
                        {references.map((ref, index) => (
                            <div key={index} style={styles.card} className="reference-card">
                                <div style={styles.name}>{ref.name}</div>
                                <span style={styles.title}>{ref.title}</span>
                                <span style={styles.institution}>{ref.institution}</span>
                                <a
                                    href={`mailto:${ref.email}`}
                                    style={styles.email}
                                    className="reference-email"
                                >
                                    {ref.email}
                                </a>
                            </div>
                        ))}
                    </div>
                    <p style={styles.note}>
                        Additional references available upon request
                    </p>
                </div>
            </section>
        </>
    );
};

export default References;
