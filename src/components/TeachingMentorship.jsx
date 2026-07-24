import React from 'react';
import Testimonials from './Testimonials';

const TeachingMentorship = () => {
    const highlights = [
        {
            title: "Resident Research Handbook",
            role: "Author & Creator",
            description: "Designing a comprehensive guide covering study design, biostatistics, IRB navigation, and manuscript writing.",
            impact: "Planned for adoption as the official research curriculum for the AdventHealth Tampa residency program to increase scholarly output.",
            icon: "📚",
            tag: "In Development"
        },
        {
            title: "Clinical Teaching & Bedside Rounds",
            role: "Resident Lead",
            description: "Leading daily clinical rounds for rotating medical students and junior interns on IM services.",
            impact: "Consistently rated 5/5 for educational clarity and bedside manner in student evaluations.",
            icon: "👨‍🏫",
            tag: "Clinical Education"
        }
    ];

    const courses = [
        // International Teaching
        { name: "Basics in Radiology", role: "Instructor (4th/5th Year Students)", year: "International", location: "Ibn Sina College, Saudi Arabia" },
        { name: "Basics in Physiology", role: "Instructor (4th/5th Year Students)", year: "International", location: "Ibn Sina College, Saudi Arabia" },
        { name: "Basics in Microbiology", role: "Instructor (4th/5th Year Students)", year: "International", location: "Ibn Sina College, Saudi Arabia" },

        { name: "AI in Medicine", role: "Instructor", year: "International", location: "Syria" },
        { name: "Clinical Reasoning in Internal Medicine", role: "Instructor", year: "International", location: "Syria" },
        { name: "Foundations of Research", role: "Instructor", year: "International", location: "Syria" },
        { name: "Pathway to the Internal Medicine Residency in the U.S.", role: "Instructor", year: "International", location: "Syria" }
    ];

    const styles = {
        container: {
            padding: '100px 20px',
            background: 'transparent',
        },
        wrapper: {
            maxWidth: '1000px',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginTop: '40px',
        },
        card: {
            background: 'var(--bg-card)',
            borderRadius: '20px',
            padding: '36px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 32px -6px rgba(10, 37, 64, 0.08)',
            transition: 'all 0.35s var(--motion-ease)',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
        },
        icon: {
            fontSize: '1.8rem',
        },
        tag: {
            fontSize: '0.7rem',
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
            width: 'fit-content',
        },
        title: {
            fontSize: '1.4rem',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            margin: 0,
        },
        role: {
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            fontWeight: '600',
            marginBottom: '16px',
            display: 'block',
        },
        description: {
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '20px',
        },
        impactBox: {
            marginTop: 'auto',
            padding: '16px',
            background: 'var(--bg-muted)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--accent-navy)',
        },
        impactLabel: {
            fontSize: '0.75rem',
            color: 'var(--accent-navy)',
            fontWeight: '800',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'block',
        },
        impactText: {
            fontSize: '0.95rem',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            margin: 0,
        },
        // --- New Sections Styles ---
        philosophySection: {
            marginBottom: '60px',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 60px auto',
        },
        quote: {
            fontSize: '1.5rem',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: '1.6',
            marginBottom: '20px',
        },
        author: {
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            fontWeight: '600',
        },
        coursesSection: {
            marginTop: '80px',
            padding: '40px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
        },
        courseList: {
            display: 'grid',
            gap: '20px',
            marginTop: '30px',
        },
        courseItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-color)',
        }
    };

    return (
        <section id="teaching" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Teaching & Mentorship</h2>

                <div style={styles.philosophySection}>
                    <p style={styles.quote}>“The value of experience is not in seeing much, but in seeing wisely.”</p>
                    <p style={styles.author}>— Sir William Osler, <i>Aequanimitas</i></p>
                </div>

                <div style={styles.grid}>
                    {highlights.map((item, index) => (
                        <div key={index} style={styles.card} className="teaching-card">
                            <span style={styles.tag}>{item.tag}</span>
                            <div style={styles.header}>
                                <span style={styles.icon}>{item.icon}</span>
                                <h3 style={styles.title}>{item.title}</h3>
                            </div>

                            <span style={styles.role}>{item.role}</span>
                            <p style={styles.description}>{item.description}</p>

                            <div style={styles.impactBox}>
                                <span style={styles.impactLabel}>Impact & Outcomes</span>
                                <p style={styles.impactText}>{item.impact}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.coursesSection}>
                    <h3 style={{ ...styles.title, marginBottom: '20px' }}>Courses Taught</h3>
                    <div style={styles.courseList}>
                        {courses.map((course, index) => (
                            <div key={index} style={styles.courseItem} className="course-item">
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{course.name}</h4>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {course.role} <span style={{ opacity: 0.5 }}>|</span> {course.location}
                                    </span>
                                </div>
                                <span style={styles.tag}>{course.year}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Testimonials />
            </div>

            <style>{`
                .teaching-card:hover {
                    box-shadow: var(--shadow-md);
                    transform: translateY(-5px);
                    border-color: var(--accent-navy);
                }
                @media (max-width: 768px) {
                    #teaching {
                        padding: 60px 16px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default TeachingMentorship;
