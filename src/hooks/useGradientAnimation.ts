import { useEffect, RefObject } from 'react';

/**
 * Custom hook for animating gradient backgrounds with organic, blob-like movement
 * @param ref - React ref to the element that should have animated gradient
 */
export function useGradientAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    // Safety checks
    if (typeof window === 'undefined') {
      return;
    }
    
    if (!ref.current) return;
    
    // Ensure requestAnimationFrame is available
    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }
    
    let animationFrameId: number;
    let lastTime: number | null = null;
    
    // Random initial values for organic movement
    let targetSpeed = 0.3 + Math.random() * 0.7; // Target speed between 0.3 and 1.0
    let currentSpeed = targetSpeed; // Current speed that smoothly interpolates to target
    let currentPosition = Math.random() * 100; // Start at random position
    let positionDirection = Math.random() > 0.5 ? 1 : -1;
    
    // Variable intervals for random changes (like the blob example)
    let baseInterval = 3000 + Math.random() * 5000; // 3-8 seconds
    let timeSinceChange = 0;
    let pauseTime = 0;
    let isPaused = false;
    
    // Smooth interpolation factor for speed changes (slower = smoother)
    const speedInterpolation = 0.05;

    // Throttle to ~20fps for better performance (50ms between frames)
    const FRAME_THROTTLE = 50;
    
    const animate = (timestamp: number) => {
      try {
        if (!ref.current) {
          if (typeof requestAnimationFrame !== 'undefined') {
            animationFrameId = requestAnimationFrame(animate);
          }
          return;
        }

      // Initialize lastTime on first frame
      if (lastTime === null) {
        lastTime = timestamp;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Throttle animation for better performance
      const elapsed = timestamp - lastTime;
      if (elapsed < FRAME_THROTTLE) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = Math.min(elapsed, 100); // Cap at 100ms to avoid huge jumps
      lastTime = timestamp;

      // Smooth speed interpolation toward target
      const speedDiff = targetSpeed - currentSpeed;
      currentSpeed += speedDiff * speedInterpolation;

      timeSinceChange += deltaTime;

      // Randomly change direction and speed occasionally
      if (timeSinceChange > baseInterval) {
        // Smoothly transition to new target speed
        targetSpeed = 0.2 + Math.random() * 0.6; // 0.2-0.8
        
        // Random direction change (less frequent)
        if (Math.random() > 0.6) {
          if (Math.abs(currentSpeed) < 0.2) {
            positionDirection *= -1;
          } else {
            targetSpeed = 0.1; // Slow down first
          }
        }
        
        // New random interval
        baseInterval = 2000 + Math.random() * 4000;
        timeSinceChange = 0;
      }

      // Update position
      // Move smoothly based on speed and delta time
      // Speed 1.0 = 10% per second (approx)
      const moveAmount = (currentSpeed * positionDirection * deltaTime) / 100;
      currentPosition += moveAmount;

      // Handle wrapping for infinite loop
      // We want to loop between 0 and 50% (since we have 2x width with 50% bg size)
      // But we can actually let it go infinitely and just modulo, 
      // OR since we translate, we need to reset.
      // Translate range: 0% to -50%.
      // If currentPosition is positive (moving right), we wrap around 50
      // If currentPosition is negative (moving left), we wrap around -50?
      
      // Let's assume currentPosition is the % we translate LEFT (negative).
      // So increasing currentPosition means moving left (more negative translate).
      
      // Normalize to 0-50 range
      if (currentPosition > 50) currentPosition -= 50;
      if (currentPosition < 0) currentPosition += 50;

        // Apply the position using hardware-accelerated transform
        // We translate by negative currentPosition%
        ref.current.style.transform = `translate3d(-${currentPosition}%, 0, 0)`;

        if (typeof requestAnimationFrame !== 'undefined') {
          animationFrameId = requestAnimationFrame(animate);
        }
      } catch (error) {
        // Silently fail - animation is enhancement, not critical
        console.warn("Gradient animation error:", error);
      }
    };

    try {
      if (typeof requestAnimationFrame !== 'undefined') {
        animationFrameId = requestAnimationFrame(animate);
      }
    } catch (error) {
      console.warn("Failed to start gradient animation:", error);
    }

    return () => {
      try {
        if (animationFrameId && typeof cancelAnimationFrame !== 'undefined') {
          cancelAnimationFrame(animationFrameId);
        }
        // Cleanup style
        if (ref.current) {
          ref.current.style.transform = '';
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
  }, [ref]);
}

