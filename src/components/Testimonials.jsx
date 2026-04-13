import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const Testimonials = () => {
    const testimonials = [
        {
            text: "Exceptional clinical skills with ability to synthesize complex medical data into effective treatment plans. Impressive dedication to academic excellence, scholarly work, research and publications. Strong leadership and teaching skills, chief resident material.",
            role: "Program Faculty / Attending",
            initials: "PF"
        },
        {
            text: "It was absolutely wonderful working with Dr. Alhayek. He is very compassionate and his approach is always patient centered... Because of his support and steady guidance, I never once felt alone or overwhelmed. I learned a lot from picking his brain.",
            role: "Intern / Junior Resident",
            initials: "PGY1"
        },
        {
            text: "Highly talented resident who excels in research and evidence based academic clinical practice. Impressive technical and analytical skills... Great teacher and mentor to his junior colleagues.",
            role: "Program Faculty / Attending",
            initials: "PF"
        },
        {
            text: "Dr. Alhayek made my floors rotations engaging and supportive. He challenges first-year residents to think critically, guiding us through complex cases while giving constructive feedback. His approachable and inclusive style encourages learning and confidence.",
            role: "Intern / Junior Resident",
            initials: "PGY1"
        },
        {
            text: "I believe he is one of the stronger residents in his class and would be a strong candidate for chief resident in the future... He incorporates technology well into his practice and utilizes it effectively.",
            role: "Program Faculty / Attending",
            initials: "PF"
        },
        {
            text: "Dr. Alhayek is truly an exceptional physician. His dedication and the genuine care he shows for his patients are nothing short of inspiring. We are fortunate to have such a compassionate and skilled doctor on our team.",
            role: "Program Faculty / Attending",
            initials: "PF"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-advance
    useEffect(() => {
        const interval = setInterval(nextSlide, 8000);
        return () => clearInterval(interval);
    }, []);

    const styles = {
        container: {
            padding: '80px 20px',
            background: 'var(--bg-secondary)',
            position: 'relative',
            overflow: 'hidden',
        },
        wrapper: {
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
        },
        sectionTitle: {
            fontSize: '2rem',
            color: 'var(--accent-navy)',
            marginBottom: '50px',
            fontFamily: 'var(--font-serif)',
        },
        card: {
            background: 'var(--bg-card)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            transition: 'all 0.5s ease',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid var(--border-color)',
        },
        quoteIcon: {
            color: 'var(--accent-gold)',
            opacity: 0.3,
            marginBottom: '20px',
        },
        text: {
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            marginBottom: '30px',
            fontFamily: 'var(--font-serif)',
        },
        author: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
        },
        avatar: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--accent-navy)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.9rem',
        },
        role: {
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        controls: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px',
        },
        button: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'all 0.2s ease',
        },
        dots: {
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
        },
        dot: (index) => ({
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: index === activeIndex ? 'var(--accent-navy)' : 'var(--border-color)',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
        })
    };

    return (
        <section style={styles.container}>
            <div style={styles.wrapper}>
                <RevealOnScroll>
                    <h2 style={styles.sectionTitle}>Mentorship & Impact</h2>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <div style={styles.card}>
                        <Quote size={48} style={styles.quoteIcon} />
                        <p style={styles.text}>"{testimonials[activeIndex].text}"</p>
                        <div style={styles.author}>
                            <div style={styles.avatar}>{testimonials[activeIndex].initials}</div>
                            <span style={styles.role}>{testimonials[activeIndex].role}</span>
                        </div>
                    </div>

                    <div style={styles.controls}>
                        <button style={styles.button} onClick={prevSlide} aria-label="Previous">
                            <ChevronLeft size={20} />
                        </button>
                        <button style={styles.button} onClick={nextSlide} aria-label="Next">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div style={styles.dots}>
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                style={styles.dot(index)}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default Testimonials;
