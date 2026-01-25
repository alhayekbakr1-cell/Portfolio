import React from 'react';

const Service = () => {
    const services = [
        {
            role: "Volunteer Physician",
            organization: "AdventHealth Community Outreach – Tampa, FL",
            period: "2023 – Present",
            description: "Participated in 6 community outreach programs providing counseling and on-site point-of-care lab checks to connect the underserved Tampa community to the healthcare system."
        },
        {
            role: "Volunteer Clinical Assistant",
            organization: "M.A.S.S. Clinic | Jacksonville, FL (3 Months)",
            period: "2022",
            description: "Assist physicians at a free clinic serving uninsured, low-income patients. Perform patient intakes, medical histories, and basic clinical tasks to expand access to quality healthcare for underserved populations."
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
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '2rem',
            borderRadius: '8px',
            borderLeft: '4px solid var(--accent-primary)',
            marginBottom: '20px'
        },
        title: {
            fontSize: '1.5rem',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
        },
        subtitle: {
            color: 'var(--accent-primary)',
            marginBottom: '1rem',
            fontWeight: '600',
            display: 'block',
        },
        description: {
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
        }
    };

    return (
        <section id="service" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Service & Volunteerism</h2>
                {services.map((service, index) => (
                    <div key={index} style={styles.card}>
                        <h3 style={styles.title}>{service.role}</h3>
                        <span style={styles.subtitle}>{service.organization}</span>
                        <p style={styles.description}>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;
