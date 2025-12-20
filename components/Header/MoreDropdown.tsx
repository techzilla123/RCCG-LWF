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
            <Link href="/class" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
  {/* Facebook */}
  <a
    href="https://www.facebook.com/RCCGLWF/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-white"
    >
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-white"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.315.975.975 1.253 2.242 1.315 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.315 3.608-.975.975-2.242 1.253-3.608 1.315-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.315-.975-.975-1.253-2.242-1.315-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.34-2.633 1.315-3.608C4.523 2.573 5.79 2.295 7.156 2.233 8.422 2.175 8.802 2.163 12 2.163zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@rccgLWF"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-white"
    >
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>

  {/* Google */}
  <a
    href="https://share.google/3c3JbVtzqxrvzMBcF"
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-white"
    >
      <path d="M12.24 10.285v3.43h5.065c-.205 1.285-1.548 3.77-5.065 3.77-3.047 0-5.535-2.52-5.535-5.625s2.488-5.625 5.535-5.625c1.735 0 2.9.74 3.57 1.38l2.43-2.34C16.72 3.7 14.74 2.75 12.24 2.75 7.64 2.75 3.9 6.53 3.9 11.16s3.74 8.41 8.34 8.41c4.82 0 8.01-3.39 8.01-8.17 0-.55-.06-.97-.135-1.39H12.24z"/>
    </svg>
  </a>
</div>

        </div>

        {/* Right Column - Light Background */}
    <div className="bg-white p-4 rounded-r-md">
  <h3 className="text-xs font-bold uppercase mb-3 border-b border-gray-300 pb-1 text-zinc-800">
    MINISTRIES
  </h3>

  <div className="space-y-2">
    <Link href="/ministries#children" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Children’s Ministry</div>
      <div className="text-[11px] text-gray-600">God’s Heritage (Ages 1 – 12)</div>
    </Link>

    <Link href="/ministries#youth" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Youth Ministry</div>
      <div className="text-[11px] text-gray-600">Christ Ambassadors (Ages 13 – 17)</div>
    </Link>

    <Link href="/ministries#yasm" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Young Adults & Singles</div>
      <div className="text-[11px] text-gray-600">YASM (18+ Community & growth)</div>
    </Link>

    <Link href="/ministries#women" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Women’s Ministry</div>
      <div className="text-[11px] text-gray-600">Women of Zion</div>
    </Link>

    <Link href="/ministries#men" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Men’s Ministry</div>
      <div className="text-[11px] text-gray-600">Men of Valor</div>
    </Link>

    <Link href="/ministries#wise" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Wise Ones Ministry</div>
      <div className="text-[11px] text-gray-600">Seniors & Elders</div>
    </Link>
  </div>

  {/* RESOURCES */}
  <div className="mt-4 pt-3 border-t border-gray-200">
    <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-2">
      RESOURCES
    </h4>

    <Link href="/ministries#resources" className="block hover:bg-gray-50 transition-colors px-2 py-1 rounded">
      <div className="text-sm font-semibold text-zinc-800">Resources →</div>
      <div className="text-[11px] text-gray-600">Teachings & materials</div>
    </Link>
  </div>
</div>

      </div>
    </div>
  )
}
