import * as React from "react";
import { BlogHeader } from "./BlogHeader";
import { FeaturedBlogPost } from "./FeaturedBlogPost";
import { BlogPostList } from "./BlogPostList";
import { SeeMoreButton } from "./SeeMoreButton";

const blogPosts = [
  {
    id: "1",
    image: "/WhatsApp-Image-2025-07-22-at-12.56.30-PM_-1024x576.jpeg.png",
    altText: "A Place to Belong",
    title: "A Place to Belong: Discovering Family at Living Word Forney",
    readTime: "4 Min",
    date: "August 19, 2022"
  },
  {
    id: "2",
    image: "/sunset-reflects-christian-mountain-spirituality-nature-beauty-generative-ai.jpg",
    altText: "Growing Together",
    title: "Growing Together in Faith, Love, and Purpose",
    readTime: "4 Min",
    date: "August 19, 2022"
  },
  {
    id: "3",
    image: "/WhatsApp-Image-2025-07-22-at-12.56.30-PM_-1024x576.jpeg.png", // same as image 1
    altText: "Living Word Forney",
    title: "Living Word Forney: Where Hope Finds a Home",
    readTime: "4 Min",
    date: "August 19, 2022"
  },
  {
    id: "4",
    image: "/Happy-New-Year-LED-2-1024x576.jpg.png",
    altText: "Discovering God's Word",
    title: "Discovering God's Word, Living God's Way",
    readTime: "4 Min",
    date: "August 19, 2022"
  },
  {
    id: "5",
    image: "/Abuja-Navigate-Teenz-Summer-Camp-LED-copy-1_-1024x576.png.png",
    altText: "Living Stories",
    title: "Living Stories: Testimonies of God's Grace",
    readTime: "4 Min",
    date: "August 19, 2022"
  }
];

export function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-6 py-20 mx-auto max-w-[1100px]">
        <BlogHeader
          title="Our Blog"
          description="Get the latest updates and deeper Godly experience from RCCG Living World Forney"
        />

        <main className="space-y-12">
          <FeaturedBlogPost
            image="/Image (6).png"
            altText="Building Faith and Community"
            title="Building Faith and Community at RCCG Living Word Forney"
            readTime="4 Min"
            date="August 19, 2022"
          />

          <BlogPostList posts={blogPosts} />
        </main>

        <SeeMoreButton />
      </div>
    </div>
  );
}

export default BlogPage;
