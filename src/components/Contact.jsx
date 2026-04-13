import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, isEmailConfigured } from '../config/emailConfig';
import { trackContactFormSubmit } from '../config/analyticsConfig';

const Contact = () => {
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
            padding: '100px 20px',
            background: 'var(--bg-primary)',
        },
        wrapper: {
            maxWidth: '700px',
            margin: '0 auto',
        },
        intro: {
            textAlign: 'center',
            marginBottom: '3rem',
        },
        contactInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--accent-light)',
            borderRadius: '8px',
        },
        infoText: {
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            margin: 0,
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
            fontWeight: '500',
        },
        required: {
            color: '#DC2626',
        },
        input: {
            padding: '12px 16px',
            fontSize: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '6px',
            transition: 'border-color 0.2s ease',
            fontFamily: 'inherit',
        },
        textarea: {
            padding: '12px 16px',
            fontSize: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '6px',
            minHeight: '150px',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s ease',
        },
        button: {
            padding: '14px 32px',
            fontSize: '1rem',
            fontWeight: '500',
            backgroundColor: 'var(--accent-navy)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '10px',
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        status: {
            padding: '12px 16px',
            borderRadius: '6px',
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
        .contact-input:focus {
            outline: none;
            border-color: var(--accent-navy);
        }
        .contact-button:hover:not(:disabled) {
            background-color: var(--accent-blue);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        .contact-email-link:hover {
            color: var(--accent-navy);
        }
    `;

    return (
        <>
            <style>{hoverStyles}</style>
            <section id="contact" style={styles.container}>
                <div style={styles.wrapper}>
                    <div style={styles.intro}>
                        <h2 className="section-title">Get In Touch</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                            Interested in collaboration, mentorship, or have questions about my research? I'd love to hear from you.
                        </p>
                    </div>

                    <div style={styles.contactInfo}>
                        <a
                            href="mailto:Bakr.Alhayek.MD@adventhealth.com"
                            style={{ ...styles.infoText, color: 'var(--accent-blue)', textDecoration: 'none' }}
                            className="contact-email-link"
                        >
                            📧 Bakr.Alhayek.MD@adventhealth.com
                        </a>
                        <p style={styles.infoText}>📞 +1 (904) 750-7249</p>
                    </div>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Name <span style={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={styles.input}
                                className="contact-input"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Email <span style={styles.required}>*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                                className="contact-input"
                                placeholder="your.email@institution.edu"
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Institution / Organization</label>
                            <input
                                type="text"
                                name="institution"
                                value={formData.institution}
                                onChange={handleChange}
                                style={styles.input}
                                className="contact-input"
                                placeholder="Your affiliated institution (optional)"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                style={styles.input}
                                className="contact-input"
                                placeholder="Brief subject line (optional)"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                Message <span style={styles.required}>*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                style={styles.textarea}
                                className="contact-input"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        {status.message && (
                            <div style={{
                                ...styles.status,
                                ...(status.type === 'success' ? styles.statusSuccess :
                                    status.type === 'error' ? styles.statusError : styles.statusInfo)
                            }}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                ...(isSubmitting ? styles.buttonDisabled : {})
                            }}
                            className="contact-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;
