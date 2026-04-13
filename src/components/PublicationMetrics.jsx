import React from 'react';

const PublicationMetrics = ({ stats }) => {
    const styles = {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
        },
        card: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
        },
        value: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--accent-navy)',
            lineHeight: '1',
            marginBottom: '8px',
        },
        label: {
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        }
    };

    return (
        <div style={styles.grid}>
            <div style={styles.card}>
                <div style={styles.value}>{stats.total}</div>
                <div style={styles.label}>Total Publications</div>
            </div>
            <div style={styles.card}>
                <div style={styles.value}>{stats.peerReviewed}</div>
                <div style={styles.label}>Peer-Reviewed Papers</div>
            </div>
            <div style={styles.card}>
                <div style={styles.value}>{stats.firstAuthor}</div>
                <div style={styles.label}>First/Lead Author</div>
            </div>
            <div style={styles.card}>
                <div style={styles.value}>{stats.thisYear}</div>
                <div style={styles.label}>Published in {new Date().getFullYear()}</div>
            </div>
        </div>
    );
};

export default PublicationMetrics;
