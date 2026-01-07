"use client"

import { ZapIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-01-08T01:00:00Z');

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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>

      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-500 rounded-full animate-float"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEzOSwgMCwgMCwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="relative z-10 text-center px-4">
        <div className={`transition-opacity duration-100 ${flicker ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex items-center justify-center gap-3 mb-8 animate-pulse-slow">
            <ZapIcon className="w-8 h-8 text-red-600 animate-flicker" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-widest uppercase text-red-600 glow-text"
              style={{
                fontFamily: "'Courier New', monospace",
                textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.6), 0 0 30px rgba(220, 38, 38, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)',
                letterSpacing: '0.3em'
              }}>
              The Upside Down
            </h1>
            <ZapIcon className="w-8 h-8 text-red-600 animate-flicker" />
          </div>

          <div className="mb-12">
            <div className="inline-block border-2 border-red-700/50 bg-black/60 backdrop-blur-sm px-8 py-4 rounded-lg glow-border">
              <p className="text-red-400/80 text-lg md:text-xl tracking-wider uppercase mb-2"
                style={{ fontFamily: "'Courier New', monospace" }}>
                Gateway Opens In
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto mb-12">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-black/80 border-2 border-red-700/60 rounded-lg p-4 md:p-8 glow-border-strong backdrop-blur-sm transform hover:scale-105 transition-transform">
                  <div className="text-4xl md:text-7xl font-bold text-red-500 mb-2 tabular-nums glow-text-strong"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      textShadow: '0 0 15px rgba(239, 68, 68, 0.9), 0 0 30px rgba(239, 68, 68, 0.6), 0 0 45px rgba(239, 68, 68, 0.3)'
                    }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-red-400/70 uppercase tracking-widest"
                    style={{ fontFamily: "'Courier New', monospace" }}>
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

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-950/30 to-transparent pointer-events-none"></div>
    </div>
  );
}
