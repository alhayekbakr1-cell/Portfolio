import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, isEmailConfigured } from '../config/emailConfig';
import { trackContactFormSubmit } from '../config/analyticsConfig';
import profileImage from '../assets/profile.webp';

const Contact = () => {
    const reduceMotion = useReducedMotion();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        institution: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        // Simple Validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' });
            setIsSubmitting(false);
            return;
        }

        // Formspree Submission logic
        try {
            const response = await fetch("https://formspree.io/f/mnjzerdp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    institution: formData.institution,
                    subject: formData.subject,
                    message: formData.message
                })
            });

            if (response.ok) {
                trackContactFormSubmit();
                setStatus({
                    type: 'success',
                    message: '✓ Message sent successfully!'
                });

                // Reset form
                setTimeout(() => {
                    setFormData({ name: '', email: '', institution: '', subject: '', message: '' });
                    setStatus({ type: '', message: '' });
                    setIsSubmitting(false);
                }, 3000);
            } else {
                const data = await response.json();
                if (data.errors) {
                    throw new Error(data.errors.map(error => error.message).join(", "));
                } else {
                    throw new Error('Form submission failed');
                }
            }
        } catch (error) {
            console.error('Formspree Error:', error);
            setStatus({
                type: 'error',
                message: 'Failed to send. Please reach out directly via email.'
            });
            setIsSubmitting(false);
        }
    };

    const styles = {
        container: {
            padding: '130px 20px',
            background: 'linear-gradient(180deg, var(--bg-primary), var(--bg-secondary))',
            position: 'relative',
            overflow: 'hidden',
        },
        wrapper: {
            maxWidth: '1120px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 390px) minmax(0, 1fr)',
            gap: '38px',
            alignItems: 'start',
        },
        intro: {
            textAlign: 'left',
            marginBottom: '2rem',
        },
        profileCard: {
            position: 'sticky',
            top: '110px',
            padding: '24px',
            borderRadius: '28px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            background: 'rgba(255,255,255,0.76)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 28px 90px rgba(10, 37, 64, 0.12)',
            overflow: 'hidden',
        },
        imageWrap: {
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '4 / 5',
            background: 'var(--bg-muted)',
            marginBottom: '20px',
        },
        profileImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
        },
        profileGlow: {
            position: 'absolute',
            inset: '-45%',
            background: 'radial-gradient(circle, rgba(197,160,89,0.35), transparent 62%)',
            pointerEvents: 'none',
        },
        profileName: {
            margin: '0 0 6px',
            color: 'var(--text-primary)',
            fontSize: '1.55rem',
        },
        profileRole: {
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '18px',
        },
        profilePills: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px',
        },
        pill: {
            padding: '7px 10px',
            borderRadius: '999px',
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            fontSize: '0.82rem',
            fontWeight: 800,
        },
        contactInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-color)',
        },
        infoText: {
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            margin: 0,
        },
        formPanel: {
            padding: '34px',
            borderRadius: '28px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            background: 'rgba(255,255,255,0.78)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 24px 80px rgba(10, 37, 64, 0.09)',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        label: {
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontWeight: '700',
        },
        required: {
            color: '#DC2626',
        },
        input: {
            padding: '14px 16px',
            fontSize: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '14px',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
            background: 'rgba(248,250,252,0.88)',
            color: 'var(--text-primary)',
        },
        textarea: {
            padding: '14px 16px',
            fontSize: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '14px',
            minHeight: '160px',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            background: 'rgba(248,250,252,0.88)',
            color: 'var(--text-primary)',
        },
        button: {
            padding: '16px 32px',
            fontSize: '1rem',
            fontWeight: '800',
            backgroundColor: 'var(--accent-navy)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '10px',
            boxShadow: '0 16px 34px rgba(10, 37, 64, 0.18)',
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        status: {
            padding: '12px 16px',
            borderRadius: '12px',
            fontSize: '0.95rem',
            textAlign: 'center',
        },
        statusSuccess: {
            backgroundColor: '#D1FAE5',
            color: '#065F46',
            border: '1px solid #10B981',
        },
        statusError: {
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            border: '1px solid #DC2626',
        },
        statusInfo: {
            backgroundColor: '#DBEAFE',
            color: '#1E40AF',
            border: '1px solid #3B82F6',
        }
    };

    const hoverStyles = `
        .contact-layout { grid-template-columns: minmax(280px, 390px) minmax(0, 1fr); }
        .contact-input:focus {
            outline: none;
            border-color: var(--accent-navy);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
            background: #fff;
        }
        .contact-button:hover:not(:disabled) {
            background-color: var(--accent-blue);
            transform: translateY(-3px);
            box-shadow: 0 20px 44px rgba(37, 99, 235, 0.22);
        }
        .contact-email-link:hover {
            color: var(--accent-navy);
        }
        .contact-profile-card::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(135deg, rgba(255,255,255,0.75), transparent 38%, rgba(197,160,89,0.12));
        }
        @media (max-width: 920px) {
            .contact-layout { grid-template-columns: 1fr !important; }
            .contact-profile-card { position: relative !important; top: auto !important; }
        }
    `;

    const cardMotion = reduceMotion ? {} : {
        initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
        whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <>
            <style>{hoverStyles}</style>
            <section id="contact" style={styles.container}>
                <div style={styles.wrapper} className="contact-layout">
                    <motion.aside style={styles.profileCard} className="contact-profile-card" {...cardMotion}>
                        <motion.div style={styles.imageWrap} whileHover={reduceMotion ? undefined : { scale: 1.015 }} transition={{ duration: 0.35 }}>
                            <motion.div style={styles.profileGlow} animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} />
                            <img src={profileImage} alt="Portrait of Bakr Alhayek, MD" style={styles.profileImage} />
                        </motion.div>
                        <h3 style={styles.profileName}>Bakr Alhayek, MD</h3>
                        <p style={styles.profileRole}>Internal Medicine resident focused on inpatient oncology, medical AI, diagnostic stewardship, and outcomes research.</p>
                        <div style={styles.profilePills}>
                            <span style={styles.pill}>Heme/Onc</span>
                            <span style={styles.pill}>Clinical AI</span>
                            <span style={styles.pill}>Research</span>
                        </div>
                        <div style={styles.contactInfo}>
                            <a href="mailto:Bakr.Alhayek.MD@adventhealth.com" style={{ ...styles.infoText, color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 800 }} className="contact-email-link">📧 Bakr.Alhayek.MD@adventhealth.com</a>
                            <p style={styles.infoText}>📞 +1 (904) 750-7249</p>
                        </div>
                    </motion.aside>

                    <motion.div style={styles.formPanel} {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.08 }}>
                        <div style={styles.intro}>
                            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.2rem' }}>Get In Touch</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '620px', margin: 0 }}>
                                Interested in collaboration, mentorship, or have questions about my research? I'd love to hear from you.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Name <span style={styles.required}>*</span></label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.input} className="contact-input" placeholder="Your full name" required />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email <span style={styles.required}>*</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} className="contact-input" placeholder="your.email@institution.edu" required />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Institution / Organization</label>
                                <input type="text" name="institution" value={formData.institution} onChange={handleChange} style={styles.input} className="contact-input" placeholder="Your affiliated institution (optional)" />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Subject</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={styles.input} className="contact-input" placeholder="Brief subject line (optional)" />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Message <span style={styles.required}>*</span></label>
                                <textarea name="message" value={formData.message} onChange={handleChange} style={styles.textarea} className="contact-input" placeholder="Your message..." required />
                            </div>

                            {status.message && (
                                <div style={{ ...styles.status, ...(status.type === 'success' ? styles.statusSuccess : status.type === 'error' ? styles.statusError : styles.statusInfo) }}>
                                    {status.message}
                                </div>
                            )}

                            <button type="submit" style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}) }} className="contact-button" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Contact;
