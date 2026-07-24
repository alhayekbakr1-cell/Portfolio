import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, BrainCircuit, FileText, HeartPulse, MessageSquareText, ShieldCheck, Sparkles, Stethoscope, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { knowledgeBase, findBestMatch } from '../utils/clinicalKnowledgeBase';
import RevealOnScroll from './RevealOnScroll';

const QUICK_PROMPTS = [
    'How should I think about ICI myocarditis?',
    'Summarize immune checkpoint inhibitor colitis',
    'What are key points for pneumonitis?',
    'Explain NLR research in oncology',
    'Turn this into patient-friendly language'
];

const CONVERSATION_STARTERS = [
    {
        icon: HeartPulse,
        title: 'Toxicity triage',
        text: 'Ask about immune-related adverse events such as myocarditis, colitis, pneumonitis, and steroid escalation logic.'
    },
    {
        icon: FileText,
        title: 'Evidence summary',
        text: 'Convert a complex clinical topic into a structured, resident-friendly teaching summary.'
    },
    {
        icon: Activity,
        title: 'Research framing',
        text: 'Explore how biomarkers, clinical outcomes, and informatics questions can be translated into research ideas.'
    }
];

const AI_PROJECTS = [
    {
        id: 'project-rag',
        icon: Cpu,
        title: 'Local RAG Clinical Decision Engine',
        category: 'Clinical Decision Support',
        status: 'Active Portfolio Architecture',
        description: 'Privacy-first, zero-PHI vector retrieval engine embedding NCCN, ASCO, and ESC clinical oncology guidelines for rapid, evidence-grounded point-of-care reference.',
        highlights: [
            '100% offline retrieval preventing PHI exposure',
            'Structured toxicity escalation algorithms (Steroids, Infliximab, Abatacept)',
            'Context-grounded citations with zero hallucination boundary'
        ],
        tags: ['Local RAG', 'Oncology CDS', 'Vector Search', 'React & Local DB']
    },
    {
        id: 'project-resisync',
        icon: Layers,
        title: 'ResiSync: AI Residency Scheduler & Engine',
        category: 'Informatics & Operations',
        status: 'Active Development',
        description: 'AI-powered internal medicine residency scheduling and workload optimization dashboard balancing call distribution, ICU rotations, and ACGME day-off compliance.',
        highlights: [
            'Automated constraint-based shift generation',
            'ACGME 80-hour work week & 1-in-7 day off rule enforcement',
            'Real-time resident team coverage visualization'
        ],
        tags: ['Residency Informatics', 'Scheduling Optimization', 'Workflow Automation']
    },
    {
        id: 'project-persona',
        icon: ShieldCheck,
        title: 'Persona Task Manager & Draft Assistant',
        category: 'Physician Productivity',
        status: 'Prototype',
        description: 'Privacy-focused task management interface designed for resident physicians, enabling structured action extraction and email draft reviews.',
        highlights: [
            'Local-first encrypted state architecture',
            'Clinical workflow prioritization tags (ICU, Discharge, Consults)',
            'Seamless communication template generator'
        ],
        tags: ['Task Management', 'Clinical Productivity', 'Local AI']
    }
];

const PATIENT_TRANSLATION = 'These cancer medicines help your immune system recognize and fight cancer. Sometimes, the immune system can also irritate healthy organs. Your medical team watches for this early and may use anti-inflammatory medicines such as steroids if needed.';

const buildFallbackResponse = (query) => ({
    title: 'Medical AI Lab response boundary',
    category: 'Safety boundary',
    summary: `I can discuss educational concepts in immunotherapy toxicities, cardio-oncology, pneumonitis, colitis, and oncology research workflows. I do not diagnose patients or replace clinician judgment. Try asking a focused educational question, such as: “What are the key teaching points for ICI myocarditis?”`,
    keyPoints: [
        'Use this demo for education, research framing, and clinical communication practice.',
        'Do not enter identifiable patient information.',
        'For real care decisions, use institutional protocols, specialist input, and current guidelines.'
    ],
    management: [],
    source: 'Portfolio demonstration safety layer',
    query
});

