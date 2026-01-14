"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import LightningStorm from "@/components/LightningStorm";
import UpsideDownAtmosphere from "@/components/UpsideDownAtmosphere";
import SoundManager from "@/components/SoundManager";
import EndingSequence from "@/components/EndingSequence";
import VolumeControl from "@/components/VolumeControl";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [flicker, setFlicker] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default 50%

  useEffect(() => {
    const targetDate = new Date('2026-02-04T15:00:00Z');
    //const targetDate = new Date('2026-01-07T21:10:00Z');

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        setIsEnded(false);
      } else {
        setIsEnded(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), Math.random() * 200 + 50);
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  // Determine if we should shake (last 3 mins)
  const totalSeconds = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const isFracturing = totalSeconds <= 180 && totalSeconds > 0;

  return (
    <div className={`min-h-screen bg-black relative overflow-hidden flex items-center justify-center ${isFracturing ? 'fracture-shake' : ''}`}>
      {/*<RealityFracture timeLeft={timeLeft} />*/}
      <LightningStorm timeLeft={timeLeft} />
      <UpsideDownAtmosphere timeLeft={timeLeft} />
      <SoundManager timeLeft={timeLeft} globalVolume={volume} />
      <EndingSequence trigger={isEnded} globalVolume={volume} />
      <VolumeControl volume={volume} onVolumeChange={setVolume} />

      <div className="relative z-10 text-center px-4">
        <div className={`transition-opacity duration-100 ${flicker ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-center justify-center gap-3 mb-8 animate-pulse-slow">
            <h1 className="text-5xl md:text-7xl font-bold tracking-widest uppercase text-red-600 glow-text stranger-things-font">
              The Rightside Up
            </h1>
          </div>

          <div className="mb-12">
            <div className="inline-block bg-black/60 backdrop-blur-sm px-8 py-4 rounded-lg">
              <p className="text-white text-lg md:text-xl tracking-wider uppercase mb-2 stranger-things-font">
                Mind Flayer is coming in
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto mb-12">
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-black/80 rounded-lg p-4 md:p-8 backdrop-blur-sm transform hover:scale-105 transition-transform">
                  <div className="text-4xl md:text-7xl font-bold text-red-500 mb-2 tabular-nums glow-text-strong stranger-things-font">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-red-400/70 uppercase tracking-widest stranger-things-font">
                    {item.label}
                  </div>
                </div>
                <div className="absolute inset-0 bg-red-600/5 blur-xl rounded-lg"></div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-red-500/60 animate-flicker-slow">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
              <p className="text-sm md:text-base tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                Reality Distortion Detected
              </p>
              <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            </div>

            <p className="text-red-700/50 text-xs md:text-sm tracking-wider"
              style={{ fontFamily: "'Courier New', monospace" }}>
              January 8th, 2026 • 2:00 AM UTC+1
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5">
        <Link href="https://netflix.com" target="_blank" className="block p-3 bg-red-900/50 backdrop-blur-sm rounded-lg text-white text-xs md:text-sm tracking-wider">Powered by <span className="text-red-400">Netflix</span></Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-950/30 to-transparent pointer-events-none"></div>
    </div >
  );
}
