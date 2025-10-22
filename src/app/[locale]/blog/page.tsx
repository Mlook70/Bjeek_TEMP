import { getMessages } from '@/i18n';
import { getAllBlogPosts } from '@/lib/blogData';
import Link from 'next/link';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === 'ar';
  
  return {
    title: isArabic 
      ? "المدونة - بجيك" 
      : "Blog - Bjeek",
    description: isArabic
      ? "اكتشف آخر المقالات والأخبار حول تطبيقات التوصيل والتكنولوجيا في السعودية"
      : "Discover the latest articles and news about delivery apps and technology in Saudi Arabia",
    keywords: isArabic
      ? "مدونة بجيك, مقالات توصيل, تطبيقات سعودية, تكنولوجيا, توصيل طعام"
      : "Bjeek blog, delivery articles, Saudi apps, technology, food delivery",
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const isArabic = locale === 'ar';
  const blogPosts = getAllBlogPosts();
  redirect('/');
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {isArabic ? "مدونة بجيك" : "Bjeek Blog"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {isArabic 
              ? "اكتشف آخر المقالات والأخبار حول تطبيقات التوصيل والتكنولوجيا في السعودية"
              : "Discover the latest articles and news about delivery apps and technology in Saudi Arabia"
            }
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {post.category.ar}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.titleH1.ar}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.description.ar}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.ar.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  {isArabic ? "اقرأ المزيد" : "Read More"}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {isArabic ? "لا توجد مقالات بعد" : "No articles yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {isArabic 
                ? "سنقوم بإضافة مقالات جديدة قريباً"
                : "We'll be adding new articles soon"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
