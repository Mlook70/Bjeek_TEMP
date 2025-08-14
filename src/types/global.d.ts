// Global type declarations for the application

// Extend the Window interface to include Google Tag Manager dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// This is needed to make this file a module
export {};
