import React from 'react';

const Footer = () => {
    const styles = {
        footer: {
            padding: '20px 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            marginTop: '50px',
        },
        heart: {
            color: 'var(--accent-primary)',
        }
    };

    return (
        <footer style={styles.footer}>
            <p>Designed & Built by Bakr Alhayek, MD | Last updated: Jan 2026</p>
        </footer>
    );
};

export default Footer;
