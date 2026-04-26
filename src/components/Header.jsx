import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showName, setShowName] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrolled(scrollPosition > 50);
            setShowName(scrollPosition > 400 || location.pathname !== '/');
        };

        setShowName(window.scrollY > 400 || location.pathname !== '/');

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Structured Navigation
    const navStructure = [
        { label: 'Home', href: '/' },
        { label: 'Experience', href: '/experience' },
        {
            label: 'Research',
            children: [
                { label: 'Research Works', href: '/research' },
                { label: 'Medical AI Lab', href: '/medical-ai' },
                { label: 'AI Updates', href: '/ai-updates' },
                { label: 'Publications', href: '/publications' },
            ]
        },
        {
            label: 'Impact',
            children: [
                { label: 'Leadership', href: '/leadership' },
                { label: 'Clinical Media Lab', href: '/media-lab' },
                { label: 'Quality & Safety', href: '/quality-safety' },
                { label: 'Teaching', href: '/teaching' },
                { label: 'Service', href: '/service' },
            ]
        },
        {
            label: 'Education',
            href: '/education'
        },
        {
            label: 'Resources',
            children: [
                { label: 'Clinical Updates', href: '/clinical-updates' },
                { label: 'Medical Literature', href: '/news' },
                { label: 'Clinical Tools', href: '/calculators' },
                { label: 'References', href: '/references' },
            ]
        },
        { label: 'Collaborate', href: '/collaborate' },
        { label: 'Contact', href: '/contact' },
    ];

    const styles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            padding: scrolled ? '12px 0' : '20px 0',
            background: scrolled || location.pathname !== '/' ? 'var(--bg-primary)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1002,
        },
        logo: {
            fontSize: '1.5rem',
            fontWeight: '600',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            letterSpacing: '-0.5px',
            opacity: showName || mobileMenuOpen ? 1 : 0,
            transform: showName || mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease',
            pointerEvents: showName || mobileMenuOpen ? 'auto' : 'none',
            zIndex: 1003,
            textDecoration: 'none',
        },
        navList: {
            display: 'flex',
            gap: '24px', // Increased gap since there are fewer items
            alignItems: 'center',
            listStyle: 'none',
            margin: 0,
            padding: 0,
        },
        navItem: {
            position: 'relative',
            cursor: 'pointer',
        },
        navLink: {
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease',
            position: 'relative',
            paddingBottom: '4px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        },
        activeLink: {
            color: 'var(--accent-navy)',
            fontWeight: '700',
            borderBottom: '2px solid var(--accent-navy)',
        },
        dropdown: {
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-lg)',
            padding: '8px',
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.2s ease',
            marginTop: '10px',
        },
        dropdownVisible: {
            opacity: 1,
            visibility: 'visible',
            marginTop: '0px',
        },
        dropdownItem: {
            padding: '8px 12px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            borderRadius: '4px',
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
        },
        themeToggle: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            marginLeft: '5px',
        },
        hamburger: {
            display: 'none',
            flexDirection: 'column',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 1003,
        },
        hamburgerLine: {
            width: '24px',
            height: '2px',
            backgroundColor: 'var(--accent-navy)',
            transition: 'all 0.3s ease',
            borderRadius: '2px',
        },
        mobileOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'var(--bg-primary)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: mobileMenuOpen ? 1 : 0,
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            transition: 'opacity 0.4s ease',
        },
        mobileNavList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 0.4s ease 0.1s',
            maxHeight: '80vh',
            overflowY: 'auto',
            width: '100%',
        },
        mobileNavLink: {
            color: 'var(--accent-navy)',
            fontSize: '1.2rem',
            fontWeight: '600',
            fontFamily: 'var(--font-serif)',
            textDecoration: 'none',
            display: 'block',
            padding: '8px',
        },
        mobileSubLink: {
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            textDecoration: 'none',
            display: 'block',
            padding: '4px',
        }
    };

    const hamburgerLine1 = { transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' };
    const hamburgerLine2 = { opacity: mobileMenuOpen ? 0 : 1 };
    const hamburgerLine3 = { transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' };

    const mobileStyles = `
        @media (max-width: 1000px) {
            .desktop-nav { display: none !important; }
            .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 1001px) {
            .mobile-overlay { display: none !important; }
        }
        .theme-toggle:hover {
            background-color: var(--bg-secondary);
            color: var(--accent-navy);
        }
        .dropdown-item:hover {
            background-color: var(--bg-secondary);
            color: var(--accent-navy);
        }
    `;

    // Dropdown helper
    const handleDropdownEnter = (label) => setActiveDropdown(label);
    const handleDropdownLeave = () => setActiveDropdown(null);

    return (
        <>
            <style>{mobileStyles}</style>
            <header style={styles.header}>
                <div className="container" style={styles.nav}>
                    <NavLink to="/" style={styles.logo} onClick={() => setMobileMenuOpen(false)}>
                        Bakr Alhayek, MD
                    </NavLink>
                    <nav className="desktop-nav">
                        <ul style={styles.navList}>
                            {navStructure.map((item, index) => (
                                <li
                                    key={index}
                                    style={styles.navItem}
                                    onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    {item.children ? (
                                        <div style={styles.navLink}>
                                            {item.label} ▾
                                            <div
                                                style={{
                                                    ...styles.dropdown,
                                                    ...(activeDropdown === item.label ? styles.dropdownVisible : {})
                                                }}
                                            >
                                                {item.children.map((child, cIndex) => (
                                                    <NavLink
                                                        key={cIndex}
                                                        to={child.href}
                                                        className="dropdown-item"
                                                        style={styles.dropdownItem}
                                                    >
                                                        {child.label}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <NavLink
                                            to={item.href}
                                            style={({ isActive }) => ({
                                                ...styles.navLink,
                                                ...(isActive ? styles.activeLink : {}),
                                            })}
                                        >
                                            {item.label}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={toggleTheme}
                                    style={styles.themeToggle}
                                    className="theme-toggle"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {theme === 'light' ? '🌙' : '☀️'}
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                            className="mobile-hamburger"
                            onClick={toggleTheme}
                            style={{ ...styles.themeToggle, display: 'none', marginRight: '40px' }}
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>

                        <button
                            className="mobile-hamburger"
                            style={styles.hamburger}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span style={{ ...styles.hamburgerLine, ...hamburgerLine1 }}></span>
                            <span style={{ ...styles.hamburgerLine, ...hamburgerLine2 }}></span>
                            <span style={{ ...styles.hamburgerLine, ...hamburgerLine3 }}></span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="mobile-overlay" style={styles.mobileOverlay}>
                <ul style={styles.mobileNavList}>
                    {navStructure.map((item, index) => (
                        <li key={index}>
                            {item.children ? (
                                <>
                                    <span style={{ ...styles.mobileNavLink, opacity: 0.7 }}>{item.label}</span>
                                    {item.children.map((child, cIndex) => (
                                        <NavLink
                                            key={cIndex}
                                            to={child.href}
                                            style={styles.mobileSubLink}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </>
                            ) : (
                                <NavLink
                                    to={item.href}
                                    style={styles.mobileNavLink}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            )}
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                            style={{ ...styles.mobileNavLink, background: 'none', border: 'none', cursor: 'pointer', margin: '20px auto 0' }}
                        >
                            {theme === 'light' ? 'Switch to Dark Mode 🌙' : 'Switch to Light Mode ☀️'}
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;
