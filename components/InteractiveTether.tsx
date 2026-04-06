'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

// Drag history entry for velocity estimation
interface DragHistoryEntry {
  x: number;
  y: number;
  time: number;
}

// Sparkle particle for peak energy effects
interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function InteractiveTether() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorPos, setAnchorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Track dark/light mode for particle colors

  // Orb position with spring physics (used for drag, but pendulum for release)
  const springConfig = { stiffness: 40, damping: 4, mass: 2 };
  const orbX = useSpring(0, springConfig);
  const orbY = useSpring(250, springConfig);
  
  // Disco ball rotation state
  const [rotation, setRotation] = useState(0);
  
  // Track current orb position for rendering
  const [currentOrbX, setCurrentOrbX] = useState(0);
  const [currentOrbY, setCurrentOrbY] = useState(250);
  const [restOffsetY, setRestOffsetY] = useState(250);

  // Rest position offset from anchor (dangling below the otter)
  const restOffsetX = 0;

  // ========== Enhanced Visual State ==========
  // Dynamic glow intensity based on motion (0 = idle, 1 = max speed)
  const [glowIntensity, setGlowIntensity] = useState(0);
  // Sparkle particles for peak energy effect
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  // Playful feedback message for strong pulls
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  // Tether curve control point offset (for curved rope during motion)
  const [tetherCurve, setTetherCurve] = useState(0);

  // ========== Pendulum Physics Refs ==========
  // Animation frame ID for cleanup
  const animationFrameRef = useRef<number | null>(null);
  // Timestamp of last frame for delta time calculation
  const lastFrameTimeRef = useRef<number>(0);
  // Current pendulum angle (radians, 0 = straight down)
  const angleRef = useRef<number>(0);
  // Angular velocity (radians per second)
  const angularVelocityRef = useRef<number>(0);
  // Current rope length
  const ropeLengthRef = useRef<number>(250);
  // Rope length velocity (pixels per second)
  const ropeLengthVelocityRef = useRef<number>(0);
  // Recent drag positions for velocity estimation
  const dragHistoryRef = useRef<DragHistoryEntry[]>([]);
  // Flag to indicate pendulum is animating
  const isAnimatingRef = useRef<boolean>(false);
  
  // ========== Velocity-Based Spin Boost Refs ==========
  // Extra spin velocity from release impulse (decays over time)
  const spinVelocityRef = useRef<number>(0);
  // Base rotation accumulator (idle spin)
  const baseRotationRef = useRef<number>(0);
  // Track previous angular velocity for peak detection
  const prevAngularVelRef = useRef<number>(0);
  // Particle ID counter
  const particleIdRef = useRef<number>(0);
  // Feedback timeout ref for cleanup
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track if this is a "proper pull" for star trail effect
  const isProperPullRef = useRef<boolean>(false);
  // Frame counter for trail spawning (don't spawn every frame)
  const trailFrameCountRef = useRef<number>(0);

  // ========== Pendulum Helper Functions ==========
  
  // Stop any running pendulum animation
  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  // Spawn sparkle particles at peak energy moments
  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    const newParticles: SparkleParticle[] = [];
    for (let i = 0; i < count; i++) {
      // Random direction and speed for each particle
      const angle = Math.random() * Math.PI * 2;
      const speed = 30 + Math.random() * 50;
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.3, // 0.4-0.7 seconds
        size: 2 + Math.random() * 2,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Convert polar coordinates (angle, length) to Cartesian and update orb position
  // angle: radians from vertical (0 = straight down, positive = right)
  // length: distance from anchor to orb
  const setOrbFromPolar = useCallback((angle: number, length: number) => {
    // x = length * sin(angle) -- horizontal displacement
    // y = length * cos(angle) -- vertical displacement (positive = down)
    const x = length * Math.sin(angle);
    const y = length * Math.cos(angle);
    orbX.jump(x);
    orbY.jump(y);
  }, [orbX, orbY]);

  // Start the pendulum animation loop with enhanced visual effects
  const startPendulumAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    lastFrameTimeRef.current = performance.now();

    // Physics constants for damped pendulum
    const gravity = 800; // pixels/s^2 (tuned for visual feel)
    const angleDamping = 0.97; // angular velocity decay per frame (< 1 = damping)
    // Softer length spring for more realistic stretch (reduced from 15)
    const lengthSpringK = 8; // spring constant for rope length restoration
    const lengthDamping = 0.92; // length velocity decay (slightly less damping)
    // Spin boost decay rate (per second)
    const spinDecay = 0.92;
    // Base idle rotation speed (degrees per second)
    const idleSpinSpeed = 45;

    const animate = (currentTime: number) => {
      // Calculate delta time in seconds, clamped to avoid instability after tab switch
      let dt = (currentTime - lastFrameTimeRef.current) / 1000;
      dt = Math.min(dt, 0.05); // Cap at 50ms to prevent large jumps
      lastFrameTimeRef.current = currentTime;

      const currentLength = ropeLengthRef.current;
      const currentAngle = angleRef.current;
      let angularVel = angularVelocityRef.current;
      let lengthVel = ropeLengthVelocityRef.current;
      const prevAngularVel = prevAngularVelRef.current;

      // ===== Angular motion (pendulum swing) =====
      // Pendulum equation: angular acceleration = -(g/L) * sin(theta)
      // This creates the characteristic swinging motion
      const angularAccel = -(gravity / currentLength) * Math.sin(currentAngle);
      angularVel += angularAccel * dt;
      angularVel *= angleDamping; // Apply damping to slow swing over time
      const newAngle = currentAngle + angularVel * dt;

      // ===== Length motion (rope stretching back to rest) =====
      // Spring force pulls rope back to rest length
      const restLength = restOffsetY;
      // Max stretch matches drag limit (5x rest length)
      const maxLength = restLength * 5;
      const lengthDisplacement = currentLength - restLength;
      const lengthAccel = -lengthSpringK * lengthDisplacement;
      lengthVel += lengthAccel * dt;
      lengthVel *= lengthDamping; // Dampen length oscillation
      let newLength = currentLength + lengthVel * dt;
      // Clamp to realistic range
      newLength = Math.max(20, Math.min(newLength, maxLength));

      // ===== Micro vertical bounce at bottom =====
      // When angle is near zero and was larger, add tiny downward impulse
      if (Math.abs(newAngle) < 0.05 && Math.abs(prevAngularVel) > 0.5) {
        // Small downward bounce when passing through bottom
        lengthVel += Math.abs(prevAngularVel) * 5;
      }

      // ===== Peak energy detection =====
      // Detect when angular velocity crosses from increasing to decreasing magnitude
      const absAngVel = Math.abs(angularVel);
      const absPrevAngVel = Math.abs(prevAngularVel);
      const isPeak = absPrevAngVel > absAngVel && absPrevAngVel > 1.5;
      
      if (isPeak && !prefersReducedMotion) {
        // Spawn sparkle particles at peak energy (bounces)
        // More sparkles for bigger bounces
        const ox = newLength * Math.sin(newAngle);
        const oy = newLength * Math.cos(newAngle);
        const sparkleCount = Math.min(12, Math.floor(4 + absPrevAngVel * 1.5));
        spawnParticles(ox, oy, sparkleCount);
      }

      // ===== Velocity-based spin boost =====
      // Decay spin velocity over time (converges to idle spin)
      spinVelocityRef.current *= Math.pow(spinDecay, dt * 60);
      // Update base rotation
      baseRotationRef.current += idleSpinSpeed * dt;
      // Total rotation = base + spin boost contribution
      const totalRotation = baseRotationRef.current + spinVelocityRef.current;
      setRotation(totalRotation % 360);

      // ===== Glow intensity based on angular velocity =====
      // Map angular velocity magnitude to 0-1 intensity (smooth transition)
      // Higher velocity = brighter glow
      const velocityMagnitude = Math.sqrt(angularVel * angularVel + lengthVel * lengthVel / 10000);
      const targetIntensity = Math.min(velocityMagnitude / 3, 1);
      setGlowIntensity(prev => prev + (targetIntensity - prev) * 0.1); // Smooth lerp

      // ===== Tether curve based on perpendicular velocity =====
      // Calculate velocity perpendicular to rope for cable bend effect
      // Tangent direction: (cos(angle), -sin(angle))
      const tangentX = Math.cos(newAngle);
      const tangentY = -Math.sin(newAngle);
      // Current velocity in Cartesian
      const velX = angularVel * newLength * tangentX;
      const velY = angularVel * newLength * tangentY + lengthVel * Math.cos(newAngle);
      // Perpendicular component creates the curve
      const perpVel = velX * tangentY - velY * tangentX;
      // Smooth curve transition
      setTetherCurve(prev => prev + (perpVel * 0.02 - prev) * 0.15);

      // ===== Star trail for proper pulls =====
      // If this was a proper pull and ball is moving fast, leave a trail of stars
      trailFrameCountRef.current++;
      if (isProperPullRef.current && !prefersReducedMotion && absAngVel > 0.5) {
        // Spawn trail particles every 3 frames when moving fast enough
        if (trailFrameCountRef.current % 3 === 0) {
          const ox = newLength * Math.sin(newAngle);
          const oy = newLength * Math.cos(newAngle);
          // Fewer particles for trail (2-4 based on speed)
          const trailCount = Math.min(4, Math.floor(1 + absAngVel * 0.8));
          spawnParticles(ox, oy, trailCount);
        }
      } else if (absAngVel < 0.3) {
        // Motion has settled, disable trail effect
        isProperPullRef.current = false;
      }

      // ===== Update particles =====
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx * dt,
          y: p.y + p.vy * dt,
          vy: p.vy + 100 * dt, // gravity on particles
          life: p.life - dt / p.maxLife,
        }))
        .filter(p => p.life > 0)
      );

      // Update refs
      angleRef.current = newAngle;
      angularVelocityRef.current = angularVel;
      ropeLengthRef.current = newLength;
      ropeLengthVelocityRef.current = lengthVel;
      prevAngularVelRef.current = angularVel;

      // Update visual position
      setOrbFromPolar(newAngle, newLength);

      // Check if motion has settled (very small velocities and near rest position)
      const isAngleSettled = Math.abs(angularVel) < 0.001 && Math.abs(newAngle) < 0.001;
      const isLengthSettled = Math.abs(lengthVel) < 0.1 && Math.abs(newLength - restLength) < 0.5;
      const isSpinSettled = Math.abs(spinVelocityRef.current) < 1;

      if (isAngleSettled && isLengthSettled && isSpinSettled) {
        // Snap to final rest position
        angleRef.current = 0;
        angularVelocityRef.current = 0;
        ropeLengthRef.current = restLength;
        ropeLengthVelocityRef.current = 0;
        spinVelocityRef.current = 0;
        setOrbFromPolar(0, restLength);
        setGlowIntensity(0);
        setTetherCurve(0);
        isAnimatingRef.current = false;
        return; // Stop animation
      }

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [restOffsetY, setOrbFromPolar, spawnParticles, prefersReducedMotion]);

  // Clean up animation and timeouts on unmount
  useEffect(() => {
    return () => {
      stopAnimation();
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, [stopAnimation]);

  // Update path whenever orb moves - now with curved tether support
  useEffect(() => {
    const unsubX = orbX.on('change', updatePath);
    const unsubY = orbY.on('change', updatePath);

    function updatePath() {
      const ox = orbX.get();
      const oy = orbY.get();
      
      // Update current position for rendering
      setCurrentOrbX(ox);
      setCurrentOrbY(oy);
      
      // Path is updated in render based on tetherCurve state
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
    
    // Check dark mode by looking at document class
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const updatePosition = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        // Anchor from the top center of the hero section - dangles down from above
        setAnchorPos({
          x: containerRect.width / 2,
          y: 0
        });
        
        // Adjust rest position based on screen height - shorter on smaller screens
        const screenHeight = window.innerHeight;
        let newRestOffsetY;
        
        if (screenHeight < 600) {
          newRestOffsetY = 120; // Very short screens (mobile landscape)
        } else if (screenHeight < 700) {
          newRestOffsetY = 150; // Small mobile screens
        } else if (screenHeight < 800) {
          newRestOffsetY = 180; // Medium mobile screens
        } else if (screenHeight < 900) {
          newRestOffsetY = 220; // Tablets/small laptops
        } else {
          newRestOffsetY = 250; // Desktop monitors
        }
        
        setRestOffsetY(newRestOffsetY);
        
        // Update orb position if not currently dragging
        if (!isDragging) {
          orbY.jump(newRestOffsetY); // jump = instant, no animation
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', updatePosition);
      observer.disconnect();
    };
  }, [isDragging, orbY]);

  // Disco ball rotation when static (not dragging or animating)
  // Only runs when pendulum animation is NOT active
  useEffect(() => {
    if (prefersReducedMotion || isDragging || isMobile) return;
    // Don't run this loop if pendulum animation is handling rotation
    if (isAnimatingRef.current) return;

    let animationId: number;
    let lastTime = performance.now();

    const animateRotation = (currentTime: number) => {
      if (isDragging || isAnimatingRef.current) return;
      
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      // Update base rotation for idle spin (45 degrees per second)
      baseRotationRef.current += 45 * dt;
      // Decay any remaining spin boost
      spinVelocityRef.current *= Math.pow(0.92, dt * 60);
      
      const totalRotation = baseRotationRef.current + spinVelocityRef.current;
      setRotation(totalRotation % 360);

      animationId = requestAnimationFrame(animateRotation);
    };

    animationId = requestAnimationFrame(animateRotation);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [prefersReducedMotion, isDragging, isMobile]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    
    // Stop any running pendulum animation when starting a new drag
    stopAnimation();
    // Clear drag history for fresh velocity tracking
    dragHistoryRef.current = [];
    
    setIsDragging(true);
    setHasInteracted(true);
    setShowHint(false);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isMobile, stopAnimation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate position relative to anchor
    const mouseX = e.clientX - rect.left - anchorPos.x;
    const mouseY = e.clientY - rect.top - anchorPos.y;

    // Max stretch is 5x rest length for big satisfying pulls
    const maxRadius = restOffsetY * 5;
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    
    let finalX = mouseX;
    let finalY = mouseY;
    
    if (distance > maxRadius) {
      const scale = maxRadius / distance;
      finalX = mouseX * scale;
      finalY = mouseY * scale;
    }
    
    // Use jump() for instant position updates during drag (no spring animation)
    orbX.jump(finalX);
    orbY.jump(finalY);
    
    // Record drag position for velocity estimation on release
    const now = performance.now();
    dragHistoryRef.current.push({ x: finalX, y: finalY, time: now });
    
    // Keep only the last 100ms of history for velocity calculation
    const historyWindow = 100;
    dragHistoryRef.current = dragHistoryRef.current.filter(
      entry => now - entry.time < historyWindow
    );
  }, [isDragging, orbX, orbY, anchorPos, restOffsetY]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
    
    // Respect prefers-reduced-motion: skip pendulum animation
    if (prefersReducedMotion) {
      orbX.jump(restOffsetX);
      orbY.jump(restOffsetY);
      return;
    }
    
    // Get current orb position
    const currentX = orbX.get();
    const currentY = orbY.get();
    
    // Convert current position to polar coordinates
    // angle: measured from vertical (0 = straight down, positive = right)
    // length: distance from anchor to orb
    const currentLength = Math.sqrt(currentX * currentX + currentY * currentY);
    // atan2(x, y) gives angle from positive y-axis (down), which is what we want
    const currentAngle = Math.atan2(currentX, currentY);
    
    // Initialize pendulum state
    angleRef.current = currentAngle;
    ropeLengthRef.current = Math.max(currentLength, 20); // Minimum length
    prevAngularVelRef.current = 0; // Reset peak detection
    
    // ===== Estimate release velocity from drag history =====
    const history = dragHistoryRef.current;
    let releaseVelX = 0;
    let releaseVelY = 0;
    
    if (history.length >= 2) {
      // Use first and last points in history for velocity estimate
      const oldest = history[0];
      const newest = history[history.length - 1];
      const dt = (newest.time - oldest.time) / 1000; // Convert to seconds
      
      if (dt > 0.01) { // Avoid division by very small numbers
        releaseVelX = (newest.x - oldest.x) / dt; // pixels per second
        releaseVelY = (newest.y - oldest.y) / dt;
      }
    }
    
    // Calculate total release speed for spin boost and feedback
    const releaseSpeed = Math.sqrt(releaseVelX * releaseVelX + releaseVelY * releaseVelY);
    
    // ===== Velocity-based spin boost =====
    // Faster release = bigger spin impulse (converted to degrees)
    // Scale factor tuned for good visual feel
    const spinImpulse = releaseSpeed * 0.15;
    spinVelocityRef.current += spinImpulse;
    
    // ===== Interaction-based UI feedback =====
    // Strong pull triggers playful message (only for very strong pulls)
    const strongPullThreshold = 1500; // pixels per second (show less often)
    if (releaseSpeed > strongPullThreshold) {
      // Clear any existing timeout
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
      setFeedbackMessage("Okay that was a good one!");
      // Reset after 2.5 seconds
      feedbackTimeoutRef.current = setTimeout(() => {
        setFeedbackMessage(null);
      }, 2500);
    }
    
    // ===== Sparkle trail on release =====
    // Spawn sparkles if pulled beyond rest length
    if (!prefersReducedMotion && currentLength > restOffsetY) {
      // This is a proper pull - enable continuous star trail during motion
      isProperPullRef.current = true;
      trailFrameCountRef.current = 0; // Reset frame counter
      
      // Number of particles scales with how far it was stretched
      const stretchRatio = currentLength / restOffsetY;
      const particleCount = Math.min(15, Math.floor(3 + stretchRatio * 3));
      
      // Spawn initial burst at release position
      spawnParticles(currentX, currentY, particleCount);
      
      // Create a sparkle trail along the path back toward rest
      // Spawn particles at intervals along the rope
      const trailSteps = Math.min(5, Math.floor(stretchRatio * 2));
      for (let i = 1; i <= trailSteps; i++) {
        const t = i / (trailSteps + 1); // 0 to 1
        const trailX = currentX * (1 - t * 0.3); // Particles along first 30% of path
        const trailY = currentY * (1 - t * 0.3);
        // Delayed spawn for trail effect
        setTimeout(() => {
          spawnParticles(trailX, trailY, 2);
        }, i * 50); // 50ms intervals
      }
    }
    
    // ===== Convert Cartesian velocity to angular velocity =====
    // For a pendulum, angular velocity = tangential velocity / rope length
    // Tangential direction is perpendicular to the rope
    // Tangent vector: (-sin(angle), cos(angle)) points in positive angular direction
    // We project the release velocity onto this tangent to get tangential speed
    if (currentLength > 20) {
      // Tangent unit vector (perpendicular to rope, positive = counterclockwise when viewed normally)
      // But we want positive angle = right side, so tangent points: (cos(angle), -sin(angle))
      // Actually for our coordinate system with y pointing down:
      // radial direction: (sin(angle), cos(angle))
      // tangent direction (perpendicular, positive angular): (cos(angle), -sin(angle))
      const tangentX = Math.cos(currentAngle);
      const tangentY = -Math.sin(currentAngle);
      
      // Project velocity onto tangent direction
      const tangentialSpeed = releaseVelX * tangentX + releaseVelY * tangentY;
      
      // Angular velocity = tangential speed / rope length
      angularVelocityRef.current = tangentialSpeed / currentLength;
      
      // Project velocity onto radial direction for length velocity
      const radialX = Math.sin(currentAngle);
      const radialY = Math.cos(currentAngle);
      ropeLengthVelocityRef.current = releaseVelX * radialX + releaseVelY * radialY;
    } else {
      angularVelocityRef.current = 0;
      ropeLengthVelocityRef.current = 0;
    }
    
    // Clear drag history
    dragHistoryRef.current = [];
    
    // Start the pendulum physics animation
    startPendulumAnimation();
  }, [orbX, orbY, restOffsetX, restOffsetY, prefersReducedMotion, startPendulumAnimation, spawnParticles]);

  if (isMobile) return null;

  // ===== Compute dynamic tether path with curve =====
  // Control point offset perpendicular to the rope based on velocity
  // Creates a subtle cable bend during motion
  const midX = currentOrbX / 2;
  const midY = currentOrbY / 2;
  // Perpendicular offset for quadratic curve control point
  const curveOffset = Math.max(-30, Math.min(30, tetherCurve)); // Clamp for stability
  // Compute perpendicular direction (rotate 90 degrees)
  const ropeLen = Math.sqrt(currentOrbX * currentOrbX + currentOrbY * currentOrbY) || 1;
  const perpX = -currentOrbY / ropeLen;
  const perpY = currentOrbX / ropeLen;
  const ctrlX = midX + perpX * curveOffset;
  const ctrlY = midY + perpY * curveOffset;
  // Use quadratic bezier for curved tether, straight line when nearly still
  const computedPathD = Math.abs(curveOffset) > 0.5
    ? `M 0 0 Q ${ctrlX} ${ctrlY} ${currentOrbX} ${currentOrbY}`
    : `M 0 0 L ${currentOrbX} ${currentOrbY}`;

  // ===== Dynamic glow values based on velocity =====
  // glowIntensity ranges 0-1, affects radius and opacity
  const dynamicGlowRadius = 28 + glowIntensity * 8; // 28-36
  const dynamicGlowOpacity = 0.15 + glowIntensity * 0.15; // 0.15-0.30
  // Sparkle intensity for facet dots
  const sparkleBoost = 1 + glowIntensity * 0.5; // 1-1.5x brightness

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {/* Hint button that dismisses when orb is clicked */}
      {showHint && (
        <motion.button
          className="absolute top-8 left-8 pointer-events-auto bg-accent/10 hover:bg-accent/20 dark:bg-accent/10 dark:hover:bg-accent/20 light:bg-[#f8f6f3]/95 light:hover:bg-[#f0ece6] backdrop-blur-sm border border-accent/30 dark:border-accent/30 light:border-[#d6d3d1]/60 rounded-lg px-4 py-3 text-sm md:text-base text-text-secondary dark:text-text-secondary light:text-[#44403c] shadow-lg transition-colors cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          onClick={() => setShowHint(false)}
        >
          <span className="text-accent dark:text-accent light:text-[#92400e] font-medium">💡 Hint:</span>
          <br />
          <span>Drag the orb and watch it swing</span>
        </motion.button>
      )}

      {/* Persistent hint in bottom right - larger and responsive */}
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="bg-bg-elevated/80 dark:bg-bg-elevated/80 light:bg-[#f8f6f3]/95 backdrop-blur-sm border border-accent/20 dark:border-accent/20 light:border-[#d6d3d1]/60 rounded-lg px-4 py-3 md:px-6 md:py-4 text-sm md:text-base lg:text-lg max-w-[90vw] md:max-w-[500px] lg:max-w-[600px] shadow-lg">
          <span className="text-accent dark:text-accent light:text-[#92400e] font-semibold text-base md:text-lg lg:text-xl">✨ Easter egg unlocked!</span>
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
          
          {/* Disco ball gradient - shiny metallic effect */}
          <radialGradient id="discoBallGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
          </radialGradient>
          
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

          {/* Secondary tether shadow for depth - uses computed curved path */}
          <motion.path
            d={computedPathD}
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

          {/* Main tether line - uses computed curved path */}
          <motion.path
            d={computedPathD}
            stroke="url(#tetherGradient)"
            strokeWidth={isDragging ? 4 : 3}
            fill="none"
            strokeLinecap="round"
            filter="url(#lineGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          />

          {/* Sparkle particles from peak energy effects */}
          {/* In light mode, particles are dark (accent color) for contrast */}
          {/* In dark mode, particles are white/bright */}
          {particles.map(p => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.size * p.life} // Shrink as life decreases
              fill={isDarkMode ? 'white' : 'var(--accent)'}
              opacity={p.life * (isDarkMode ? 0.8 : 0.9)}
              filter="url(#orbGlow)"
            />
          ))}

          {/* Outer glow ring - dynamic based on velocity */}
          <motion.circle
            cx={currentOrbX}
            cy={currentOrbY}
            r={isHovering || isDragging ? 32 : dynamicGlowRadius}
            fill="var(--accent)"
            opacity={isHovering || isDragging ? 0.25 : dynamicGlowOpacity}
            filter={isDragging || glowIntensity > 0.3 ? "url(#orbGlowActive)" : "url(#orbGlow)"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1 + glowIntensity * 0.15, 1], // More pulse when moving fast
              opacity: isHovering || isDragging 
                ? [0.25, 0.3, 0.25] 
                : [dynamicGlowOpacity, dynamicGlowOpacity + 0.05, dynamicGlowOpacity]
            }}
            transition={{ duration: 2 - glowIntensity, repeat: Infinity }} // Faster pulse when moving
          />

          {/* Main disco ball body - interactive */}
          <motion.circle
            cx={currentOrbX}
            cy={currentOrbY}
            r={isHovering || isDragging ? 16 : 14}
            fill="url(#discoBallGradient)"
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
              opacity: 0.9
            }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />

          {/* Rotating disco ball facets - creates sparkle effect */}
          {/* Facet brightness and size scale with glowIntensity (velocity) */}
          {!isDragging && (
            <g transform={`translate(${currentOrbX}, ${currentOrbY})`}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((baseAngle, i) => {
                const angle = (baseAngle + rotation) % 360;
                const rad = (angle * Math.PI) / 180;
                const distance = 10;
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;
                // Base opacity + velocity boost
                const baseOpacity = Math.abs(Math.cos(rad)) * 0.7 + 0.3;
                const opacity = Math.min(1, baseOpacity * sparkleBoost);
                // Slightly larger dots when moving fast
                const dotRadius = 2 + glowIntensity * 0.5;
                
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={dotRadius}
                    fill="white"
                    opacity={opacity}
                    filter="url(#orbGlow)"
                  />
                );
              })}
              
              {/* Central bright spots that pulse - also velocity-enhanced */}
              {[0, 120, 240].map((baseAngle, i) => {
                const angle = (baseAngle + rotation * 0.5) % 360;
                const rad = (angle * Math.PI) / 180;
                const distance = 6;
                const x = Math.cos(rad) * distance;
                const y = Math.sin(rad) * distance;
                // Brighter and larger when moving fast
                const spotRadius = 3 + glowIntensity;
                const spotOpacity = Math.min(1, 0.8 * sparkleBoost);
                
                return (
                  <circle
                    key={`bright-${i}`}
                    cx={x}
                    cy={y}
                    r={spotRadius}
                    fill="var(--accent)"
                    opacity={spotOpacity}
                    filter="url(#orbGlowActive)"
                  />
                );
              })}
            </g>
          )}

          {/* Inner bright core - disco ball center */}
          {/* Core brightness also responds to velocity */}
          <motion.circle
            cx={currentOrbX}
            cy={currentOrbY}
            r={5}
            fill="white"
            opacity={Math.min(1, (isHovering || isDragging ? 0.9 : 0.7) + glowIntensity * 0.2)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          />
        </g>
      </svg>
    </div>
  );
}
