import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';

const ClinicalMedia = () => {
    const [selectedClip, setSelectedClip] = useState(null);

    const hitProject = {
        title: "Overdiagnosing HIT: A Multimedia Intervention",
        description: "Translating Quality Improvement research into high-fidelity video education to reduce unnecessary PF4 testing in the ICU.",
        tech: ["Runway Gen-3", "ElevenLabs TTS", "Adobe Premiere"],
        stills: [
            "/media/hit_physician.png",
            "/media/hit_vein.png"
        ],
        clips: [
            {
                id: 1,
                title: "The Hospital Environment",
                context: "Introduction to the QI initiative.",
                prompt: "Cinematic tracking shot, moving slowly down a modern hospital corridor. Healthcare professionals in scrubs walking purposefully. 35mm lens, medical documentary style.",
                image: "/media/hit_corridor.png"
            },
            {
                id: 2,
                title: "The Problem: Overtesting",
                context: "Common practice of ordering HIT PF4 tests prematurely.",
                prompt: "Close up, over-the-shoulder shot. Concerned physician looking at a glowing medical tablet. Camera dollies in slowly. Dramatic cinematic rim lighting.",
                image: "/media/hit_physician.png"
            },
            {
                id: 3,
                title: "The Harm: Clinical Risk",
                context: "False positives and bleeding risks.",
                prompt: "Macro extreme close-up of a hospital IV drip chamber. Clear fluid drips in ultra-slow motion. Cinematic reflections, photorealistic 8k.",
                image: "/media/hit_iv.png"
            },
            {
                id: 4,
                title: "The Microscopic Science",
                context: "Platelet release and clot formation mechanics.",
                prompt: "3D microscopic animation inside a human vein. Platelets clustering with glowing green heparin molecules. Dynamic camera pushing forward, cinematic lighting.",
                image: "/media/hit_vein.png"
            },
            {
                id: 5,
                title: "The Solution: 4T Score",
                context: "Calculating the probability before testing.",
                prompt: "Medium shot, bright clinical lighting. Doctors stand at a nurse's station pointing at a screen. Camera orbits around them. High quality, crisp focus.",
                image: "/media/hit_4t.png"
            }
        ]
    };

    const styles = {
        container: {
            padding: '120px 20px',
            background: 'var(--bg-primary)',
            minHeight: '100vh',
        },
        hero: {
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 80px',
        },
        badge: {
            background: 'rgba(navy, 0.1)',
            color: 'var(--accent-navy)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-block',
            marginBottom: '20px',
            border: '1px solid var(--accent-navy)',
        },
        title: {
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            marginBottom: '24px',
            lineHeight: '1.1',
        },
        description: {
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            background: 'var(--bg-card)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
        },
        cardImage: {
            width: '100%',
            height: '240px',
            objectFit: 'cover',
            transition: 'scale 0.5s ease',
        },
        cardOverlay: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: 'white',
        },
        clipId: {
            fontSize: '0.7rem',
            opacity: 0.8,
            textTransform: 'uppercase',
            fontWeight: '600',
        },
        clipTitle: {
            fontSize: '1.2rem',
            fontWeight: '700',
            margin: '4px 0',
        },
        modalOverlay: {
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            backdropFilter: 'blur(8px)',
        },
        modal: {
            background: 'var(--bg-card)',
            maxWidth: '1000px',
            width: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        },
        modalImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        modalContent: {
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
        },
        promptBox: {
            background: 'var(--bg-muted)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: 'var(--accent-navy)',
            lineHeight: '1.5',
            position: 'relative',
        },
        copyHint: {
            position: 'absolute',
            top: '8px',
            right: '8px',
            fontSize: '0.6rem',
            background: 'var(--accent-navy)',
            color: 'white',
            padding: '2px 6px',
            borderRadius: '4px',
        }
    };

    return (
        <div style={styles.container}>
            <section style={styles.hero}>
                <RevealOnScroll>
                    <span style={styles.badge}>Innovation in Education</span>
                    <h1 style={styles.title}>{hitProject.title}</h1>
                    <p style={styles.description}>{hitProject.description}</p>
                </RevealOnScroll>
            </section>

            <div style={styles.grid}>
                {hitProject.clips.map((clip, idx) => (
                    <RevealOnScroll key={clip.id} delay={idx * 0.1}>
                        <motion.div 
                            style={styles.card}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedClip(clip)}
                        >
                            <img src={clip.image} alt={clip.title} style={styles.cardImage} />
                            <div style={styles.cardOverlay}>
                                <span style={styles.clipId}>Scene {clip.id}</span>
                                <h3 style={styles.clipTitle}>{clip.title}</h3>
                            </div>
                        </motion.div>
                    </RevealOnScroll>
                ))}
            </div>

            <AnimatePresence>
                {selectedClip && (
                    <motion.div 
                        style={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedClip(null)}
                    >
                        <motion.div 
                            style={styles.modal}
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={selectedClip.image} alt={selectedClip.title} style={styles.modalImage} />
                            <div style={styles.modalContent}>
                                <div>
                                    <span style={styles.clipId}>Scene {selectedClip.id} Storyboard</span>
                                    <h2 style={{...styles.title, fontSize: '2rem', marginTop: '8px'}}>{selectedClip.title}</h2>
                                    <p style={styles.description}>{selectedClip.context}</p>
                                </div>
                                
                                <div>
                                    <h4 style={{fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '12px', color: 'var(--text-muted)'}}>AI Motion Prompt (Gen-3 Alpha)</h4>
                                    <div style={styles.promptBox}>
                                        <span style={styles.copyHint}>Optimized</span>
                                        {selectedClip.prompt}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setSelectedClip(null)}
                                    style={{
                                        alignSelf: 'flex-start',
                                        background: 'var(--accent-navy)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Close Preview
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClinicalMedia;
