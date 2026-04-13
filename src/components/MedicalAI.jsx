import React, { useState, useEffect, useRef } from 'react';
import { knowledgeBase, findBestMatch } from '../utils/clinicalKnowledgeBase';

// --- Assets/Data Mockups ---
// --- Assets/Data Mockups ---
// Removed Simulated CHAT_RESPONSES

const SYMPTOM_FLOW = {
    start: {
        question: "Is the patient experiencing a New Rash after starting Immune Checkpoint Inhibitors?",
        options: [
            { label: "Yes", next: "grade" },
            { label: "No", next: "end_false" }
        ]
    },
    grade: {
        question: "What is the severity of the rash (<10% BSA vs >30% BSA)?",
        options: [
            { label: "<10% BSA (Mild)", next: "mild_treatment" },
            { label: ">30% BSA (Severe)", next: "severe_treatment" }
        ]
    },
    mild_treatment: {
        question: "Recommendation: Topical Steroids and monitoring. Continue ICI.",
        isFinal: true
    },
    severe_treatment: {
        question: "Recommendation: Hold ICI. Systemic Steroids (0.5-1 mg/kg). Dermatology consult.",
        isFinal: true
    },
    end_false: {
        question: "Please monitor for other irAE symptoms (GI, Lung, Heart).",
        isFinal: true
    }
};

const PROMPT_PLAYGROUND = [
    {
        name: "Academic Researcher",
        system: "You are a senior oncologist writing for a peer-reviewed journal. Use precise medical terminology and focus on statistical significance.",
        output: "The patient's progression-free survival (PFS) demonstrated a statistically significant improvement (p<0.05) following triple-agent blockade, correlating with baseline NLR levels."
    },
    {
        name: "Medical Resident",
        system: "You are a chief resident teaching a junior student. Focus on clinical application and management steps.",
        output: "When we see the Troponin rise after ICI, we immediately start high-dose methylprednisolone. Think about the heart block risk—it's low volume but high mortality."
    },
    {
        name: "Patient Educator",
        system: "You are a patient advocate. Use simple, reassuring language and avoid jargon.",
        output: "We are watching your blood tests closely to make sure your heart stays strong while the new medicine fights the cancer. If you feel dizzy, let us know right away."
    }
];

// --- Sub-Components ---

// --- Sub-Components ---

const ResponseCard = ({ data }) => {
    if (!data) return null;
    return (
        <div style={styles.card}>
            <div style={styles.cardHeader}>
                <div style={styles.cardCategory}>{data.category}</div>
                <h4 style={styles.cardTitle}>{data.title}</h4>
            </div>
            <div style={styles.cardBody}>
                <p style={styles.cardSummary}>{data.summary}</p>
                <div style={styles.cardSection}>
                    <strong>Key Points:</strong>
                    <ul style={styles.cardList}>
                        {data.keyPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                </div>
                {data.management && data.management.length > 0 && (
                    <div style={styles.cardSection}>
                        <strong>Management:</strong>
                        <ul style={styles.cardList}>
                            {data.management.map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                    </div>
                )}
            </div>
            <div style={styles.cardFooter}>
                Reference: {data.source}
            </div>
        </div>
    );
};

const ChatUI = () => {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            content: "Hello! I am Dr. Alhayek's Clinical Evidence Engine. I can answer questions about Immunotherapy Toxicities (Myocarditis, Colitis) and Research (NLR, Cardio-Oncology) using verified guidelines.",
            id: 1,
            isCard: false
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Local AI Thinking
        setTimeout(() => {
            const match = findBestMatch(input);
            let responseMsg;

            if (match) {
                responseMsg = {
                    role: 'ai',
                    content: match, // Pass the entire object
                    id: Date.now() + 1,
                    isCard: true
                };
            } else {
                responseMsg = {
                    role: 'ai',
                    content: "I'm limited to my current clinical database (Myocarditis, Colitis, Pneumonitis, NLR Research). Please try asking about those topics!",
                    id: Date.now() + 1,
                    isCard: false
                };
            }

            setMessages(prev => [...prev, responseMsg]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.chatHistory} ref={scrollRef}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        ...styles.message,
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.role === 'user' ? 'var(--accent-navy)' : 'var(--bg-muted)',
                        color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                        borderRadius: msg.role === 'user' ? '18px 18px 2px 18px' : (msg.isCard ? '12px' : '18px 18px 18px 2px'),
                        maxWidth: msg.isCard ? '90%' : '80%',
                        padding: msg.isCard ? '0' : '12px 18px',
                    }}>
                        {msg.isCard ? <ResponseCard data={msg.content} /> : msg.content}
                    </div>
                ))}
                {isTyping && <div style={styles.typing}>AI is thinking...</div>}
            </div>
            <div style={styles.chatInputArea}>
                <input
                    style={styles.inputField}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type 'research' or 'immunotherapy'..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button style={styles.sendBtn} onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

