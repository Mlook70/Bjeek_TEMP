import React from 'react';
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbs } from '@/lib/seo-utils';
import { fetchBlogPosts } from '@/lib/blogData';
import EnhancedStructuredData from '@/components/seo/EnhancedStructuredData';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DefaultLayout from '@/components/layouts/DefaultLayout';

export const metadata: Metadata = generateSEOMetadata({
  title: 'المدونة - بجيك',
  description: 'مدونة بجيك - مقالات ونصائح حول خدمات التوصيل، الاستثمار، والنمو في قطاع الخدمات اللوجستية',
  keywords: 'مدونة بجيك، مقالات استثمارية، نصائح مالية، خدمات التوصيل، الاستثمار في السعودية، التخطيط المالي',
  url: '/blog',
  type: 'website',
  locale: 'ar',
});

export default async function BlogPage() {
  const locale = 'ar'; // Default to Arabic for this project

  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs(locale, [
    { name: 'المدونة', href: '/blog' }
  ]);

  // Fetch posts from API
  const regularPosts = await fetchBlogPosts();

  return (
    <>
      {/* Enhanced Structured Data for Blog */}
      <EnhancedStructuredData 
        locale={locale} 
        pageType="website"
        breadcrumbs={breadcrumbs}
      />
      
      <DefaultLayout>
        <div className="pt-24 pb-16 min-h-screen">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbs} locale={locale} />
            
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#00b14f] mb-4">
                المدونة
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                اكتشف أحدث المقالات والأخبار حول خدمات التوصيل والاستثمار والنمو
              </p>
            </div>

            {/* Blog Posts Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#00b14f] mb-8">
                أحدث المقالات
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => {
                  // Convert tags string to array
                  const tagsArray = post.tags ? post.tags.split('-').map(tag => tag.trim()) : [];
                  // Use API image or fallback to default
                  const imageUrl = post.image?.url || '/Hero.png';
                  
                  return (
                    <Card key={post.slug} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-black">
                      <div className="relative h-64">
                        <Image
                          src={imageUrl}
                          alt={post.titleH1}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          {post.category && (
                            <Badge variant="outline" className="border-[#00b14f] text-[#00b14f]">
                              {post.category}
                            </Badge>
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(post.publishedAt).toLocaleDateString(
                              'ar-SA',
                              { month: 'short', day: 'numeric' }
                            )}
                          </span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2 text-gray-900 dark:text-white">
                          {post.titleH1}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-400">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tagsArray.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                          <Button variant="outline" className="w-full border-[#00b14f] text-[#00b14f] hover:bg-[#00b14f] hover:text-white">
                            اقرأ المزيد
                            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

