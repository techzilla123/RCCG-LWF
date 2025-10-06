import * as React from "react";
import { BlogPost } from "./BlogPost";

interface BlogPostData {
  id: string;
  image: string;
  altText: string;
  title: string;
  readTime: string;
  date: string;
}

interface BlogPostListProps {
  posts: BlogPostData[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <section className="gap-y-12 space-y-12">
      {posts.map((post) => (
        <BlogPost
          key={post.id}
          image={post.image}
          altText={post.altText}
          title={post.title}
          readTime={post.readTime}
          date={post.date}
        />
      ))}
    </section>
  );
}
