import React, { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', href: '#home' },
        { label: 'Clinical', href: '#experience' },
        { label: 'Quality', href: '#quality' },
        { label: 'Teaching', href: '#teaching' },
        { label: 'Research', href: '#research' },
        { label: 'Pubs', href: '#publications' },
        { label: 'Leadership', href: '#leadership' },
        { label: 'Contact', href: '#contact' },
    ];

    const styles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            padding: scrolled ? '15px 0' : '30px 0',
            background: scrolled ? 'rgba(15, 23, 42, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        logo: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
        },
        logoAccent: {
            color: 'var(--accent-primary)',
        },
        navList: {
            display: 'flex',
            gap: '30px',
        },
        navLink: {
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            fontWeight: '500',
        },
        navLinkHover: {
            color: 'var(--accent-primary)',
        },
    };

    return (
        <header style={styles.header}>
            <div className="container" style={styles.nav}>
                <a href="#" style={styles.logo}>
                    Portfolio<span style={styles.logoAccent}>.</span>
                </a>
                <nav>
                    <ul style={styles.navList}>
                        <li><a href="#leadership" style={styles.navLink}>Leadership</a></li>
                        <li><a href="#experience" style={styles.navLink}>Experience</a></li>
                        <li><a href="#research" style={styles.navLink}>Research</a></li>
                        <li><a href="#education" style={styles.navLink}>Education</a></li>
                        <li><a href="#service" style={styles.navLink}>Service</a></li>
                        <li><a href="#references" style={styles.navLink}>References</a></li>
                        <li><a href="#contact" style={styles.navLink}>Connect</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
