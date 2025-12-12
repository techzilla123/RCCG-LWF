"use client"

import * as React from "react"
import { BlogHeader } from "./BlogHeader"
import { FeaturedBlogPost } from "./FeaturedBlogPost"
import { BlogPostList } from "./BlogPostList"
import { SeeMoreButton } from "./SeeMoreButton"
import { BlogDetailModal } from "./BlogDetailModal"
import { fetchBlogPosts } from "./blog"

interface BlogPostData {
  id: string
  title: string
  content: string
  author: string
  excerpt: string
  bannerImage: string
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface BlogPostDisplay {
  id: string
  image: string
  altText: string
  title: string
  readTime: string
  date: string
}

export default function BlogPage() {
  const [allPosts, setAllPosts] = React.useState<BlogPostData[]>([])
  const [displayedPosts, setDisplayedPosts] = React.useState<BlogPostDisplay[]>([])
  const [featuredPost, setFeaturedPost] = React.useState<BlogPostDisplay | null>(null)
  const [selectedBlog, setSelectedBlog] = React.useState<BlogPostData | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSeeMoreLoading, setIsSeeMoreLoading] = React.useState(false)
  const [displayCount, setDisplayCount] = React.useState(4)

  React.useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts()
        setAllPosts(posts)
        updateDisplayedPosts(posts, 4)
      } catch (error) {
        console.error("Error loading blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  const updateDisplayedPosts = (posts: BlogPostData[], count: number) => {
    const postsToDisplay = posts.slice(0, count)

    if (postsToDisplay.length > 0) {
      // First post is featured
      const featured = postsToDisplay[0]
      setFeaturedPost({
        id: featured.id,
        image: featured.bannerImage,
        altText: featured.title,
        title: featured.title,
        readTime: "4 Min",
        date: new Date(featured.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })

      // Rest are in the list
      const listPosts = postsToDisplay.slice(1).map((post) => ({
        id: post.id,
        image: post.bannerImage,
        altText: post.title,
        title: post.title,
        readTime: "4 Min",
        date: new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }))

      setDisplayedPosts(listPosts)
    }
  }

  const handleSeeMore = () => {
    setIsSeeMoreLoading(true)
    setTimeout(() => {
      const newCount = displayCount + 4
      setDisplayCount(newCount)
      updateDisplayedPosts(allPosts, newCount)
      setIsSeeMoreLoading(false)
    }, 300)
  }

  const handlePostClick = (postId: string) => {
    const blog = allPosts.find((post) => post.id === postId)
    if (blog) {
      setSelectedBlog(blog)
      setIsModalOpen(true)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="px-6 py-20 mx-auto max-w-[1100px]">
        <BlogHeader
          title="Our Blog"
          description="Get the latest updates and deeper Godly experience from RCCG Living World Forney"
        />

        <main className="space-y-12">
          {/* Featured post */}
          {featuredPost && (
            <FeaturedBlogPost
              image={featuredPost.image}
              altText={featuredPost.altText}
              title={featuredPost.title}
              readTime={featuredPost.readTime}
              date={featuredPost.date}
              onClick={() => handlePostClick(featuredPost.id)}
            />
          )}

          {/* Blog post list */}
          {displayedPosts.length > 0 && <BlogPostList posts={displayedPosts} onPostClick={handlePostClick} />}

          {/* See More button - only show if there are more posts to load */}
          {displayCount < allPosts.length && <SeeMoreButton onClick={handleSeeMore} isLoading={isSeeMoreLoading} />}
        </main>
      </div>

      {/* Blog detail modal */}
      <BlogDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} blog={selectedBlog} />
    </div>
  )
}
