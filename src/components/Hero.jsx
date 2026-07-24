import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const canvasRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cvPath = `${baseUrl}Bakr_Alhayek_CV.pdf`;
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // Decorative canvas particle animation
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
            backgroundColor: 'var(--accent-gold)',
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
            boxShadow: '0 12px 30px rgba(197, 160, 89, 0.35)',
        },
        secondaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'rgba(255,255,255,0.8)',
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
            backdropFilter: 'blur(10px)',
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
            background-color: var(--accent-gold-hover);
            transform: translateY(-3px);
            box-shadow: 0 16px 36px rgba(197, 160, 89, 0.45);
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
