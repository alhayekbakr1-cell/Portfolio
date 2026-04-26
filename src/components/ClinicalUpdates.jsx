import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, ExternalLink, Filter, RefreshCw, Stethoscope } from 'lucide-react';

const ClinicalUpdates = () => {
    const [feed, setFeed] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);
    const [activeSpecialty, setActiveSpecialty] = useState('All');
    const [activeType, setActiveType] = useState('All');

    useEffect(() => {
        let mounted = true;

        const loadFeed = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL || '/'}clinical-updates.json`, { cache: 'no-store' });
                if (!response.ok) throw new Error('Unable to load the medical updates feed.');
                const data = await response.json();
                if (mounted) {
                    setFeed(data);
                    setStatus('success');
                }
            } catch (err) {
                if (mounted) {
                    setError(err.message);
                    setStatus('error');
                }
            }
        };

        loadFeed();

        return () => {
            mounted = false;
        };
    }, []);

    const items = feed?.items || [];
    const specialties = useMemo(() => ['All', ...Array.from(new Set(items.map((item) => item.specialty).filter(Boolean))).sort()], [items]);
    const types = useMemo(() => ['All', ...Array.from(new Set(items.map((item) => item.type).filter(Boolean))).sort()], [items]);
    const filteredItems = items.filter((item) => {
        const specialtyMatch = activeSpecialty === 'All' || item.specialty === activeSpecialty;
        const typeMatch = activeType === 'All' || item.type === activeType;
        return specialtyMatch && typeMatch;
    });

    const generatedDate = feed?.generatedAt ? new Date(feed.generatedAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }) : 'Pending first refresh';

    const styles = {
        page: { padding: '130px 20px 90px', minHeight: '100vh', background: 'var(--bg-primary)' },
        hero: { textAlign: 'center', maxWidth: '920px', margin: '0 auto 42px' },
        eyebrow: {
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px',
            borderRadius: '999px', background: 'var(--accent-light)', color: 'var(--accent-navy)',
            fontWeight: 700, fontSize: '0.9rem', marginBottom: '18px'
        },
        title: { fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-primary)', marginBottom: '16px' },
        subtitle: { color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '24px' },
        metaRow: { display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.95rem' },
        metaPill: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '999px', background: 'var(--bg-card)' },
        controls: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '32px' },
        controlCard: { padding: '18px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', boxShadow: 'var(--shadow-sm)' },
        controlLabel: { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-navy)', fontWeight: 800, marginBottom: '12px' },
        chipWrap: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
        chip: { padding: '8px 12px', borderRadius: '999px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.88rem' },
        activeChip: { background: 'var(--accent-navy)', color: '#fff', borderColor: 'var(--accent-navy)' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' },
        card: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', boxShadow: 'var(--shadow-sm)', color: 'inherit', textDecoration: 'none', minHeight: '300px' },
        cardMeta: { display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700 },
        badge: { padding: '5px 9px', background: 'var(--bg-muted)', borderRadius: '999px', color: 'var(--accent-navy)' },
        cardTitle: { fontSize: '1.12rem', lineHeight: 1.45, color: 'var(--text-primary)', margin: 0 },
        cardDescription: { color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, flexGrow: 1 },
        cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', color: 'var(--accent-navy)', fontWeight: 700, gap: '12px' },
        notice: { padding: '26px', borderRadius: '18px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', textAlign: 'center', color: 'var(--text-secondary)' }
    };

    return (
        <main style={styles.page}>
            <div className="container">
                <motion.section
                    style={styles.hero}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    aria-labelledby="medical-updates-title"
                >
                    <div style={styles.eyebrow}><Stethoscope size={18} aria-hidden="true" /> Weekly Medical Intelligence</div>
                    <h1 id="medical-updates-title" style={styles.title}>Medical Updates</h1>
                    <p style={styles.subtitle}>
                        Recent trials, guideline updates, practice-changing literature, and hot topics across internal medicine and major subspecialties.
                    </p>
                    <div style={styles.metaRow}>
                        <span style={styles.metaPill}><RefreshCw size={16} aria-hidden="true" /> Refreshed automatically</span>
                        <span style={styles.metaPill}><Calendar size={16} aria-hidden="true" /> Last refresh: {generatedDate}</span>
                        <span style={styles.metaPill}><Activity size={16} aria-hidden="true" /> Multi-specialty coverage</span>
                    </div>
                </motion.section>

                {status === 'loading' && <div style={styles.notice}>Loading medical updates...</div>}
                {status === 'error' && <div style={styles.notice}><strong>Unable to load medical updates.</strong><p style={{ marginTop: '8px' }}>{error}</p></div>}

                {status === 'success' && (
                    <>
                        <section style={styles.controls} aria-label="Medical update filters">
                            <div style={styles.controlCard}>
                                <div style={styles.controlLabel}><Filter size={16} aria-hidden="true" /> Specialty</div>
                                <div style={styles.chipWrap}>
                                    {specialties.map((specialty) => (
                                        <button key={specialty} type="button" onClick={() => setActiveSpecialty(specialty)} style={{ ...styles.chip, ...(activeSpecialty === specialty ? styles.activeChip : {}) }}>
                                            {specialty}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={styles.controlCard}>
                                <div style={styles.controlLabel}><Filter size={16} aria-hidden="true" /> Update type</div>
                                <div style={styles.chipWrap}>
                                    {types.map((type) => (
                                        <button key={type} type="button" onClick={() => setActiveType(type)} style={{ ...styles.chip, ...(activeType === type ? styles.activeChip : {}) }}>
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {filteredItems.length === 0 ? (
                            <div style={styles.notice}>No medical updates found for this filter yet.</div>
                        ) : (
                            <section style={styles.grid} aria-label="Medical update articles">
                                {filteredItems.map((item, index) => (
                                    <motion.a
                                        key={item.id || `${item.link}-${index}`}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.card}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '80px' }}
                                        transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.2) }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div style={styles.cardMeta}>
                                            <span style={styles.badge}>{item.specialty}</span>
                                            <span>{item.date}</span>
                                        </div>
                                        <h2 style={styles.cardTitle}>{item.title}</h2>
                                        <p style={styles.cardDescription}>{item.description || 'Read the original source for details.'}</p>
                                        <div style={styles.cardFooter}>
                                            <span>{item.type} · {item.source}</span>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Read <ExternalLink size={15} aria-hidden="true" /></span>
                                        </div>
                                    </motion.a>
                                ))}
                            </section>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default ClinicalUpdates;
