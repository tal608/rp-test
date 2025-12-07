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

export default function Breadcrumb({ items, className = "", compact = false }: BreadcrumbProps) {
  const baseUrl = "https://www.riverpaws.dog";
  
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center ${compact ? 'space-x-1 text-xs' : 'space-x-2 text-sm'} ${className}`}
      >
        <ol className={`flex items-center ${compact ? 'space-x-1' : 'space-x-2'}`} itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const fullUrl = item.href.startsWith("http") ? item.href : `${baseUrl}${item.href}`;
            
            return (
              <li
                key={item.href}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                {isLast ? (
                  <span
                    itemProp="name"
                    className="text-gray-600 font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      itemProp="item"
                      className="text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <span itemProp="name">{item.name}</span>
                    </Link>
                    <meta itemProp="position" content={String(index + 1)} />
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
                {!isLast && <meta itemProp="url" content={fullUrl} />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
