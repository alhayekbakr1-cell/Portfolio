import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile.webp';

const Hero = () => {
    const canvasRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cvPath = `${baseUrl}Bakr_Alhayek_CV.pdf`;
    const navigate = useNavigate();

    // Decorative canvas animation with mobile and reduced-motion safeguards
    useEffect(() => {
        const canvas = canvasRef.current;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!canvas || reduceMotion) return;

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
            padding: '160px 20px 100px',
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
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '80px',
            flexWrap: 'wrap-reverse',
            position: 'relative',
            zIndex: 2,
            width: '100%',
        },
        content: {
            flex: '1',
            minWidth: '320px',
        },
        imageContainer: {
            flex: '0 0 320px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
        },
        profileImage: {
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '8px solid white',
            boxShadow: 'var(--shadow-lg)',
            transition: 'transform 0.5s ease',
        },
        greeting: {
            fontSize: '1.2rem',
            color: 'var(--accent-gold)',
            fontWeight: '600',
            marginBottom: '0.75rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
        },
        title: {
            fontSize: '4rem',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
        },
        subtitle: {
            fontSize: '1.75rem',
            color: 'var(--accent-navy)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.3',
        },
        description: {
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
            maxWidth: '680px',
        },
        highlight: {
            color: 'var(--text-primary)',
            fontWeight: '700',
            borderBottom: '2px solid var(--accent-gold)',
        },
        glassBox: {
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2.5rem',
        },
        mission: {
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: '1.6',
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
            borderRadius: '8px',
            fontSize: '1.05rem',
            fontWeight: '600',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(197, 160, 89, 0.3)',
        },
        secondaryBtn: {
            padding: '16px 36px',
            backgroundColor: 'transparent',
            border: '2px solid var(--accent-navy)',
            color: 'var(--accent-navy)',
            borderRadius: '8px',
            fontSize: '1.05rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
        }
    };

    const animations = `
        .hero-profile-container:hover .profile-img {
            transform: scale(1.02);
        }
        
        .hero-primary-btn:hover,
        .hero-primary-btn:focus-visible {
            background-color: var(--accent-gold-hover);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(197, 160, 89, 0.4);
        }
        
        .hero-secondary-btn:hover,
        .hero-secondary-btn:focus-visible {
            background-color: var(--accent-navy);
            color: white;
            transform: translateY(-3px);
        }

        .hero-primary-btn:focus-visible,
        .hero-secondary-btn:focus-visible {
            outline: 3px solid var(--accent-blue);
            outline-offset: 3px;
        }

        @media (max-width: 768px) {
            .hero-content h1 { font-size: 2.8rem !important; }
            .hero-content h2 { font-size: 1.4rem !important; }
            .profile-img { width: 260px !important; height: 260px !important; }
        }
    `;

    return (
        <>
            <style>{animations}</style>
            <section id="home" style={styles.hero} aria-labelledby="hero-title">
                <canvas ref={canvasRef} style={styles.canvas} aria-hidden="true" />
                <div style={styles.heroContainer}>
                    <div style={styles.content} className="hero-content">
                        <p style={styles.greeting}>Physician • Researcher • Innovator</p>
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

                        <div style={styles.glassBox}>
                            <div style={styles.mission}>
                                <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🎯</span>
                                <p>
                                    <strong>Professional Objective:</strong> Pursuing a Hematology/Oncology fellowship to bridge the gap between complex inpatient management and scalable outcomes research.
                                </p>
                            </div>
                        </div>

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
                    </div>

                    <div style={styles.imageContainer} className="hero-profile-container">
                        <img src={profileImage} alt="Portrait of Bakr Alhayek, MD" style={styles.profileImage} className="profile-img" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
