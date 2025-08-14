import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'es', 'ar', 'fr'] as const;
export type Locale = (typeof locales)[number];

// This is the default locale used when no locale matches
export const defaultLocale: Locale = 'ar';

// Helper function to get messages for a locale with error handling
export async function getMessages(locale: string) {
  // If locale is undefined, use the default locale
  const validLocale = locale || defaultLocale;
  
  console.log('Loading messages for locale:', validLocale); // Debug log
  
  try {
    // Check if the locale is valid
    if (!locales.includes(validLocale as Locale)) {
      console.warn(`Locale ${validLocale} is not supported, falling back to ${defaultLocale}`);
      return (await import(`./dictionaries/${defaultLocale}.json`)).default;
    }
    
    // Try to import the messages for the locale
    const messages = (await import(`./dictionaries/${validLocale}.json`)).default;
    // console.log('Loaded messages:', messages); // Debug log
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale ${validLocale}:`, error);
    
    // Fallback to default locale if there's an error
    try {
      return (await import(`./dictionaries/${defaultLocale}.json`)).default;
    } catch (fallbackError) {
      console.error(`Error loading fallback messages:`, fallbackError);
      // Return empty object as a last resort
      return {};
    }
  }
}

export default getRequestConfig(async ({locale}) => {
  // Ensure locale is defined and valid
  if (!locale || !locales.includes(locale as Locale)) {
    console.warn(`Invalid locale: ${locale}, falling back to ${defaultLocale}`);
    locale = defaultLocale;
  }
  
  // console.log('getRequestConfig called with locale:', locale); // Debug log
  
  // Load messages for the requested locale
  const messages = await getMessages(locale);
  
  return {
    messages,
    locale: locale // Use the validated locale
  };
}); 