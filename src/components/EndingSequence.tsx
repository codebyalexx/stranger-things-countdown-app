"use client";

import React, { useEffect, useRef } from "react";

interface EndingSequenceProps {
    trigger: boolean;
    globalVolume: number;
}

export default function EndingSequence({ trigger, globalVolume }: EndingSequenceProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (trigger && videoRef.current) {
            videoRef.current.play().catch(e => console.error("Video play failed", e));
        }
    }, [trigger]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = globalVolume;
        }
    }, [globalVolume]);

    if (!trigger) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-fade-in">
            <video
                ref={videoRef}
                src="/titlesequence.mp4"
                className="w-full h-full object-cover"
                playsInline
            />
        </div>
    );
}
