import React from 'react';

const Contact = () => {
    const styles = {
        wrapper: {
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
        },
        text: {
            color: 'var(--text-secondary)',
            fontSize: '1.2rem',
            marginBottom: '3rem',
        },
        button: {
            padding: '1.25rem 3rem',
            fontSize: '1rem',
            background: 'transparent',
            color: 'var(--accent-primary)',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-block',
        }
    };

    return (
        <section id="contact" className="section container">
            <div style={styles.wrapper}>
                <h2 className="section-title">Get In Touch</h2>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                        <a href="mailto:Bakr.Alhayek.MD@adventhealth.com" style={{ ...styles.text, marginBottom: 0 }}>Bakr.Alhayek.MD@adventhealth.com</a>
                        <a href="mailto:Alhayek.Bakr1@gmail.com" style={{ ...styles.text, marginBottom: 0 }}>Alhayek.Bakr1@gmail.com</a>
                        <p style={{ ...styles.text, marginBottom: 0 }}>+1 (904) 750-7249</p>
                    </div>
                </div>
                <a href="mailto:Bakr.Alhayek.MD@adventhealth.com" style={styles.button}>
                    Contact Me
                </a>
            </div>
        </section>
    );
};

export default Contact;
