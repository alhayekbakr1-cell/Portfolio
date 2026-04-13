import React from 'react';

const PublicationFilters = ({
    options,
    filter,
    onClear
}) => {
    const styles = {
        container: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '24px',
            position: 'sticky',
            top: '100px',
            height: 'fit-content',
        },
        section: {
            marginBottom: '24px',
        },
        label: {
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        filterGrid: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
        },
        filterBtn: {
            fontSize: '0.85rem',
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        filterBtnActive: {
            background: 'var(--accent-navy)',
            color: 'white',
            borderColor: 'var(--accent-navy)',
        },
        search: {
            width: '100%',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '2px solid var(--border-color)',
            fontSize: '0.95rem',
            marginBottom: '20px',
            outline: 'none',
            transition: 'all 0.2s ease',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
        },
        clearBtn: {
            width: '100%',
            padding: '10px',
            background: '#F1F5F9',
            color: '#475569',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px',
        },
        badge: {
            background: 'var(--accent-navy)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            color: '#FFFFFF',
            marginLeft: '8px',
        }
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Search publications..."
                value={filter.searchQuery}
                onChange={(e) => filter.setSearchQuery(e.target.value)}
                style={styles.search}
                className="filter-search"
            />

            <div style={styles.section}>
                <span style={styles.label}>Year</span>
                <div style={styles.filterGrid}>
                    {options.years.map(year => (
                        <button
                            key={year}
                            onClick={() => filter.toggleYear(year)}
                            style={{
                                ...styles.filterBtn,
                                ...(filter.selectedYears.includes(year) ? styles.filterBtnActive : {})
                            }}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <span style={styles.label}>Type</span>
                <div style={styles.filterGrid}>
                    {options.types.map(type => (
                        <button
                            key={type}
                            onClick={() => filter.toggleType(type)}
                            style={{
                                ...styles.filterBtn,
                                ...(filter.selectedTypes.includes(type) ? styles.filterBtnActive : {})
                            }}
                        >
                            {type.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <span style={styles.label}>Role</span>
                <div style={styles.filterGrid}>
                    {options.roles.map(role => (
                        <button
                            key={role}
                            onClick={() => filter.toggleRole(role)}
                            style={{
                                ...styles.filterBtn,
                                ...(filter.selectedRoles.includes(role) ? styles.filterBtnActive : {})
                            }}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <span style={styles.label}>Topic</span>
                <div style={styles.filterGrid}>
                    {options.topics.map(topic => (
                        <button
                            key={topic}
                            onClick={() => filter.toggleTopic(topic)}
                            style={{
                                ...styles.filterBtn,
                                ...(filter.selectedTopics.includes(topic) ? styles.filterBtnActive : {})
                            }}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            {filter.hasActiveFilters && (
                <button
                    onClick={onClear}
                    style={styles.clearBtn}
                >
                    Clear All Filters ({filter.activeFilterCount})
                </button>
            )}

            <style>{`
                .filter-search:focus {
                    border-color: var(--accent-navy);
                    background: var(--bg-muted);
                }
            `}</style>
        </div>
    );
};

export default PublicationFilters;
