import React, { useState } from 'react';
import { allPublications, getFilterOptions, getPublicationStats } from '../utils/publicationData';
import usePublicationFilter from '../hooks/usePublicationFilter';
import PublicationCard from './PublicationCard';
import PublicationFilters from './PublicationFilters';
import PublicationMetrics from './PublicationMetrics';
import RevealOnScroll from './RevealOnScroll';

const Publications = () => {
    const filterOptions = getFilterOptions();
    const stats = getPublicationStats();
    const filter = usePublicationFilter(allPublications);

    // Get unique categories and sort them (All first, then others)
    const categories = ['All', ...new Set(allPublications.map(p => p.category).filter(Boolean).sort())];

    const styles = {
        section: {
            padding: '100px 20px',
            background: 'var(--bg-secondary)',
        },
        wrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '40px',
        },
        resultsInfo: {
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontWeight: '500',
        },
        // --- Category Tabs ---
        tabsContainer: {
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            marginBottom: '40px',
            borderBottom: '1px solid var(--border-color)',
            flexWrap: 'wrap',
        },
        tab: (isActive) => ({
            padding: '8px 16px',
            borderRadius: '20px',
            border: `1px solid ${isActive ? 'var(--accent-navy)' : 'transparent'}`,
            background: isActive ? 'var(--accent-navy)' : 'var(--bg-card)',
            color: isActive ? 'white' : 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
            boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
        }),
        // ---------------------
        contentGrid: {
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 3fr) 1fr',
            gap: '40px',
            alignItems: 'start',
        },
        noResults: {
            textAlign: 'center',
            padding: '60px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            border: '1px dashed var(--border-color)',
            color: 'var(--text-secondary)',
        },
        sortControls: {
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '20px',
        },
        select: {
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            outline: 'none',
            background: 'var(--bg-card)',
        }
    };

    return (
        <section id="publications" style={styles.section}>
            <div style={styles.wrapper}>
                <RevealOnScroll>
                    <div style={styles.header}>
                        <h2 className="section-title" style={{ margin: 0 }}>Publications Dashboard</h2>
                        <div style={styles.resultsInfo}>
                            {filter.hasActiveFilters || filter.selectedCategory !== 'All' ? (
                                <span>Showing {filter.resultCount} of {filter.totalCount} publications</span>
                            ) : (
                                <span>Full Bibliography ({filter.totalCount} items)</span>
                            )}
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <PublicationMetrics stats={stats} />
                </RevealOnScroll>

                <RevealOnScroll delay={0.15}>
                    <div style={styles.tabsContainer}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => filter.setSelectedCategory(cat)}
                                style={styles.tab(filter.selectedCategory === cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </RevealOnScroll>

                <div style={styles.contentGrid} className="publications-layout">
                    <div className="publications-list">
                        <div style={styles.sortControls}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</label>
                            <select
                                value={filter.sortBy}
                                onChange={(e) => filter.setSortBy(e.target.value)}
                                style={styles.select}
                            >
                                <option value="recent">Most Recent First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="alpha">Alphabetical (A-Z)</option>
                            </select>
                        </div>

                        {filter.resultCount > 0 ? (
                            filter.filteredPublications.map(pub => (
                                <RevealOnScroll key={pub.id} delay={0.05}>
                                    <PublicationCard pub={pub} />
                                </RevealOnScroll>
                            ))
                        ) : (
                            <div style={styles.noResults}>
                                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔍</div>
                                <h3>No publications match your filters</h3>
                                <p>Try adjusting your search query or removing some filters.</p>
                                <button
                                    onClick={filter.clearFilters}
                                    style={{
                                        marginTop: '20px',
                                        padding: '10px 20px',
                                        background: 'var(--accent-navy)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="publications-sidebar">
                        <PublicationFilters
                            options={filterOptions}
                            filter={filter}
                            onClear={filter.clearFilters}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 992px) {
                    .publications-layout {
                        grid-template-columns: 1fr;
                    }
                    .publications-sidebar {
                        order: -1;
                        margin-bottom: 40px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Publications;
