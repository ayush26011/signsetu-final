'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function UltraBackground() {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Generate stars only on client side to avoid hydration mismatch
    const starCount = window.innerWidth < 768 ? 50 : 100;
    const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 40 + 20,
      delay: Math.random() * -40,
      twinkleDuration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);

    const generatedShootingStars = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: Math.random() * 15,
      duration: Math.random() * 1 + 1,
    }));
    setShootingStars(generatedShootingStars);

    const handleMouseMove = (e) => {
      // Subtle parallax calculation
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
      {/* Parallax Container */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-[-50px] transition-transform duration-300 ease-out will-change-transform"
      >
        {/* Layer 1: Nebula Glows */}
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-blue-600/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-pink-600/5 blur-[120px] animate-pulse" style={{ animationDelay: '4s' }} />

        {/* Layer 2: Starfield */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: 0.3,
              animation: `twinkle ${star.twinkleDuration}s infinite ease-in-out alternate`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Layer 3: Shooting Stars */}
        {shootingStars.map((ss) => (
          <div
            key={ss.id}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-white opacity-0 animate-shooting-star"
            style={{
              width: '100px',
              left: `${ss.x}%`,
              top: `${ss.y}%`,
              transform: 'rotate(-45deg)',
              animationDelay: `${ss.delay}s`,
            }}
          />
        ))}
      </div>

      <style jsx="true">{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0) rotate(-45deg) scaleX(0); opacity: 0; }
          10% { opacity: 1; scaleX(1); }
          25% { transform: translateX(200px) translateY(200px) rotate(-45deg) scaleX(1); opacity: 0; }
          100% { opacity: 0; }
        }
        .animate-twinkle {
          /* Fallback if logic fails */
        }
        .animate-shooting-star {
          animation: shooting-star 4s infinite linear;
        }
      `}</style>
    </div>
  );
}
