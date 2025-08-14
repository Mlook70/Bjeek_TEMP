import createMiddleware from 'next-intl/middleware';

// Can be imported from a shared config
const locales = ['en', 'es', 'ar', 'fr'];

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'ar',
  
  // IMPORTANT: Change this back to 'always' like your working project
  localePrefix: 'always',
  
  // Enable locale detection
  localeDetection: true
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};