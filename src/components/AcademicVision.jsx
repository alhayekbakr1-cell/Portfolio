import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const AcademicVision = () => {
    const styles = {
        section: {
            padding: '120px 20px',
            background: 'var(--bg-primary)',
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
            padding: '24px',
            background: 'var(--bg-card)',
            borderLeft: '3px solid var(--accent-navy)',
            borderRadius: '0 8px 8px 0',
            boxShadow: 'var(--shadow-sm)',
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

                <div style={styles.goalsContainer}>
                    <RevealOnScroll delay={0.3}>
                        <div style={styles.goalCard}>
                            <h3 style={styles.goalTitle}>🔬 Translational Research</h3>
                            <p style={styles.goalText}>
                                Bridging the gap between molecular discoveries and patient care, with a focus on immune toxicities and hematologic malignancies.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.4}>
                        <div style={styles.goalCard}>
                            <h3 style={styles.goalTitle}>🏥 Institutional Growth</h3>
                            <p style={styles.goalText}>
                                Building robust research infrastructure that empowers residents and faculty to engage in meaningful scholarly activity.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.5}>
                        <div style={styles.goalCard}>
                            <h3 style={styles.goalTitle}>🎓 Mentorship</h3>
                            <p style={styles.goalText}>
                                Cultivating a learning environment where junior trainees develop the critical thinking and resilience needed for academic careers.
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

export default AcademicVision;
