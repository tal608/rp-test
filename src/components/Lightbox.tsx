"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const image = images[currentIndex];

  // Reset progress and loaded state on slide change
  useEffect(() => {
    setProgress(0);
    setImageLoaded(false);
  }, [currentIndex]);

  // Autoplay logic - only starts after image is loaded
  useEffect(() => {
    if (!isPlaying || !imageLoaded) return;

    const duration = 5000; // 5 seconds per slide
    const interval = 50; // Update every 50ms
    const step = 100 / (duration / interval);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, imageLoaded, onNext, currentIndex]); // Re-run when index changes or image loads

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") {
      onNext();
      setIsPlaying(false); // Pause on manual nav
    }
    if (e.key === "ArrowLeft") {
      onPrev();
      setIsPlaying(false); // Pause on manual nav
    }
    if (e.key === " ") {
      e.preventDefault();
      setIsPlaying((p) => !p);
    }
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 animate-fadeIn overflow-hidden"
      onClick={onClose} // Close on backdrop click
    >
      {/* Dynamic Blob Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl z-10"></div>
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob-1"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-teal-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob-2"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[80%] h-[80%] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob-3"></div>
      </div>
      {/* Close Button */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-[110] flex items-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-md group"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-8 h-8 group-hover:scale-110 transition-transform pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:rotate-90 backdrop-blur-md"
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:-translate-x-1 backdrop-blur-md hidden sm:flex items-center justify-center group"
        aria-label="Previous image"
      >
        <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 hover:translate-x-1 backdrop-blur-md hidden sm:flex items-center justify-center group"
        aria-label="Next image"
      >
        <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main Image Container */}
      <div 
        className="relative w-full h-full max-w-7xl max-h-[85vh] mx-4 sm:mx-16 flex items-center justify-center z-10"
        onClick={(e) => e.stopPropagation()} // Prevent close on image click
      >
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain animate-scaleIn"
            sizes="100vw"
            priority
            quality={90}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white rounded-b-3xl transform translate-y-full animate-slideUp overflow-hidden">
          {/* Progress Bar */}
          {isPlaying && (
            <div className="absolute top-0 left-0 h-1 bg-blue-500/50 w-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          
          <div className="p-6 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{image.title}</h3>
            <p className="text-white/90 text-base sm:text-lg drop-shadow-md font-medium">
              {image.alt}
            </p>
            <div className="mt-4 text-xs text-white/60 font-mono uppercase tracking-widest">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay (Touch targets) */}
      <div className="absolute inset-0 flex sm:hidden z-[105] pointer-events-none">
        <div className="w-1/2 h-full pointer-events-auto" onClick={(e) => { e.stopPropagation(); onPrev(); }}></div>
        <div className="w-1/2 h-full pointer-events-auto" onClick={(e) => { e.stopPropagation(); onNext(); }}></div>
      </div>
    </div>
  );
}

