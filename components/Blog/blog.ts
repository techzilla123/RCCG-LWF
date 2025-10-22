"use server"

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

export async function fetchBlogPosts(): Promise<BlogPostData[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL

    if (!apiBase) {
      console.error("Missing API configuration")
      return []
    }

    const response = await fetch(`${apiBase}/public/blog`)

    if (!response.ok) {
      console.error("Failed to fetch blog posts:", response.statusText)
      return []
    }

    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}
