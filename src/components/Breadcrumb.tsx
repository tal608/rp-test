"use client";

import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  compact?: boolean;
}

/**
 * Visual breadcrumb navigation component.
 * Note: Schema markup is handled separately by BreadcrumbSchema component (JSON-LD)
 * to avoid duplicate structured data. This component is purely visual + accessible.
 */
export default function Breadcrumb({ items, className = "", compact = false }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center ${compact ? 'space-x-1 text-xs' : 'space-x-2 text-sm'} ${className}`}
    >
      <ol className={`flex items-center ${compact ? 'space-x-1' : 'space-x-2'}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li
              key={item.href}
              className="flex items-center"
            >
              {isLast ? (
                <span
                  className="text-gray-600 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-gray-500 hover:text-emerald-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <svg
                    className={`${compact ? 'w-3 h-3 mx-1' : 'w-4 h-4 mx-2'} text-gray-400`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
