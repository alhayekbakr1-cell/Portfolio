import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const googleScholarUrl = "https://scholar.google.com/citations?user=8NUxSzEAAAAJ&hl=en&oi=ao";

    const styles = {
        footer: {
            padding: '80px 20px 40px',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)',
            marginTop: '100px',
        },
        wrapper: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
        },
        brand: {
            textAlign: 'center',
        },
        name: {
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            fontWeight: '700',
            marginBottom: '8px',
            display: 'block',
        },
        title: {
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        links: {
            display: 'flex',
            gap: '24px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        link: {
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '500',
            transition: 'color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        copyright: {
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '32px',
            width: '100%',
        },
        institution: {
            color: 'var(--accent-navy)',
            fontWeight: '600',
        }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.wrapper}>
                <div style={styles.brand}>
                    <span style={styles.name}>Bakr Alhayek, MD</span>
                    <span style={styles.title}>Internal Medicine Resident • Research Lead</span>
                </div>

                <ul style={styles.links}>
                    <li>
                        <a href={googleScholarUrl} target="_blank" rel="noopener noreferrer" style={styles.link} className="footer-link">
                            <span>📚</span> Google Scholar
                        </a>
                    </li>
                    <li>
                        <a href="https://pubmed.ncbi.nlm.nih.gov/?term=Bakr+Alhayek" target="_blank" rel="noopener noreferrer" style={styles.link} className="footer-link">
                            <span>🔬</span> PubMed
                        </a>
                    </li>
                    <li>
                        <Link to="/contact" style={styles.link} className="footer-link">
                            <span>✉️</span> Contact
                        </Link>
                    </li>
                </ul>

                <div style={styles.copyright}>
                    <p>© {currentYear} Bakr Alhayek. All Rights Reserved. <span style={{ opacity: 0.3, fontSize: '0.7em' }}>v.Feb8</span></p>
                    <p style={{ marginTop: '8px' }}>
                        Clinical Affiliate: <span style={styles.institution}>AdventHealth Tampa</span> & <span style={styles.institution}>University of South Florida</span>
                    </p>
                </div>
            </div>

            <style>{`
                .footer-link:hover {
                    color: var(--accent-navy) !important;
                }
            `}</style>
        </footer>
    );
};

export default Footer;

