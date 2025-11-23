import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbs } from '@/lib/seo-utils';
import { getAllBlogSlugs, fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/blogData';
import EnhancedStructuredData from '@/components/seo/EnhancedStructuredData';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MarkdownContent } from '@/lib/markdown-utils';
import DefaultLayout from '@/components/layouts/DefaultLayout';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = 'ar';
  const post = await fetchBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'المقال غير موجود',
    };
  }

  const title = post.titleH1;
  const description = post.description;
  const imageUrl = post.image?.url || '/Hero.png';
  
  return generateSEOMetadata({
    title,
    description,
    keywords: post.tags || '',
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: 'بجيك',
    image: imageUrl,
    locale,
  });
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const locale = 'ar';

  const post = await fetchBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Convert tags string to array
  const tagsArray = post.tags ? post.tags.split('-').map(tag => tag.trim()) : [];
  
  // Use API image or fallback to default
  const imageUrl = post.image?.url || '/Hero.png';

  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs(locale, [
    { name: 'المدونة', href: '/blog' },
    { name: post.titleH1, href: `/blog/${encodeURIComponent(slug)}` }
  ]);

  return (
    <>
      {/* Enhanced Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.titleH1,
            "description": post.description,
            "image": imageUrl.startsWith('http') ? imageUrl : `https://bjeek.com${imageUrl}`,
            "author": {
              "@type": "Person",
              "name": "بجيك"
            },
            "publisher": {
              "@type": "Organization",
              "name": "بجيك",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bjeek.com/Logo.png"
              }
            },
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://bjeek.com/blog/${slug}`
            },
            "articleSection": post.category || '',
            "keywords": tagsArray,
            "wordCount": post.content.overview ? post.content.overview.split(' ').length : 0,
            "timeRequired": "PT15M",
            "inLanguage": "ar"
          })
        }}
      />
      
      <EnhancedStructuredData 
        locale={locale} 
        pageType="website"
        breadcrumbs={breadcrumbs}
      />
      
      <DefaultLayout>
        <div className="min-h-screen">
          {/* Hero Section */}
          <div className="relative py-16 md:py-24">
            {/* Back Button */}
            <div className="absolute top-8 z-10 right-8">
              <Link
                href="/blog"
                className="flex items-center flex-row-reverse px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
              >
                <ArrowLeft className="ml-2 rotate-180 h-5 w-5" />
                العودة للمدونة
              </Link>
            </div>

            {/* Hero Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-16">
              <div className="max-w-7xl mx-auto text-center">
                {post.category && (
                  <div className="flex items-center justify-center mb-4 gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <Badge className="bg-white text-[#00b14f] text-lg px-4 py-1">
                      {post.category}
                    </Badge>
                  </div>
                )}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-loose">
                  {post.titleH1}
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2 flex-row-reverse text-white/80">
                    <CalendarDays className="h-5 w-5" />
                    <span>{new Date(post.publishedAt).toLocaleDateString(
                      'ar-SA',
                      { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }
                    )}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tagsArray.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative -mt-20 z-10">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                
                {/* Breadcrumbs */}
                <div className="mb-6">
                  <Breadcrumbs items={breadcrumbs} locale={locale} />
                </div>

                {/* Article Content */}
                <article className="rounded-2xl shadow-xl">
                  <div className="p-4 md:p-6 lg:p-8">
                    {/* Featured Image */}
                    <div className="relative h-48 md:h-56 lg:h-64 mb-8 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={post.titleH1}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    {/* Overview */}
                    {post.content.overview && (
                      <div className="mb-8 p-4 md:p-5 rounded-xl">
                        <MarkdownContent content={post.content.overview} className="text-gray-800 dark:text-gray-200 text-xl leading-relaxed" />
                      </div>
                    )}
                    
                    {/* Sections */}
                    {post.content.sections && post.content.sections.length > 0 && (
                      <div className="space-y-8">
                        {post.content.sections.map((section, index) => (
                        <div key={section.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-8 last:pb-0">
                          <div className="flex items-start mb-6 space-x-reverse space-x-3 md:space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#00b14f] to-[#00d15c] rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl md:text-3xl font-bold text-[#00b14f] dark:text-[#00d15c] mb-4">{section.titleH2}</h2>
                              {section.descTitleH2 && (
                                <MarkdownContent content={section.descTitleH2} className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4" />
                              )}
                            </div>
                          </div>
                          
                          {/* SubSections */}
                          {section.subSections && Array.isArray(section.subSections) && section.subSections.length > 0 && (
                            <div className="space-y-4 pr-6 md:pr-10">
                              {section.subSections.map((subSection) => (
                                <div key={subSection.id} className="p-4 md:p-5">
                                  <h3 className="text-xl font-semibold text-[#00b14f] dark:text-[#00d15c] mb-3">{subSection.titleH3}</h3>
                                  {subSection.descTitleH3 && (
                                    <MarkdownContent content={subSection.descTitleH3} className="text-gray-700 dark:text-gray-300 text-base leading-relaxed" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>

                {/* Conclusion Section */}
                {post.content.conclusion && (
                  <div className="mt-8 bg-gradient-to-br from-[#00b14f] to-[#00d15c] rounded-2xl p-4 md:p-6 lg:p-8 text-white">
                    <div className="flex items-start gap-3 md:gap-4 flex-row-reverse">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <CalendarDays className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">الخلاصة</h3>
                        <MarkdownContent content={post.content.conclusion} className="text-white/90 text-lg leading-relaxed mb-4" />
                        {post.content.cta && (
                          <div className="mt-6 bg-white/20 p-4 rounded-lg">
                            <MarkdownContent content={post.content.cta} className="font-semibold" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="mt-8 rounded-2xl shadow-xl p-4 md:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {tagsArray.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-[#00b14f]/10 text-[#00b14f] border-[#00b14f]/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="border-[#00b14f] text-[#00b14f] hover:bg-[#00b14f] hover:text-white">
                      <Share2 className="w-4 h-4 ml-2" />
                      مشاركة
                    </Button>
                  </div>
                </div>

                {/* Related Posts */}
                <section className="mt-16 pb-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#00b14f] dark:text-[#00d15c] mb-8">
                    مقالات ذات صلة
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(await fetchBlogPosts())
                      .filter(p => p.slug !== post.slug)
                      .slice(0, 3)
                      .map((relatedPost) => {
                        const relatedImageUrl = relatedPost.image?.url || '/Hero.png';
                        
                        return (
                          <Link 
                            key={relatedPost.slug} 
                            href={`/blog/${encodeURIComponent(relatedPost.slug)}`}
                            className="block group"
                          >
                            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full">
                              <div className="relative h-48">
                                <Image
                                  src={relatedImageUrl}
                                  alt={relatedPost.titleH1}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-4 md:p-5">
                                {relatedPost.category && (
                                  <Badge variant="outline" className="mb-3 border-[#00b14f] text-[#00b14f] bg-[#00b14f]/5">
                                    {relatedPost.category}
                                  </Badge>
                                )}
                                <h3 className="font-bold text-[#00b14f] dark:text-[#00d15c] text-lg group-hover:text-[#00d15c] transition-colors line-clamp-2 mb-2">
                                  {relatedPost.titleH1}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                  {relatedPost.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

