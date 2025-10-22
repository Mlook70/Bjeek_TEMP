import { getMessages } from '@/i18n';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  const isArabic = locale === 'ar';
  
  if (!post) {
    return {
      title: isArabic ? "المقال غير موجود - بجيك" : "Post Not Found - Bjeek",
    };
  }
  
  return {
    title: `${post.titleH1.ar} - بجيك`,
    description: post.description.ar,
    keywords: post.tags.ar.join(', '),
    openGraph: {
      title: post.titleH1.ar,
      description: post.description.ar,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags.ar,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.titleH1.ar,
      description: post.description.ar,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const isArabic = locale === 'ar';
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href={`/${locale}`} className="hover:text-green-600">
                {isArabic ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-green-600">
                {isArabic ? "المدونة" : "Blog"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{post.titleH1.ar}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {post.category.ar}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.titleH1.ar}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {post.description.ar}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString('ar-SA')}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.ar.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {/* Overview */}
            <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content.ar.overview}
              </p>
            </div>

            {/* Main Content */}
            {post.content.ar.titleH2.map((title, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {post.content.ar.descTitleH2[index]}
                </p>
                
                {/* H3 sections if they exist */}
                {post.content.ar.titleH3[index] && (
                  <div className="ml-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      {post.content.ar.titleH3[index]}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {post.content.ar.descTitleH3[index]}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isArabic ? "الخلاصة" : "Conclusion"}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content.ar.conclusion}
              </p>
            </div>

            {/* CTA */}
            <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {post.content.ar.cta}
              </p>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {isArabic ? "العودة إلى المدونة" : "Back to Blog"}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
