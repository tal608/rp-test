interface ScrollIndicatorProps {
  targetId: string;
  className?: string;
  ariaLabel?: string;
}

export default function ScrollIndicator({ targetId, className = "", ariaLabel = "Scroll to next section" }: ScrollIndicatorProps) {
  const handleClick = () => {
    const nextSection = document.getElementById(targetId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform z-50 ${className}`}
      aria-label={ariaLabel}
    >
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </button>
  );
}

