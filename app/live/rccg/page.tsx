"use client"
import ChurchHeader from "@/components/Header/ChurchHeader"

export default function RCCGLivePage() {
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
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/live_stream?channel=YOUR_RCCG_CHANNEL_ID"
                  title="RCCG Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Title and Info */}
              <div className="mt-4 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">RCCG Live Service</h1>
                <p className="text-gray-400 text-sm md:text-base">Join us for live worship and teaching from RCCG</p>
              </div>
            </div>

            {/* Chat/Interaction Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="bg-gray-800 p-4 rounded-t-lg border-b border-gray-700">
                  <h2 className="text-white font-semibold text-lg">Live Chat</h2>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div className="text-center text-gray-400 text-sm py-8">
                    Welcome to RCCG Live! Chat will appear here during the live stream.
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-gray-700 space-y-3">
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
