import React, { useState } from 'react';
import profileImage from '../assets/profile.png';

const Hero = () => {
    const [showEmail, setShowEmail] = useState(false);

    const handleConnect = (e) => {
        e.preventDefault();
        setShowEmail(!showEmail);
        window.location.href = '#contact';
    };

    const styles = {
        hero: {
            padding: '160px 20px 100px',
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '60px',
            flexWrap: 'wrap-reverse',
        },
        content: {
            flex: '1',
            minWidth: '300px',
        },
        imageContainer: {
            flex: '0 0 320px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
        },
        profileImage: {
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid var(--accent-secondary)',
            boxShadow: '0 0 30px rgba(100, 255, 218, 0.2)',
        },
        title: {
            fontSize: '4rem',
            marginBottom: '15px',
            color: 'var(--text-primary)',
            background: 'linear-gradient(90deg, #e6f1ff 0%, #8892b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '800',
            letterSpacing: '-2px',
            lineHeight: '1.1',
        },
        headline: {
            fontSize: '1.4rem',
            color: 'var(--accent-primary)',
            fontWeight: '600',
            marginBottom: '1rem',
            letterSpacing: '0.5px',
        },
        subheadline: {
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '2rem',
            maxWidth: '700px',
        },
        buttonGroup: {
            display: 'flex',
            gap: '20px',
            marginTop: '30px',
            flexWrap: 'wrap',
        },
        primaryBtn: {
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
        },
        secondaryBtn: {
            padding: '12px 24px',
            backgroundColor: 'var(--accent-primary)',
            border: '1px solid var(--accent-primary)',
            color: 'var(--bg-primary)',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
        }
    };

    return (
        <section id="home" style={styles.hero}>
            <div style={styles.content}>
                <h1 style={styles.title}>Bakr Alhayek, MD</h1>

                <h2 style={styles.headline}>
                    Academic Hospital Medicine | QI + Health Services Research | Inpatient Oncology Interests
                </h2>

                <div style={styles.subheadline}>
                    <p style={{ marginBottom: '10px' }}>
                        <strong>Internal Medicine Resident Physician</strong> with focused interests in inpatient oncology complications, diagnostic stewardship, and equity-focused quality improvement.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: '5px' }}>🔹 Building scalable systems across clinical operations and resident education.</li>
                        <li style={{ marginBottom: '5px' }}>🔹 Leveraging analytics to improve safety, throughput, and outcomes.</li>
                        <li>🔹 <strong>Long-term Goal:</strong> Hematology/Oncology fellowship with an academic career in inpatient oncologic care and outcomes research.</li>
                    </ul>
                </div>

                <div style={styles.buttonGroup}>
                    <a href="/Bakr_Alhayek_CV.pdf" download style={styles.primaryBtn}>
                        Download CV
                    </a>
                    <button onClick={handleConnect} style={styles.secondaryBtn}>
                        Connect / Email
                    </button>
                    <a href="https://scholar.google.com/citations?user=8NUxSzEAAAAJ&hl=en&oi=ao#d=gs_hdr_drw&t=1769295675023" target="_blank" rel="noopener noreferrer" style={styles.primaryBtn}>
                        Google Scholar
                    </a>
                </div>
            </div>

            <div style={styles.imageContainer}>
                <img src={profileImage} alt="Bakr Alhayek, MD" style={styles.profileImage} />
            </div>
        </section>
    );
};

export default Hero;
