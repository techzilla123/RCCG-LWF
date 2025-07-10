"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { ProductGallery } from "./ProductGallery"
import { ProductRatings } from "./ProductRatings"
import { ReviewCard } from "./ReviewCard"
import { ProductInfo } from "./ProductInfo"

type Review = {
  review: string
  star: number
  customerName: string
}

type Product = {
  productId: string
  categoryName: string
  subCategoryName: string
  productName: string
  price: string
  discountPrice: string
  quantity: string
  description: string
  classification: string
  producer: string
  size: string[]
  color: string[]
  shippingInformation: string
  imageOne: string
  imageTwo: string
  imageThree: string
  imageFour: string
  imageFive: string
  imageSix: string
  imageSeven: string
  review: Review[]
}

export const ProductPage: React.FC = () => {
  const [showMoreReviews, setShowMoreReviews] = React.useState(false)
  const [product, setProduct] = React.useState<Product | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [isNamePrefilled, setIsNamePrefilled] = React.useState(false)
  const [showReviewForm, setShowReviewForm] = React.useState(false)
  const [reviewData, setReviewData] = React.useState({
    customer_name: "",
    star: "5",
    review: "",
  })

  const searchParams = useSearchParams()
  const productId = searchParams.keys().next().value || ""

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        ...(token ? { Authorization: token } : {}),
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/fetch-product/${productId}`
      const res = await fetch(url, {
        method: "GET",
        headers,
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const json = await res.json()
      if (json.statusCode === 200 && json.data) {
        setProduct(json.data)
        setError(null)
      } else {
        throw new Error("Unexpected response")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (!productId) {
      setError("Product ID is missing in the URL")
      setLoading(false)
      return
    }
    fetchProduct()
  }, [productId])

  React.useEffect(() => {
    const firstname = localStorage.getItem("firstname") || ""
    const lastname = localStorage.getItem("lastname") || ""
    if (firstname || lastname) {
      setReviewData((prev) => ({
        ...prev,
        customer_name: `${firstname} ${lastname}`.trim(),
      }))
      setIsNamePrefilled(true)
    } else {
      setIsNamePrefilled(false)
    }
  }, [])

const reviews =
  product?.review
    ?.filter((r) => r.star >= 4) // Only 4-star and 5-star
    .map((r) => ({
      avatarUrl: "https://i.pravatar.cc/150?u=" + r.customerName,
      name: r.customerName,
      rating: r.star,
      review: r.review,
      date: "N/A",
    })) || []

    

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="relative w-24 h-48">
          <div className="w-16 h-20 bg-pink-400 rounded-full shadow-lg mx-auto animate-bounce" />
          <div className="w-3 h-3 bg-pink-500 mx-auto mt-1 rotate-45" />
          <div className="absolute top-[88px] left-1/2 transform -translate-x-1/2 w-px h-24 bg-gray-300 animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>
  }

  if (!product) return null

  return (
    <main className="flex flex-col xl:flex-row gap-10 px-8 py-8 max-w-7xl mx-auto max-md:px-4">
      <div className="hidden xl:flex flex-col order-1 xl:order-2 w-full xl:w-[400px] shrink-0">
        <ProductInfo
          productId={product.productId}
          title={product.productName}
          stock={Number.parseInt(product.quantity)}
          price={Number.parseFloat(product.price.replace(/,/g, ""))}
          originalPrice={Number.parseFloat((product.discountPrice || product.price).replace(/,/g, ""))}
          countdownTime="4d 04h 25m 40s"
          description={product.description}
          tags={[product.categoryName, product.subCategoryName]}
          sizes={product.size}
          colors={product.color}
          shippingInfo={product.shippingInformation}
          imageOne={product.imageOne} // ✅ Added imageOne prop
        />
      </div>

      <div className="flex flex-col order-2 xl:order-1 w-full">
       <ProductGallery
  mainImage={product.imageOne}
  images={[
    product.imageOne,
    product.imageTwo,
    product.imageThree,
    product.imageFour,
    product.imageFive,
    product.imageSix,
    product.imageSeven,
  ]
    .filter((img) => img && img.trim() !== "")
    .map((img) => ({ thumbnail: img, full: img }))}
/>

        <div className="flex xl:hidden flex-col">
          <ProductInfo
            productId={product.productId}
            title={product.productName}
            stock={Number.parseInt(product.quantity)}
            price={Number.parseFloat(product.price.replace(/,/g, ""))}
            originalPrice={Number.parseFloat((product.discountPrice || product.price).replace(/,/g, ""))}
            countdownTime="4d 04h 25m 40s"
            description={product.description}
            tags={[product.categoryName, product.classification]}
            sizes={product.size}
            colors={product.color}
            shippingInfo={product.shippingInformation}
            imageOne={product.imageOne} // ✅ Added imageOne prop
          />
        </div>

        <ProductRatings reviews={product.review} />


        <section className="flex flex-col justify-center items-center mt-10 w-full">
          <h2 className="text-2xl text-black">Reviews</h2>
          <div className="w-full mt-6 flex flex-col gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
          {!showMoreReviews && (
            <button
              onClick={() => setShowMoreReviews(true)}
              className="px-6 py-2 mt-6 text-base font-medium text-black bg-stone-50 rounded-full hover:bg-stone-100 transition-all"
            >
              Show more
            </button>
          )}

          {showReviewForm ? (
            <div className="relative mt-6 w-full max-w-xl p-6 bg-white border rounded-lg shadow-md">
              {/* Close Button */}
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                aria-label="Close Review Form"
              >
                &times;
              </button>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  try {
                    const token = localStorage.getItem("accessToken")
                    const headers = {
                      "Content-Type": "application/json",
                      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
                      ...(token ? { Authorization: token } : {}),
                    }
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/change-product-review`, {
                      method: "POST",
                      headers,
                      body: JSON.stringify({
                        product_id: product.productId,
                        ...reviewData,
                      }),
                    })

                    if (!res.ok) throw new Error("Failed to submit review")
                    alert("Review submitted!")
                    setReviewData({ customer_name: "", star: "5", review: "" })
                    setShowReviewForm(false)
                    setLoading(true) // Optional: show loading state
                    await fetchProduct() // ✅ Refetch product details including reviews
                  } catch (err) {
                    alert("Error submitting review")
                    console.error(err)
                  }
                }}
                className="space-y-5"
              >
                <h3 className="text-xl font-semibold text-black">Write a Review</h3>
                <input
                  type="text"
                  placeholder="Your name"
                  value={reviewData.customer_name}
                  onChange={(e) => setReviewData({ ...reviewData, customer_name: e.target.value })}
                  readOnly={isNamePrefilled}
                  className={`w-full px-4 py-2 border rounded ${
                    isNamePrefilled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                  }`}
                />

                {/* Star Rating */}
                <div className="flex justify-center mt-3">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setReviewData({ ...reviewData, star: star.toString() })}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={star <= Number.parseInt(reviewData.star) ? "#facc15" : "none"}
                        viewBox="0 0 24 24"
                        stroke="#facc15"
                        className="w-6 h-6 cursor-pointer transition-transform transform hover:scale-110"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.125 6.564h6.902c.969 0 1.371 1.24.588 1.81l-5.586 4.042 2.125 6.564c.3.921-.755 1.688-1.54 1.118l-5.586-4.042-5.586 4.042c-.785.57-1.84-.197-1.54-1.118l2.125-6.564-5.586-4.042c-.783-.57-.38-1.81.588-1.81h6.902l2.125-6.564z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Write your review..."
                  value={reviewData.review}
                  onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                  required
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded resize-none h-28 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all"
                >
                  Submit Review
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-2 mt-6 text-base font-medium text-black bg-yellow-100 rounded-full hover:bg-yellow-200 transition"
            >
              Add Review
            </button>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProductPage
