import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const AcademicVision = () => {
    const styles = {
        section: {
            padding: '120px 20px',
            background: 'transparent',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        wrapper: {
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
        },
        accent: {
            color: 'var(--accent-navy)',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontSize: '0.9rem',
            fontWeight: '700',
            marginBottom: '24px',
            display: 'block',
        },
        title: {
            fontSize: '2.5rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            marginBottom: '40px',
            lineHeight: '1.2',
        },
        visionText: {
            fontSize: '1.25rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            position: 'relative',
        },
        quoteMark: {
            fontSize: '6rem',
            color: 'var(--accent-gold)',
            opacity: 0.2,
            position: 'absolute',
            top: -40,
            left: -40,
            fontFamily: 'Georgia, serif',
            zIndex: -1,
        },
        highlight: {
            color: 'var(--accent-gold-hover)',
            fontWeight: '600',
        },
        goalsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginTop: '80px',
            textAlign: 'left',
        },
        goalCard: {
            padding: '28px 26px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid var(--accent-red)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-md)',
            transition: 'all 0.3s ease',
        },
        goalTitle: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: 'var(--accent-navy)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        goalText: {
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
        }
    };

    return (
        <section id="academic-vision" style={styles.section}>
            <div style={styles.wrapper}>
                <RevealOnScroll>
                    <span style={styles.accent}>Future Direction</span>
                    <h2 style={styles.title}>Academic Vision</h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <div style={{ position: 'relative', padding: '0 20px' }}>
                        {/* Vertical Decorative Text */}
                        <div style={{
                            position: 'absolute',
                            left: '-60px',
                            top: '0',
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            fontSize: '4rem',
                            fontWeight: '900',
                            color: 'var(--accent-gold)',
                            opacity: 0.07,
                            fontFamily: 'var(--font-serif)',
                            letterSpacing: '0.5rem',
                            zIndex: 0,
                            pointerEvents: 'none'
                        }}>
                            VISION
                        </div>

                        <span style={styles.quoteMark}>“</span>
                        <p style={styles.visionText}>
                            <span style={{
                                float: 'left',
                                fontSize: '4.5rem',
                                lineHeight: '0.8',
                                paddingRight: '12px',
                                paddingTop: '4px',
                                color: 'var(--accent-gold)',
                                fontFamily: 'var(--font-serif)',
                                fontWeight: '700'
                            }}>M</span>
                            y academic vision is to pursue clinically grounded, <span style={styles.highlight}>translational research</span> that grows out of careful attention to patients and their disease. I aspire to practice medicine in a way that is <span style={styles.highlight}>fully human</span>, where scientific rigor, clinical judgment, and empathy naturally belong together, and to contribute scholarship and mentorship that value <span style={styles.highlight}>clarity, honesty, and depth</span>.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default AcademicVision;
