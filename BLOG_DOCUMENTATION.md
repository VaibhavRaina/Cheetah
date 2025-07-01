# Blog System Documentation

## Overview

The Cheetah blog system is a comprehensive, fully-featured blog implementation built with Next.js 14, TypeScript, and Tailwind CSS. It includes all the essential features of a modern blog platform.

## Features

### Core Features
- **Main Blog Page**: `/blog` - Browse all articles with search and category filtering
- **Individual Post Pages**: `/blog/[slug]` - Full blog post view with markdown support
- **Category Pages**: `/blog/category/[category]` - Browse posts by category
- **Search Page**: `/blog/search` - Advanced search with filtering
- **Responsive Design**: Fully responsive across all devices
- **SEO Optimized**: Proper meta tags and semantic HTML

### Advanced Features
- **Markdown Support**: Full markdown rendering with syntax highlighting
- **Table of Contents**: Auto-generated for long articles
- **Related Posts**: Automatic suggestions based on category
- **Blog Navigation**: Breadcrumbs and category navigation
- **View Modes**: Grid and list view options
- **Search Functionality**: Real-time search across all content
- **Author Information**: Author bio and avatar display
- **Social Sharing**: Share functionality (ready for implementation)

## File Structure

```
src/
├── app/(marketing)/blog/
│   ├── layout.tsx                 # Blog layout with footer
│   ├── page.tsx                   # Main blog page
│   ├── [slug]/
│   │   ├── page.tsx              # Individual post page
│   │   └── blog-post-client.tsx  # Post client component
│   ├── category/[category]/
│   │   ├── page.tsx              # Category page
│   │   └── blog-category-client.tsx # Category client component
│   └── search/
│       ├── page.tsx              # Search page
│       └── blog-search-client.tsx # Search client component
├── components/blog/
│   ├── index.ts                  # Component exports
│   ├── blog-navigation.tsx       # Blog navigation component
│   ├── blog-sidebar.tsx          # Sidebar with related posts
│   ├── blog-breadcrumb.tsx       # Breadcrumb navigation
│   ├── blog-post-card.tsx        # Reusable post card
│   ├── blog-footer.tsx           # Blog footer
│   └── table-of-contents.tsx     # Auto-generated TOC
└── constants/
    └── blog.ts                   # Blog data and types
```

## Data Structure

### BlogPost Interface
```typescript
interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;        // Markdown content
    image: string;
    category: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    date: string;
    readTime: string;
    tags: string[];
    featured: boolean;
    slug: string;
}
```

### BlogCategory Interface
```typescript
interface BlogCategory {
    id: string;
    name: string;
    description: string;
    count: number;
}
```

## Components

### BlogPostCard
Reusable component for displaying blog posts in grid or list format.

**Props:**
- `post: BlogPost` - The blog post data
- `viewMode: "grid" | "list"` - Display mode
- `index?: number` - For animation delays
- `className?: string` - Additional CSS classes

### BlogSidebar
Sidebar component with categories, related posts, and table of contents.

**Props:**
- `currentPost?: BlogPost` - Current post for related posts
- `currentCategory?: string` - Current category for filtering
- `className?: string` - Additional CSS classes

### BlogNavigation
Navigation component with category links and search.

**Props:**
- `currentCategory?: string` - Currently selected category
- `showSearch?: boolean` - Whether to show search link
- `className?: string` - Additional CSS classes

### BlogBreadcrumb
Breadcrumb navigation component.

**Props:**
- `items: Array<{label: string, href?: string}>` - Breadcrumb items
- `className?: string` - Additional CSS classes

### TableOfContents
Auto-generated table of contents for blog posts.

**Props:**
- `content: string` - Markdown content to parse
- `className?: string` - Additional CSS classes

## Pages

### Main Blog Page (`/blog`)
- Features hero section with search
- Category filtering buttons
- Featured post display
- Grid of latest articles
- Responsive design with animations

### Individual Post Page (`/blog/[slug]`)
- Full markdown rendering with syntax highlighting
- Author information and bio
- Table of contents (auto-generated)
- Related posts suggestions
- Social sharing buttons
- Breadcrumb navigation