const SymptomFlow = () => {
    const [step, setStep] = useState('start');
    const current = SYMPTOM_FLOW[step];

    return (
        <div style={styles.flowCard}>
            <div style={styles.flowProgress}>
                <div style={{ ...styles.progressBar, width: current.isFinal ? '100%' : '50%' }}></div>
            </div>
            <h4 style={styles.flowQuestion}>{current.question}</h4>
            <div style={styles.flowOptions}>
                {!current.isFinal ? (
                    current.options.map((opt, idx) => (
                        <button key={idx} style={styles.flowBtn} onClick={() => setStep(opt.next)}>
                            {opt.label}
                        </button>
                    ))
                ) : (
                    <button style={styles.resetBtn} onClick={() => setStep('start')}>Start Over</button>
                )}
            </div>
        </div>
    );
};

const EducationGenerator = () => {
    const [source, setSource] = useState("Immune checkpoint inhibitors (ICIs) can induce multi-organ inflammatory toxicities via T-cell disinhibition, requiring prompt immunosuppression with corticosteroids.");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const generate = () => {
        setLoading(true);
        setTimeout(() => {
            setResult("These cancer medicines work by waking up the immune system, but sometimes they can also cause inflammation in healthy parts of the body. Doctors treat this with steroid medicine to calm the immune system down.");
            setLoading(false);
        }, 1200);
    };

    return (
        <div style={styles.genContainer}>
            <div style={styles.genBox}>
                <label style={styles.genLabel}>Medical Abstract</label>
                <textarea
                    style={styles.genText}
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
            </div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <button style={styles.genBtn} onClick={generate} disabled={loading}>
                    {loading ? "Translating..." : "Translate to Plain Language 🚀"}
                </button>
            </div>
            {result && (
                <div style={styles.genResult}>
                    <label style={styles.genLabelResult}>Patient-Friendly Summary</label>
                    <p style={styles.genResultP}>{result}</p>
                </div>
            )}
        </div>
    );
};

const PromptPlayground = () => {
    const [active, setActive] = useState(0);

    return (
        <div style={styles.pgContainer}>
            <div style={styles.pgTabs}>
                {PROMPT_PLAYGROUND.map((p, idx) => (
                    <button key={idx} style={{
                        ...styles.pgTab,
                        borderBottom: active === idx ? '3px solid var(--accent-navy)' : 'none',
                        color: active === idx ? 'var(--accent-navy)' : 'var(--text-muted)'
                    }} onClick={() => setActive(idx)}>
                        {p.name}
                    </button>
                ))}
            </div>
            <div style={styles.pgContent}>
                <div style={styles.pgPrompt}>
                    <span style={styles.codeLabel}>System Prompt</span>
                    <code>{PROMPT_PLAYGROUND[active].system}</code>
                </div>
                <div style={styles.pgOutput}>
                    <span style={styles.codeLabel}>AI Output</span>
                    <p>{PROMPT_PLAYGROUND[active].output}</p>
                </div>
            </div>
        </div>
    );
};

