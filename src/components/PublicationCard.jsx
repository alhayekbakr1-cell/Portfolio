import React, { useState } from 'react';
import { generateBibTeX, generateRIS, generateAPA, copyToClipboard } from '../utils/citationExport';

const PublicationCard = ({ pub }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');

    const handleCopy = async (format) => {
        let text = '';
        switch (format) {
            case 'apa': text = generateAPA(pub); break;
            case 'bibtex': text = generateBibTeX(pub); break;
            case 'ris': text = generateRIS(pub); break;
            default: text = generateAPA(pub);
        }

        const success = await copyToClipboard(text);
        if (success) {
            setCopyStatus(format.toUpperCase());
            setTimeout(() => setCopyStatus(''), 2000);
        }
    };

    const styles = {
        card: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            padding: '28px',
            marginBottom: '20px',
            transition: 'all 0.35s var(--motion-ease)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px -4px rgba(10, 37, 64, 0.06)',
        },
        featured: {
            borderLeft: '4px solid var(--accent-red)',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '12px',
        },
        title: {
            fontSize: '1.15rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            lineHeight: '1.4',
            margin: 0,
        },
        meta: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
            marginBottom: '12px',
        },
        badge: {
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '500',
            textTransform: 'uppercase',
        },
        roleBadge: {
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
        },
        typeBadge: {
            background: 'var(--bg-badge)',
            color: 'var(--text-secondary)',
        },
        topicBadge: {
            background: 'var(--bg-muted)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-color)',
        },
        authors: {
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
        },
        citation: {
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginBottom: '16px',
        },
        actions: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
        },
        btn: {
            fontSize: '0.8rem',
            padding: '6px 12px',
            borderRadius: '4px',
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
        },
        btnPrimary: {
            background: 'var(--accent-navy)',
            color: 'white',
            borderColor: 'var(--accent-navy)',
        },
        abstract: {
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginTop: '16px',
            padding: '12px',
            background: 'var(--bg-muted)',
            borderRadius: '4px',
            borderLeft: '2px solid var(--border-color)',
        }
    };

    return (
        <div style={{ ...styles.card, ...(pub.featured ? styles.featured : {}) }} className="publication-card">
            <div style={styles.header}>
                <h4 style={styles.title}>{pub.title}</h4>
                {pub.featured && (
                    <span title="Featured Publication" style={{ fontSize: '1.2rem' }}>⭐</span>
                )}
            </div>

            <div style={styles.meta}>
                <span style={{ ...styles.badge, ...styles.roleBadge }}>{pub.yourRole}</span>
                <span style={{ ...styles.badge, ...styles.typeBadge }}>{pub.type.replace('-', ' ')}</span>
                {pub.tags?.map(tag => (
                    <span key={tag} style={{ ...styles.badge, ...styles.topicBadge }}>{tag}</span>
                ))}
            </div>

            <div style={styles.authors}>
                {pub.authors?.join(', ')}
            </div>

            <div style={styles.citation}>
                {pub.journal}. {pub.year}{pub.month ? ` ${pub.month}` : ''}{pub.volume ? `; ${pub.volume}` : ''}{pub.issue ? `(${pub.issue})` : ''}{pub.pages ? `: ${pub.pages}` : ''}
            </div>

            {isExpanded && pub.abstract && (
                <div style={styles.abstract}>
                    <strong>Abstract:</strong><br />
                    {pub.abstract}
                </div>
            )}

            <div style={styles.actions}>
                {pub.link && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ ...styles.btn, ...styles.btnPrimary }}>
                        Full Text ↗
                    </a>
                )}
                {pub.doi && (
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" style={styles.btn}>
                        DOI ↗
                    </a>
                )}

                <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleCopy('apa')} style={styles.btn}>
                        {copyStatus === 'APA' ? '✓ Copied' : 'APA'}
                    </button>
                    <button onClick={() => handleCopy('bibtex')} style={styles.btn}>
                        {copyStatus === 'BIBTEX' ? '✓ Copied' : 'BibTeX'}
                    </button>
                    <button onClick={() => handleCopy('ris')} style={styles.btn}>
                        {copyStatus === 'RIS' ? '✓ Copied' : 'RIS'}
                    </button>
                </div>

                {pub.abstract && (
                    <button onClick={() => setIsExpanded(!isExpanded)} style={{ ...styles.btn, marginLeft: 'auto' }}>
                        {isExpanded ? 'Show Less ▴' : 'Show Abstract ▾'}
                    </button>
                )}
            </div>

            <style>{`
                .publication-card:hover {
                    border-color: var(--accent-navy);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
            `}</style>
        </div>
    );
};

export default PublicationCard;
