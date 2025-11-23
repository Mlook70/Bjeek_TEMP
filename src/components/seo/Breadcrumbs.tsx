import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

export interface Breadcrumb {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  locale: string;
}

export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const isArabic = locale === 'ar';

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 space-x-reverse flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="flex items-center hover:text-[#00b14f] dark:hover:text-[#00d15c] transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ) : (
                <>
                  <ChevronLeft 
                    className={`w-4 h-4 mx-2 ${isArabic ? 'rotate-180' : ''}`} 
                    aria-hidden="true"
                  />
                  {isLast ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-[#00b14f] dark:hover:text-[#00d15c] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

