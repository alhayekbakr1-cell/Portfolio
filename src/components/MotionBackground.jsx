import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Imports for 2D Intravascular Assets
import rbc1Src from '../assets/cells/rbc_1.png';
import rbc2Src from '../assets/cells/rbc_2.png';
import rbc3Src from '../assets/cells/rbc_3.png';

import wbcMono1Src from '../assets/cells/wbc_mono_1.png';
import wbcMono2Src from '../assets/cells/wbc_mono_2.png';
import wbcMono3Src from '../assets/cells/wbc_mono_3.png';
import wbcLymph1Src from '../assets/cells/wbc_lymph_1.png';
import wbcNeutro1Src from '../assets/cells/wbc_neutro_1.png';
import wbcNeutro2Src from '../assets/cells/wbc_neutro_2.png';
import wbcNeutro3Src from '../assets/cells/wbc_neutro_3.png';
import wbcEosino1Src from '../assets/cells/wbc_eosino_1.png';
import wbcEosino2Src from '../assets/cells/wbc_eosino_2.png';
import wbcEosino3Src from '../assets/cells/wbc_eosino_3.png';
import wbcBaso1Src from '../assets/cells/wbc_baso_1.png';

import abMonomerSrc from '../assets/cells/ab_monomer.png';
import abDimerSrc from '../assets/cells/ab_dimer.png';
import abPentamerSrc from '../assets/cells/ab_pentamer.png';

import c1Src from '../assets/cells/c1.png';
import c2Src from '../assets/cells/c2.png';
import c3Src from '../assets/cells/c3.png';
import c4Src from '../assets/cells/c4.png';
import c5Src from '../assets/cells/c5.png';
import c6Src from '../assets/cells/c6.png';
import c7Src from '../assets/cells/c7.png';
import c8Src from '../assets/cells/c8.png';
import c9Src from '../assets/cells/c9.png';

const MotionBackground = () => {
    const canvasRef = useRef(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || reduceMotion) return;

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let particles = [];
        let animationFrameId;

        // Image arrays
        const rbcImages = [rbc1Src, rbc2Src, rbc3Src].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        const wbcImages = [
            wbcMono1Src, wbcMono2Src, wbcMono3Src,
            wbcLymph1Src,
            wbcNeutro1Src, wbcNeutro2Src, wbcNeutro3Src,
            wbcEosino1Src, wbcEosino2Src, wbcEosino3Src,
            wbcBaso1Src
        ].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        const abImages = [abMonomerSrc, abDimerSrc, abPentamerSrc].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        const compImages = [c1Src, c2Src, c3Src, c4Src, c5Src, c6Src, c7Src, c8Src, c9Src].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        const getParticleCount = () => {
            if (window.innerWidth < 640) return 30;
            if (window.innerWidth < 1024) return 50;
            return 75;
        };

        const resize = () => {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        function createParticle() {
            const rand = Math.random();
            let category, imgIdx, size, alpha;

            if (rand < 0.55) {
                category = 'rbc';
                imgIdx = Math.floor(Math.random() * rbcImages.length);
                size = Math.random() * 14 + 18;
                alpha = Math.random() * 0.22 + 0.14;
            } else if (rand < 0.72) {
                category = 'wbc';
                imgIdx = Math.floor(Math.random() * wbcImages.length);
                size = Math.random() * 16 + 28;
                alpha = Math.random() * 0.24 + 0.16;
            } else if (rand < 0.87) {
                category = 'ab';
                imgIdx = Math.floor(Math.random() * abImages.length);
                size = Math.random() * 14 + 16;
                alpha = Math.random() * 0.25 + 0.16;
            } else {
                category = 'comp';
                imgIdx = Math.floor(Math.random() * compImages.length);
                size = Math.random() * 12 + 14;
                alpha = Math.random() * 0.25 + 0.16;
            }

            return {
                category,
                imgIdx,
                x: Math.random() * width,
                y: Math.random() * height,
                size,
                vx: (Math.random() - 0.5) * 0.18,
                vy: -(Math.random() * 0.32 + 0.10),
                angle: Math.random() * Math.PI * 2,
                vAngle: (Math.random() - 0.5) * 0.006,
                alpha
            };
        }

        class Particle2D {
            constructor() {
                Object.assign(this, createParticle());
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.angle += this.vAngle;

                if (this.y < -50) {
                    this.y = height + 50;
                    this.x = Math.random() * width;
                }
                if (this.x < -50) this.x = width + 50;
                if (this.x > width + 50) this.x = -50;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.globalAlpha = this.alpha;

                let img;
                if (this.category === 'rbc') img = rbcImages[this.imgIdx % rbcImages.length];
                else if (this.category === 'wbc') img = wbcImages[this.imgIdx % wbcImages.length];
                else if (this.category === 'ab') img = abImages[this.imgIdx % abImages.length];
                else img = compImages[this.imgIdx % compImages.length];

                if (img && img.complete) {
                    ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
                }

                ctx.restore();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < getParticleCount(); i++) {
                particles.push(new Particle2D());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            resize();
            init();
        };

        resize();
        init();
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [reduceMotion]);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
            aria-hidden="true"
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
};

export default MotionBackground;
