import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Activity, TrendingUp, Users, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const ProjectSpotlight = ({ title, badge, summary, highlights, type, icon: Icon, color = 'var(--accent-navy)', image }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const styles = {
        container: {
            background: 'var(--bg-card)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column', // Mobile first
        },
        desktopLayout: {
            '@media (min-width: 900px)': {
                flexDirection: 'row',
            }
        },
        contentSide: {
            padding: '40px',
            flex: '3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 2,
            background: 'var(--bg-card)'
        },
        visualSide: {
            padding: image ? '0' : '40px',
            flex: '2',
            background: `linear-gradient(135deg, ${color}15, var(--bg-secondary))`,
            borderLeft: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '300px',
            position: 'relative'
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: `${color}20`,
            color: color,
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '20px',
            width: 'fit-content',
        },
        title: {
            fontSize: '1.8rem',
            color: 'var(--accent-navy)',
            marginBottom: '16px',
            lineHeight: '1.3',
            fontFamily: 'var(--font-serif)',
        },
        summary: {
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '30px',
        },
        detailsButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: color,
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.95rem',
            background: 'none',
            border: 'none',
            padding: 0,
            transition: 'opacity 0.2s'
        },
        expandedContent: {
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: '1.6'
        },
        statGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '20px',
        },
        statCard: {
            background: 'var(--bg-primary)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
        statValue: {
            fontSize: '1.6rem',
            fontWeight: '800',
            color: color,
            marginBottom: '4px',
            display: 'block',
        },
        statLabel: {
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            lineHeight: '1.4',
        }
    };

    return (
        <RevealOnScroll>
            <div style={styles.container} className="project-spotlight">
                <style>{`
                    .project-spotlight { flex-direction: column; }
                    @media (min-width: 900px) {
                        .project-spotlight { flex-direction: row !important; }
                    }
                    .project-image:hover {
                        transform: scale(1.05);
                    }
                `}</style>

                <div style={styles.contentSide}>
                    <span style={styles.badge}>
                        {Icon && <Icon size={14} />}
                        {type}
                    </span>
                    <h3 style={styles.title}>{title}</h3>
                    <p style={styles.summary}>{summary}</p>

                    <div>
                        <button
                            style={styles.detailsButton}
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
                        >
                            {isExpanded ? 'Hide Study Details' : 'View Study Details'}
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={styles.expandedContent}>
                                    <p><strong>Key Findings:</strong> This study analyzed a large cohort to determine prognostic factors. The results indicate a significant correlation between specific clinical markers and patient outcomes, challenging traditional risk stratification models.</p>
                                    <p style={{ marginTop: '10px' }}><strong>Methodology:</strong> Retrospective analysis of multicenter registry data. Statistical methods included Cox proportional hazards regression and Kaplan-Meier survival analysis.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.visualSide}>
                    {image ? (
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }} className="project-image" />
                        </div>
                    ) : (
                        <div style={styles.statGrid}>
                            {highlights.map((stat, index) => (
                                <div key={index} style={styles.statCard}>
                                    <span style={styles.statValue}>{stat.value}</span>
                                    <span style={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </RevealOnScroll>
    );
};
export default ProjectSpotlight;
