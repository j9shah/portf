'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const rafRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for smoother cursor updates
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Use MutationObserver to handle dynamically added elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    const elements = addListeners();

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isDesktop, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer ring - refined */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          style={{
            width: isHovering ? '40px' : '28px',
            height: isHovering ? '40px' : '28px',
            borderRadius: '50%',
            border: '1px solid rgba(237, 230, 220, 0.45)',
            transition: 'width 0.18s cubic-bezier(0.4, 0, 0.2, 1), height 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          style={{
            width: isHovering ? '5px' : '3px',
            height: isHovering ? '5px' : '3px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            transition: 'width 0.12s ease, height 0.12s ease',
          }}
        />
      </div>

      {/* Subtle glow - more refined */}
      <div
        className="fixed pointer-events-none z-10"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)',
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 0.4s ease',
          filter: 'blur(30px)',
        }}
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (min-width: 1024px) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