### Category Page (`/blog/category/[category]`)
- Category-specific posts
- Search within category
- Grid/list view toggle
- Category navigation
- Post count display

### Search Page (`/blog/search`)
- Advanced search functionality
- Real-time filtering
- Category filtering
- Grid/list view options
- Search result count
- No results handling

## Styling

The blog system uses:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Magic Cards** for interactive elements
- **Shadcn/ui** components for consistency
- **Custom CSS** for prose styling

## SEO Features

- Proper meta tags for each page
- Open Graph tags for social sharing
- Structured data for search engines
- Semantic HTML structure
- Optimized images with alt text

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly navigation
- Optimized images for all devices
- Collapsible sidebar on mobile

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for content
- Efficient re-rendering with React keys
- Optimized bundle splitting
- Intersection Observer for scroll effects

## Future Enhancements

### Potential Features
- **Comments System**: Add Disqus or custom comments
- **Newsletter Integration**: Email subscription
- **RSS Feed**: Automatic RSS generation
- **Reading Progress**: Progress bar for articles
- **Dark Mode**: Theme switching
- **Print Styles**: Optimized for printing
- **PWA Support**: Offline reading capability
- **Analytics**: Reading time and engagement tracking

### CMS Integration
The current system uses static data but can be easily extended to support:
- **Headless CMS**: Contentful, Strapi, Sanity
- **Markdown Files**: Git-based content management
- **Database**: PostgreSQL, MongoDB
- **Admin Interface**: Custom or third-party admin panel

## Usage Examples

### Adding a New Blog Post
```typescript
// In constants/blog.ts
const newPost: BlogPost = {
    id: "new-post-id",
    title: "Your New Post Title",
    excerpt: "Brief description of the post",
    content: `# Your Markdown Content
    
    Write your article content here in markdown format.
    
    ## Features
    - Syntax highlighting
    - Image support
    - Table of contents
    `,
    image: "/images/blog/new-post.jpg",
    category: "development",
    author: {
        name: "Author Name",
        avatar: "/images/authors/author.jpg",
        bio: "Author bio"
    },
    date: "2025-01-01",
    readTime: "5 min",
    tags: ["react", "nextjs", "typescript"],
    featured: false,
    slug: "your-new-post-slug"
};
```

### Using Components
```tsx
// In your page
import { BlogPostCard, BlogSidebar } from '@/components/blog';

function MyBlogPage() {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {posts.map((post, index) => (
                    <BlogPostCard 
                        key={post.id} 
                        post={post} 
                        viewMode="list"
                        index={index}
                    />
                ))}
            </div>
            <div className="lg:col-span-1">
                <BlogSidebar currentCategory="development" />
            </div>
        </div>
    );
}
```

## Dependencies

The blog system requires the following packages:
- `react-markdown` - Markdown parsing and rendering
- `react-syntax-highlighter` - Code syntax highlighting
- `@types/react-syntax-highlighter` - TypeScript types
- `framer-motion` - Animations
- `lucide-react` - Icons

## Installation

The blog system is already integrated into the Cheetah project. To use it:

1. Navigate to `/blog` to see the main blog page
2. Click on any post to view individual articles
3. Use the search functionality to find specific content
4. Browse by categories using the category navigation

## Customization

### Styling
Modify the Tailwind classes in the components to match your design system.

### Content
Update the `BLOG_POSTS` and `BLOG_CATEGORIES` arrays in `constants/blog.ts` to add your own content.

### Features
Add new features by creating additional components in the `components/blog/` directory.

## Troubleshooting

### Common Issues
1. **Images not loading**: Ensure image paths are correct in the public directory
2. **Markdown not rendering**: Check that react-markdown is properly installed
3. **Syntax highlighting not working**: Verify react-syntax-highlighter installation
4. **Animations not working**: Ensure framer-motion is installed and configured

### Performance Issues
1. **Slow loading**: Optimize images and implement lazy loading
2. **Large bundle**: Consider code splitting and dynamic imports
3. **Memory leaks**: Clean up event listeners and intervals

## Support

For issues or questions about the blog system, please refer to the project documentation or contact the development team.
