import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import rbc1Src from '../assets/cells/rbc_1.png';
import rbc2Src from '../assets/cells/rbc_2.png';
import rbc3Src from '../assets/cells/rbc_3.png';

import wbcMono1Src from '../assets/cells/wbc_mono_1.png';
import wbcMono2Src from '../assets/cells/wbc_mono_2.png';
import wbcMono3Src from '../assets/cells/wbc_mono_3.png';
import wbcLymph1Src from '../assets/cells/wbc_lymph_1.png';
import wbcNeutro1Src from '../assets/cells/wbc_neutro_1.png';
import wbcNeutro2Src from '../assets/cells/wbc_neutro_2.png';
import wbcNeutro3Src from '../assets/cells/wbc_neutro_3.png';
import wbcEosino1Src from '../assets/cells/wbc_eosino_1.png';
import wbcEosino2Src from '../assets/cells/wbc_eosino_2.png';
import wbcEosino3Src from '../assets/cells/wbc_eosino_3.png';
import wbcBaso1Src from '../assets/cells/wbc_baso_1.png';

import abMonomerSrc from '../assets/cells/ab_monomer.png';
import abDimerSrc from '../assets/cells/ab_dimer.png';
import abPentamerSrc from '../assets/cells/ab_pentamer.png';

import c1Src from '../assets/cells/c1.png';
import c2Src from '../assets/cells/c2.png';
import c3Src from '../assets/cells/c3.png';
import c4Src from '../assets/cells/c4.png';
import c5Src from '../assets/cells/c5.png';
import c6Src from '../assets/cells/c6.png';
import c7Src from '../assets/cells/c7.png';
import c8Src from '../assets/cells/c8.png';
import c9Src from '../assets/cells/c9.png';

