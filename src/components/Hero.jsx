import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cvPath = `${baseUrl}Bakr_Alhayek_CV.pdf`;
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    const handleConnect = (e) => {
        e.preventDefault();
        navigate('/contact');
    };

    const fadeUp = reduceMotion ? {} : {
        initial: { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0 }
    };

    const styles = {
        hero: {
            minHeight: '88vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            padding: '140px 0 80px',
            overflow: 'hidden',
            background: 'transparent',
        },
        contentWrapper: {
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
        },
        greeting: {
            fontSize: '0.95rem',
            color: 'var(--accent-gold)',
            fontWeight: '800',
            letterSpacing: '2.5px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '30px',
            background: 'var(--accent-gold-light)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
        },
        title: {
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            marginBottom: '1rem',
            color: 'var(--accent-navy)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            letterSpacing: '-0.5px',
            lineHeight: '1.15',
        },
        subtitle: {
            fontSize: '1.3rem',
            color: 'var(--accent-navy)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.3',
        },
        description: {
            fontSize: '1.18rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
        },
        highlight: {
            color: 'var(--accent-navy)',
            fontWeight: '700',
            borderBottom: '2px solid var(--accent-red)',
        },
        glassBox: {
            padding: '2rem 2.4rem',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-xl)',
            marginBottom: '2.5rem',
            textAlign: 'left',
            maxWidth: '840px',
            margin: '0 auto 2.5rem',
        },
        mission: {
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            lineHeight: '1.65',
            margin: 0,
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
        },
        buttonGroup: {
            display: 'flex',
            gap: '18px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px',
        },
        primaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'var(--accent-red)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '999px',
            fontSize: '1.02rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 12px 30px rgba(185, 28, 28, 0.32)',
        },
        secondaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--accent-navy)',
            color: 'var(--accent-navy)',
            borderRadius: '999px',
            fontSize: '1.02rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(10, 37, 64, 0.08)',
        },
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '840px',
            margin: '0 auto',
        },
        statCard: {
            padding: '20px 16px',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
        },
        statValue: {
            fontSize: '1.8rem',
            fontWeight: '800',
            color: 'var(--accent-red)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '4px',
        },
        statLabel: {
            fontSize: '0.84rem',
            fontWeight: '700',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        }
    };

    const css = `
        .hero-primary-btn:hover {
            background-color: var(--accent-red-hover) !important;
            transform: translateY(-3px);
            box-shadow: 0 16px 36px rgba(185, 28, 28, 0.42) !important;
        }
        .hero-secondary-btn:hover {
            background-color: var(--accent-navy) !important;
            color: white !important;
            transform: translateY(-3px);
            box-shadow: 0 16px 36px rgba(10, 37, 64, 0.18) !important;
        }
        @media (max-width: 640px) {
            .stats-row { grid-template-columns: 1fr !important; }
        }
    `;

    return (
        <>
            <style>{css}</style>
            <section id="home" style={styles.hero} aria-labelledby="hero-title">
                <div className="container">
                    <div style={styles.contentWrapper}>
                        <motion.p {...fadeUp} transition={{ duration: 0.5 }} style={styles.greeting}>
                            <span className="pulse-dot"></span> Physician • Researcher • Innovator
                        </motion.p>
                        
                        <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.08 }} id="hero-title" style={styles.title}>
                            Bakr Alhayek, MD
                        </motion.h1>

                        <motion.h2 {...fadeUp} transition={{ duration: 0.6, delay: 0.16 }} style={styles.subtitle}>
                            Internal Medicine Resident Physician
                        </motion.h2>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.24 }} style={styles.description}>
                            <p>
                                Dedicated to advancing <span style={styles.highlight}>inpatient oncologic care</span> through rigorous evidence-based practice and <span style={styles.highlight}>diagnostic stewardship</span>.
                                Active investigator at <span style={styles.highlight}>AdventHealth Tampa</span> with a focus on hematopoietic complications and clinical informatics.
                            </p>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.32 }} style={styles.glassBox}>
                            <p style={styles.mission}>
                                <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🎯</span>
                                <span>
                                    <strong>Fellowship Focus:</strong> Pursuing a Hematology/Oncology fellowship to bridge the gap between complex inpatient management and scalable outcomes research.
                                </span>
                            </p>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} style={styles.buttonGroup}>
                            <a
                                href={cvPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.primaryBtn}
                                className="hero-primary-btn"
                                aria-label="Download Curriculum Vitae (PDF)"
                            >
                                📄 Download Curriculum Vitae
                            </a>

                            <a
                                href="#/contact"
                                onClick={handleConnect}
                                style={styles.secondaryBtn}
                                className="hero-secondary-btn"
                            >
                                ✉️ Get in Touch
                            </a>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.48 }} style={styles.statsRow} className="stats-row">
                            <div style={styles.statCard}>
                                <div style={styles.statValue}>15+</div>
                                <div style={styles.statLabel}>Peer Publications & Abstracts</div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={styles.statValue}>AdventHealth</div>
                                <div style={styles.statLabel}>Tampa Affiliate</div>
                            </div>
                            <div style={styles.statCard}>
                                <div style={styles.statValue}>Informatics</div>
                                <div style={styles.statLabel}>Oncology AI Investigator</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