const LibraryBrowser = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", ...new Set(knowledgeBase.map(k => k.category))];

    const filteredDocs = selectedCategory === "All"
        ? knowledgeBase
        : knowledgeBase.filter(k => k.category === selectedCategory);

    return (
        <div style={styles.libContainer}>
            <div style={styles.libSidebar}>
                <h4 style={styles.libHeader}>Knowledge Base</h4>
                <div style={styles.libCategories}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            style={{
                                ...styles.libCatBtn,
                                background: selectedCategory === cat ? 'rgba(30, 58, 138, 0.1)' : 'transparent',
                                color: selectedCategory === cat ? 'var(--accent-navy)' : 'var(--text-muted)',
                                fontWeight: selectedCategory === cat ? '700' : '400'
                            }}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div style={styles.libGrid}>
                {filteredDocs.map(doc => (
                    <div key={doc.id} style={styles.libCard}>
                        <div style={styles.libCardHeader}>
                            <span style={styles.libBadge}>{doc.category}</span>
                            <h5 style={styles.libTitle}>{doc.title}</h5>
                        </div>
                        <p style={styles.libSummary}>{doc.summary}</p>
                        <div style={styles.libFooter}>
                            Source: {doc.source}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Laboratory Component ---

const MedicalAILab = () => {
    const [activeTab, setActiveTab] = useState('chat');

    const tabs = [
        { id: 'chat', label: 'Knowledge Chat', icon: '💬' },
        { id: 'library', label: 'Library View', icon: '📚' },
        { id: 'flow', label: 'Symptom Flow', icon: '🌿' },
        { id: 'gen', label: 'Content Gen', icon: '✍️' },
        { id: 'pg', label: 'Prompt Playground', icon: '🎮' },
    ];

    return (
        <section id="ai-lab" style={styles.container}>
            <div className="container" style={styles.wrapper}>
                <div style={styles.header}>
                    <div style={styles.badge}>Medical AI Laboratory</div>
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Smart Clinical Intelligence</h2>
                    <p style={styles.subtitle}>
                        Exploring the frontier of AI in clinical practice through conceptual, rule-based clinical intelligence tools.
                    </p>
                </div>

                <div style={styles.tabsWrapper}>
                    <div style={styles.tabs}>
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === tab.id ? styles.tabActive : {})
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.contentArea}>
                    <div style={styles.disclaimer}>
                        <strong>DEMO MODE:</strong> These tools are rule-based simulations designed for portfolio demonstration only. No real patient data is processed.
                    </div>

                    {activeTab === 'chat' && <ChatUI />}
                    {activeTab === 'library' && <LibraryBrowser />}
                    {activeTab === 'flow' && <SymptomFlow />}
                    {activeTab === 'gen' && <EducationGenerator />}
                    {activeTab === 'pg' && <PromptPlayground />}
                </div>

                <div style={styles.roadmap}>
                    <h3 style={styles.roadmapTitle}>AI Leadership Roadmap</h3>
                    <div style={styles.roadmapGrid}>
                        <div style={styles.roadmapItem}>
                            <div style={styles.roadmapYear}>2024</div>
                            <div style={styles.roadmapText}>Institutional AI Governance Committee</div>
                        </div>
                        <div style={styles.roadmapItem}>
                            <div style={styles.roadmapYear}>2025</div>
                            <div style={styles.roadmapText}>Implementation of LLM-based Research Assistants</div>
                        </div>
                        <div style={styles.roadmapItem}>
                            <div style={styles.roadmapYear}>Future</div>
                            <div style={styles.roadmapText}>Autonomous Clinical Research Pipelines</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    container: {
        background: 'var(--bg-secondary)',
        padding: 'var(--section-padding) 0',
        position: 'relative',
        overflow: 'hidden',
    },
    wrapper: {
        position: 'relative',
        zIndex: 2,
    },
    header: {
        textAlign: 'center',
        marginBottom: '4rem',
    },
    badge: {
        display: 'inline-block',
        padding: '6px 14px',
        background: 'rgba(30, 58, 138, 0.1)',
        color: 'var(--accent-navy)',
        borderRadius: '30px',
        fontSize: '0.85rem',
        fontWeight: '700',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    subtitle: {
        color: 'var(--text-secondary)',
        fontSize: '1.2rem',
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.6',
    },
    tabsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3rem',
    },
    tabs: {
        display: 'flex',
        gap: '12px',
        padding: '8px',
        background: 'var(--bg-muted)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        overflowX: 'auto',
    },
    tab: {
        padding: '10px 24px',
        borderRadius: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '0.95rem',
        fontWeight: '600',
        color: 'var(--text-secondary)',
        whiteSpace: 'nowrap',
        transition: 'all 0.3s ease',
    },
    tabActive: {
        background: 'var(--accent-navy)',
        color: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
    },
    contentArea: {
        background: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: 'var(--shadow-lg)',
        minHeight: '500px',
        position: 'relative',
    },
    disclaimer: {
        padding: '12px 20px',
        background: 'var(--bg-muted)',
        border: '1px dashed var(--accent-navy)',
        borderRadius: '12px',
        marginBottom: '30px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
    },
    // Chat Styles
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
    },
    chatHistory: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '10px',
        marginBottom: '20px',
    },
    message: {
        maxWidth: '80%',
        padding: '12px 18px',
        fontSize: '0.95rem',
        lineHeight: '1.5',
    },
    typing: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
    },
    chatInputArea: {
        display: 'flex',
        gap: '12px',
        borderTop: '1px solid #E2E8F0',
        paddingTop: '20px',
    },
    inputField: {
        flex: 1,
        padding: '12px 18px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        fontSize: '0.95rem',
        outline: 'none',
        background: 'var(--bg-muted)',
        color: 'var(--text-primary)',
    },
    sendBtn: {
        padding: '0 24px',
        background: 'var(--accent-navy)',
        color: '#FFFFFF',
        borderRadius: '12px',
        fontWeight: '600',
    },
    // Response Card Styles
    card: {
        background: 'var(--bg-card)',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    cardHeader: {
        background: '#F8FAFC',
        padding: '12px 20px',
        borderBottom: '1px solid #E2E8F0',
    },
    cardCategory: {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--accent-blue)',
        fontWeight: '700',
        marginBottom: '4px',
    },
    cardTitle: {
        color: 'var(--accent-navy)',
        fontSize: '1.1rem',
        margin: 0,
    },
    cardBody: {
        padding: '20px',
    },
    cardSummary: {
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        marginBottom: '16px',
        lineHeight: '1.6',
    },
    cardSection: {
        marginTop: '16px',
        fontSize: '0.9rem',
    },
    cardList: {
        paddingLeft: '20px',
        marginTop: '8px',
        color: 'var(--text-secondary)',
    },
    cardFooter: {
        padding: '10px 20px',
        background: '#F1F5F9',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        borderTop: '1px solid #E2E8F0',
    },
    // Flow Styles
    flowCard: {
        textAlign: 'center',
        padding: '40px 0',
    },
    flowProgress: {
        height: '8px',
        background: '#F1F5F9',
        borderRadius: '4px',
        marginBottom: '40px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        background: 'var(--accent-blue)',
        transition: 'width 0.5s ease-in-out',
    },
    flowQuestion: {
        fontSize: '1.8rem',
        color: 'var(--accent-navy)',
        marginBottom: '40px',
        minHeight: '80px',
    },
    flowOptions: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    flowBtn: {
        padding: '14px 32px',
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-blue)',
        color: 'var(--accent-blue)',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '700',
    },
    resetBtn: {
        padding: '12px 24px',
        background: 'var(--text-muted)',
        color: '#FFFFFF',
        borderRadius: '50px',
    },
    // Gen Styles
    genContainer: {
        maxWidth: '800px',
        margin: '0 auto',
    },
    genBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    genLabel: {
        fontSize: '0.85rem',
        fontWeight: '700',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
    },
    genText: {
        width: '100%',
        height: '120px',
        padding: '18px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        fontSize: '0.95rem',
        background: 'var(--bg-muted)',
        color: 'var(--text-primary)',
        resize: 'none',
    },
    genBtn: {
        padding: '16px 32px',
        background: 'linear-gradient(45deg, var(--accent-navy), var(--accent-blue))',
        color: '#FFFFFF',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '800',
        boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
    },
    genResult: {
        background: '#F0F9FF',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid #BAE6FD',
        animation: 'fadeIn 0.5s ease',
    },
    genLabelResult: {
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#0369A1',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: '10px',
    },
    genResultP: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#0C4A6E',
    },
    // Playground Styles
    pgContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    },
    pgTabs: {
        display: 'flex',
        borderBottom: '1px solid #E2E8F0',
    },
    pgTab: {
        padding: '12px 24px',
        fontSize: '0.95rem',
        fontWeight: '700',
        background: 'none',
    },
    pgContent: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
    },
    pgPrompt: {
        padding: '20px',
        background: '#1E293B',
        borderRadius: '16px',
        color: '#94A3B8',
        fontSize: '0.85rem',
    },
    pgOutput: {
        padding: '20px',
        background: 'var(--bg-muted)',
        borderRadius: '16px',
        border: '1px dashed var(--accent-blue)',
        color: 'var(--text-primary)',
    },
    codeLabel: {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: '700',
        marginBottom: '12px',
        textTransform: 'uppercase',
        color: 'var(--accent-blue)',
    },
    // Roadmap
    roadmap: {
        marginTop: '6rem',
        padding: '40px',
        background: 'var(--accent-navy)',
        borderRadius: '24px',
        color: '#FFFFFF',
    },
    roadmapTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: '3rem',
    },
    roadmapGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px',
    },
    roadmapItem: {
        textAlign: 'center',
        position: 'relative',
    },
    roadmapYear: {
        fontSize: '2rem',
        fontWeight: '900',
        opacity: 0.3,
        marginBottom: '10px',
    },
    roadmapText: {
        fontSize: '1.1rem',
        fontWeight: '500',
    },
    // Library Styles
    libContainer: {
        display: 'flex',
        gap: '30px',
        minHeight: '400px',
    },
    libSidebar: {
        width: '200px',
        borderRight: '1px solid #E2E8F0',
        paddingRight: '20px',
    },
    libHeader: {
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        marginBottom: '16px',
        letterSpacing: '0.5px',
    },
    libCategories: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    libCatBtn: {
        textAlign: 'left',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '0.95rem',
        background: 'transparent',
    },
    libGrid: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        alignContent: 'start',
    },
    libCard: {
        padding: '20px',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        transition: 'all 0.2s ease',
    },
    libCardHeader: {
        marginBottom: '10px',
    },
    libBadge: {
        fontSize: '0.7rem',
        background: 'var(--bg-muted)',
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'var(--text-muted)',
    },
    libTitle: {
        fontSize: '1rem',
        color: 'var(--accent-navy)',
        margin: '8px 0 0 0',
    },
    libSummary: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.5',
        marginBottom: '16px',
    },
    libFooter: {
        fontSize: '0.75rem',
        color: '#94A3B8',
        fontStyle: 'italic',
        borderTop: '1px solid #F1F5F9',
        paddingTop: '8px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
};

export default MedicalAILab;
