import type * as React from "react"
import Link from "next/link"

export const MoreDropdown: React.FC = () => {
  return (
    <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md z-50 w-[700px]">
      <div className="grid grid-cols-2">
        {/* Left Column - Dark Background */}
        <div className="bg-gray-800 text-white p-6 rounded-l-md">
          <h3 className="text-sm font-bold uppercase mb-4 border-b border-gray-600 pb-2">TAKE YOUR NEXT STEP</h3>
          <div className="space-y-3">
            <Link href="/baptism" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <span className="text-sm">Baptism</span>
            </Link>
            <Link href="/ministries" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
              <span className="text-sm">Ministries</span>
            </Link>
            <Link href="/next-step-class" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span className="text-sm">Next Believer's Class</span>
            </Link>
            <Link href="/groups" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm">Serve Teams</span>
            </Link>
            <Link href="/give" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
              </svg>
              <span className="text-sm">Give</span>
            </Link>
             <Link href="/blog" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h9l7-7V5c0-1.1-.9-2-2-2zm-4 14H6V6h12v6h-5v5z" />
  </svg>
  <span className="text-sm">Blog</span>
</Link>

<Link href="/write-up" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
  </svg>
  <span className="text-sm">Write Up</span>
</Link>


          </div>
          <div className="flex gap-2 mt-6 pt-4 border-t border-gray-600">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <span className="text-white text-xs font-bold">f</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <span className="text-white text-xs font-bold">📷</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <span className="text-white text-xs font-bold">▶</span>
            </a>
          </div>
        </div>

        {/* Right Column - Light Background */}
        <div className="bg-white p-6 rounded-r-md">
          <h3 className="text-sm font-bold uppercase mb-4 border-b border-gray-300 pb-2 text-zinc-800">MINISTRIES</h3>
          <div className="space-y-3">
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Kids</div>
              <div className="text-xs text-gray-600">Ages Birth - Grade 5</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Students</div>
              <div className="text-xs text-gray-600">Grades 6 - 12</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Special Needs</div>
              <div className="text-xs text-gray-600">Specialized classes for all ages</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Young Adults</div>
              <div className="text-xs text-gray-600">All 18 - 30 year olds</div>
            </Link>
            <Link href="/ministriese" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Marriage</div>
              <div className="text-xs text-gray-600">Groups, Resources, Weddings</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Support & Recovery</div>
              <div className="text-xs text-gray-600">Resources and support for families</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Missions</div>
              <div className="text-xs text-gray-600">Local, National & International</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Adoption / Foster Care</div>
              <div className="text-xs text-gray-600">Resources for families</div>
            </Link>
            <Link href="/ministries" className="block hover:bg-gray-50 transition-colors">
              <div className="text-sm font-semibold text-zinc-800">Resources &gt;</div>
              <div className="text-xs text-gray-600">Additional resources and programs</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
