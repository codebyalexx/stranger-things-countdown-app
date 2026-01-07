"use client";

import React from "react";

export default function UpsideDownAtmosphere() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base Dark Atmosphere */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-red-950/20 to-black opacity-80 mix-blend-multiply"></div>

            {/* Moving Mist/Fog Layers */}
            <div className="absolute inset-0 opacity-30 animate-mist-flow-1 bg-[url('/mist-texture.png')] bg-cover mix-blend-screen"></div>

            {/* We can use a CSS noise or gradient trick if we don't have an image asset. 
          Let's use a generated noise SVG for a "texture" overlay that moves. */}
            <div className="absolute inset-0 opacity-20 contrast-150 brightness-75">
                <svg className="w-full h-full opacity-40">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Spores / Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => ( // Reduced count but smarter placement/animation in CSS
                    <div
                        key={`spore-${i}`}
                        className="absolute rounded-full bg-slate-400/50 blur-[1px] animate-float-particle"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            animationDelay: Math.random() * -20 + 's', // Negative delay to start mid-animation
                            animationDuration: Math.random() * 15 + 20 + 's',
                        }}
                    ></div>
                ))}
                {[...Array(20)].map((_, i) => ( // Larger ash-like particles
                    <div
                        key={`ash-${i}`}
                        className="absolute rounded-full bg-red-200/20 blur-[2px] animate-float-ash"
                        style={{
                            width: Math.random() * 5 + 2 + 'px',
                            height: Math.random() * 5 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            animationDelay: Math.random() * -20 + 's',
                            animationDuration: Math.random() * 20 + 25 + 's',
                        }}
                    ></div>
                ))}
            </div>

            {/* Heavy Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(20,0,0,0.9)_100%)]"></div>
        </div>
    );
}
