'use client';

import { useState, useEffect } from 'react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed w-96 h-96 pointer-events-none z-10 transition-transform duration-1000 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(243, 241, 237, 0.05) 0%, transparent 70%)',
        filter: 'blur(100px)',
      }}
    />
  );
}
