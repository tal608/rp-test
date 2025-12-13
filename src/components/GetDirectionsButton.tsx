"use client";

interface GetDirectionsButtonProps {
  address?: string;
  className?: string;
  label?: string;
  variant?: "solid" | "ghost";
}

export default function GetDirectionsButton({
  address = "5305 W River Rd, Waunakee, WI 53597",
  className = "",
  label = "Get Directions",
  variant = "solid",
}: GetDirectionsButtonProps) {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const variantClasses =
    variant === "ghost"
      ? "bg-white/20 border border-white/50 text-white hover:bg-white/30 focus-visible:ring-white/50"
      : "bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 hover:from-blue-700 hover:to-teal-600 text-white focus-visible:ring-blue-500/50";

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold px-6 sm:px-8 py-2.5 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px] ${variantClasses} ${className}`}
      aria-label={`${label} - opens directions to River Paws on Google Maps`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      {label}
    </a>
  );
}

