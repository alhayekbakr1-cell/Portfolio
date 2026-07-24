import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';

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
            setScrolled(scrollPosition > 40);
            setShowName(scrollPosition > 350 || location.pathname !== '/');
        };

        setShowName(window.scrollY > 350 || location.pathname !== '/');

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Streamlined, Non-Crowded Navigation Structure
    const navStructure = [
        { label: 'Home', href: '/' },
        {
            label: 'About',
            children: [
                { label: 'Clinical Experience', href: '/experience' },
                { label: 'Education & Training', href: '/education' },
                { label: 'Professional References', href: '/references' },
            ]
        },
        {
            label: 'Research & AI',
            children: [
                { label: 'Research Portfolio', href: '/research' },
                { label: 'Publications', href: '/publications' },
                { label: 'Medical AI Lab', href: '/medical-ai' },
                { label: 'AI Updates', href: '/ai-updates' },
            ]
        },
        {
            label: 'Impact',
            children: [
                { label: 'Leadership', href: '/leadership' },
                { label: 'Clinical Media Lab', href: '/media-lab' },
                { label: 'Quality & Safety', href: '/quality-safety' },
                { label: 'Teaching & Mentorship', href: '/teaching' },
                { label: 'Academic Service', href: '/service' },
            ]
        },
        {
            label: 'Tools & Updates',
            children: [
                { label: 'Clinical Calculators', href: '/calculators' },
                { label: 'Medical Updates', href: '/medical-updates' },
            ]
        },
        { label: 'Collaborate', href: '/collaborate' },
    ];

    const styles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            padding: scrolled ? '10px 0' : '16px 0',
            background: scrolled || location.pathname !== '/' ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: 'none',
            boxShadow: scrolled ? '0 12px 35px rgba(10, 37, 64, 0.08)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1002,
        },
        logo: {
            fontSize: '1.35rem',
            fontWeight: '800',
            fontFamily: 'var(--font-serif)',
            color: 'var(--accent-navy)',
            letterSpacing: '-0.5px',
            opacity: showName || mobileMenuOpen ? 1 : 0,
            transform: showName || mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease',
            pointerEvents: showName || mobileMenuOpen ? 'auto' : 'none',
            zIndex: 1003,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
        },
        navList: {
            display: 'flex',
            gap: '18px',
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
            fontSize: '0.92rem',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            position: 'relative',
            padding: '6px 8px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            borderRadius: '6px',
        },
        activeLink: {
            color: 'var(--accent-navy)',
            fontWeight: '800',
            background: 'var(--accent-light)',
        },
        dropdown: {
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '14px',
            boxShadow: '0 20px 60px rgba(10, 37, 64, 0.12)',
            padding: '8px',
            minWidth: '220px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            opacity: 0,
            visibility: 'hidden',
            transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
            marginTop: '12px',
        },
        dropdownVisible: {
            opacity: 1,
            visibility: 'visible',
            marginTop: '4px',
            transform: 'translateX(-50%) translateY(0)',
        },
        dropdownItem: {
            padding: '10px 14px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontWeight: '500',
            borderRadius: '8px',
            transition: 'background 0.2s, color 0.2s',
            whiteSpace: 'nowrap',
            display: 'block',
        },
        themeToggle: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '20px',
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            fontWeight: '700',
            transition: 'all 0.2s ease',
            marginLeft: '4px',
        },
        hamburger: {
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: 'var(--accent-navy)',
            zIndex: 1003,
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
            transition: 'opacity 0.35s ease',
            padding: '80px 20px 40px',
        },
        mobileNavList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 0.35s ease',
            maxHeight: '75vh',
            overflowY: 'auto',
            width: '100%',
            maxWidth: '400px',
        },
        mobileNavLink: {
            color: 'var(--accent-navy)',
            fontSize: '1.2rem',
            fontWeight: '700',
            fontFamily: 'var(--font-serif)',
            textDecoration: 'none',
            display: 'block',
            padding: '8px',
        },
        mobileSubLink: {
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            textDecoration: 'none',
            display: 'block',
            padding: '6px',
        }
    };

    const mobileStyles = `
        @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 1025px) {
            .mobile-overlay { display: none !important; }
        }
        .theme-toggle:hover {
            background-color: rgba(185, 28, 28, 0.08);
            color: var(--accent-red);
            border-color: var(--accent-red);
        }
        .dropdown-item:hover {
            background-color: var(--accent-red-light);
            color: var(--accent-red);
        }
    `;

    const handleDropdownEnter = (label) => setActiveDropdown(label);
    const handleDropdownLeave = () => setActiveDropdown(null);

    return (
        <>
            <style>{mobileStyles}</style>
            <motion.header
                style={styles.header}
                initial={{ y: -18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
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
                                            <span>{item.label}</span>
                                            <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none' }} />
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
                                    {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                                    <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            className="mobile-hamburger"
                            style={styles.hamburger}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation Overlay */}
            <div className="mobile-overlay" style={styles.mobileOverlay}>
                <ul style={styles.mobileNavList}>
                    {navStructure.map((item, index) => (
                        <li key={index}>
                            {item.children ? (
                                <>
                                    <span style={{ ...styles.mobileNavLink, opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {item.label}
                                    </span>
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
                    <li style={{ marginTop: '16px' }}>
                        <button
                            onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                            style={{ ...styles.themeToggle, margin: '0 auto' }}
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                            <span>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</span>
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;
