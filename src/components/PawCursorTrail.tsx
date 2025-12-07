"use client";

import { useEffect, useRef, useState } from "react";

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  isLeft: boolean;
}

export default function PawCursorTrail() {
  const [paws, setPaws] = useState<PawPrint[]>([]);
  const lastPosition = useRef({ x: 0, y: 0 });
  const pawIdRef = useRef(0);
  const isLeftPaw = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current?.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      
      // Check if cursor is within the container
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from last paw
      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only add paw if moved enough distance (creates stepping effect)
      if (distance > 50) {
        // Calculate rotation based on movement direction
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Add slight variation for natural look
        const rotation = angle + (isLeftPaw.current ? -15 : 15) + (Math.random() * 10 - 5);

        const newPaw: PawPrint = {
          id: pawIdRef.current++,
          x,
          y,
          rotation,
          isLeft: isLeftPaw.current,
        };

        isLeftPaw.current = !isLeftPaw.current;
        lastPosition.current = { x, y };

        setPaws((prev) => [...prev.slice(-12), newPaw]); // Keep max 12 paws

        // Remove paw after animation
        setTimeout(() => {
          setPaws((prev) => prev.filter((p) => p.id !== newPaw.id));
        }, 1500);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
      {paws.map((paw) => {
        // Calculate perpendicular offset for left/right foot placement
        const offsetDistance = 15; // pixels offset from center line
        const angleRad = (paw.rotation * Math.PI) / 180;
        // Perpendicular offset (90 degrees from movement direction)
        const offsetX = Math.cos(angleRad + Math.PI / 2) * (paw.isLeft ? -offsetDistance : offsetDistance);
        const offsetY = Math.sin(angleRad + Math.PI / 2) * (paw.isLeft ? -offsetDistance : offsetDistance);
        
        return (
        <div
          key={paw.id}
          className="absolute animate-paw-fade"
          style={{
            left: paw.x - 12 + offsetX,
            top: paw.y - 12 + offsetY,
            transform: `rotate(${paw.rotation}deg) scaleX(${paw.isLeft ? 1 : -1})`,
          }}
        >
          {/* Paw Print SVG */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="opacity-60 drop-shadow-lg"
          >
            {/* Main pad */}
            <ellipse cx="12" cy="16" rx="5" ry="4" />
            {/* Toe beans */}
            <ellipse cx="7" cy="9" rx="2.5" ry="3" />
            <ellipse cx="12" cy="7" rx="2.5" ry="3" />
            <ellipse cx="17" cy="9" rx="2.5" ry="3" />
          </svg>
        </div>
        );
      })}

      <style jsx>{`
        @keyframes paw-fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        .animate-paw-fade {
          animation: paw-fade 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

