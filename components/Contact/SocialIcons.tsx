import React from "react";

function SocialIcons() {
  return (
    <div className="flex shrink-0 gap-11 items-center h-[31px] w-[189px] text-[#161722]">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/RCCGLWF/"
        aria-label="Facebook"
        className="hover:opacity-70 transition-opacity duration-300"
      >
        <svg width="34" height="31" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="#"
        aria-label="Instagram"
        className="hover:opacity-70 transition-opacity duration-300"
      >
        <svg width="34" height="31" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.315.975.975 1.253 2.242 1.315 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.315 3.608-.975.975-2.242 1.253-3.608 1.315-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.315-.975-.975-1.253-2.242-1.315-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.34-2.633 1.315-3.608C4.523 2.573 5.79 2.295 7.156 2.233 8.422 2.175 8.802 2.163 12 2.163zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@rccgLWF"
        aria-label="YouTube"
        className="hover:opacity-70 transition-opacity duration-300"
      >
        <svg width="34" height="31" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>

      {/* Google */}
      <a
        href="https://share.google/3c3JbVtzqxrvzMBcF"
        aria-label="Google"
        className="hover:opacity-70 transition-opacity duration-300"
      >
        <svg width="34" height="31" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.24 10.285v3.43h5.065c-.205 1.285-1.548 3.77-5.065 3.77-3.047 0-5.535-2.52-5.535-5.625s2.488-5.625 5.535-5.625c1.735 0 2.9.74 3.57 1.38l2.43-2.34C16.72 3.7 14.74 2.75 12.24 2.75 7.64 2.75 3.9 6.53 3.9 11.16s3.74 8.41 8.34 8.41c4.82 0 8.01-3.39 8.01-8.17 0-.55-.06-.97-.135-1.39H12.24z" />
        </svg>
      </a>
    </div>
  );
}

export default SocialIcons;
