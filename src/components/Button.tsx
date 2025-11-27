import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  onMouseMove?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ariaLabel,
  onMouseMove,
}: ButtonProps) {
  const baseClasses = "relative font-medium rounded-full transition-all duration-300 transform hover:scale-105 overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl",
    secondary: "bg-transparent text-white border-2 border-white hover:border-white/80",
    ghost: "bg-transparent text-gray-700 hover:text-gray-900",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-gradient-shift"></span>
          <span 
            className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" 
            style={{ 
              background: 'radial-gradient(circle 100px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.3), transparent)' 
            }}
          ></span>
        </>
      )}
      {variant === "secondary" && (
        <>
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          <span 
            className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" 
            style={{ 
              background: 'radial-gradient(circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.2), transparent)' 
            }}
          ></span>
        </>
      )}
      <span className={`relative z-10 flex items-center justify-center ${variant === "primary" ? "text-blue-600 group-hover:text-white" : variant === "secondary" ? "text-white group-hover:text-emerald-600" : ""} transition-colors duration-300`}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onMouseMove={(e) => {
          if (onMouseMove) {
            onMouseMove(e);
          } else {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
          }
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      onMouseMove={(e) => {
        if (onMouseMove) {
          onMouseMove(e);
        } else {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }
      }}
    >
      {content}
    </button>
  );
}

