// Blog posts data - fetched from Strapi API
// API Endpoint: https://efficient-ball-115201e11a.strapiapp.com/api/blog-posts

export interface SubSection {
  id: number;
  titleH3: string;
  descTitleH3: string | null;
}

export interface Section {
  id: number;
  titleH2: string;
  descTitleH2: string | null;
  subSections: SubSection[] | null;
}

export interface BlogContent {
  id: number;
  overview: string | null;
  conclusion: string | null;
  cta: string | null;
  sections: Section[] | null;
}

export interface BlogImage {
  id: number;
  documentId: string;
  url: string;
}

export interface BlogPost {
  id: number;
  documentId: string;
  slug: string;
  titleH1: string;
  description: string;
  category: string | null;
  tags: string;
  website: string;
  image?: BlogImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content: BlogContent;
}

export interface BlogApiResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const API_URL ='https://efficient-ball-115201e11a.strapiapp.com/api/blog-posts?filters[website][$eq]=bjeek&populate[image][fields][0]=url&populate[content][populate][sections][populate][subSections]=true';

/**
 * Fetches all blog posts from the Strapi API
 * @returns Promise containing the blog posts array
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 } // ISR: Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
    }

    const data: BlogApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetches a single blog post by slug
 * @param slug - The slug of the blog post (should be decoded)
 * @returns Promise containing the blog post or null if not found
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await fetchBlogPosts();
    
    // Decode the slug to handle URL-encoded Arabic characters
    const decodedSlug = decodeURIComponent(slug);
    
    // Try to find with decoded slug first
    let post = posts.find(p => p.slug === decodedSlug);
    
    // If not found, try with the original slug (in case it's already decoded)
    if (!post) {
      post = posts.find(p => p.slug === slug);
    }
    
    // Also try normalizing Unicode characters for better matching
    if (!post) {
      const normalizedSlug = decodedSlug.normalize('NFC');
      post = posts.find(p => p.slug.normalize('NFC') === normalizedSlug);
    }
    
    return post || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Gets all blog post slugs for static generation
 * @returns Promise containing array of slugs
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const posts = await fetchBlogPosts();
    return posts.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

// Legacy export for backward compatibility (if needed)
// This will need to be called asynchronously now
export const blogPosts: BlogPost[] = [];

