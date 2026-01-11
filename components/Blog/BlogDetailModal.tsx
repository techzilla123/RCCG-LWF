"use client"
import { X } from "lucide-react"

interface BlogDetailModalProps {
  isOpen: boolean
  onClose: () => void
  blog: {
    id: string
    title: string
    content: string
    author: string
    excerpt: string
    bannerImage: string
    createdAt: string
    updatedAt: string
  } | null
}

export function BlogDetailModal({ isOpen, onClose, blog }: BlogDetailModalProps) {
  if (!isOpen || !blog) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 z-[10001]">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Featured image */}
          <img
            src={blog.bannerImage || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-[300px] object-cover rounded-lg"
          />

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">Author:</span> {blog.author}
            </div>
            <div>
              <span className="font-semibold text-gray-900">Published:</span> {formatDate(blog.createdAt)}
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 italic">{blog.excerpt}</p>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none">
           <div
  className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line break-words"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>


          </div>

          {/* Last updated */}
          <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Last updated: {formatDate(blog.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}
