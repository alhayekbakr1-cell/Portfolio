
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// --- Procedural Organ Geometries ---

export const Brain = ({ intensity, color = '#ff99cc' }) => (
    <group position={[0, 4.2, 0]}>
        {/* Left Hemisphere */}
        <mesh position={[-0.25, 0, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff3333' : color} emissive={intensity > 0 ? '#ff0000' : '#000000'} emissiveIntensity={intensity} roughness={0.3} />
        </mesh>
        {/* Right Hemisphere */}
        <mesh position={[0.25, 0, 0]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff3333' : color} emissive={intensity > 0 ? '#ff0000' : '#000000'} emissiveIntensity={intensity} roughness={0.3} />
        </mesh>
        {/* Cerebellum */}
        <mesh position={[0, -0.3, -0.2]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff3333' : color} emissive={intensity > 0 ? '#ff0000' : '#000000'} emissiveIntensity={intensity} />
        </mesh>
    </group>
);

export const Lungs = ({ intensity, color = '#ffb3b3' }) => (
    <group position={[0, 2.2, 0]}>
        {/* Left Lung */}
        <mesh position={[-0.45, 0, 0.1]} rotation={[0, 0, 0.1]}>
            <capsuleGeometry args={[0.35, 1.2, 4, 16]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff3333' : color} emissive={intensity > 0 ? '#ff0000' : '#000000'} emissiveIntensity={intensity} transparent opacity={0.8} />
        </mesh>
        {/* Right Lung */}
        <mesh position={[0.45, 0, 0.1]} rotation={[0, 0, -0.1]}>
            <capsuleGeometry args={[0.35, 1.2, 4, 16]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff3333' : color} emissive={intensity > 0 ? '#ff0000' : '#000000'} emissiveIntensity={intensity} transparent opacity={0.8} />
        </mesh>
    </group>
);

export const Heart = ({ intensity, color = '#ff4d4d' }) => (
    <group position={[0, 2.2, 0.4]} rotation={[0, 0, -0.2]}>
        <mesh>
            <dodecahedronGeometry args={[0.35, 1]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff0000' : color} emissive={intensity > 0 ? '#ff0000' : '#000000'} emissiveIntensity={intensity + 0.5} roughness={0.2} />
        </mesh>
    </group>
);

export const Kidneys = ({ intensity, color = '#e6b800' }) => {
    // Bean shape approximation using specific scale/rotation on sphere
    return (
        <group position={[0, -0.2, -0.3]}>
            {/* Left Kidney */}
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.15, 0.4, 4, 12]} />
                <meshStandardMaterial color={intensity > 0 ? '#ff3300' : color} emissive={intensity > 0 ? '#ff3300' : '#000000'} emissiveIntensity={intensity} />
            </mesh>
            {/* Right Kidney */}
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.15, 0.4, 4, 12]} />
                <meshStandardMaterial color={intensity > 0 ? '#ff3300' : color} emissive={intensity > 0 ? '#ff3300' : '#000000'} emissiveIntensity={intensity} />
            </mesh>
        </group>
    );
};

export const Liver = ({ intensity, color = '#cc6600' }) => (
    <group position={[0, 0.8, 0.3]}>
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, 1.5]}>
            <capsuleGeometry args={[0.3, 0.8, 4, 16]} />
            <meshStandardMaterial color={intensity > 0 ? '#ff5500' : color} emissive={intensity > 0 ? '#ff5500' : '#000000'} emissiveIntensity={intensity} />
        </mesh>
    </group>
);

export const Intestines = ({ intensity, color = '#ffcc99' }) => (
    <group position={[0, -1.2, 0.2]}>
        <mesh scale={[0.4, 0.4, 0.4]}>
            <torusKnotGeometry args={[1, 0.4, 64, 8, 2, 3]} />
            <meshStandardMaterial color={intensity > 0 ? '#cc4400' : color} emissive={intensity > 0 ? '#cc4400' : '#000000'} emissiveIntensity={intensity} roughness={0.6} />
        </mesh>
    </group>
);

// --- Master Organ Container ---

const InternalOrgans = ({ toxicities }) => {
    return (
        <group>
            <Brain intensity={toxicities.brain || toxicities.ears * 0.5} />
            <Lungs intensity={toxicities.lungs} />
            <Heart intensity={toxicities.heart} />
            <Liver intensity={toxicities.liver} />
            <Kidneys intensity={toxicities.kidneys} />
            <Intestines intensity={toxicities.gut || toxicities.bladder} />
        </group>
    );
};

export default InternalOrgans;
