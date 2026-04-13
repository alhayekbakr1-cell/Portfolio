import { useState, useMemo } from 'react';

/**
 * Custom hook for filtering and searching publications
 * @param {Array} publications - Array of publication objects
 * @returns {Object} Filter state and functions
 */
export const usePublicationFilter = (publications) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [sortBy, setSortBy] = useState('recent'); // 'recent', 'oldest', 'alpha'

    /**
     * Filter publications based on current filters
     */
    const filteredPublications = useMemo(() => {
        let filtered = [...publications];

        // Category filter
        if (selectedCategory && selectedCategory !== 'All') {
            filtered = filtered.filter(pub => pub.category === selectedCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(pub => {
                const searchableText = [
                    pub.title,
                    pub.journal,
                    pub.authors?.join(' '),
                    ...(pub.tags || []),
                ].join(' ').toLowerCase();

                return searchableText.includes(query);
            });
        }

        // Year filter
        if (selectedYears.length > 0) {
            filtered = filtered.filter(pub => selectedYears.includes(pub.year));
        }

        // Type filter
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(pub => selectedTypes.includes(pub.type));
        }

        // Role filter
        if (selectedRoles.length > 0) {
            filtered = filtered.filter(pub => selectedRoles.includes(pub.yourRole));
        }

        // Topic filter
        if (selectedTopics.length > 0) {
            filtered = filtered.filter(pub => {
                return pub.tags?.some(tag => selectedTopics.includes(tag));
            });
        }

        // Sort
        switch (sortBy) {
            case 'recent':
                filtered.sort((a, b) => {
                    if (b.year !== a.year) return b.year - a.year;
                    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    return monthOrder.indexOf(b.month || '') - monthOrder.indexOf(a.month || '');
                });
                break;
            case 'oldest':
                filtered.sort((a, b) => {
                    if (a.year !== b.year) return a.year - b.year;
                    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    return monthOrder.indexOf(a.month || '') - monthOrder.indexOf(b.month || '');
                });
                break;
            case 'alpha':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return filtered;
    }, [publications, searchQuery, selectedCategory, selectedYears, selectedTypes, selectedRoles, selectedTopics, sortBy]);

    /**
     * Toggle filter selection
     */
    const toggleYear = (year) => {
        setSelectedYears(prev =>
            prev.includes(year)
                ? prev.filter(y => y !== year)
                : [...prev, year]
        );
    };

    const toggleType = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const toggleRole = (role) => {
        setSelectedRoles(prev =>
            prev.includes(role)
                ? prev.filter(r => r !== role)
                : [...prev, role]
        );
    };

    const toggleTopic = (topic) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
        setSelectedYears([]);
        setSelectedTypes([]);
        setSelectedRoles([]);
        setSelectedTopics([]);
    };

    /**
     * Check if any filters are active
     */
    const hasActiveFilters = useMemo(() => {
        return searchQuery.trim() !== '' ||
            selectedYears.length > 0 ||
            selectedTypes.length > 0 ||
            selectedRoles.length > 0 ||
            selectedTopics.length > 0;
    }, [searchQuery, selectedYears, selectedTypes, selectedRoles, selectedTopics]);

    /**
     * Get active filter count
     */
    const activeFilterCount = useMemo(() => {
        return selectedYears.length +
            selectedTypes.length +
            selectedRoles.length +
            selectedTopics.length +
            (searchQuery.trim() ? 1 : 0);
    }, [searchQuery, selectedYears, selectedTypes, selectedRoles, selectedTopics]);

    return {
        // Filtered data
        filteredPublications,
        resultCount: filteredPublications.length,
        totalCount: publications.length,

        // Search
        searchQuery,
        setSearchQuery,

        // Filter states
        selectedCategory,
        setSelectedCategory,
        selectedYears,
        selectedTypes,
        selectedRoles,
        selectedTopics,

        // Toggle functions
        toggleYear,
        toggleType,
        toggleRole,
        toggleTopic,

        // Sort
        sortBy,
        setSortBy,

        // Utility
        clearFilters,
        hasActiveFilters,
        activeFilterCount,
    };
};

export default usePublicationFilter;
