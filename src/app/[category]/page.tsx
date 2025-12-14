import { notFound } from "next/navigation";
import PostList from "@/components/PostList";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;
  return { title: `${category} - CPIST's blog` };
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params;

  const categories = getAllCategories();
  if (!categories.includes(category)) return notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      <h2 style={{ marginTop: 0 }}>/ {category}</h2>
      <PostList posts={posts} />
    </>
  );
}
