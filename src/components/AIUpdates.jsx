import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Calendar, ExternalLink, Globe2, RefreshCw, Newspaper } from 'lucide-react';

const AIUpdates = () => {
    const [feed, setFeed] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        let mounted = true;

        const loadFeed = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL || '/'}ai-news.json`, { cache: 'no-store' });
                if (!response.ok) throw new Error('Unable to load the AI updates feed.');
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
    const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((item) => item.category).filter(Boolean)))], [items]);
    const filteredItems = activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory);
    const generatedDate = feed?.generatedAt ? new Date(feed.generatedAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }) : 'Pending first refresh';

    const styles = {
        page: {
            padding: '130px 20px 90px',
            minHeight: '100vh',
            background: 'transparent',
        },
        eyebrow: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '999px',
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '18px',
        },
        hero: {
            textAlign: 'center',
            maxWidth: '850px',
            margin: '0 auto 45px',
        },
        title: {
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            color: 'var(--text-primary)',
            marginBottom: '16px',
        },
        subtitle: {
            color: 'var(--text-secondary)',
            fontSize: '1.15rem',
            lineHeight: 1.8,
            marginBottom: '24px',
        },
        metaRow: {
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
        },
        metaPill: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: '999px',
            background: 'var(--bg-card)',
        },
        filters: {
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '35px',
        },
        filterButton: {
            padding: '10px 16px',
            borderRadius: '999px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            fontWeight: 700,
        },
        activeFilterButton: {
            background: 'var(--accent-navy)',
            color: '#fff',
            borderColor: 'var(--accent-navy)',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '22px',
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            padding: '24px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            boxShadow: 'var(--shadow-sm)',
            color: 'inherit',
            textDecoration: 'none',
            minHeight: '290px',
        },
        cardMeta: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            alignItems: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            fontWeight: 700,
        },
        source: {
            padding: '5px 9px',
            background: 'var(--bg-muted)',
            borderRadius: '999px',
            color: 'var(--accent-navy)',
        },
        cardTitle: {
            fontSize: '1.15rem',
            lineHeight: 1.45,
            color: 'var(--text-primary)',
            margin: 0,
        },
        cardDescription: {
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
            flexGrow: 1,
        },
        cardFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'auto',
            color: 'var(--accent-navy)',
            fontWeight: 700,
        },
        notice: {
            padding: '26px',
            borderRadius: '18px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            textAlign: 'center',
            color: 'var(--text-secondary)',
        },
    };

    return (
        <main style={styles.page}>
            <div className="container">
                <motion.section
                    style={styles.hero}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    aria-labelledby="ai-updates-title"
                >
                    <div style={styles.eyebrow}>
                        <BrainCircuit size={18} aria-hidden="true" /> Weekly Global AI Intelligence
                    </div>
                    <h1 id="ai-updates-title" style={styles.title}>AI Updates</h1>
                    <p style={styles.subtitle}>
                        A weekly, automatically refreshed digest of major AI developments across frontier labs, research, policy, healthcare, and industry.
                    </p>
                    <div style={styles.metaRow}>
                        <span style={styles.metaPill}><RefreshCw size={16} aria-hidden="true" /> Updated weekly by GitHub Actions</span>
                        <span style={styles.metaPill}><Calendar size={16} aria-hidden="true" /> Last refresh: {generatedDate}</span>
                        <span style={styles.metaPill}><Globe2 size={16} aria-hidden="true" /> Global source mix</span>
                    </div>
                </motion.section>

                {status === 'loading' && (
                    <div style={styles.notice}>Loading the latest AI updates...</div>
                )}

                {status === 'error' && (
                    <div style={styles.notice}>
                        <strong>Unable to load AI updates.</strong>
                        <p style={{ marginTop: '8px' }}>{error}</p>
                    </div>
                )}

                {status === 'success' && (
                    <>
                        <div style={styles.filters} aria-label="Filter AI updates by category">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    style={{
                                        ...styles.filterButton,
                                        ...(activeCategory === category ? styles.activeFilterButton : {})
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {filteredItems.length === 0 ? (
                            <div style={styles.notice}>No AI updates found for this category yet.</div>
                        ) : (
                            <section style={styles.grid} aria-label="AI news articles">
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
                                        transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.24) }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div style={styles.cardMeta}>
                                            <span style={styles.source}>{item.source}</span>
                                            <span>{item.date}</span>
                                        </div>
                                        <h2 style={styles.cardTitle}>{item.title}</h2>
                                        <p style={styles.cardDescription}>{item.description || 'Read the original source for details.'}</p>
                                        <div style={styles.cardFooter}>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                                                <Newspaper size={16} aria-hidden="true" /> {item.category}
                                            </span>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                                Read <ExternalLink size={15} aria-hidden="true" />
                                            </span>
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

export default AIUpdates;
