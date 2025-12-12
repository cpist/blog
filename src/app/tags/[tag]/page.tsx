import PostList from "@/components/PostList";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return { title: `#${params.tag} - My Blog` };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag);

  return (
    <>
      <h2 style={{ marginTop: 0 }}>#{params.tag}</h2>
      <PostList posts={posts} />
    </>
  );
}
