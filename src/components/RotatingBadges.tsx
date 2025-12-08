"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Badge {
  text: string;
  icon?: string;
}

const badges: Badge[] = [
  { text: "Professional Grooming Since 2017", icon: "✨" },
  { text: "Trusted by 2,000+ Local Families", icon: "❤️" },
  { text: "Locally Owned & Operated", icon: "🏠" },
  { text: "5.0 ★ Google Rating", icon: "⭐" },
  { text: "Licensed & Fully Insured", icon: "✓" },
];

export default function RotatingBadges() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, index: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered || isDragging) {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      return;
    }

    autoRotateRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % badges.length);
    }, 3500);

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [isHovered, isDragging]);

  // Mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });

    if (isDragging) {
      const dragDelta = e.clientX - dragStart.x;
      const sensitivity = 60;
      const indexDelta = Math.round(-dragDelta / sensitivity);
      const newIndex = (dragStart.index + indexDelta + badges.length * 10) % badges.length;
      setActiveIndex(newIndex);
    }
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, index: activeIndex });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, index: activeIndex });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dragDelta = e.touches[0].clientX - dragStart.x;
    const sensitivity = 60;
    const indexDelta = Math.round(-dragDelta / sensitivity);
    const newIndex = (dragStart.index + indexDelta + badges.length * 10) % badges.length;
    setActiveIndex(newIndex);
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Get position info for each badge relative to active
  const getPosition = (index: number) => {
    let diff = index - activeIndex;
    if (diff > 2) diff -= badges.length;
    if (diff < -2) diff += badges.length;
    return diff;
  };

  return (
    <div 
      className="flex justify-center w-full select-none touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div 
        className="relative h-32 w-full max-w-5xl overflow-visible"
        style={{ 
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3D Carousel Container - tilts with mouse */}
        <div 
          className="relative h-full w-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `
              rotateX(${5 + mousePos.y * 3}deg) 
              rotateY(${mousePos.x * 5}deg)
            `,
          }}
        >
          {badges.map((badge, index) => {
            const position = getPosition(index);
            const isActive = position === 0;
            const absPos = Math.abs(position);
            
            // Tighter arc positioning - side badges more visible
            const xSpacing = 160;
            const translateX = position * xSpacing;
            const translateZ = isActive ? 60 : -20 - absPos * 20;
            const translateY = absPos * 5;
            
            // 3D rotation
            const rotateY = position * -18;
            
            // Visibility - active is full, sides are visible but muted
            const scale = isActive ? 1 : 0.65;
            const opacity = isActive ? 1 : 0.7;
            const blur = isActive ? 0 : absPos * 0.8;

            // Hide badges too far away (only show 2 on each side max)
            if (absPos > 2) return null;

            return (
              <div
                key={badge.text}
                className="absolute"
                style={{
                  transform: `
                    translateX(${translateX}px)
                    translateY(${translateY}px)
                    translateZ(${translateZ}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  zIndex: isActive ? 100 : 50 - absPos * 10,
                  opacity,
                  filter: isActive ? 'none' : `blur(${blur}px)`,
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onClick={() => !isDragging && setActiveIndex(index)}
              >
                {/* Glowing aura - only on active (golden to match headline) */}
                {isActive && (
                  <div 
                    className="absolute inset-0 -z-20 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(253,224,71,0.4) 0%, rgba(253,224,71,0.15) 40%, transparent 65%)',
                      transform: 'scale(1.6)',
                      filter: 'blur(12px)',
                      animation: 'glowPulse 3s ease-in-out infinite',
                    }}
                  />
                )}
                
                {/* The Badge */}
                <div 
                  className={`
                    relative flex items-center gap-2.5 rounded-full
                    whitespace-nowrap overflow-hidden
                    transition-all duration-500 cursor-pointer
                    ${isActive 
                      ? 'bg-white px-6 py-3' 
                      : 'bg-white/90 px-4 py-2'
                    }
                  `}
                  style={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: isActive 
                      ? '0 15px 35px rgba(0,0,0,0.2), 0 0 25px rgba(253,224,71,0.2), inset 0 1px 0 rgba(255,255,255,0.9)' 
                      : '0 8px 25px rgba(0,0,0,0.2)',
                    border: isActive ? '1px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Animated shine sweep - only on active */}
                  {isActive && (
                    <div className="absolute inset-0 -z-0 overflow-hidden rounded-full">
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 48%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 52%, transparent 70%)',
                          animation: 'shineMove 4s ease-in-out infinite',
                        }}
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <span 
                    className={`
                      flex-shrink-0 relative z-10
                      ${isActive ? 'text-base' : 'text-sm opacity-70'}
                    `}
                    style={{
                      animation: isActive ? 'iconPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                    }}
                  >
                    {badge.icon}
                  </span>
                  
                  {/* Text */}
                  <span className={`
                    font-semibold relative z-10 tracking-tight
                    ${isActive ? 'text-sm text-gray-800' : 'text-xs text-gray-600'}
                  `}>
                    {badge.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator dots */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-2">
          {badges.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                rounded-full transition-all duration-500 ease-out
                ${index === activeIndex 
                  ? 'bg-white w-6 h-2 shadow-lg shadow-white/50' 
                  : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                }
              `}
              aria-label={`Go to badge ${index + 1}`}
            />
          ))}
        </div>

        {/* Drag hint */}
        <div className={`
          absolute -bottom-6 left-1/2 -translate-x-1/2 
          text-white/50 text-xs font-medium tracking-wide
          transition-opacity duration-300 pointer-events-none
          ${isHovered && !isDragging ? 'opacity-100' : 'opacity-0'}
        `}>
          ← drag to explore →
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes shineMove {
          0%, 100% {
            transform: translateX(-150%);
          }
          50% {
            transform: translateX(150%);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.8);
          }
        }
        
        @keyframes iconPop {
          0% {
            transform: scale(0.5);
          }
          70% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
