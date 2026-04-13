import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Trophy, FileText, Quote, TrendingUp } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const ResearchMetrics = () => {
    // Data for topics (Mock data - align with actual work)
    const topicData = [
        { name: 'Oncology', value: 35 },
        { name: 'Cardiology', value: 25 },
        { name: 'AI/Tech', value: 20 },
        { name: 'Public Health', value: 20 },
    ];

    // Data for growth timeline
    const growthData = [
        { year: '2022', papers: 2, citations: 5 },
        { year: '2023', papers: 5, citations: 28 },
        { year: '2024', papers: 11, citations: 85 },
        { year: '2025', papers: 18, citations: 154 },
    ];

    const COLORS = ['#0a2540', '#c5a059', '#4a5568', '#adbaeb'];

    const styles = {
        container: {
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '40px',
            marginTop: '40px',
            marginBottom: '60px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)',
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
        },
        title: {
            fontSize: '1.8rem',
            color: 'var(--accent-navy)',
            marginBottom: '10px',
            fontFamily: 'var(--font-serif)',
        },
        subtitle: {
            color: 'var(--text-secondary)',
            fontSize: '1rem',
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '50px',
        },
        statCard: {
            padding: '20px',
            background: 'var(--bg-primary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
        },
        iconBox: {
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: 'var(--accent-light)',
            color: 'var(--accent-navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        statValue: {
            fontSize: '1.8rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1',
        },
        statLabel: {
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginTop: '4px',
        },
        chartsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
        },
        chartBox: {
            height: '300px',
            background: 'var(--bg-primary)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid var(--border-color)',
        },
        chartTitle: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '20px',
            textAlign: 'center',
        }
    };

    return (
        <RevealOnScroll>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Research Impact</h2>
                    <p style={styles.subtitle}>Quantifying contributions to medical science and practice</p>
                </div>

                {/* Key Stats Row */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={styles.iconBox}><FileText size={24} /></div>
                        <div>
                            <div style={styles.statValue}>18+</div>
                            <div style={styles.statLabel}>Peer-Reviewed Publications</div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.iconBox}><Quote size={24} /></div>
                        <div>
                            <div style={styles.statValue}>150+</div>
                            <div style={styles.statLabel}>Total Citations</div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.iconBox}><Trophy size={24} /></div>
                        <div>
                            <div style={styles.statValue}>4</div>
                            <div style={styles.statLabel}>National Awards</div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.iconBox}><TrendingUp size={24} /></div>
                        <div>
                            <div style={styles.statValue}>8</div>
                            <div style={styles.statLabel}>Ongoing Projects</div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div style={styles.chartsGrid}>
                    {/* Topic Distribution */}
                    <div style={styles.chartBox}>
                        <h3 style={styles.chartTitle}>Research Focus Areas</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={topicData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {topicData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.8rem', marginTop: '-20px' }}>
                            {topicData.map((entry, index) => (
                                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[index] }}></span>
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Growth Timeline */}
                    <div style={styles.chartBox}>
                        <h3 style={styles.chartTitle}>Productivity Timeline</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'var(--bg-muted)' }}
                                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="papers" name="Publications" fill="var(--accent-navy)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="citations" name="Citations" fill="var(--accent-gold)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
};

export default ResearchMetrics;
