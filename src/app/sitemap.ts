import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bjeek.com'
  
  const routes = [
    '',
    '/investment-form',
    '/links',
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate sitemap for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      })
    })
  })

  return sitemap
}
