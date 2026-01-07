"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LightningStorm() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStriking, setIsStriking] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;
        let strikeTimeout: NodeJS.Timeout;

        const createLightning = (
            startX: number,
            startY: number,
            endX: number,
            endY: number,
            branchProbability = 0.3
        ) => {
            const segments: { x: number; y: number }[] = [];
            segments.push({ x: startX, y: startY });

            let currentX = startX;
            let currentY = startY;

            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const steps = Math.floor(distance / 10); // Segment length

            for (let i = 0; i < steps; i++) {
                // Main direction bias
                const progress = (i + 1) / steps;
                const targetX = startX + dx * progress;
                const targetY = startY + dy * progress;

                // Jagged randomness
                const randomX = (Math.random() - 0.5) * 30; // Horizontal jitter
                const randomY = (Math.random() - 0.5) * 30; // Vertical jitter

                currentX = targetX + randomX;
                currentY = targetY + randomY;

                segments.push({ x: currentX, y: currentY });

                // Branching logic
                if (Math.random() < branchProbability && i < steps - 5) {
                    // Recurse for a small branch
                    const branchEndX = currentX + (Math.random() - 0.5) * 150;
                    const branchEndY = currentY + Math.random() * 150;
                    // Draw branch immediately or store it? For simplicity, we won't fully recurse deep here to save perf,
                    // but in a more complex system we would.
                    // Let's just draw a simple short branch
                    /* We won't implement deep recursion to avoid complexity, 
                       but we could add a secondary path here if we wanted. */
                }
            }
            segments.push({ x: endX, y: endY });
            return segments;
        };

        const drawLightning = (segments: { x: number; y: number }[], opacity: number) => {
            if (!ctx) return;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(220, 220, 255, 0.8)"; // Blue-white glow

            if (segments.length > 0) {
                ctx.moveTo(segments[0].x, segments[0].y);
                for (let i = 1; i < segments.length; i++) {
                    ctx.lineTo(segments[i].x, segments[i].y);
                }
            }
            ctx.stroke();

            // Secondary glow used red/purple for upside down feel?
            // Upside down lightning is often red/blue.
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 50, 50, ${opacity * 0.5})`;
            ctx.lineWidth = 6;
            ctx.shadowBlur = 30;
            ctx.shadowColor = "rgba(255, 0, 0, 0.5)";
            if (segments.length > 0) {
                ctx.moveTo(segments[0].x, segments[0].y);
                for (let i = 1; i < segments.length; i++) {
                    ctx.lineTo(segments[i].x, segments[i].y);
                }
            }
            ctx.stroke();
        };


        const triggerStrike = () => {
            setIsStriking(true);

            // Random start point at top
            const startX = Math.random() * canvas.width;
            const startY = -50;
            // Random end point at bottom
            const endX = Math.random() * canvas.width;
            const endY = canvas.height + 50;

            const segments = createLightning(startX, startY, endX, endY);

            // Flash effect opacity
            let flashOpacity = 1.0;
            const decay = 0.15; // How fast it fades

            const animateStrike = () => {
                if (!ctx) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (flashOpacity > 0) {
                    drawLightning(segments, flashOpacity);
                    flashOpacity -= decay;
                    // Randomly flicker the opacity back up slightly to simulate multi-stroke
                    if (Math.random() > 0.7 && flashOpacity < 0.8) {
                        flashOpacity += 0.3;
                    }
                    animationFrameId = requestAnimationFrame(animateStrike);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    setIsStriking(false);
                }
            };

            animateStrike();

            // Schedule next strike
            const nextStrikeDelay = Math.random() * 8000 + 4000; // 4 to 12 seconds
            strikeTimeout = setTimeout(triggerStrike, nextStrikeDelay);
        };

        // Initial strike start
        triggerStrike();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(strikeTimeout);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-20"
            />
            {/* Full screen flash overlay */}
            <div
                className={`fixed inset-0 pointer-events-none z-10 bg-white/20 mix-blend-overlay transition-opacity duration-100 ${isStriking ? 'opacity-100' : 'opacity-0'}`}
            ></div>
            <div
                className={`fixed inset-0 pointer-events-none z-10 bg-red-600/10 mix-blend-color-dodge transition-opacity duration-75 ${isStriking ? 'opacity-100' : 'opacity-0'}`}
            ></div>
        </>
    );
}
