"use client";

import React, { useEffect, useState } from "react";

interface RealityFractureProps {
    timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

export default function RealityFracture({ timeLeft }: RealityFractureProps) {
    const [intensity, setIntensity] = useState(0);

    useEffect(() => {
        const totalSeconds =
            timeLeft.days * 86400 +
            timeLeft.hours * 3600 +
            timeLeft.minutes * 60 +
            timeLeft.seconds;

        // Logic for intensity progressive ramp up
        // Starts at 3 minutes (180s)
        if (totalSeconds <= 180 && totalSeconds > 0) {
            // Linear ramp from 0 to 1 over 180 seconds
            const ramp = 1 - (totalSeconds / 180);
            setIntensity(ramp);
        } else {
            setIntensity(0);
        }
    }, [timeLeft]);

    if (intensity <= 0) return null;

    return (
        <>
            {/* Global Filter Effects Injection */}
            <style jsx global>{`
        body {
          transition: filter 0.5s ease;
           /* Chromatic aberration & Red shift simulation via filters */
          filter: contrast(${1 + intensity * 0.5}) 
                  brightness(${1 - intensity * 0.3}) 
                  sepia(${intensity * 0.3}) 
                  hue-rotate(-${intensity * 20}deg);
        }
        
        .fracture-shake {
             animation: fracture-shake ${0.5 / (intensity + 0.1)}s infinite;
        }

        @keyframes fracture-shake {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${intensity * 2}px, ${intensity * 2}px) rotate(${intensity * 0.5}deg); }
            50% { transform: translate(-${intensity * 2}px, -${intensity * 1}px) rotate(-${intensity * 0.5}deg); }
            75% { transform: translate(${intensity * -1}px, ${intensity * 2}px) rotate(${intensity * 0.2}deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>

            {/* Cracks Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] mix-blend-multiply opacity-80"
                style={{ opacity: intensity * 0.8 }}>
                {/* We will randomly place crack SVGs or just simple lines if assets not available. 
              Let's draw some jagged SVG cracks procedurally-ish */}
                <svg className="w-full h-full">
                    <defs>
                        <filter id="displacement">
                            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
                            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale={intensity * 20} xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>
                    {/* Large Crack Top Left */}
                    <path d="M0,0 L100,100 L150,250 L50,300" stroke="black" strokeWidth={1 + intensity * 5} fill="none" filter="url(#displacement)" />

                    {/* Center Fracture */}
                    {intensity > 0.5 && (
                        <path d="M50%,50% l20,-50 l-40,20 l60,60" stroke="black" strokeWidth={1 + intensity * 3} fill="none" filter="url(#displacement)" />
                    )}

                    {/* Bottom Right Shatter */}
                    {intensity > 0.8 && (
                        <path d="M100%,100% L90%,80% L80%,95% L60%,60%" stroke="black" strokeWidth={1 + intensity * 8} fill="none" filter="url(#displacement)" />
                    )}
                </svg>
            </div>

            {/* Glitch Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-[90] mix-blend-color-dodge bg-red-500/10"
                style={{
                    opacity: intensity > 0.7 ? (Math.random() > 0.9 ? 0.4 : 0) : 0
                }}
            ></div>
        </>
    );
}
