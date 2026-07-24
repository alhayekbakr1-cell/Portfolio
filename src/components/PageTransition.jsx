import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
    const location = useLocation();
    const reduceMotion = useReducedMotion();

    const variants = reduceMotion
        ? {
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit: { opacity: 1 },
        }
        : {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
        };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={location.pathname}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative', zIndex: 1 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
