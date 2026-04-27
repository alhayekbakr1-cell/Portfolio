import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SectionMotion = ({ children, delay = 0, style = {}, className = '' }) => {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <div style={style} className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};

export default SectionMotion;
