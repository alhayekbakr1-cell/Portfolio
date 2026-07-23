import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

import atcAbstract from '../assets/atc_abstract.png';
import redFlagAbstract from '../assets/red_flag_abstract.png';

const ClinicalMedia = () => {
    const [activeSection, setActiveSection] = useState('all'); // 'all' | 'multimedia' | 'abstracts'
    const [selectedMedia, setSelectedMedia] = useState(null);

    const visualAbstracts = [
        {
            id: 'va-1',
            title: "Anaplastic Thyroid Cancer Multimodal Therapy",
            type: "Visual Abstract",
            journal: "American Journal of Clinical Oncology",
            description: "Graphical abstract illustrating survival outcomes and sequencing of intensive multimodal therapy in non-metastatic Anaplastic Thyroid Cancer.",
            image: atcAbstract,
            tags: ["Head & Neck", "Multimodal Therapy", "Survival Analysis"],
            date: "2026"
        },
        {
            id: 'va-2',
            title: "ICI-Induced Myocarditis Electrophysiologic Red Flags",
            type: "Visual Abstract",
            journal: "Cureus & JACC CardioOncology",
            description: "Visual summary of early conduction system abnormalities, complete heart block risk, and electrophysiologic monitoring in fulminant checkpoint inhibitor myocarditis.",
            image: redFlagAbstract,
            tags: ["Cardio-Oncology", "Immune Toxicity", "ECG Monitoring"],
            date: "2025"
        }
    ];

    const hitProject = {
        title: "Overdiagnosing HIT: A Multimedia Educational Intervention",
        description: "Translating Quality Improvement research into high-fidelity video education to reduce unnecessary PF4 testing and inappropriate anticoagulation in the ICU.",
        tech: ["Runway Gen-3", "ElevenLabs TTS", "Adobe Premiere Pro"],
        clips: [
            {
                id: 1,
                title: "The Hospital Environment",
                context: "Introduction to the ICU clinical environment and diagnostic workflow.",
                prompt: "Cinematic tracking shot, moving slowly down a modern hospital corridor. Healthcare professionals in scrubs walking purposefully. 35mm lens, medical documentary style.",
                image: "/media/hit_corridor.png"
            },
            {
                id: 2,
                title: "The Problem: Overtesting",
                context: "Premature ordering of heparin-induced thrombocytopenia (HIT) PF4 antibodies.",
                prompt: "Close up, over-the-shoulder shot. Concerned physician looking at a glowing medical tablet. Camera dollies in slowly. Dramatic cinematic rim lighting.",
                image: "/media/hit_physician.png"
            },
            {
                id: 3,
                title: "The Harm: Clinical Risk",
                context: "Risks of false positives and unnecessary non-heparin anticoagulation bleeding.",
                prompt: "Macro extreme close-up of a hospital IV drip chamber. Clear fluid drips in ultra-slow motion. Cinematic reflections, photorealistic 8k.",
                image: "/media/hit_iv.png"
            },
            {
                id: 4,
                title: "Microscopic Pathophysiology",
                context: "PF4-heparin immune complex formation and platelet activation mechanics.",
                prompt: "3D microscopic animation inside a human vein. Platelets clustering with glowing green heparin molecules. Dynamic camera pushing forward, cinematic lighting.",
                image: "/media/hit_vein.png"
            },
            {
                id: 5,
                title: "The Solution: 4T Score Stewardship",
                context: "Calculating pre-test probability before ordering laboratory immunoassays.",
                prompt: "Medium shot, bright clinical lighting. Doctors stand at a nurse's station pointing at a screen. Camera orbits around them. High quality, crisp focus.",
                image: "/media/hit_4t.png"
            }
        ]
    };

    const styles = {
        container: {
            padding: '120px 20px 100px',
            background: 'var(--bg-primary)',
            minHeight: '100vh',
        },
        wrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
        },
        hero: {
            textAlign: 'center',
            maxWidth: '850px',
            margin: '0 auto 50px',
        },
        badge: {
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-block',
            marginBottom: '20px',
            border: '1px solid var(--border-color)',
        },
        title: {
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            marginBottom: '20px',
            lineHeight: '1.15',
        },
        description: {
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
        },
        filterTabs: {
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '50px',
        },
        filterBtn: (isActive) => ({
            padding: '10px 24px',
            borderRadius: '30px',
            border: `1px solid ${isActive ? 'var(--accent-navy)' : 'var(--border-color)'}`,
            background: isActive ? 'var(--accent-navy)' : 'var(--bg-card)',
            color: isActive ? 'white' : 'var(--text-secondary)',
            fontWeight: '600',
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
        }),
        sectionHeading: {
            fontSize: '1.8rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px',
            marginBottom: '70px',
        },
        card: {
            background: 'var(--bg-card)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-sm)',
        },
        cardImage: {
            width: '100%',
            height: '240px',
            objectFit: 'cover',
        },
        cardBody: {
            padding: '24px',
        },
        metaType: {
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: '700',
            color: 'var(--accent-gold)',
            marginBottom: '6px',
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '10px',
            lineHeight: '1.3',
        },
        cardDesc: {
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            marginBottom: '16px',
        },
        tagGroup: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
        },
        tag: {
            fontSize: '0.75rem',
            padding: '4px 10px',
            borderRadius: '12px',
            background: 'var(--bg-muted)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
        },
        modalOverlay: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 16, 26, 0.85)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
            backdropFilter: 'blur(10px)',
        },
        modal: {
            background: 'var(--bg-card)',
            maxWidth: '950px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        },
        modalImage: {
            width: '100%',
            height: '100%',
            maxHeight: '550px',
            objectFit: 'contain',
            background: '#0a192f',
            padding: '20px',
        },
        modalContent: {
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
        },
        closeBtn: {
            background: 'var(--accent-navy)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            alignSelf: 'flex-start',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <section style={styles.hero}>
                    <RevealOnScroll>
                        <span style={styles.badge}>Clinical Media & Innovation Lab</span>
                        <h1 style={styles.title}>Visual Research & AI Media</h1>
                        <p style={styles.description}>
                            Translating complex clinical oncology research, diagnostic stewardship algorithms, and quality improvement science into graphical visual abstracts and cinematic AI education.
                        </p>
                    </RevealOnScroll>
                </section>

                <div style={styles.filterTabs}>
                    <button 
                        style={styles.filterBtn(activeSection === 'all')}
                        onClick={() => setActiveSection('all')}
                    >
                        All Media
                    </button>
                    <button 
                        style={styles.filterBtn(activeSection === 'abstracts')}
                        onClick={() => setActiveSection('abstracts')}
                    >
                        Visual Abstracts
                    </button>
                    <button 
                        style={styles.filterBtn(activeSection === 'multimedia')}
                        onClick={() => setActiveSection('multimedia')}
                    >
                        AI Education Storyboard
                    </button>
                </div>

                {/* Section 1: Visual Abstracts */}
                {(activeSection === 'all' || activeSection === 'abstracts') && (
                    <section style={{ marginBottom: '60px' }}>
                        <h2 style={styles.sectionHeading}>📊 Visual Abstracts & Research Figures</h2>
                        <div style={styles.grid}>
                            {visualAbstracts.map((item) => (
                                <RevealOnScroll key={item.id}>
                                    <motion.div 
                                        style={styles.card}
                                        whileHover={{ y: -6 }}
                                        onClick={() => setSelectedMedia({ ...item, isAbstract: true })}
                                    >
                                        <img src={item.image} alt={item.title} style={styles.cardImage} />
                                        <div style={styles.cardBody}>
                                            <span style={styles.metaType}>{item.type} • {item.journal}</span>
                                            <h3 style={styles.cardTitle}>{item.title}</h3>
                                            <p style={styles.cardDesc}>{item.description}</p>
                                            <div style={styles.tagGroup}>
                                                {item.tags.map((t, i) => (
                                                    <span key={i} style={styles.tag}>{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 2: AI Storyboard */}
                {(activeSection === 'all' || activeSection === 'multimedia') && (
                    <section>
                        <h2 style={styles.sectionHeading}>🎬 {hitProject.title}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                            {hitProject.description}
                        </p>
                        <div style={styles.grid}>
                            {hitProject.clips.map((clip, idx) => (
                                <RevealOnScroll key={clip.id} delay={idx * 0.08}>
                                    <motion.div 
                                        style={styles.card}
                                        whileHover={{ y: -6 }}
                                        onClick={() => setSelectedMedia({ ...clip, isAbstract: false })}
                                    >
                                        <img src={clip.image} alt={clip.title} style={styles.cardImage} />
                                        <div style={styles.cardBody}>
                                            <span style={styles.metaType}>Scene {clip.id} • AI Storyboard</span>
                                            <h3 style={styles.cardTitle}>{clip.title}</h3>
                                            <p style={styles.cardDesc}>{clip.context}</p>
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </section>
                )}

                {/* Modal View */}
                <AnimatePresence>
                    {selectedMedia && (
                        <motion.div 
                            style={styles.modalOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMedia(null)}
                        >
                            <motion.div 
                                style={styles.modal}
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                onClick={e => e.stopPropagation()}
                            >
                                <img src={selectedMedia.image} alt={selectedMedia.title} style={styles.modalImage} />
                                <div style={styles.modalContent}>
                                    <div>
                                        <span style={styles.metaType}>
                                            {selectedMedia.isAbstract ? `${selectedMedia.type} • ${selectedMedia.journal}` : `Scene ${selectedMedia.id} Storyboard`}
                                        </span>
                                        <h2 style={{ ...styles.title, fontSize: '1.8rem', marginTop: '6px' }}>{selectedMedia.title}</h2>
                                        <p style={styles.description}>
                                            {selectedMedia.isAbstract ? selectedMedia.description : selectedMedia.context}
                                        </p>
                                    </div>

                                    {!selectedMedia.isAbstract && selectedMedia.prompt && (
                                        <div>
                                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px', color: 'var(--text-muted)' }}>
                                                Gen-3 Motion Prompt
                                            </h4>
                                            <p style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '10px', fontSize: '0.85rem', fontFamily: 'monospace', border: '1px solid var(--border-color)' }}>
                                                {selectedMedia.prompt}
                                            </p>
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => setSelectedMedia(null)}
                                        style={styles.closeBtn}
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ClinicalMedia;
