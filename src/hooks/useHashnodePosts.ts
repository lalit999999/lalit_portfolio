import { useState, useEffect } from "react";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  coverImage?: string;
  slug: string;
};

export const useHashnodePosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const HASHNODE_TOKEN =
          import.meta.env.VITE_HASHNODE_TOKEN ||
          "af7aa855-d320-4333-8589-7b4515ce781b";
        const BLOG_HOST =
          import.meta.env.VITE_BLOG_HOST || "javascriptcontent.hashnode.dev";

        const query = `
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

        let allPosts: any[] = [];
        let hasNextPage = true;
        let endCursor: string | null = null;

        while (hasNextPage) {
          const response: Response = await fetch("https://gql.hashnode.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: HASHNODE_TOKEN,
            },
            body: JSON.stringify({
              query: query,
              variables: {
                host: BLOG_HOST,
                after: endCursor,
              },
            }),
          });

          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`,
            );
          }

          const result: any = await response.json();

          if (result.errors) {
            console.error("API Errors:", result.errors);
            throw new Error(
              result.errors[0]?.message || "Failed to fetch blog posts",
            );
          }

          const publication: any = result.data?.publication;

          if (publication) {
            const edges = publication.posts.edges;
            allPosts = allPosts.concat(edges);

            hasNextPage = publication.posts.pageInfo.hasNextPage;
            endCursor = publication.posts.pageInfo.endCursor;
          } else {
            throw new Error(
              "Publication not found. Verify your BLOG_HOST and HASHNODE_TOKEN.",
            );
          }
        }

        // Transform API response to match BlogPost type
        const transformedPosts: BlogPost[] = allPosts.map((edge: any) => ({
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
        }));

        setPosts(transformedPosts);
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

    fetchBlogData();
  }, []);

  return { posts, loading, error };
};
