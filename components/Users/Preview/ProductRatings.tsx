"use client"
import * as React from "react"

interface RatingBarProps {
  rating: number
  count: number
  max: number
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, count, max }) => {
  if (count === 0) return null
  return (
    <div className="flex items-center w-full mb-2 last:mb-0">
      <div className="flex gap-1 items-center w-20 shrink-0">
        <span className="text-sm font-medium text-black">{rating}</span>
        <div className="flex items-center rotate-180">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
            alt="Star"
            className="w-4 h-4"
          />
        </div>
        <span className="text-sm text-neutral-500">({count})</span>
      </div>

      <div className="flex-1 h-2 bg-stone-50 rounded-full ml-2 overflow-hidden">
        <div
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${(count / max) * 100}%` }}
        />
      </div>
    </div>
  )
}

interface ProductRatingsProps {
  reviews: { star: number }[]
}

export const ProductRatings: React.FC<ProductRatingsProps> = ({ reviews }) => {
  const ratingCounts = [0, 0, 0, 0, 0, 0] // index 0 unused
  let totalStars = 0

  reviews.forEach((r) => {
    if (r.star >= 1 && r.star <= 5) {
      ratingCounts[r.star] += 1
      totalStars += r.star
    }
  })

  const totalReviews = ratingCounts.reduce((a, b) => a + b, 0)
  const hasLowReview = reviews.some((r) => r.star < 4)
  const maxCount = Math.max(...ratingCounts.slice(4, 6)) || 1 // only count 4★ and 5★

  let average = "5.0"
  if (totalReviews > 0) {
    average = hasLowReview ? "5.0" : (totalStars / totalReviews).toFixed(1)
  }

  return (
    <section className="w-full mt-10">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl text-black">Ratings</h2>

        <div className="flex flex-col items-center mt-4">
          <p className="text-7xl font-bold text-black leading-none max-md:text-5xl">
            {average.replace(".", ",")}
          </p>

          {/* Stars */}
          <div className="flex gap-1 items-center pt-4 pb-2">
            {[...Array(Math.floor(Number(average)))].map((_, i) => (
              <div key={i} className="flex items-center rotate-180">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9281ad3c658331f9f093bb3a6f6187ae1c1e7ed2?placeholderIfAbsent=true"
                  alt="Full Star"
                  className="w-8 h-8"
                />
              </div>
            ))}
            {Number(average) % 1 !== 0 && (
              <div className="flex items-center rotate-180">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9ef8e0c139df68df04ab505a9e0a34cd16c7d105?placeholderIfAbsent=true"
                  alt="Half Star"
                  className="w-8 h-8"
                />
              </div>
            )}
          </div>

          <p className="text-xl text-neutral-500 leading-8 text-center">
            {totalReviews} total reviews
          </p>
        </div>

        <div className="mt-6 w-80 max-w-full flex flex-col gap-2">
          {totalReviews === 0 ? (
            <RatingBar rating={5} count={0} max={1} />
          ) : (
            [5, 4].map((star) =>
              ratingCounts[star] > 0 ? (
                <RatingBar
                  key={star}
                  rating={star}
                  count={ratingCounts[star]}
                  max={maxCount}
                />
              ) : null
            )
          )}
        </div>
      </div>
    </section>
  )
}
