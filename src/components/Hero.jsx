import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const Hero = () => {
    const canvasRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cvPath = `${baseUrl}Bakr_Alhayek_CV.pdf`;
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // Decorative canvas animation with mobile and reduced-motion safeguards
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

        const getParticleCount = () => {
            if (window.innerWidth < 640) return 28;
            if (window.innerWidth < 1024) return 45;
            return 70;
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

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = 'rgba(10, 37, 64, 0.15)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < getParticleCount(); i += 1) {
                particles.push(new Particle());
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

                for (let j = i + 1; j < particles.length; j += 1) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(10, 37, 64, ${0.12 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
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

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        resize();
        init();

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    startAnimation();
                } else {
                    cancelAnimationFrame(animationFrameId);
                    isRunning = false;
                }
            },
            { threshold: 0 }
        );

        observer.observe(canvas);
        startAnimation();

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    const handleConnect = (e) => {
        e.preventDefault();
        navigate('/contact');
    };

    const styles = {
        hero: {
            padding: '170px 20px 110px',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        canvas: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
        },
        heroContainer: {
            maxWidth: '1120px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
            width: '100%',
        },
        content: {
            maxWidth: '850px',
        },
        greeting: {
            fontSize: '1.05rem',
            color: 'var(--accent-gold)',
            fontWeight: '700',
            marginBottom: '0.9rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
        },
        title: {
            fontSize: 'clamp(3.3rem, 8vw, 6.6rem)',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '900',
            letterSpacing: '-0.06em',
            lineHeight: '0.96',
        },
        subtitle: {
            fontSize: 'clamp(1.35rem, 3vw, 2.1rem)',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.25',
        },
        description: {
            fontSize: '1.22rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.85',
            marginBottom: '2.4rem',
            maxWidth: '760px',
        },
        highlight: {
            color: 'var(--text-primary)',
            fontWeight: '750',
            borderBottom: '2px solid var(--accent-gold)',
        },
        glassBox: {
            padding: '1.6rem 1.8rem',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.55)',
            borderRadius: '18px',
            boxShadow: '0 22px 70px rgba(10, 37, 64, 0.09)',
            marginBottom: '2.5rem',
            maxWidth: '780px',
        },
        mission: {
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: '1.65',
            margin: 0,
            display: 'flex',
            gap: '12px',
        },
        buttonGroup: {
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
        },
        primaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'var(--accent-gold)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '999px',
            fontSize: '1.05rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 15px 32px rgba(197, 160, 89, 0.28)',
        },
        secondaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'rgba(255,255,255,0.55)',
            border: '2px solid var(--accent-navy)',
            color: 'var(--accent-navy)',
            borderRadius: '999px',
            fontSize: '1.05rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
        },
        statRail: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '14px',
            marginTop: '2.4rem',
            maxWidth: '780px',
        },
        stat: {
            padding: '16px',
            borderRadius: '18px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            background: 'rgba(255,255,255,0.62)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 12px 40px rgba(10,37,64,0.06)',
        },
        statNumber: {
            display: 'block',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.65rem',
            fontWeight: '900',
            color: 'var(--accent-navy)',
            lineHeight: 1,
        },
        statLabel: {
            display: 'block',
            marginTop: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.86rem',
            fontWeight: 700,
        }
    };

    const animations = `
        .hero-primary-btn:hover,
        .hero-primary-btn:focus-visible {
            background-color: var(--accent-gold-hover);
            transform: translateY(-4px) scale(1.015);
            box-shadow: 0 18px 40px rgba(197, 160, 89, 0.38);
        }
        
        .hero-secondary-btn:hover,
        .hero-secondary-btn:focus-visible {
            background-color: var(--accent-navy);
            color: white;
            transform: translateY(-4px) scale(1.015);
        }

        .hero-primary-btn:focus-visible,
        .hero-secondary-btn:focus-visible {
            outline: 3px solid var(--accent-blue);
            outline-offset: 3px;
        }

        @media (max-width: 768px) {
            .hero-stat-rail { grid-template-columns: 1fr !important; }
        }
    `;

    const reveal = reduceMotion ? {} : {
        initial: { opacity: 0, y: 26, filter: 'blur(10px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <>
            <style>{animations}</style>
            <section id="home" style={styles.hero} aria-labelledby="hero-title">
                <canvas ref={canvasRef} style={styles.canvas} aria-hidden="true" />
                <div style={styles.heroContainer}>
                    <motion.div style={styles.content} className="hero-content" {...reveal}>
                        <motion.p style={styles.greeting} initial={reduceMotion ? undefined : { opacity: 0, x: -18 }} animate={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
                            Physician • Researcher • Innovator
                        </motion.p>
                        <h1 id="hero-title" style={styles.title}>Bakr Alhayek, MD</h1>

                        <h2 style={styles.subtitle}>
                            Internal Medicine Resident Physician
                        </h2>

                        <div style={styles.description}>
                            <p>
                                Dedicated to advancing <span style={styles.highlight}>inpatient oncologic care</span> through rigorous evidence-based practice and <span style={styles.highlight}>diagnostic stewardship</span>.
                                Active investigator at <span style={styles.highlight}>AdventHealth Tampa</span> with a focus on hematopoietic complications and clinical informatics.
                            </p>
                        </div>

                        <motion.div style={styles.glassBox} initial={reduceMotion ? undefined : { opacity: 0, y: 22 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.22 }}>
                            <div style={styles.mission}>
                                <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🎯</span>
                                <p>
                                    <strong>Professional Objective:</strong> Pursuing a Hematology/Oncology fellowship to bridge the gap between complex inpatient management and scalable outcomes research.
                                </p>
                            </div>
                        </motion.div>

                        <div style={styles.buttonGroup}>
                            <a
                                href={cvPath}
                                download
                                style={styles.primaryBtn}
                                className="hero-primary-btn"
                                aria-label="Download Bakr Alhayek's curriculum vitae as a PDF"
                            >
                                <span style={{ fontSize: '1.2rem' }} aria-hidden="true">📄</span> Download Curriculum Vitae
                            </a>
                            <button
                                onClick={handleConnect}
                                style={styles.secondaryBtn}
                                className="hero-secondary-btn"
                                aria-label="Go to the contact page"
                            >
                                <span style={{ fontSize: '1.2rem' }} aria-hidden="true">✉️</span> Get in Touch
                            </button>
                        </div>

                        <motion.div style={styles.statRail} className="hero-stat-rail" initial={reduceMotion ? undefined : { opacity: 0, y: 22 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.34 }}>
                            <div style={styles.stat}><span style={styles.statNumber}>IM</span><span style={styles.statLabel}>Internal Medicine</span></div>
                            <div style={styles.stat}><span style={styles.statNumber}>H/O</span><span style={styles.statLabel}>Heme/Onc trajectory</span></div>
                            <div style={styles.stat}><span style={styles.statNumber}>AI</span><span style={styles.statLabel}>Clinical informatics</span></div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Hero;
