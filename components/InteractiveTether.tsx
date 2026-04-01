'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export function InteractiveTether() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorPos, setAnchorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pathD, setPathD] = useState('M 0 0 C 30 50, 30 150, 0 200');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Orb position with spring physics - loose floppy dangling wire feel
  const springConfig = { stiffness: 40, damping: 4, mass: 2 };
  const orbX = useSpring(0, springConfig);
  const orbY = useSpring(200, springConfig);

  // Rest position offset from anchor (dangling below the otter)
  const restOffsetX = 0;
  const restOffsetY = 200;

  // Update path whenever orb moves - creates a dangling wire effect
  useEffect(() => {
    const unsubX = orbX.on('change', updatePath);
    const unsubY = orbY.on('change', updatePath);

    function updatePath() {
      const ox = orbX.get();
      const oy = orbY.get();
      
      // Wire becomes straighter when stretched, loose when slack
      const distance = Math.sqrt(ox * ox + oy * oy);
      const restLength = 200;
      const stretchRatio = distance / restLength;
      
      // Sag increases for slack wire (curves outward), decreases when stretched
      const maxSag = 50;
      const sag = stretchRatio > 1 ? maxSag / stretchRatio : maxSag * (2 - stretchRatio);
      
      // When stretched, control points move closer to a straight line
      const straightness = Math.min(stretchRatio, 3) / 3;
      
      // Control points for dangling curve (sags to the right naturally)
      const cp1x = ox * 0.2 + sag * (1 - straightness) * 0.8;
      const cp1y = oy * 0.33;
      const cp2x = ox * 0.7 + sag * (1 - straightness) * 0.4;
      const cp2y = oy * 0.66;

      setPathD(`M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ox} ${oy}`);
    }

    return () => {
      unsubX();
      unsubY();
    };
  }, [orbX, orbY]);

  // Initialize positions and check preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);

    const updatePosition = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        // Anchor from the top center of the hero section - dangles down from above
        setAnchorPos({
          x: containerRect.width / 2,
          y: 0
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  // Subtle idle floating animation
  useEffect(() => {
    if (prefersReducedMotion || isDragging || isMobile) return;

    let animationId: number;
    const startTime = Date.now();

    const animateIdle = () => {
      if (isDragging) return;
      
      const elapsed = (Date.now() - startTime) / 1000;
      const floatX = Math.sin(elapsed * 0.4) * 4;
      const floatY = Math.cos(elapsed * 0.25) * 5;

      orbX.set(restOffsetX + floatX);
      orbY.set(restOffsetY + floatY);

      animationId = requestAnimationFrame(animateIdle);
    };

    const timeout = setTimeout(() => {
      animateIdle();
    }, 1500);

    return () => {
      clearTimeout(timeout);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion, isDragging, isMobile, orbX, orbY]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setHasInteracted(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isMobile]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position relative to anchor
    const mouseX = e.clientX - rect.left - anchorPos.x;
    const mouseY = e.clientY - rect.top - anchorPos.y;

    // Allow stretching up to 1200px - 6x the resting length for max rubber band stretch
    const maxRadius = 1200;
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    
    if (distance > maxRadius) {
      const scale = maxRadius / distance;
      orbX.set(mouseX * scale);
      orbY.set(mouseY * scale);
    } else {
      orbX.set(mouseX);
      orbY.set(mouseY);
    }
  }, [isDragging, orbX, orbY, anchorPos]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
    // Spring back to rest position
    orbX.set(restOffsetX);
    orbY.set(restOffsetY);
  }, [orbX, orbY]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Persistent hint in bottom right - changes message after interaction */}
      <motion.div
        className="absolute bottom-8 right-8 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <div className="bg-bg-elevated/80 backdrop-blur-sm border border-accent/20 rounded-lg px-3 py-2 text-xs text-text-muted max-w-[160px] shadow-lg">
          <span className="text-accent">✨ Easter egg unlocked!</span>
          <br />
          <span className="text-text-secondary">
            {hasInteracted ? "Nice! Try stretching it further" : "Drag the orb and watch it snap back"}
          </span>
        </div>
      </motion.div>

      <svg
        className="absolute w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Tether gradient - subtle warm tone */}
          <linearGradient id="tetherGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Soft glow filter */}
          <filter id="orbGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Enhanced glow for active state */}
          <filter id="orbGlowActive" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Line glow filter */}
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${anchorPos.x}, ${anchorPos.y})`}>
          {/* Anchor point - slightly larger dot */}
          <motion.circle
            cx={0}
            cy={0}
            r={4}
            fill="var(--accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />

          {/* Secondary tether shadow for depth - thicker */}
          <motion.path
            d={pathD}
            stroke="var(--accent)"
            strokeWidth={2}
            strokeOpacity={0.15}
            fill="none"
            strokeLinecap="round"
            style={{ transform: 'translate(2px, 2px)' }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          />

          {/* Main tether line - thicker */}
          <motion.path
            d={pathD}
            stroke="url(#tetherGradient)"
            strokeWidth={isDragging ? 4 : 3}
            fill="none"
            strokeLinecap="round"
            filter="url(#lineGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          />

          {/* Outer glow ring - larger */}
          <motion.circle
            cx={orbX}
            cy={orbY}
            r={isHovering || isDragging ? 24 : 18}
            fill="var(--accent)"
            opacity={isHovering || isDragging ? 0.15 : 0.08}
            filter={isDragging ? "url(#orbGlowActive)" : "url(#orbGlow)"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isHovering || isDragging ? 0.15 : 0.08 }}
            transition={{ duration: 0.3 }}
          />

          {/* Main orb body - interactive, larger */}
          <motion.circle
            cx={orbX}
            cy={orbY}
            r={isHovering || isDragging ? 12 : 10}
            fill="var(--accent)"
            className="pointer-events-auto cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => !isDragging && setIsHovering(true)}
            onMouseLeave={() => !isDragging && setIsHovering(false)}
            style={{ touchAction: 'none' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: isHovering || isDragging ? 0.75 : 0.55 
            }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />

          {/* Inner bright core - larger */}
          <motion.circle
            cx={orbX}
            cy={orbY}
            r={4}
            fill="var(--bg-elevated)"
            opacity={isHovering || isDragging ? 0.8 : 0.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          />
        </g>
      </svg>
    </div>
  );
}
