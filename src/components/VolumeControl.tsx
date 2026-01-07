"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [prevVolume, setPrevVolume] = useState(volume);

    useEffect(() => {
        if (volume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
            setPrevVolume(volume);
        }
    }, [volume]);

    const toggleMute = () => {
        if (isMuted) {
            onVolumeChange(prevVolume || 0.5);
            setIsMuted(false);
        } else {
            setPrevVolume(volume);
            onVolumeChange(0);
            setIsMuted(true);
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        onVolumeChange(newVol);
    };

    return (
        <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-red-900/40 glow-border">
            <button
                onClick={toggleMute}
                className="text-red-500 hover:text-red-400 transition-colors"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <div className="relative w-24 md:w-32 h-6 flex items-center">
                {/* Retro range slider styling */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-red-950 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(220,38,38,0.8)] hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
            </div>
            <div className="text-red-600 font-mono text-xs w-8 text-right">
                {Math.round(volume * 100)}%
            </div>
        </div>
    );
}