const formatAssistantReply = (query) => {
    if (query.toLowerCase().includes('patient') || query.toLowerCase().includes('plain language')) {
        return {
            title: 'Patient-friendly explanation',
            category: 'Clinical communication',
            summary: PATIENT_TRANSLATION,
            keyPoints: [
                'Use plain language before medical jargon.',
                'Explain what clinicians are monitoring and why.',
                'Invite urgent symptom reporting rather than giving false reassurance.'
            ],
            management: [],
            source: 'Medical AI Lab educational example'
        };
    }

    const match = findBestMatch(query);
    return match || buildFallbackResponse(query);
};

const AssistantCard = ({ data }) => (
    <div style={styles.answerCard}>
        <div style={styles.answerHeader}>
            <span style={styles.answerCategory}>{data.category}</span>
            <h3 style={styles.answerTitle}>{data.title}</h3>
        </div>
        <p style={styles.answerSummary}>{data.summary}</p>
        {Array.isArray(data.keyPoints) && data.keyPoints.length > 0 && (
            <div style={styles.answerSection}>
                <strong>Key teaching points</strong>
                <ul style={styles.answerList}>
                    {data.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
            </div>
        )}
        {Array.isArray(data.management) && data.management.length > 0 && (
            <div style={styles.answerSection}>
                <strong>Management framework</strong>
                <ul style={styles.answerList}>
                    {data.management.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
            </div>
        )}
        <div style={styles.answerFooter}>Source: {data.source}</div>
    </div>
);

const MedicalAILab = () => {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Welcome to the Medical AI Lab. I am a portfolio demo for conversational clinical education, research framing, and medical communication. Ask about immunotherapy toxicity, cardio-oncology, pneumonitis, colitis, or oncology research workflows.',
            type: 'text'
        }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [activeMode, setActiveMode] = useState('Clinician');
    const scrollRef = useRef(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const categories = useMemo(() => {
        return ['All', ...Array.from(new Set(knowledgeBase.map((item) => item.category).filter(Boolean)))];
    }, []);

    const sendMessage = (value = input) => {
        const query = value.trim();
        if (!query) return;

        setMessages((previous) => [...previous, { id: `user-${Date.now()}`, role: 'user', content: query, type: 'text' }]);
        setInput('');
        setIsThinking(true);

        window.setTimeout(() => {
            const reply = formatAssistantReply(query);
            setMessages((previous) => [
                ...previous,
                { id: `assistant-${Date.now()}`, role: 'assistant', content: reply, type: 'card' }
            ]);
            setIsThinking(false);
        }, 650);
    };

    const reveal = reduceMotion ? {} : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <section id="ai-lab" style={styles.page}>
            <style>{css}</style>
            <div className="container" style={styles.wrapper}>
                <motion.div style={styles.hero} {...reveal}>
                    <div style={styles.badge}><BrainCircuit size={16} /> Conversational Medical AI Lab</div>
                    <h1 style={styles.title}>Medical, conversational, and clinically grounded.</h1>
                    <p style={styles.subtitle}>
                        A safe portfolio demo showing how AI can support clinical education, evidence summaries, research ideation, and patient-friendly communication.
                    </p>
                    <div style={styles.safetyStrip}>
                        <ShieldCheck size={18} /> Educational demo only · no patient-specific diagnosis · no protected health information
                    </div>
                </motion.div>

                <motion.div style={styles.modeGrid} {...reveal} transition={{ ...reveal.transition, delay: 0.05 }}>
                    {['Clinician', 'Researcher', 'Patient educator'].map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setActiveMode(mode)}
                            style={{ ...styles.modeButton, ...(activeMode === mode ? styles.modeButtonActive : {}) }}
                        >
                            {mode === 'Clinician' && <Stethoscope size={18} />}
                            {mode === 'Researcher' && <Sparkles size={18} />}
                            {mode === 'Patient educator' && <MessageSquareText size={18} />}
                            {mode}
                        </button>
                    ))}
                </motion.div>

                <div style={styles.mainGrid}>
                    <motion.aside style={styles.sidePanel} {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
                        <h2 style={styles.panelTitle}>What this lab can do</h2>
                        <div style={styles.starterList}>
                            {CONVERSATION_STARTERS.map(({ icon: Icon, title, text }) => (
                                <div key={title} style={styles.starterCard} className="med-ai-lift">
                                    <Icon size={20} style={styles.starterIcon} />
                                    <div>
                                        <h3 style={styles.starterTitle}>{title}</h3>
                                        <p style={styles.starterText}>{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{ ...styles.panelTitle, marginTop: '28px' }}>Knowledge areas</h2>
                        <div style={styles.categoryWrap}>
                            {categories.map((category) => <span key={category} style={styles.categoryChip}>{category}</span>)}
                        </div>
                    </motion.aside>

                    <motion.div style={styles.chatShell} {...reveal} transition={{ ...reveal.transition, delay: 0.16 }}>
                        <div style={styles.chatTopbar}>
                            <div>
                                <p style={styles.chatKicker}>Active mode</p>
                                <h2 style={styles.chatTitle}>{activeMode} conversation</h2>
                            </div>
                            <div style={styles.onlinePill}>Local demo engine</div>
                        </div>

                        <div style={styles.promptRow}>
                            {QUICK_PROMPTS.map((prompt) => (
                                <button key={prompt} type="button" style={styles.promptChip} onClick={() => sendMessage(prompt)}>
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        <div style={styles.chatHistory} ref={scrollRef}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    style={{
                                        ...styles.messageRow,
                                        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <div style={{
                                        ...styles.messageBubble,
                                        ...(message.role === 'user' ? styles.userBubble : styles.assistantBubble),
                                        ...(message.type === 'card' ? styles.cardBubble : {})
                                    }}>
                                        {message.type === 'card' ? <AssistantCard data={message.content} /> : message.content}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div style={styles.thinkingBubble}>
                                    <span className="thinking-dot" />
                                    <span className="thinking-dot" />
                                    <span className="thinking-dot" />
                                    Thinking through the clinical context...
                                </div>
                            )}
                        </div>

                        <div style={styles.inputArea}>
                            <input
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
                                placeholder="Ask a medical education question..."
                                style={styles.input}
                                aria-label="Ask the Medical AI Lab a question"
                            />
                            <button type="button" style={styles.sendButton} onClick={() => sendMessage()}>Send</button>
                        </div>
                    </motion.div>
                </div>

                {/* Section 2: Clinical Informatics & Medical AI Projects Grid */}
                <div style={{ marginTop: '90px' }}>
                    <RevealOnScroll>
                        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
                            <span style={styles.badge}><Cpu size={16} /> Clinical Informatics Systems</span>
                            <h2 style={{ ...styles.title, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Featured Medical AI Projects</h2>
                            <p style={{ ...styles.subtitle, maxWidth: '680px' }}>
                                Architecture and software frameworks developed for local RAG clinical decision support, residency scheduling, and physician task management.
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div style={styles.projectsGrid}>
                        {AI_PROJECTS.map((proj) => {
                            const IconComponent = proj.icon;
                            return (
                                <RevealOnScroll key={proj.id}>
                                    <div style={styles.projCard} className="med-ai-lift">
                                        <div style={styles.projHeader}>
                                            <div style={styles.projIconBox}>
                                                <IconComponent size={24} color="var(--accent-navy)" />
                                            </div>
                                            <div>
                                                <span style={styles.projCategory}>{proj.category} • {proj.status}</span>
                                                <h3 style={styles.projTitle}>{proj.title}</h3>
                                            </div>
                                        </div>
                                        <p style={styles.projDesc}>{proj.description}</p>
                                        
                                        <div style={styles.highlightSection}>
                                            <strong style={{ fontSize: '0.85rem', color: 'var(--accent-navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Core Capabilities</strong>
                                            <ul style={styles.highlightList}>
                                                {proj.highlights.map((h, idx) => (
                                                    <li key={idx} style={styles.highlightItem}>
                                                        <CheckCircle2 size={15} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '3px' }} />
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={styles.projTagGroup}>
                                            {proj.tags.map((t, i) => (
                                                <span key={i} style={styles.projTag}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    page: {
        padding: '130px 0 110px',
        background: 'transparent',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
    },
    wrapper: { position: 'relative', zIndex: 1 },
    hero: { textAlign: 'center', maxWidth: '920px', margin: '0 auto 34px' },
    badge: {
        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '999px',
        background: 'var(--accent-light)', color: 'var(--accent-navy)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '18px'
    },
    title: {
        fontSize: 'clamp(2.5rem, 5vw, 4.7rem)',
        color: 'var(--text-primary)',
        lineHeight: 1.02,
        marginBottom: '18px'
    },
    subtitle: { color: 'var(--text-secondary)', fontSize: '1.16rem', lineHeight: 1.8, margin: '0 auto 22px', maxWidth: '760px' },
    safetyStrip: {
        display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
        padding: '10px 14px', borderRadius: '999px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.74)',
        color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: 700
    },
    modeGrid: { display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' },
    modeButton: {
        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 16px', borderRadius: '999px',
        background: 'rgba(255,255,255,0.8)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', fontWeight: 800
    },
    modeButtonActive: { background: 'var(--accent-navy)', color: '#fff', borderColor: 'var(--accent-navy)', boxShadow: '0 18px 38px rgba(10,37,64,0.16)' },
    mainGrid: { display: 'grid', gridTemplateColumns: 'minmax(270px, 0.82fr) minmax(420px, 1.4fr)', gap: '28px', alignItems: 'stretch' },
    sidePanel: {
        padding: '26px', borderRadius: '28px', background: 'rgba(255,255,255,0.78)',
        border: '1px solid rgba(226,232,240,0.82)', boxShadow: '0 24px 70px rgba(10,37,64,0.10)'
    },
    panelTitle: { fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-primary)' },
    starterList: { display: 'flex', flexDirection: 'column', gap: '14px' },
    starterCard: { display: 'flex', gap: '13px', padding: '15px', borderRadius: '18px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' },
    starterIcon: { color: 'var(--accent-navy)', flex: '0 0 auto', marginTop: '2px' },
    starterTitle: { fontSize: '1rem', marginBottom: '4px', color: 'var(--text-primary)' },
    starterText: { color: 'var(--text-secondary)', lineHeight: 1.55, fontSize: '0.92rem', margin: 0 },
    categoryWrap: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
    categoryChip: { padding: '7px 10px', borderRadius: '999px', background: 'var(--accent-light)', color: 'var(--accent-navy)', fontSize: '0.78rem', fontWeight: 800 },
    chatShell: {
        minHeight: '650px', display: 'flex', flexDirection: 'column', borderRadius: '30px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(16px)', border: '1px solid rgba(226,232,240,0.82)',
        boxShadow: '0 28px 80px rgba(10,37,64,0.14)'
    },
    chatTopbar: { padding: '22px 24px', display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', borderBottom: '1px solid var(--border-color)' },
    chatKicker: { margin: 0, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 },
    chatTitle: { margin: 0, fontSize: '1.4rem' },
    onlinePill: { padding: '8px 11px', borderRadius: '999px', background: '#DCFCE7', color: '#166534', fontWeight: 800, fontSize: '0.78rem' },
    promptRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '14px 18px', borderBottom: '1px solid var(--border-color)' },
    promptChip: { padding: '8px 11px', borderRadius: '999px', background: 'var(--bg-muted)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', fontWeight: 700, fontSize: '0.82rem' },
    chatHistory: { flex: 1, overflowY: 'auto', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' },
    messageRow: { display: 'flex' },
    messageBubble: { maxWidth: '82%', padding: '13px 16px', borderRadius: '20px', lineHeight: 1.6, fontSize: '0.95rem' },
    userBubble: { background: 'var(--accent-navy)', color: '#fff', borderBottomRightRadius: '6px' },
    assistantBubble: { background: 'var(--bg-muted)', color: 'var(--text-primary)', borderBottomLeftRadius: '6px' },
    cardBubble: { padding: 0, background: 'transparent', maxWidth: '92%' },
    thinkingBubble: { alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '7px', color: 'var(--text-muted)', fontSize: '0.88rem', padding: '10px 14px' },
    inputArea: { display: 'flex', gap: '12px', padding: '18px', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.7)' },
    input: { flex: 1, padding: '14px 16px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' },
    sendButton: { padding: '0 24px', borderRadius: '16px', background: 'var(--accent-navy)', color: '#fff', fontWeight: 800 },
    answerCard: { borderRadius: '20px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 18px 45px rgba(10,37,64,0.10)' },
    answerHeader: { padding: '16px 18px', background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' },
    answerCategory: { color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.72rem', fontWeight: 900 },
    answerTitle: { margin: '6px 0 0', color: 'var(--text-primary)', fontSize: '1.2rem' },
    answerSummary: { margin: 0, padding: '18px 18px 0', color: 'var(--text-secondary)', lineHeight: 1.65 },
    answerSection: { padding: '16px 18px 0', color: 'var(--text-primary)' },
    answerList: { marginTop: '8px', paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.6 },
    answerFooter: { marginTop: '16px', padding: '12px 18px', background: 'var(--bg-muted)', color: 'var(--text-muted)', fontSize: '0.78rem', borderTop: '1px solid var(--border-color)' },

    // Projects Grid Styles
    projectsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
    },
    projCard: {
        background: 'var(--bg-card)',
        padding: '30px',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    projHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '16px',
    },
    projIconBox: {
        padding: '14px',
        borderRadius: '16px',
        background: 'var(--accent-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    projCategory: {
        fontSize: '0.75rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
        letterSpacing: '0.5px',
        display: 'block',
        marginBottom: '4px',
    },
    projTitle: {
        fontSize: '1.3rem',
        fontWeight: '800',
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: '1.25',
    },
    projDesc: {
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        marginBottom: '20px',
    },
    highlightSection: {
        background: 'var(--bg-muted)',
        padding: '16px 18px',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '20px',
    },
    highlightList: {
        listStyle: 'none',
        padding: 0,
        margin: '10px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    highlightItem: {
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        lineHeight: '1.4',
    },
    projTagGroup: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginTop: 'auto',
    },
    projTag: {
        fontSize: '0.75rem',
        fontWeight: '700',
        padding: '5px 12px',
        borderRadius: '12px',
        background: 'var(--accent-light)',
        color: 'var(--accent-navy)',
        border: '1px solid var(--border-color)',
    }
};

const css = `
    .med-ai-lift { transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1); }
    .med-ai-lift:hover { transform: translateY(-4px); box-shadow: 0 18px 45px rgba(10,37,64,0.10); }
    .thinking-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--accent-navy); display: inline-block; animation: medAiPulse 1s infinite ease-in-out; }
    .thinking-dot:nth-child(2) { animation-delay: 0.15s; }
    .thinking-dot:nth-child(3) { animation-delay: 0.3s; }
    @keyframes medAiPulse { 0%, 80%, 100% { opacity: 0.3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
    @media (max-width: 900px) { #ai-lab .container { padding-left: 18px; padding-right: 18px; } }
    @media (max-width: 860px) { #ai-lab [style*="grid-template-columns"] { grid-template-columns: 1fr !important; } }
    @media (prefers-reduced-motion: reduce) { .thinking-dot { animation: none; } }
`;

export default MedicalAILab;
