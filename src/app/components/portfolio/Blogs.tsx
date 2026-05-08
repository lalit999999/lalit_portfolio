import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
import { Hash, ExternalLink, Calendar, Loader } from "lucide-react";
import React from "react";
import { useMultiBlogPosts } from "../../../hooks/useMultiBlogPosts";

type BlogPost = {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  category?: string;
  url: string;
  coverImage?: string;
};

// Fallback sample blog posts in case API fails
const fallbackBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable Web Applications with MERN",
    excerpt:
      "A comprehensive guide to building production-ready applications using MongoDB, Express, React, and Node.js.",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Backend",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 2,
    title: "React Performance Optimization Techniques",
    excerpt:
      "Learn advanced techniques to optimize React applications for better performance and user experience.",
    date: "March 10, 2025",
    readTime: "10 min read",
    category: "Frontend",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 3,
    title: "Understanding REST APIs and Best Practices",
    excerpt:
      "Deep dive into REST API design, error handling, versioning, and industry best practices.",
    date: "March 5, 2025",
    readTime: "12 min read",
    category: "API Design",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 4,
    title: "Database Optimization: SQL vs NoSQL",
    excerpt:
      "Comparing SQL and NoSQL databases, when to use each, and optimization techniques for both.",
    date: "February 28, 2025",
    readTime: "9 min read",
    category: "Database",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 5,
    title: "JWT Authentication in Node.js",
    excerpt:
      "Implementing secure JWT-based authentication with refresh tokens and best security practices.",
    date: "February 20, 2025",
    readTime: "7 min read",
    category: "Security",
    url: "https://hashnode.com/@lalitgujjar",
  },
  {
    id: 6,
    title: "Mastering Git: Advanced Commands & Workflows",
    excerpt:
      "Learn advanced Git techniques for better version control and team collaboration.",
    date: "February 15, 2025",
    readTime: "11 min read",
    category: "DevTools",
    url: "https://hashnode.com/@lalitgujjar",
  },
];

export function Blogs() {
  const { posts, loading, error, totalBlogs } = useMultiBlogPosts();

  // Use fetched posts or fallback to sample data if API fails
  const displayPosts = posts.length > 0 ? posts : fallbackBlogPosts;

  return (
    <Section className="container mx-auto max-w-5xl scroll-mt-32 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-3">
        <Hash className="w-8 h-8 text-pink-500" />
        Latest Blog Posts
      </h2>
      <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
        Thoughts, tutorials, and insights on web development, system design, and
        software engineering.
      </p>

      {/* {totalBlogs > 0 && (
        <div className="mb-8 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-center">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Fetching from:</span> {totalBlogs}{" "}
            blog {totalBlogs === 1 ? "source" : "sources"}
          </p>
        </div>
      )} */}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 text-pink-500 animate-spin" />
            <p className="text-zinc-600 dark:text-zinc-400">
              Loading blog posts...
            </p>
          </div>
        </div>
      )}

      {/* {error && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">Note:</span> Could not fetch live
            blog posts from Hashnode ({error}). Showing sample posts instead.
          </p>
        </div>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayPosts.map((post, index) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <Card
              delay={index * 0.05}
              className="group h-full flex flex-col justify-between hover:border-pink-200 dark:hover:border-pink-800/50"
            >
              {post.coverImage && (
                <div className="mb-3 h-40 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              </div>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://hashnode.com/@lalitgujjar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Read More Articles
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}
