import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { trackContactFormSubmit } from '../config/analyticsConfig';
import profileImage from '../assets/profile.webp';

const ContactEnhanced = () => {
    const [formData, setFormData] = useState({ name: '', email: '', institution: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const reduceMotion = useReducedMotion();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/mnjzerdp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Form submission failed');

            trackContactFormSubmit();
            setStatus({ type: 'success', message: 'Message sent successfully.' });
            setTimeout(() => {
                setFormData({ name: '', email: '', institution: '', subject: '', message: '' });
                setStatus({ type: '', message: '' });
                setIsSubmitting(false);
            }, 3000);
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus({ type: 'error', message: 'Failed to send. Please try again later.' });
            setIsSubmitting(false);
        }
    };

    const reveal = reduceMotion ? {} : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    };

    const styles = {
        section: { padding: '130px 20px 110px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' },
        wrapper: { maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 },
        intro: { textAlign: 'center', marginBottom: '3.5rem' },
        introText: { color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.8 },
        layout: { display: 'grid', gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(320px, 1.15fr)', gap: '34px', alignItems: 'start' },
        profileCard: { padding: '28px', background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(16px)', border: '1px solid rgba(226,232,240,0.82)', borderRadius: '28px', boxShadow: '0 24px 70px rgba(10,37,64,0.12)', position: 'sticky', top: '110px', overflow: 'hidden' },
        portraitWrap: { position: 'relative', width: '220px', height: '220px', margin: '0 auto 24px' },
        portraitHalo: { position: 'absolute', inset: '-14px', borderRadius: '50%', background: 'conic-gradient(from 160deg, rgba(197,160,89,0.85), rgba(37,99,235,0.35), rgba(10,37,64,0.65), rgba(197,160,89,0.85))', opacity: 0.65 },
        portrait: { position: 'relative', width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover', border: '8px solid rgba(255,255,255,0.92)', boxShadow: '0 18px 45px rgba(10,37,64,0.2)' },
        profileName: { textAlign: 'center', color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.5rem' },
        profileRole: { textAlign: 'center', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.78rem', marginBottom: '22px' },
        infoPill: { padding: '13px 14px', backgroundColor: 'var(--accent-light)', border: '1px solid var(--border-color)', borderRadius: '14px', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '10px' },
        formCard: { padding: '32px', background: 'rgba(255,255,255,0.84)', backdropFilter: 'blur(14px)', border: '1px solid rgba(226,232,240,0.82)', borderRadius: '28px', boxShadow: '0 24px 70px rgba(10,37,64,0.10)' },
        form: { display: 'flex', flexDirection: 'column', gap: '20px' },
        formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
        label: { color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 700 },
        required: { color: '#DC2626' },
        field: { padding: '13px 16px', fontSize: '1rem', border: '2px solid var(--border-color)', borderRadius: '12px', fontFamily: 'inherit', background: 'rgba(255,255,255,0.88)', color: 'var(--text-primary)' },
        textarea: { padding: '13px 16px', fontSize: '1rem', border: '2px solid var(--border-color)', borderRadius: '12px', minHeight: '150px', resize: 'vertical', fontFamily: 'inherit', background: 'rgba(255,255,255,0.88)', color: 'var(--text-primary)' },
        button: { padding: '15px 32px', fontSize: '1rem', fontWeight: 800, backgroundColor: 'var(--accent-navy)', color: '#fff', border: 'none', borderRadius: '999px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 18px 38px rgba(10,37,64,0.18)' },
        status: { padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', textAlign: 'center' },
        success: { backgroundColor: '#D1FAE5', color: '#065F46', border: '1px solid #10B981' },
        error: { backgroundColor: '#FEE2E2', color: '#991B1B', border: '1px solid #DC2626' }
    };

    const css = `
        .contact-enhanced-field:focus { outline: none; border-color: var(--accent-navy); box-shadow: 0 0 0 4px rgba(37,99,235,0.1); transform: translateY(-1px); }
        .contact-enhanced-button:hover:not(:disabled) { background-color: var(--accent-blue); transform: translateY(-3px); box-shadow: 0 22px 45px rgba(37,99,235,0.22); }
        .contact-enhanced-card:hover .contact-enhanced-portrait { transform: scale(1.025); }
        .contact-enhanced-portrait { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (max-width: 860px) { .contact-enhanced-layout { grid-template-columns: 1fr !important; } .contact-enhanced-card { position: relative !important; top: auto !important; } }
    `;

    return (
        <>
            <style>{css}</style>
            <section id="contact" style={styles.section}>
                <div style={styles.wrapper}>
                    <motion.div style={styles.intro} {...reveal}>
                        <h2 className="section-title">Get In Touch</h2>
                        <p style={styles.introText}>Interested in collaboration, mentorship, research, medical AI, or Hematology/Oncology? I’d love to hear from you.</p>
                    </motion.div>

                    <div style={styles.layout} className="contact-enhanced-layout">
                        <motion.aside style={styles.profileCard} className="contact-enhanced-card luxury-sheen" {...reveal}>
                            <div style={styles.portraitWrap}>
                                <motion.div style={styles.portraitHalo} animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} aria-hidden="true" />
                                <img src={profileImage} alt="Portrait of Bakr Alhayek, MD" style={styles.portrait} className="contact-enhanced-portrait" />
                            </div>
                            <h3 style={styles.profileName}>Bakr Alhayek, MD</h3>
                            <p style={styles.profileRole}>Internal Medicine Resident • Research Lead</p>
                            <p style={styles.infoPill}>Academic medicine, inpatient oncology, medical AI, and clinical research collaboration.</p>
                            <p style={styles.infoPill}>AdventHealth Tampa</p>
                        </motion.aside>

                        <motion.div style={styles.formCard} {...reveal} transition={{ ...reveal.transition, delay: 0.12 }}>
                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div style={styles.formGroup}><label style={styles.label}>Name <span style={styles.required}>*</span></label><input type="text" name="name" value={formData.name} onChange={handleChange} style={styles.field} className="contact-enhanced-field" placeholder="Your full name" required /></div>
                                <div style={styles.formGroup}><label style={styles.label}>Email <span style={styles.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.field} className="contact-enhanced-field" placeholder="your.email@institution.edu" required /></div>
                                <div style={styles.formGroup}><label style={styles.label}>Institution / Organization</label><input type="text" name="institution" value={formData.institution} onChange={handleChange} style={styles.field} className="contact-enhanced-field" placeholder="Your affiliated institution (optional)" /></div>
                                <div style={styles.formGroup}><label style={styles.label}>Subject</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} style={styles.field} className="contact-enhanced-field" placeholder="Brief subject line (optional)" /></div>
                                <div style={styles.formGroup}><label style={styles.label}>Message <span style={styles.required}>*</span></label><textarea name="message" value={formData.message} onChange={handleChange} style={styles.textarea} className="contact-enhanced-field" placeholder="Your message..." required /></div>
                                {status.message && <div style={{ ...styles.status, ...(status.type === 'success' ? styles.success : styles.error) }}>{status.message}</div>}
                                <button type="submit" style={{ ...styles.button, ...(isSubmitting ? { opacity: 0.6, cursor: 'not-allowed' } : {}) }} className="contact-enhanced-button" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactEnhanced;
