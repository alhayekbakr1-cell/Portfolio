import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MotionBackground = () => {
    const reduceMotion = useReducedMotion();

    const styles = {
        wrapper: {
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
        },
        orb: {
            position: 'absolute',
            width: '38vw',
            height: '38vw',
            minWidth: '360px',
            minHeight: '360px',
            borderRadius: '50%',
            filter: 'blur(70px)',
            opacity: 0.16,
        },
        grid: {
            position: 'absolute',
            inset: 0,
            opacity: 0.28,
            backgroundImage:
                'linear-gradient(rgba(10, 37, 64, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 37, 64, 0.04) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(circle at 50% 20%, black, transparent 70%)',
        },
    };

    const floatTransition = {
        duration: 18,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
    };

    return (
        <div style={styles.wrapper} aria-hidden="true">
            <div style={styles.grid} />
            <motion.div
                style={{
                    ...styles.orb,
                    top: '-8%',
                    left: '-12%',
                    background: 'radial-gradient(circle, rgba(197,160,89,0.85), rgba(197,160,89,0))',
                }}
                animate={reduceMotion ? undefined : { x: [0, 55, 10], y: [0, 35, 85], scale: [1, 1.08, 0.96] }}
                transition={floatTransition}
            />
            <motion.div
                style={{
                    ...styles.orb,
                    right: '-14%',
                    top: '20%',
                    background: 'radial-gradient(circle, rgba(37,99,235,0.6), rgba(37,99,235,0))',
                }}
                animate={reduceMotion ? undefined : { x: [0, -75, -20], y: [0, -45, 35], scale: [1, 0.92, 1.12] }}
                transition={{ ...floatTransition, duration: 22 }}
            />
            <motion.div
                style={{
                    ...styles.orb,
                    left: '34%',
                    bottom: '-22%',
                    background: 'radial-gradient(circle, rgba(10,37,64,0.55), rgba(10,37,64,0))',
                }}
                animate={reduceMotion ? undefined : { x: [0, 65, -40], y: [0, -55, -20], scale: [1, 1.15, 1] }}
                transition={{ ...floatTransition, duration: 26 }}
            />
        </div>
    );
};

export default MotionBackground;
