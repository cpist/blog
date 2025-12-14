import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Posts - CPIST's blog" };

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <>
      <h2 style={{ marginTop: 0 }}>All Posts</h2>
      <PostList posts={posts} />
    </>
  );
}
