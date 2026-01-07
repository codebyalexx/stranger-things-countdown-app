"use client";

import { useEffect, useRef } from "react";

interface SoundManagerProps {
    timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    globalVolume: number;
}

export default function SoundManager({ timeLeft, globalVolume }: SoundManagerProps) {
    const demogorgonRef = useRef<HTMLAudioElement | null>(null);
    const clockRef = useRef<HTMLAudioElement | null>(null);

    // Initialize Audio objects
    useEffect(() => {
        demogorgonRef.current = new Audio("/demogorgon.mp3");
        clockRef.current = new Audio("/clock.mp3");

        // Cleanup
        return () => {
            if (demogorgonRef.current) {
                demogorgonRef.current.pause();
                demogorgonRef.current = null;
            }
            if (clockRef.current) {
                clockRef.current.pause();
                clockRef.current = null;
            }
        };
    }, []);

    // Handle Global Volume Changes
    useEffect(() => {
        if (demogorgonRef.current) demogorgonRef.current.volume = globalVolume;
        if (clockRef.current) clockRef.current.volume = globalVolume;
    }, [globalVolume]);

    // Random Demogorgon Sound
    useEffect(() => {
        const playRandomSound = () => {
            if (!demogorgonRef.current) return;

            // Only play if not already playing
            if (demogorgonRef.current.paused) {
                const playPromise = demogorgonRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Audio play blocked (user interaction needed first)", error);
                    });
                }
            }

            // Schedule next
            const nextDelay = Math.random() * 120000 * 5 + 60000; // 60s to 10 mins
            timeoutId = setTimeout(playRandomSound, nextDelay);
        };

        let timeoutId = setTimeout(playRandomSound, 10000); // Start trying after 10s

        return () => clearTimeout(timeoutId);
    }, []);

    // Clock Ticking Logic (Last 60 seconds)
    useEffect(() => {
        if (!clockRef.current) return;

        const totalSeconds = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;

        // Start ticking if within last minute and not already playing
        if (totalSeconds <= 60 && totalSeconds > 0) {
            if (clockRef.current.paused) {
                clockRef.current.loop = true; // Loop the clock sound if it's short
                clockRef.current.play().catch(e => console.log("Clock play failed", e));
            }
        } else {
            // Stop ticking if time is up or not yet time
            if (!clockRef.current.paused) {
                clockRef.current.pause();
                clockRef.current.currentTime = 0;
            }
        }
    }, [timeLeft]);

    return null; // Logic only component
}
