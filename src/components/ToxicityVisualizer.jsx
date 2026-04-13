import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import { DRUG_DATA, ORGAN_LOCATIONS } from '../utils/toxicityData';

const ToxicityVisualizer = () => {
    const [selectedDrug, setSelectedDrug] = useState('Cisplatin');
    const [hoveredOrgan, setHoveredOrgan] = useState(null);

    return (
        <div style={{ width: '100%', height: '700px', position: 'relative', background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)' }}>

            {/* UI Overlay */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, width: '340px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                    <h3 style={{ color: '#fff', margin: '0 0 20px 0', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', textShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>
                        <span style={{ fontSize: '1.5rem' }}>🧬</span>
                        Tx-Sim: Bio-Digital Human
                    </h3>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Active Protocol</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={selectedDrug}
                                onChange={(e) => setSelectedDrug(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '10px',
                                    background: '#1e293b',
                                    color: '#f8fafc',
                                    border: '1px solid #334155',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    appearance: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                {Object.keys(DRUG_DATA).map(drug => (
                                    <option key={drug} value={drug}>{drug}</option>
                                ))}
                            </select>
                            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }}>▼</div>
                        </div>
                    </div>

                    {DRUG_DATA[selectedDrug] && (
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8' }}></div>
                                <h4 style={{ margin: 0, color: '#e2e8f0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Clinical Profile</h4>
                            </div>
                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                                {DRUG_DATA[selectedDrug].description}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Hover Tooltip */}
            {hoveredOrgan && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: 40,
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    background: 'rgba(15, 23, 42, 0.9)',
                    padding: '24px',
                    borderRadius: '16px',
                    color: '#fff',
                    borderLeft: `4px solid ${hoveredOrgan.color}`,
                    boxShadow: `0 0 40px ${hoveredOrgan.color}30`,
                    backdropFilter: 'blur(10px)',
                    maxWidth: '300px',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '1px', marginBottom: '4px' }}>System Alert</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '12px', color: '#f8fafc' }}>{hoveredOrgan.label}</div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            padding: '6px 16px',
                            borderRadius: '20px',
                            background: hoveredOrgan.toxicity > 0.6 ? 'rgba(239, 68, 68, 0.2)' : hoveredOrgan.toxicity > 0.3 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                            color: hoveredOrgan.toxicity > 0.6 ? '#fca5a5' : hoveredOrgan.toxicity > 0.3 ? '#fcd34d' : '#bae6fd',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            border: `1px solid ${hoveredOrgan.toxicity > 0.6 ? 'rgba(239, 68, 68, 0.4)' : hoveredOrgan.toxicity > 0.3 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.4)'}`,
                            boxShadow: `0 0 20px ${hoveredOrgan.color}20`
                        }}>
                            {hoveredOrgan.toxicity > 0.6 ? 'SEVERE TOXICITY' : hoveredOrgan.toxicity > 0.3 ? 'MODERATE RISK' : 'LOW RISK'}
                        </div>
                    </div>
                </div>
            )}

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
                <color attach="background" args={['#0f172a']} />

                {/* Lighting Environment */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, 5, 10]} intensity={0.8} color="#38bdf8" />
                <pointLight position={[0, -10, 5]} intensity={0.5} color="#c084fc" />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                {/* Content */}
                <group position={[0, -1.5, 0]}>
                    <OrganicHumanBody selectedDrug={selectedDrug} setHoveredOrgan={setHoveredOrgan} />
                    <CirculatorySystem selectedDrug={selectedDrug} />
                </group>

                <OrbitControls
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    minDistance={6}
                    maxDistance={18}
                />
                <Sparkles count={50} scale={12} size={2} speed={0.4} opacity={0.2} color="#bae6fd" />
            </Canvas>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-40%) translateX(10px); }
                    to { opacity: 1; transform: translateY(-50%) translateX(0); }
                }
            `}</style>
        </div>
    );
};

// --- Organic Procedural Geometry ---
const OrganicHumanBody = ({ selectedDrug, setHoveredOrgan }) => {
    // Advanced Medical Glass Material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: '#f1f5f9',       // Clean white/blue tint
        metalness: 0.3,
        roughness: 0.1,
        transmission: 0.65,      // Glass-like transparency
        thickness: 1.5,         // Thicker refraction
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
    });

    const jointMaterial = new THREE.MeshPhysicalMaterial({
        color: '#cbd5e1',
        metalness: 0.4,
        roughness: 0.2,
        transparent: true,
        opacity: 0.5
    });

    return (
        <group>
            {/* HEAD & NECK */}
            <mesh position={[0, 4.4, 0]} material={bodyMaterial}>
                <sphereGeometry args={[0.72, 64, 64]} />
            </mesh>
            <mesh position={[0, 3.5, 0]} material={bodyMaterial}>
                <cylinderGeometry args={[0.35, 0.42, 0.8, 32]} />
            </mesh>

            {/* TORSO (Sculpted) */}
            <mesh position={[0, 2.4, 0]} material={bodyMaterial}> {/* Chest */}
                <cylinderGeometry args={[0.95, 0.8, 1.6, 32]} />
            </mesh>
            <mesh position={[0, 1.0, 0]} material={bodyMaterial}> {/* Abdomen Taper */}
                <cylinderGeometry args={[0.8, 0.85, 1.2, 32]} />
            </mesh>
            <mesh position={[0, -0.2, 0]} material={bodyMaterial}> {/* Pelvis */}
                <cylinderGeometry args={[0.85, 0.88, 1.2, 32]} />
            </mesh>

            {/* ARMS (Double Jointed + Muscles) */}
            <Limb position={[-1.6, 2.0, 0]} rotation={[0, 0, 0.15]} width={0.35} length={1.5} material={bodyMaterial} // Upper Left
            />
            <Limb position={[1.6, 2.0, 0]} rotation={[0, 0, -0.15]} width={0.35} length={1.5} material={bodyMaterial} // Upper Right
            />
            {/* Elbows */}
            <mesh position={[-1.8, 1.1, 0.1]} material={jointMaterial}><sphereGeometry args={[0.26, 32, 32]} /></mesh>
            <mesh position={[1.8, 1.1, 0.1]} material={jointMaterial}><sphereGeometry args={[0.26, 32, 32]} /></mesh>

            {/* Forearms */}
            <Limb position={[-2.0, 0.3, 0.3]} rotation={[0.2, 0, 0.2]} width={0.28} length={1.4} material={bodyMaterial} // Forearm Left
            />
            <Limb position={[2.0, 0.3, 0.3]} rotation={[0.2, 0, -0.2]} width={0.28} length={1.4} material={bodyMaterial} // Forearm Right
            />

            {/* LEGS */}
            {/* Thighs */}
            <Limb position={[-0.6, -1.8, 0]} rotation={[0, 0, 0.05]} width={0.45} length={1.9} material={bodyMaterial} // Thigh Left
            />
            <Limb position={[0.6, -1.8, 0]} rotation={[0, 0, -0.05]} width={0.45} length={1.9} material={bodyMaterial} // Thigh Right
            />

            {/* Knees */}
            <mesh position={[-0.65, -2.85, 0.1]} material={jointMaterial}><sphereGeometry args={[0.34, 32, 32]} /></mesh>
            <mesh position={[0.65, -2.85, 0.1]} material={jointMaterial}><sphereGeometry args={[0.34, 32, 32]} /></mesh>

            {/* Calves */}
            <Limb position={[-0.7, -3.9, -0.1]} rotation={[-0.05, 0, 0.02]} width={0.32} length={1.8} material={bodyMaterial} // Calf Left
            />
            <Limb position={[0.7, -3.9, -0.1]} rotation={[-0.05, 0, -0.02]} width={0.32} length={1.8} material={bodyMaterial} // Calf Right
            />

            {/* --- SCULPTED ORGANS --- */}
            {Object.entries(ORGAN_LOCATIONS).map(([key, data]) => {
                const toxicity = DRUG_DATA[selectedDrug]?.[key] || 0;
                return (
                    <SculptedOrgan
                        key={key}
                        organKey={key}
                        position={data.position}
                        baseColor={data.color}
                        toxicity={toxicity}
                        label={data.label}
                        setHoveredOrgan={setHoveredOrgan}
                    />
                );
            })}
        </group>
    );
};

// Helper to generate muscle profile
const getMuscleProfile = (width, length) => {
    const points = [];
    for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        // Sine wave for muscle bulge: 0 at ends, wider in middle
        const swelling = Math.sin(t * Math.PI) * (width * 0.3);
        const r = (width * 0.7) + swelling;
        const y = (t - 0.5) * length;
        points.push(new THREE.Vector2(r, y));
    }
    return points;
};

// LatheLimb using LatheGeometry
const Limb = ({ position, rotation, width, length, material }) => {
    const points = useMemo(() => getMuscleProfile(width, length), [width, length]);

    return (
        <mesh position={position} rotation={rotation} material={material}>
            <latheGeometry args={[points, 16]} />
        </mesh>
    );
};

// --- Sculpted Organs (Extruded Shapes) ---
const SculptedOrgan = ({ organKey, position, baseColor, toxicity, label, setHoveredOrgan }) => {
    const isToxic = toxicity > 0.05;
    const glowColor = new THREE.Color(
        toxicity > 0.7 ? '#ff0000' :
            toxicity > 0.3 ? '#f59e0b' :
                toxicity > 0 ? '#38bdf8' :
                    '#475569'
    );

    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current || !isToxic) return;
        const time = state.clock.getElapsedTime();
        const pulse = Math.sin(time * (3 + toxicity * 4)) * (0.05 * toxicity);
        meshRef.current.scale.setScalar(1 + pulse);
    });

    // Procedural Shape Generation
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        if (organKey === 'heart') {
            // Heart Shape
            s.moveTo(0, 0);
            s.bezierCurveTo(0, 0, -0.4, 0.8, -0.7, 0.8);
            s.bezierCurveTo(-1.4, 0.8, -1.4, -0.5, -1.4, -0.5);
            s.bezierCurveTo(-1.4, -1.2, 0, -2.0, 0, -2.0);
            s.bezierCurveTo(0, -2.0, 1.4, -1.3, 1.4, -0.5);
            s.bezierCurveTo(1.4, -0.5, 1.4, 0.8, 0.7, 0.8);
            s.bezierCurveTo(0.4, 0.8, 0, 0, 0, 0);
        } else if (organKey === 'lungs') {
            // Lung Lobe
            s.moveTo(0, 0);
            s.quadraticCurveTo(0.8, 1.5, 1.2, 0);
            s.quadraticCurveTo(1.0, -1.5, 0, -1.8);
            s.quadraticCurveTo(-0.5, -1.0, 0, 0);
        } else if (organKey === 'kidneys') {
            // Bean Shape
            s.moveTo(0, 0);
            s.bezierCurveTo(0.5, 0.5, 1.0, 0.5, 1.0, 0);
            s.bezierCurveTo(1.0, -1.0, 0.5, -1.0, 0.2, -0.5); // Notch
            s.bezierCurveTo(-0.2, -1.0, -0.5, -0.8, -0.5, 0); // Inner curve
            s.bezierCurveTo(-0.5, 0.5, 0, 0.5, 0, 0);
        } else {
            // Generic Blob
            s.absarc(0, 0, 0.5, 0, Math.PI * 2);
        }
        return s;
    }, [organKey]);

    const extrudeSettings = { depth: 0.4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };

    return (
        <group position={position} scale={0.25} rotation={[0, 0, Math.PI]}> {/* Generic scale down & flip logic */}
            <Float floatIntensity={isToxic ? 0.5 : 0.1} speed={2}>
                <mesh
                    ref={meshRef}
                    onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHoveredOrgan({ label, toxicity, color: glowColor.getStyle() }) }}
                    onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'default'; setHoveredOrgan(null) }}
                >
                    {organKey === 'brain' || organKey === 'bladder' || organKey === 'liver' ? (
                        // Fallback to simple geo for simpler organs
                        organKey === 'brain' ? <sphereGeometry args={[1.5, 32, 24]} /> :
                            organKey === 'liver' ? <dodecahedronGeometry args={[1.8]} /> :
                                <sphereGeometry args={[1.2, 32, 24]} />
                    ) : (
                        <extrudeGeometry args={[shape, extrudeSettings]} />
                    )}

                    <meshPhysicalMaterial
                        color={isToxic ? glowColor : '#64748b'}
                        emissive={isToxic ? glowColor : '#000000'}
                        emissiveIntensity={isToxic ? 0.8 : 0}
                        roughness={0.3}
                        metalness={0.4}
                        transmission={0}
                        transparent
                        opacity={isToxic ? 1 : 0.6}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const CirculatorySystem = ({ selectedDrug }) => {
    // Generate particles that flow through the body
    const particleCount = 150;

    // Memoize geometry/material to avoid recreation on re-renders
    const geometry = useMemo(() => new THREE.SphereGeometry(0.03, 8, 8), []);
    const material = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ef4444', transparent: true, opacity: 0.6 }), []);

    // InstancedMesh for performance
    const meshRef = useRef();
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < particleCount; i++) {
            const t = Math.random() * 100;
            const speed = 0.005 + Math.random() / 100;
            const xFactor = Math.random() * 1.5 - 0.75;
            const yFactor = Math.random() * 8 - 4;
            const zFactor = Math.random() * 1 - 0.5;
            temp.push({ speed, xFactor, yFactor, zFactor, mx: 0, my: 0, mz: 0 });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            const { speed, xFactor, yFactor, zFactor } = particle;

            particle.my = (Math.sin(time * speed + yFactor) * 2.5) + 1.0;
            particle.mx = Math.cos(time * speed * 1.5 + xFactor) * 0.8;
            particle.mz = Math.sin(time * speed * 1.5 + zFactor) * 0.8;

            dummy.position.set(particle.mx, particle.my, particle.mz);

            // Pulse size
            const scale = 0.5 + Math.sin(time * 5 + i) * 0.5;
            dummy.scale.setScalar(scale);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, particleCount]} geometry={geometry} material={material} />
    );
};

export default ToxicityVisualizer;
