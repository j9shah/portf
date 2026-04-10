'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export function CursorGlow() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const positionRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  const moveCursor = useCallback(() => {
    rafRef.current = null;

    const { x, y } = positionRef.current;
    const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

    cursorRefs.current.forEach((element) => {
      if (element) {
        element.style.transform = transform;
      }
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    positionRef.current = { x: e.clientX, y: e.clientY };

    if (!isVisibleRef.current) {
      isVisibleRef.current = true;
      setIsVisible(true);
    }

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(moveCursor);
    }
  }, [moveCursor]);

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

    const getInteractiveElement = (target: EventTarget | null) => {
      return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = getInteractiveElement(e.target);
      if (target && !target.contains(e.relatedTarget as Node | null)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = getInteractiveElement(e.target);
      const relatedTarget = e.relatedTarget as Node | null;

      if (!relatedTarget) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }

      if (target && !target.contains(relatedTarget)) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isDesktop, handleMouseMove]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer ring - refined */}
      <div
        ref={(element) => {
          cursorRefs.current[0] = element;
        }}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
          willChange: 'transform, opacity',
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
        ref={(element) => {
          cursorRefs.current[1] = element;
        }}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.25s ease',
          willChange: 'transform, opacity',
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
        ref={(element) => {
          cursorRefs.current[2] = element;
        }}
        className="fixed pointer-events-none z-10"
        style={{
          left: 0,
          top: 0,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)',
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 0.4s ease',
          willChange: 'transform, opacity',
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
