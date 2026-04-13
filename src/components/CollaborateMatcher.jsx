import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FlaskConical, Stethoscope, Code, Brain, ChevronRight, Loader2, Sparkles, Network } from 'lucide-react';
import { activeLabProjects, availableRoles, availableSkills, availableInterests } from '../utils/labProjectsData';

const CollaborateMatcher = () => {
    const [step, setStep] = useState(1);
    
    // User Profile State
    const [role, setRole] = useState('');
    const [skills, setSkills] = useState([]);
    const [interests, setInterests] = useState([]);
    
    // Results
    const [matches, setMatches] = useState([]);
    const [isCalculating, setIsCalculating] = useState(false);

    const toggleSelection = (item, list, setList) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const calculateMatches = () => {
        setIsCalculating(true);
        setStep(5); // Move to loading step
        
        setTimeout(() => {
            const scoredProjects = activeLabProjects.map(project => {
                let score = 0;
                let maxPossibleScore = 100;

                // 1. Role Match (Pass/Fail weight +20)
                if (project.preferredRole.includes(role)) score += 20;

                // 2. Skill Match (Count matching vs required)
                const matchingSkills = project.requiredSkills.filter(s => skills.includes(s));
                const skillScore = (matchingSkills.length / project.requiredSkills.length) * 50;
                score += skillScore;

                // 3. Interest Bonus (+30)
                if (interests.includes(project.clinicalFocus) || interests.includes(project.technicalFocus)) {
                    score += 30;
                }

                // Ensure score caps cleanly
                const finalScore = Math.min(Math.round(score), 99); // 99 looks algorithmic and realistic

                return { ...project, matchScore: finalScore, matchedSkills: matchingSkills };
            });

            // Sort by highest score and filter strictly above 40
            const validMatches = scoredProjects
                .filter(p => p.matchScore >= 40)
                .sort((a, b) => b.matchScore - a.matchScore);

            setMatches(validMatches);
            setIsCalculating(false);
            setStep(6); // Move to results
        }, 2500); // 2.5s dramatic loading delay
    };

    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    };

    const PillButton = ({ active, onClick, children }) => (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: active ? '2px solid var(--accent-teal)' : '2px solid var(--border-color)',
                background: active ? 'rgba(20, 184, 166, 0.1)' : 'var(--bg-card)',
                color: active ? 'var(--accent-teal)' : 'var(--text-primary)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            {children}
        </button>
    );

    return (
        <section style={{ padding: '120px 20px 80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {/* Header Sequence */}
                {step < 5 && (
                    <motion.div initial={{opacity: 0, y: -20}} animate={{opacity:1, y:0}} style={{textAlign: 'center', marginBottom: '40px'}}>
                        <div style={{display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent-teal)', padding: '8px 16px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px'}}>
                            <Network size={16} /> Alhayek Lab Algorithmic Matcher
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-navy)', marginBottom: '15px' }}>
                            Join the Research Lab
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Tell us your background, skills, and interests. Our algorithm will immediately identify the active datasets and clinical projects you are best suited for.
                        </p>
                        
                        {/* Progress Bar */}
                        <div style={{display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px'}}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{height: '6px', width: '40px', borderRadius: '3px', background: step >= i ? 'var(--accent-teal)' : 'var(--border-color)', transition: 'background 0.3s ease'}} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* State Machine */}
                <div style={{ position: 'relative', minHeight: '400px' }}>
                    <AnimatePresence mode="wait">
                        
                        {/* Step 1: Role */}
                        {step === 1 && (
                            <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)'}}>
                                <h2 style={{color: 'var(--text-primary)', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <Stethoscope style={{color: 'var(--accent-navy)'}}/> What is your current role?
                                </h2>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
                                    {availableRoles.map(r => (
                                        <PillButton key={r} active={role === r} onClick={() => setRole(r)}>
                                            {r} {role === r && <CheckCircle2 size={16}/>}
                                        </PillButton>
                                    ))}
                                </div>
                                <div style={{marginTop: '40px', display: 'flex', justifyContent: 'flex-end'}}>
                                    <button 
                                        disabled={!role}
                                        onClick={() => setStep(2)}
                                        style={{padding: '12px 28px', background: role ? 'var(--accent-navy)' : 'var(--border-color)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: role ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s'}}
                                    >
                                        Next Phase <ChevronRight size={18}/>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Skills */}
                        {step === 2 && (
                            <motion.div key="step2" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)'}}>
                                <h2 style={{color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <Code style={{color: 'var(--accent-teal)'}}/> What are your core skills?
                                </h2>
                                <p style={{color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '0.95rem'}}>Select multiple. Be honest, this ensures a high-quality project match.</p>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
                                    {availableSkills.map(s => (
                                        <PillButton key={s} active={skills.includes(s)} onClick={() => toggleSelection(s, skills, setSkills)}>
                                            {s} {skills.includes(s) && <CheckCircle2 size={16}/>}
                                        </PillButton>
                                    ))}
                                </div>
                                <div style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between'}}>
                                    <button onClick={() => setStep(1)} style={{padding: '12px 28px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer'}}>Back</button>
                                    <button 
                                        disabled={skills.length === 0}
                                        onClick={() => setStep(3)}
                                        style={{padding: '12px 28px', background: skills.length > 0 ? 'var(--accent-navy)' : 'var(--border-color)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: skills.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s'}}
                                    >
                                        Next Phase <ChevronRight size={18}/>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Interests */}
                        {step === 3 && (
                            <motion.div key="step3" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)'}}>
                                <h2 style={{color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <Brain style={{color: '#8b5cf6'}}/> What are your clinical interests?
                                </h2>
                                <p style={{color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '0.95rem'}}>Select domains you want to research.</p>
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '15px'}}>
                                    {availableInterests.map(i => (
                                        <PillButton key={i} active={interests.includes(i)} onClick={() => toggleSelection(i, interests, setInterests)}>
                                            {i} {interests.includes(i) && <CheckCircle2 size={16}/>}
                                        </PillButton>
                                    ))}
                                </div>
                                <div style={{marginTop: '40px', display: 'flex', justifyContent: 'space-between'}}>
                                    <button onClick={() => setStep(2)} style={{padding: '12px 28px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer'}}>Back</button>
                                    <button 
                                        disabled={interests.length === 0}
                                        onClick={() => setStep(4)}
                                        style={{padding: '12px 28px', background: interests.length > 0 ? 'var(--accent-navy)' : 'var(--border-color)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: interests.length > 0 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s'}}
                                    >
                                        Review Profile <ChevronRight size={18}/>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Summary Pre-Calculate */}
                        {step === 4 && (
                            <motion.div key="step4" variants={containerVariants} initial="hidden" animate="visible" exit="exit" style={{background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', textAlign: 'center'}}>
                                <FlaskConical size={48} style={{color: 'var(--accent-teal)', margin: '0 auto 20px'}}/>
                                <h2 style={{color: 'var(--text-primary)', marginBottom: '15px'}}>Initialize Algorithm?</h2>
                                <p style={{color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px'}}>
                                    Ready to compile your profile as a <strong>{role}</strong> with <strong>{skills.length} core skills</strong> against the active Alhayek Lab dataset?
                                </p>
                                <div style={{display: 'flex', justifyContent: 'center', gap: '15px'}}>
                                    <button onClick={() => setStep(3)} style={{padding: '12px 28px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer'}}>Edit Profile</button>
                                    <button onClick={calculateMatches} style={{padding: '12px 28px', background: 'var(--accent-teal)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(20,184,166,0.3)'}}>
                                        <Sparkles size={18}/> Calculate Matches
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Loading Calculation */}
                        {step === 5 && (
                            <motion.div key="step5" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0}} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'300px'}}>
                                <Loader2 size={48} className="lucide-spin" style={{color:'var(--accent-navy)', marginBottom:'20px', animation: 'spin 1.5s linear infinite'}}/>
                                <h3 style={{color:'var(--accent-navy)', fontFamily:'var(--font-serif)'}}>Querying Active Projects...</h3>
                                <p style={{color:'var(--text-secondary)', marginTop:'10px'}}>Cross-referencing {skills.length} skills through the matrix.</p>
                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                            </motion.div>
                        )}

                        {/* Step 6: Results */}
                        {step === 6 && (
                            <motion.div key="step6" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                                <div style={{textAlign: 'center', marginBottom: '40px'}}>
                                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-navy)', marginBottom: '10px' }}>
                                        {matches.length > 0 ? "Optimal Projects Found" : "No Perfect Matches"}
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>
                                        {matches.length > 0 
                                            ? `We found ${matches.length} active project${matches.length > 1 ? 's' : ''} well-suited to your profile.` 
                                            : "Currently, no active projects perfectly match your skill profile, but we accept general applications."}
                                    </p>
                                </div>

                                <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                                    {matches.map((match, idx) => (
                                        <motion.div 
                                            key={match.id}
                                            initial={{opacity:0, y:20}}
                                            animate={{opacity:1, y:0, transition:{delay: idx * 0.15}}}
                                            style={{
                                                background: 'var(--bg-card)',
                                                borderRadius: '20px',
                                                border: '1px solid var(--border-color)',
                                                overflow: 'hidden',
                                                boxShadow: 'var(--shadow-md)',
                                                position: 'relative'
                                            }}
                                        >
                                            <div style={{position:'absolute', top:0, left:0, bottom:0, width:'6px', background: match.bgColor}}/>
                                            <div style={{padding: '30px', paddingLeft: '40px'}}>
                                                
                                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'20px', marginBottom:'20px'}}>
                                                    <div>
                                                        <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                                                            <span style={{background:'var(--bg-primary)', color:'var(--text-secondary)', padding:'4px 10px', borderRadius:'12px', fontSize:'0.8rem', fontWeight:'bold', border:'1px solid var(--border-color)'}}>{match.clinicalFocus}</span>
                                                            <span style={{background:'var(--bg-primary)', color:'var(--text-secondary)', padding:'4px 10px', borderRadius:'12px', fontSize:'0.8rem', fontWeight:'bold', border:'1px solid var(--border-color)'}}>{match.technicalFocus}</span>
                                                        </div>
                                                        <h3 style={{fontSize:'1.5rem', color:'var(--text-primary)', marginBottom:'10px'}}>{match.title}</h3>
                                                        <p style={{color:'var(--text-secondary)', lineHeight:1.6, maxWidth:'600px'}}>{match.description}</p>
                                                    </div>
                                                    
                                                    {/* Score Ring / Block */}
                                                    <div style={{background: 'rgba(20, 184, 166, 0.1)', padding:'15px 25px', borderRadius:'16px', textAlign:'center', border:`2px solid ${match.bgColor}40`}}>
                                                        <div style={{fontSize:'2.5rem', fontWeight:'bold', color: match.bgColor, lineHeight:1}}>{match.matchScore}%</div>
                                                        <div style={{fontSize:'0.8rem', color:'var(--text-secondary)', textTransform:'uppercase', fontWeight:'bold', letterSpacing:'1px', marginTop:'5px'}}>Match</div>
                                                    </div>
                                                </div>

                                                <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'25px'}}>
                                                    <strong style={{color:'var(--text-primary)', fontSize:'0.9rem'}}>Your Matched Skills:</strong>
                                                    <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                                                        {match.matchedSkills.length > 0 ? match.matchedSkills.map(s => (
                                                            <span key={s} style={{background: 'var(--accent-teal)', color:'#fff', padding:'4px 12px', borderRadius:'20px', fontSize:'0.85rem', display:'flex', alignItems:'center', gap:'4px'}}>
                                                                <CheckCircle2 size={12}/> {s}
                                                            </span>
                                                        )) : (
                                                            <span style={{color:'var(--text-secondary)', fontSize:'0.9rem', fontStyle:'italic'}}>No direct technical skill overlaps found, high interest synergy.</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <a 
                                                    href={`mailto:b@alhayek.com?subject=Lab Collaboration Inquiry: ${match.title}&body=Hi Dr. Alhayek,%0D%0A%0D%0AI completed the algorithm matcher and received a ${match.matchScore}%25 match for your project '${match.title}'.%0D%0A%0D%0AMy Role: ${role}%0D%0AMy Skills: ${skills.join(', ')}%0D%0A%0D%0AI would love to discuss contributing to the lab.`}
                                                    style={{display:'inline-flex', alignItems:'center', gap:'8px', background: match.bgColor, color:'#fff', padding:'12px 24px', borderRadius:'30px', fontWeight:'bold', textDecoration:'none', transition:'opacity 0.2s ease'}}
                                                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                                                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                                >
                                                    Apply to Project <ChevronRight size={18}/>
                                                </a>

                                            </div>
                                        </motion.div>
                                    ))}

                                    <div style={{textAlign: 'center', marginTop: '30px'}}>
                                        <button onClick={() => { setStep(1); setRole(''); setSkills([]); setInterests([]); setMatches([])}} style={{background:'transparent', border:'none', color:'var(--accent-navy)', fontWeight:'bold', cursor:'pointer', borderBottom:'2px solid var(--accent-navy)'}}>
                                            Reset Algorithm & Run Again
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CollaborateMatcher;
