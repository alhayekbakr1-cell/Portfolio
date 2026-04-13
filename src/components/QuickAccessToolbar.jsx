import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackCVDownload, trackScholarClick } from '../config/analyticsConfig';

const QuickAccessToolbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            // Show toolbar after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContact = () => {
        navigate('/contact');
    };

    const tools = [
        {
            icon: '📄',
            label: 'Download CV',
            action: () => {
                trackCVDownload();
                window.open('Bakr_Alhayek_CV.pdf', '_blank');
            },
            color: 'var(--accent-navy)'
        },
        {
            icon: '📚',
            label: 'Google Scholar',
            action: () => {
                trackScholarClick();
                window.open('https://scholar.google.com/citations?user=8NUxSzEAAAAJ&hl=en&oi=ao', '_blank');
            },
            color: 'var(--accent-blue)'
        },
        {
            icon: '✉️',
            label: 'Contact',
            action: scrollToContact,
            color: 'var(--accent-navy)'
        },
    ];

    const styles = {
        container: {
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-end',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.3s ease',
            pointerEvents: isVisible ? 'auto' : 'none',
        },
        toolButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--border-color)',
            borderRadius: '50px',
            boxShadow: 'var(--shadow-md)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--text-primary)',
        },
        toolIcon: {
            fontSize: '1.2rem',
        },
        toolLabel: {
            maxWidth: isExpanded ? '120px' : '0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            transition: 'max-width 0.3s ease',
        },
        toggleButton: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-navy)',
            color: '#FFFFFF',
            border: 'none',
            boxShadow: 'var(--shadow-lg)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
        }
    };

    const hoverStyles = `
        .quick-tool-btn:hover {
            transform: translateX(-5px) scale(1.05);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent-navy);
        }
        .quick-toggle-btn:hover {
            transform: scale(1.1) rotate(15deg);
            background-color: var(--accent-blue);
        }
        @media (max-width: 768px) {
            .quick-access-toolbar {
                right: 10px !important;
                bottom: 10px !important;
            }
        }
    `;

    return (
        <>
            <style>{hoverStyles}</style>
            <div style={styles.container} className="quick-access-toolbar">
                {isExpanded && tools.map((tool, index) => (
                    <button
                        key={index}
                        style={styles.toolButton}
                        className="quick-tool-btn"
                        onClick={tool.action}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = tool.color}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                        <span style={styles.toolIcon}>{tool.icon}</span>
                        <span style={styles.toolLabel}>{tool.label}</span>
                    </button>
                ))}

                <button
                    style={styles.toggleButton}
                    className="quick-toggle-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label="Toggle quick access menu"
                >
                    {isExpanded ? '×' : '⚡'}
                </button>
            </div>
        </>
    );
};

export default QuickAccessToolbar;
