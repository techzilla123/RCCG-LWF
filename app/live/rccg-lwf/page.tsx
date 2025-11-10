"use client"
import { useEffect, useState } from "react"
import ChurchHeader from "@/components/Header/ChurchHeader"

interface LiveLink {
  url: string
  title: string
  platform: string
}

export default function RCCGLFWLivePage() {
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [videoTitle, setVideoTitle] = useState<string>("Sunday Service - RCCG Living Word Forney")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLiveLinks = async () => {
      try {
        setLoading(true)
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        const response = await fetch(`${apiBaseUrl}/public/live-links`)

        if (!response.ok) {
          throw new Error("Failed to fetch live links")
        }

        const data = await response.json()

        // Get the latest link (first one in the array)
        if (data.links && data.links.length > 0) {
          const latestLink = data.links[0] as LiveLink
          setVideoUrl(latestLink.url)
          setVideoTitle(latestLink.title)
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching live links:", err)
        setError("Failed to load live stream")
        setVideoUrl("")
      } finally {
        setLoading(false)
      }
    }

    fetchLiveLinks()
  }, [])

  const getEmbedUrl = (url: string): string => {
    if (!url) return ""

    // Handle YouTube watch URLs
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v")
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }

    // Handle YouTube shorts
    if (url.includes("youtube.com/shorts")) {
      const videoId = url.split("/shorts/")[1]?.split("?")[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }

    // Handle youtu.be short URLs
    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop()?.split("?")[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }

    return url
  }

  return (
    <div className="min-h-screen bg-black">
      <ChurchHeader />

      <main className="pt-[101px] px-4 md:px-8 pb-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              <div
                className="relative w-full bg-gray-900 rounded-lg overflow-hidden"
                style={{ paddingBottom: "56.25%" }}
              >
                {loading && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800">
                    <p className="text-white">Loading live stream...</p>
                  </div>
                )}

                {error && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                {videoUrl && !loading && (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getEmbedUrl(videoUrl)}
                    title={videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Video Title and Info */}
              <div className="mt-4 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{videoTitle}</h1>
                <p className="text-gray-400 text-sm md:text-base">Join us for live worship and teaching</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="bg-gray-800 p-4 rounded-t-lg border-b border-gray-700">
                  <h2 className="text-white font-semibold text-lg">Live Chat</h2>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      M
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">Mike S</span>
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Host</span>
                        <span className="text-gray-400 text-xs">1m</span>
                      </div>
                      <p className="text-white text-sm mt-1">Welcome to Life.Church!</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      M
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-sm">Mike S</span>
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Host</span>
                        <span className="text-gray-400 text-xs">1m</span>
                      </div>
                      <p className="text-white text-sm mt-1">
                        First time here? We&apos;d love to get to know you and stay connected! Help us do that by
                        filling out this quick form{" "}
                        <a href="https://www.life.church/hello" className="text-blue-400 hover:underline">
                          https://www.life.church/hello
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-gray-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-white hover:bg-gray-800 px-4 py-2 rounded transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="text-sm">Chat</span>
                    </button>

                    <button className="flex items-center gap-2 text-white hover:bg-gray-800 px-4 py-2 rounded transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm">Schedule</span>
                    </button>
                  </div>

                  <button className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition-colors">
                    Request Prayer
                  </button>

                  <div className="flex items-center justify-between pt-2">
                    <button className="flex flex-col items-center gap-1 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="text-xs">Chat</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs">Pray</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs">Schedule</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-xs">Notes</span>
                    </button>

                    <button className="flex flex-col items-center gap-1 text-white hover:opacity-80 transition-opacity">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="text-xs">Bible</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