const Hero = () => {
    const canvasRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cvPath = `${baseUrl}Bakr_Alhayek_CV.pdf`;
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // Subtle 2D Intravascular Flow Canvas Animation (RBCs, WBCs, Antibodies & Complements)
    useEffect(() => {
        const canvas = canvasRef.current;
        const reduceMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!canvas || reduceMotionPreference) return;

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let particles = [];
        let animationFrameId;
        let isVisible = true;
        let isRunning = false;

        const rbcSrcs = [rbc1Src, rbc2Src, rbc3Src];
        const rbcImages = [];
        rbcSrcs.forEach(src => {
            const img = new Image();
            img.src = src;
            rbcImages.push(img);
        });

        const wbcSrcs = [
            wbcMono1Src, wbcMono2Src, wbcMono3Src,
            wbcLymph1Src,
            wbcNeutro1Src, wbcNeutro2Src, wbcNeutro3Src,
            wbcEosino1Src, wbcEosino2Src, wbcEosino3Src,
            wbcBaso1Src
        ];
        const wbcImages = [];
        wbcSrcs.forEach(src => {
            const img = new Image();
            img.src = src;
            wbcImages.push(img);
        });

        const abSrcs = [abMonomerSrc, abDimerSrc, abPentamerSrc];
        const abImages = [];
        abSrcs.forEach(src => {
            const img = new Image();
            img.src = src;
            abImages.push(img);
        });

        const compSrcs = [c1Src, c2Src, c3Src, c4Src, c5Src, c6Src, c7Src, c8Src, c9Src];
        const compImages = [];
        compSrcs.forEach(src => {
            const img = new Image();
            img.src = src;
            compImages.push(img);
        });

        const getParticleCount = () => {
            if (window.innerWidth < 640) return 24;
            if (window.innerWidth < 1024) return 38;
            return 52;
        };

        const resize = () => {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        function createParticle() {
            const rand = Math.random();
            let category, imgIdx, size, alpha;

            if (rand < 0.55) {
                category = 'rbc';
                imgIdx = Math.floor(Math.random() * rbcImages.length);
                size = Math.random() * 12 + 18;
                alpha = Math.random() * 0.18 + 0.12;
            } else if (rand < 0.72) {
                category = 'wbc';
                imgIdx = Math.floor(Math.random() * wbcImages.length);
                size = Math.random() * 14 + 28;
                alpha = Math.random() * 0.2 + 0.15;
            } else if (rand < 0.87) {
                category = 'ab';
                imgIdx = Math.floor(Math.random() * abImages.length);
                size = Math.random() * 12 + 16;
                alpha = Math.random() * 0.22 + 0.15;
            } else {
                category = 'comp';
                imgIdx = Math.floor(Math.random() * compImages.length);
                size = Math.random() * 10 + 14;
                alpha = Math.random() * 0.22 + 0.15;
            }

            return {
                category,
                imgIdx,
                x: Math.random() * width,
                y: Math.random() * height,
                size,
                vx: (Math.random() - 0.5) * 0.15,
                vy: -(Math.random() * 0.28 + 0.08),
                angle: Math.random() * Math.PI * 2,
                vAngle: (Math.random() - 0.5) * 0.005,
                alpha
            };
        }

        class Particle2D {
            constructor() {
                Object.assign(this, createParticle());
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.angle += this.vAngle;

                if (this.y < -40) {
                    this.y = height + 40;
                    this.x = Math.random() * width;
                }
                if (this.x < -40) this.x = width + 40;
                if (this.x > width + 40) this.x = -40;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.globalAlpha = this.alpha;

                let img;
                if (this.category === 'rbc') img = rbcImages[this.imgIdx % rbcImages.length];
                else if (this.category === 'wbc') img = wbcImages[this.imgIdx % wbcImages.length];
                else if (this.category === 'ab') img = abImages[this.imgIdx % abImages.length];
                else img = compImages[this.imgIdx % compImages.length];

                if (img && img.complete) {
                    ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
                }

                ctx.restore();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < getParticleCount(); i += 1) {
                particles.push(new Particle2D());
            }
        };

        const animate = () => {
            if (!isVisible || document.hidden) {
                isRunning = false;
                return;
            }

            isRunning = true;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i += 1) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (!isRunning && isVisible && !document.hidden) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        const handleResize = () => {
            resize();
            init();
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
                isRunning = false;
            } else {
                startAnimation();
            }
        };

        resize();
        init();

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                startAnimation();
            } else {
                cancelAnimationFrame(animationFrameId);
                isRunning = false;
            }
        }, { threshold: 0.1 });

        observer.observe(canvas);
        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleConnect = (e) => {
        e.preventDefault();
        navigate('/contact');
    };

    const fadeUp = reduceMotion ? {} : {
        initial: { opacity: 0, y: 25 },
        animate: { opacity: 1, y: 0 }
    };

    const styles = {
        hero: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            padding: '140px 0 100px',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        },
        canvas: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
        },
        contentWrapper: {
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
        },
        greeting: {
            fontSize: '0.95rem',
            color: 'var(--accent-gold)',
            fontWeight: '800',
            letterSpacing: '2.5px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '30px',
            background: 'var(--accent-gold-light)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
        },
        title: {
            fontSize: 'clamp(2.0rem, 4vw, 3.0rem)',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '800',
            letterSpacing: '-1px',
            lineHeight: '1.1',
        },
        subtitle: {
            fontSize: '1.25rem',
            color: 'var(--accent-navy)',
            fontWeight: '750',
            marginBottom: '1.5rem',
            lineHeight: '1.3',
        },
        description: {
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
        },
        highlight: {
            color: 'var(--text-primary)',
            fontWeight: '700',
            borderBottom: '2px solid var(--accent-gold)',
        },
        glassBox: {
            padding: '2rem 2.4rem',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '24px',
            boxShadow: '0 24px 60px rgba(10, 37, 64, 0.08)',
            marginBottom: '2.5rem',
            textAlign: 'left',
            maxWidth: '840px',
            margin: '0 auto 2.5rem',
        },
        mission: {
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
            lineHeight: '1.65',
            margin: 0,
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
        },
        buttonGroup: {
            display: 'flex',
            gap: '18px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '50px',
        },
        primaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'var(--accent-red)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '999px',
            fontSize: '1.02rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 12px 30px rgba(185, 28, 28, 0.32)',
        },
        secondaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid var(--accent-navy)',
            color: 'var(--accent-navy)',
            borderRadius: '999px',
            fontSize: '1.02rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(10, 37, 64, 0.08)',
        },
        // Metric Badges Grid
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '840px',
            margin: '0 auto',
        },
        statCard: {
            background: 'var(--bg-card)',
            padding: '20px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
        },
        statNum: {
            fontSize: '2.2rem',
            fontWeight: '800',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            lineHeight: '1',
            marginBottom: '6px',
        },
        statLabel: {
            fontSize: '0.82rem',
            fontWeight: '700',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        }
    };

    const css = `
        .hero-primary-btn:hover {
            background-color: var(--accent-red-hover);
            transform: translateY(-3px);
            box-shadow: 0 16px 36px rgba(185, 28, 28, 0.42);
        }
        .hero-secondary-btn:hover {
            background-color: var(--accent-navy);
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 16px 36px rgba(10, 37, 64, 0.18);
        }
        @media (max-width: 640px) {
            .stats-row { grid-template-columns: 1fr !important; }
        }
    `;

    return (
        <>
            <style>{css}</style>
            <section id="home" style={styles.hero} aria-labelledby="hero-title">
                <canvas ref={canvasRef} style={styles.canvas} aria-hidden="true" />
                <div className="container">
                    <div style={styles.contentWrapper}>
                        <motion.p {...fadeUp} transition={{ duration: 0.5 }} style={styles.greeting}>
                            <span className="pulse-dot"></span> Physician • Researcher • Innovator
                        </motion.p>
                        
                        <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.08 }} id="hero-title" style={styles.title}>
                            Bakr Alhayek, MD
                        </motion.h1>

                        <motion.h2 {...fadeUp} transition={{ duration: 0.6, delay: 0.16 }} style={styles.subtitle}>
                            Internal Medicine Resident Physician
                        </motion.h2>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.24 }} style={styles.description}>
                            <p>
                                Dedicated to advancing <span style={styles.highlight}>inpatient oncologic care</span> through rigorous evidence-based practice and <span style={styles.highlight}>diagnostic stewardship</span>.
                                Active investigator at <span style={styles.highlight}>AdventHealth Tampa</span> with a focus on hematopoietic complications and clinical informatics.
                            </p>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.32 }} style={styles.glassBox} className="luxury-sheen">
                            <div style={styles.mission}>
                                <span style={{ fontSize: '1.6rem' }} aria-hidden="true">🎯</span>
                                <p>
                                    <strong>Fellowship Focus:</strong> Pursuing a Hematology/Oncology fellowship to bridge the gap between complex inpatient management and scalable outcomes research.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} style={styles.buttonGroup}>
                            <a
                                href={cvPath}
                                download
                                style={styles.primaryBtn}
                                className="hero-primary-btn"
                            >
                                📄 Download Curriculum Vitae
                            </a>
                            <button
                                onClick={handleConnect}
                                style={styles.secondaryBtn}
                                className="hero-secondary-btn"
                            >
                                ✉️ Get in Touch
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
