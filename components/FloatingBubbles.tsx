'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Generate random bubbles/stars
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      const bubbleCount = Math.floor(window.innerWidth / 30); // Responsive bubble count
      
      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          id: i,
          x: Math.random() * 100, // percentage
          y: Math.random() * 100, // percentage
          size: Math.random() * 4 + 2, // 2-6px
          duration: Math.random() * 3 + 2, // 2-5 seconds
          delay: Math.random() * 2, // 0-2 seconds
          opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      generateBubbles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), var(--accent))',
            boxShadow: `0 0 ${bubble.size * 2}px rgba(var(--accent-rgb), 0.5)`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(bubble.id) * 10, 0],
            opacity: [bubble.opacity, bubble.opacity * 1.5, bubble.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Add some twinkling stars effect */}
      {bubbles.slice(0, Math.floor(bubbles.length / 3)).map((bubble, index) => (
        <motion.div
          key={`star-${bubble.id}`}
          className="absolute"
          style={{
            left: `${(bubble.x + 50) % 100}%`,
            top: `${(bubble.y + 50) % 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: bubble.duration * 1.5,
            delay: bubble.delay + 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z"
              fill="var(--accent)"
              opacity="0.6"
              filter="url(#starGlow)"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* SVG filter for star glow */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
