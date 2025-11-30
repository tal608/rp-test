"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsInfoOpen(false);
      }
    };

    if (isInfoOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isInfoOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsInfoOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileInfoOpen(false);
      }
    };

    if (isInfoOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isInfoOpen, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ${
      isScrolled
        ? 'glassmorphism py-3'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-full p-2">
              <Image
                src="/Logos/paw only 72.png"
                alt="River Paws Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
                sizes="32px"
              />
            </div>
          </div>
          <div>
            <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent ${
              !isScrolled ? 'drop-shadow-lg' : ''
            }`}>
              River Paws
            </span>
            <p className={`text-[10px] sm:text-xs tracking-widest ${
              isScrolled ? 'text-gray-600' : 'text-white/80 drop-shadow-md'
            }`}>SINCE 2017 • WAUNAKEE</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-2">
          {/* Main Navigation Items */}
          {[
            { href: '/', label: 'Home' },
            { href: '/dog-grooming', label: 'Grooming' },
            { href: '/dog-hikes', label: 'Hiking' }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition-all duration-300 group ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white font-medium px-4 py-2 rounded-full menu-item-shade'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {isScrolled && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 group-hover:w-full transition-all duration-500"></span>
              )}
            </Link>
          ))}

          {/* Info Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsInfoOpen(!isInfoOpen)}
              onMouseEnter={() => setIsInfoOpen(true)}
              aria-expanded={isInfoOpen}
              aria-haspopup="true"
              className={`relative transition-all duration-300 group ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white font-medium px-4 py-2 rounded-full menu-item-shade'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Info
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isInfoOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isScrolled && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 group-hover:w-full transition-all duration-500"></span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isInfoOpen && (
              <div 
                className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                  isScrolled
                    ? 'bg-white border border-gray-200'
                    : 'bg-white/95 backdrop-blur-xl border border-white/20'
                }`}
                onMouseLeave={() => setIsInfoOpen(false)}
              >
                <div className="py-2">
                  {[
                    { href: '/blog', label: 'Blog', icon: '📝' },
                    { href: '/caretakers', label: 'Our Team', icon: '👥' },
                    { href: '/gallery', label: 'Gallery', icon: '🖼️' },
                    { href: '/contact', label: 'Contact', icon: '📞' }
                  ].map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsInfoOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                        index === 0 ? '' : 'border-t border-gray-100'
                      } ${
                        isScrolled
                          ? 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Portal Link - Hidden on mobile */}
          <Link 
            href="/portal"
            aria-label="Customer portal login"
            className={`hidden md:block transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-blue-600' 
                : 'text-white px-3 py-2 rounded-full menu-item-shade hover:bg-white/25'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Theme Toggle - Hidden on mobile (shown in mobile menu) */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Book Now Button - Responsive */}
          <a
            href="https://booking.moego.pet/ol/RiverPaws/book"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-teal-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-medium group transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm md:text-base"
          >
            <span className="relative z-10 flex items-center">
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className={`md:hidden transition-all duration-300 p-2 rounded-lg ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            <svg 
              className="w-6 h-6"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[90] md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[95] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-teal-500">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {/* Main Navigation Links */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium"
              >
                <span className="text-xl">🏠</span>
                <span>Home</span>
              </Link>

              <Link
                href="/dog-grooming"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium"
              >
                <span className="text-xl">✂️</span>
                <span>Grooming</span>
              </Link>

              <Link
                href="/dog-hikes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium"
              >
                <span className="text-xl">🏔️</span>
                <span>Hiking</span>
              </Link>

              {/* Info Section with Dropdown */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileInfoOpen(!isMobileInfoOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">ℹ️</span>
                    <span>Info</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${isMobileInfoOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mobile Info Submenu */}
                {isMobileInfoOpen && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                    <Link
                      href="/blog"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileInfoOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-lg">📝</span>
                      <span>Blog</span>
                    </Link>
                    <Link
                      href="/caretakers"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileInfoOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-lg">👥</span>
                      <span>Our Team</span>
                    </Link>
                    <Link
                      href="/gallery"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileInfoOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-lg">🖼️</span>
                      <span>Gallery</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileInfoOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <span className="text-lg">📞</span>
                      <span>Contact</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Portal Link for Mobile */}
              <Link
                href="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors font-medium border-t border-gray-200 mt-4 pt-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Portal Login</span>
              </Link>

              {/* Theme Toggle for Mobile */}
              <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌙</span>
                  <span className="font-medium">Theme</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <a
              href="https://booking.moego.pet/ol/RiverPaws/book"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-teal-600 transition-colors shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .menu-item-shade {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.15),
                      0 2px 8px 0 rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .menu-item-shade:hover {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2),
                      0 4px 12px 0 rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
      `}</style>
    </nav>
  );
}

