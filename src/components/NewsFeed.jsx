import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, BrainCircuit, ExternalLink, Calendar, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const PUBMED_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

const fetchPubMedArticles = async ({ pageParam = 0, query }) => {
    // Step 1: Search for IDs
    const searchRes = await fetch(
        `${PUBMED_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retstart=${pageParam}&retmax=9&retmode=json&sort=date`
    );
    if (!searchRes.ok) throw new Error('PubMed ESearch failed');
    const searchData = await searchRes.json();
    const ids = searchData.esearchresult.idlist;

    if (!ids || ids.length === 0) return { articles: [], nextCursor: null };

    // Step 2: Fetch summaries for those IDs
    const summaryRes = await fetch(
        `${PUBMED_BASE}/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`
    );
    if (!summaryRes.ok) throw new Error('PubMed ESummary failed');
    const summaryData = await summaryRes.json();

    const articles = ids.map(id => {
        const item = summaryData.result[id];
        // Ensure accurate pub date mapping
        const rawDate = item.pubdate || item.sortpubdate || '';
        const cleanDate = rawDate.split(' ')[0] || rawDate; // Basic cleanup
        
        // Extract authors nicely
        const authorList = item.authors ? item.authors.filter((a, i) => i < 3).map(a => a.name).join(', ') : '';
        const authorStr = item.authors && item.authors.length > 3 ? `${authorList} et al.` : authorList;

        return {
            id,
            title: item.title || 'Untitled Article',
            link: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
            sourceUrl: item.source || 'PubMed',
            date: cleanDate,
            description: authorStr ? `Authors: ${authorStr}` : 'No authors listed',
        };
    });

    // Check if we reached the maximum returned items allowed by PubMed or hit the end
    const nextCursor = searchData.esearchresult.count > pageParam + 9 ? pageParam + 9 : null;
    return { articles, nextCursor };
};

const NewsFeed = () => {
    const [activeTab, setActiveTab] = useState('medicine');
    const { ref: loadMoreRef, inView } = useInView({ rootMargin: '200px' });

    const queries = {
        medicine: '("clinical medicine"[MeSH Terms] OR "internal medicine"[MeSH Terms]) AND (2025:2026[pdat])',
        ai: '("Artificial Intelligence"[MeSH Terms] OR "Machine Learning"[MeSH Terms]) AND "Medicine"[MeSH Terms] AND (2025:2026[pdat])'
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['pubmedArticles', activeTab],
        queryFn: ({ pageParam }) => fetchPubMedArticles({ pageParam, query: queries[activeTab] }),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 60 * 60 * 1000, // Cache for 1 hour to prevent hitting NCBI heavily
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const articles = data ? data.pages.flatMap(page => page.articles) : [];

    return (
        <section style={{ padding: '120px 20px 80px', minHeight: '100vh', background: 'var(--bg-primary)', transition: 'background 0.3s ease' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', marginBottom: '50px' }}
                >
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-navy)', marginBottom: '15px' }}>
                        Medical Literature
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Directly streaming the latest peer-reviewed literature from the NCBI PubMed database via real-time E-Utilities processing.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('medicine')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '12px 24px', borderRadius: '30px',
                            background: activeTab === 'medicine' ? 'var(--accent-navy)' : 'var(--bg-card)',
                            color: activeTab === 'medicine' ? '#ffffff' : 'var(--text-secondary)',
                            border: `1px solid ${activeTab === 'medicine' ? 'transparent' : 'var(--border-color)'}`,
                            cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease',
                            boxShadow: activeTab === 'medicine' ? '0 4px 15px rgba(30, 58, 138, 0.3)' : 'none'
                        }}
                    >
                        <BookOpen size={18} /> Internal Medicine 
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '12px 24px', borderRadius: '30px',
                            background: activeTab === 'ai' ? 'var(--accent-teal)' : 'var(--bg-card)',
                            color: activeTab === 'ai' ? '#ffffff' : 'var(--text-secondary)',
                            border: `1px solid ${activeTab === 'ai' ? 'transparent' : 'var(--border-color)'}`,
                            cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease',
                            boxShadow: activeTab === 'ai' ? '0 4px 15px rgba(20, 184, 166, 0.3)' : 'none'
                        }}
                    >
                        <BrainCircuit size={18} /> AI & Medicine
                    </button>
                </div>

                {/* Content Area */}
                <div style={{ minHeight: '400px', position: 'relative' }}>
                    {status === 'pending' ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-secondary)' }}
                        >
                            <Loader2 size={40} className="lucide-spin" style={{ marginBottom: '15px', color: 'var(--accent-teal)', animation: 'spin 2s linear infinite' }} />
                            <p>Querying PubMed Database...</p>
                            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                        </motion.div>
                    ) : status === 'error' ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--accent-navy)', textAlign: 'center' }}
                        >
                            <AlertCircle size={48} style={{ marginBottom: '15px', color: '#ef4444' }} />
                            <h3>Database Error</h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>{error.message}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: '25px'
                            }}
                        >
                            {articles.map((item, index) => (
                                <motion.a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={`${item.id}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "100px" }}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '25px',
                                        background: 'var(--bg-card)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--border-color)',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: activeTab === 'ai' ? 'var(--accent-teal)' : 'var(--accent-navy)' }} />
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>
                                        <span style={{ background: 'var(--bg-primary)', padding: '4px 10px', borderRadius: '12px' }}>
                                            {item.sourceUrl}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Calendar size={14} /> {item.date}
                                        </span>
                                    </div>
                                    
                                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '15px', lineHeight: 1.4, flexGrow: 1 }} dangerouslySetInnerHTML={{__html: item.title}} />
                                    
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {item.description}
                                    </p>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: activeTab === 'ai' ? 'var(--accent-teal)' : 'var(--accent-navy)', fontWeight: '600', fontSize: '0.9rem', marginTop: 'auto' }}>
                                        View on PubMed <ExternalLink size={16} />
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}

                    {/* Infinite Scroll Trigger */}
                    {status === 'success' && (
                        <div 
                            ref={loadMoreRef} 
                            style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                padding: '40px 0',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            {isFetchingNextPage ? (
                                <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}><Loader2 className="lucide-spin" size={20} /> Loading deeper archives...</span>
                            ) : hasNextPage ? (
                                <span>Scroll for more articles</span>
                            ) : (
                                <span>No more articles found for this search.</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NewsFeed;
