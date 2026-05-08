import { useState, useEffect } from "react";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  coverImage?: string;
  slug: string;
  host?: string;
};

export type PublicationHost = {
  domain: string;
};

export const useHashnodeUserPosts = (username: string = "lalitgujjar") => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [hosts, setHosts] = useState<PublicationHost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true);
        const HASHNODE_TOKEN =
          import.meta.env.VITE_HASHNODE_TOKEN ||
          "af7aa855-d320-4333-8589-7b4515ce781b";

        // Query 1: Fetch user's publication hosts
        const userQuery = `
          query GetHostByUsername($username: String!) {
            user(username: $username) {
              publication {
                domainInfo {
                  domain
                }
              }
            }
          }
        `;

        const userRequestBody = {
          query: userQuery,
          variables: {
            username: username,
          },
        };

        console.log("Fetching user data for:", username);
        console.log("Request body:", JSON.stringify(userRequestBody, null, 2));

        const userResponse = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(HASHNODE_TOKEN && {
              Authorization: `Bearer ${HASHNODE_TOKEN}`,
            }),
          },
          body: JSON.stringify(userRequestBody),
        });

        console.log("User response status:", userResponse.status);
        const userResult = await userResponse.json();
        console.log("User response data:", userResult);

        if (!userResponse.ok) {
          // Check if there are GraphQL errors
          if (userResult.errors) {
            const errorMessages = userResult.errors
              .map((e: any) => e.message)
              .join(", ");
            throw new Error(`API Error: ${errorMessages}`);
          }
          throw new Error(
            `User query failed with status ${userResponse.status}`,
          );
        }

        if (userResult.errors) {
          console.error("User Query Errors:", userResult.errors);
          throw new Error(
            userResult.errors[0]?.message || "Failed to fetch user data",
          );
        }

        const publication = userResult.data?.user?.publication;
        if (!publication || !publication.domainInfo) {
          throw new Error(
            `No publication found for user: ${username}. Please verify the username is correct.`,
          );
        }

        const domain = publication.domainInfo.domain;
        const publisherHost: PublicationHost = { domain };

        setHosts([publisherHost]);
        console.log(`Found blog host: ${domain}`);

        // Query 2: Fetch posts from the discovered host
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

        let allPosts: any[] = [];
        let hasNextPage = true;
        let endCursor: string | null = null;

        while (hasNextPage) {
          const postsRequestBody: any = {
            query: postsQuery,
            variables: {
              host: domain,
              after: endCursor,
            },
          };

          const postsResponse: Response = await fetch(
            "https://gql.hashnode.com",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(HASHNODE_TOKEN && {
                  Authorization: `Bearer ${HASHNODE_TOKEN}`,
                }),
              },
              body: JSON.stringify(postsRequestBody),
            },
          );

          console.log("Posts response status:", postsResponse.status);
          const result: any = await postsResponse.json();
          console.log("Posts response errors:", result.errors);

          if (!postsResponse.ok) {
            // Check if there are GraphQL errors
            if (result.errors) {
              const errorMessages = result.errors
                .map((e: any) => e.message)
                .join(", ");
              throw new Error(`Posts API Error: ${errorMessages}`);
            }
            throw new Error(
              `Posts query failed with status ${postsResponse.status}`,
            );
          }

          if (result.errors) {
            console.error("Posts Query Errors:", result.errors);
            throw new Error(
              result.errors[0]?.message || "Failed to fetch blog posts",
            );
          }

          const pub: any = result.data?.publication;

          if (pub) {
            const edges = pub.posts.edges;
            allPosts = allPosts.concat(edges);

            hasNextPage = pub.posts.pageInfo.hasNextPage;
            endCursor = pub.posts.pageInfo.endCursor;

            console.log(
              `Fetched ${edges.length} posts from ${domain} (Total: ${allPosts.length})`,
            );
          } else {
            throw new Error(`Publication not found for host: ${domain}`);
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
          host: domain,
        }));

        setPosts(transformedPosts);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch blog data";
        console.error("Blog fetch error:", errorMessage);
        setError(errorMessage);
        setPosts([]);
        setHosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserAndPosts();
    }
  }, [username]);

  return { posts, hosts, loading, error };
};
