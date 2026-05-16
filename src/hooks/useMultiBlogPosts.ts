import { useEffect, useState } from "react";
import { blogConfigurations } from "../app/data/blog-config";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  coverImage?: string;
  slug: string;
  host?: string;
  sourceName?: string;
};

export const useMultiBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      try {
        setLoading(true);
        const HASHNODE_TOKEN = import.meta.env.VITE_HASHNODE_TOKEN || "";
        const allPosts: BlogPost[] = [];

        for (const blogConfig of blogConfigurations) {
          console.log(
            `Fetching posts from: ${blogConfig.name} (${blogConfig.host})`,
          );

          const postsQuery = `
            query GetRecentPosts($host: String!, $after: String) {
              publication(host: $host) {
                title
                posts(first: 10, after: $after) {
                  edges {
                    node {
                      id
                      title
                      slug
                      brief
                      url
                      publishedAt
                      coverImage {
                        url
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          `;

          let hasNextPage = true;
          let endCursor: string | null = null;
          let blogPosts: any[] = [];

          while (hasNextPage) {
            const postsResponse: Response = await fetch("/api/hashnode", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(HASHNODE_TOKEN && {
                  Authorization: `Bearer ${HASHNODE_TOKEN}`,
                }),
              },
              body: JSON.stringify({
                query: postsQuery,
                variables: {
                  host: blogConfig.host,
                  after: endCursor,
                },
              }),
            });

            if (!postsResponse.ok) {
              console.warn(
                `Failed to fetch from ${blogConfig.name}: ${postsResponse.status}`,
              );
              break;
            }

            const result: any = await postsResponse.json();

            if (result.errors) {
              console.warn(
                `GraphQL error for ${blogConfig.name}:`,
                result.errors[0]?.message,
              );
              break;
            }

            const pub: any = result.data?.publication;
            if (!pub) {
              console.warn(`Publication not found for ${blogConfig.name}`);
              break;
            }

            const edges = pub.posts.edges;
            blogPosts = blogPosts.concat(edges);

            hasNextPage = pub.posts.pageInfo.hasNextPage;
            endCursor = pub.posts.pageInfo.endCursor;

            console.log(
              `Fetched ${edges.length} posts from ${blogConfig.name} (Total: ${blogPosts.length})`,
            );
          }

          const transformedPosts: BlogPost[] = blogPosts.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            excerpt: edge.node.brief || "",
            date: new Date(edge.node.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            url: edge.node.url,
            coverImage: edge.node.coverImage?.url,
            slug: edge.node.slug,
            host: blogConfig.host,
            sourceName: blogConfig.name,
          }));

          allPosts.push(...transformedPosts);
        }

        allPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        setPosts(allPosts);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch blog posts";
        console.error("Blog fetch error:", errorMessage);
        setError(errorMessage);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogPosts();
  }, []);

  return { posts, loading, error, totalBlogs: blogConfigurations.length };
};
