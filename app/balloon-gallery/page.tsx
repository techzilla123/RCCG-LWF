'use client'

    import { Sparkles, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
    import type React from "react"
    import { useState, useEffect, useCallback } from "react"
    import Offer from "@/components/Offer"
    import { FooterNewsletter } from "@/components/Footer/FooterNewsletter";
    import TopNavBar from "@/components/TopNavBar"
    import Footer from "@/components/Footer"
    import BotpressChat from "@/components/BotpressChat"

    // Inline UI Components (re-added as requested)
    const Card = ({
      children,
      className = "",
      onClick,
    }: {
      children: React.ReactNode
      className?: string
      onClick?: () => void
    }) => (
      <div className={`bg-white rounded-lg shadow-md ${onClick ? "cursor-pointer" : ""} ${className}`} onClick={onClick}>
        {children}
      </div>
    )
    const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <div className={`p-6 pb-0 ${className}`}>{children}</div>
    )
    const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
      <div className={`p-6 ${className}`}>{children}</div>
    )
    const CardTitle = ({
      children,
      className = "",
      onClick,
    }: {
      children: React.ReactNode
      className?: string
      onClick?: () => void
    }) => (
      <h3 className={`text-xl font-semibold ${onClick ? "cursor-pointer" : ""} ${className}`} onClick={onClick}>
        {children}
      </h3>
    )
    const Button = ({
      children,
      variant = "default",
      size = "default",
      className = "",
      onClick,
      disabled = false,
    }: {
      children: React.ReactNode
      variant?: "default" | "outline" | "secondary"
      size?: "default" | "sm" | "lg"
      className?: string
      onClick?: () => void
      disabled?: boolean
    }) => {
      const baseClasses =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
      const variants = {
        default: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
      }
      const sizes = {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-6 py-3 text-base",
      }
      return (
        <button
          className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )
    }
    const Badge = ({
      children,
      variant = "default",
      className = "",
    }: {
      children: React.ReactNode
      variant?: "default" | "secondary" | "outline"
      className?: string
    }) => {
      const variants = {
        default: "bg-purple-600 text-white",
        secondary: "bg-gray-100 text-gray-800",
        outline: "border border-gray-300 text-gray-700",
      }
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
          {children}
        </span>
      )
    }
    // Define interfaces for API responses
    interface Category {
      categoryId: string
      categoryName: string
      generalCategoryName: string
      noOfProducts: number
    }

    interface SubCategory {
  subCategoryId: string
  subCategoryName: string
}

    interface Product {
      productId: string
      categoryName: string
      subCategoryName: string
      productName: string
      weight: string
      price: string
      discountPrice: string
      quantity: string
      description: string
      classification: string
      producer: string
      size: string[]
      color: string[]
      sku: string[]
      shippingInformation: string
      imageOne: string
      imageTwo: string
      imageThree: string
      imageFour: string
      imageFive: string
      imageSix: string
      imageSeven: string
    }
    // Constants for API calls
    const DECORATION_CATEGORY_ID = "2be750c3-0df7-4506-ace9-5e9d78315187"
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
    const API_KEY = process.env.NEXT_PUBLIC_SECRET_KEY 
    // Helper function to get all product images from a product object
    const getProductImages = (product: Product): string[] => {
      const images = [
        product.imageOne,
        product.imageTwo,
        product.imageThree,
        product.imageFour,
        product.imageFive,
        product.imageSix,
        product.imageSeven,
      ].filter(Boolean) // Filter out empty strings
      return images
    }
    export default function GalleryPage() {
      const [categories, setCategories] = useState<Category[]>([])
      const [products, setProducts] = useState<Product[]>([])
      const [selectedCategory, setSelectedCategory] = useState<string>("all") // Default to "all" for initial product fetch
      const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
      const [currentImageIndex, setCurrentImageIndex] = useState(0)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState<string | null>(null)
      const [viewMode, setViewMode] = useState<'gallery' | 'image-preview' | 'full-details'>('gallery') // New state for view mode
      const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
      // New states for order options and chat modal
      // const [showOrderOptions, setShowOrderOptions] = useState(false)
      const [isChatModalOpen, setIsChatModalOpen] = useState(false)
      const [chatMessage, setChatMessage] = useState('')
      const fetchSubCategories = useCallback(async () => {
  setLoading(true)
  setError(null)
  try {
    const token = localStorage.getItem("accessToken")
    const url = `${API_BASE_URL}customer/list-product-sub-category/${DECORATION_CATEGORY_ID}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    }
    if (token) headers.Authorization = token

    const response = await fetch(url, { headers })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const result = await response.json()
    if (result.statusCode === 200 && result.data) {
      // Add "All" option
      setCategories([{ subCategoryId: "all", subCategoryName: "All" }, ...result.data])
    } else {
      setError(result.message || "Failed to fetch subcategories")
    }
  } catch (e: unknown) {
    setError(e instanceof Error ? e.message : "Unknown error fetching subcategories.")
  } finally {
    setLoading(false)
  }
}, [])
     const fetchProducts = useCallback(async (subcategoryId: string) => {
  setLoading(true)
  setError(null)
  try {
    const token = localStorage.getItem("accessToken")
    let url: string
    if (subcategoryId === "all") {
      // All products in the Decoration category
      url = `${API_BASE_URL}customer/filter-product-category/PCT/${DECORATION_CATEGORY_ID}`
    } else {
      // Products for specific subcategory
      url = `${API_BASE_URL}customer/filter-product-category/SCT/${subcategoryId}`
    }
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    }
    if (token) headers.Authorization = token

    const response = await fetch(url, { headers })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const result = await response.json()
    if (result.statusCode === 200 && result.data?.product) {
      setProducts(result.data.product)
    } else {
      setProducts([])
      setError(result.message || "No products found.")
    }
  } catch (e: unknown) {
    setError(e instanceof Error ? e.message : "Unknown error fetching products.")
  } finally {
    setLoading(false)
  }
}, [])

   useEffect(() => {
  fetchSubCategories()
}, [fetchSubCategories])

useEffect(() => {
  if (selectedCategory) {
    fetchProducts(selectedCategory)
  }
}, [selectedCategory, fetchProducts])

      const handleImageClick = (product: Product) => {
        setSelectedProduct(product)
        setCurrentImageIndex(0) // Start with the first image
        setViewMode('image-preview')
      }
      const handleTitleClick = (product: Product) => {
        setSelectedProduct(product)
        setViewMode('full-details')
      }
      const handleNextImage = () => {
        if (selectedProduct) {
          const images = getProductImages(selectedProduct)
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
      }
      const handlePrevImage = () => {
        if (selectedProduct) {
          const images = getProductImages(selectedProduct)
          setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
        }
      }
      const closeProductView = () => {
        setSelectedProduct(null)
        setViewMode('gallery')
        setCurrentImageIndex(0)
        // setShowOrderOptions(false) // Reset order options when closing product view
      }
      // New functions for order and chat
      const handleOpenChat = (productName: string) => {
        setChatMessage(`I need ${productName}`);
        setIsChatModalOpen(true);
        // setShowOrderOptions(false); // Close order options when chat opens
      };
      const handleSendWhatsAppMessage = () => {
        if (!chatMessage.trim()) return;
        const phoneNumber = '14692487157'; // Your US WhatsApp number
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(chatMessage)}`;
        window.open(url, '_blank');
        setChatMessage('');
        setIsChatModalOpen(false);
      };
      // --- Image Preview Modal ---
      if (viewMode === 'image-preview' && selectedProduct) {
        const images = getProductImages(selectedProduct)
        const currentImageUrl = images[currentImageIndex] || "/placeholder.svg?height=800&width=1200&text=No+Image+Available"
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={closeProductView}
                className="absolute top-4 right-4 z-10 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
                <span className="sr-only">Close</span>
              </Button>
              <div className="relative flex-grow w-full flex items-center justify-center">
                <img
                  src={currentImageUrl || "/placeholder.svg"}
                  alt={selectedProduct.productName}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg" // Adjusted max-height
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-6 h-6" />
                      <span className="sr-only">Previous image</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100"
                    >
                      <ChevronRight className="w-6 h-6" />
                      <span className="sr-only">Next image</span>
                    </Button>
                  </>
                )}
              </div>
              <div className="mt-4 text-white text-center">
                <h2 className="text-2xl font-bold">{selectedProduct.productName}</h2>
                <p className="text-lg">{selectedProduct.categoryName}</p>
                {/* Removed price display */}
                <Button
                  onClick={() => setViewMode('full-details')}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )
      }
      // --- Full Product Details View ---
      if (viewMode === 'full-details' && selectedProduct) {
        const images = getProductImages(selectedProduct)
        const currentImageUrl = images[currentImageIndex] || "/placeholder.svg?height=800&width=1200&text=No+Image+Available"
        return (
          <>
            <Offer />
            <TopNavBar />
            <div className="py-16 bg-stone-50 min-h-screen">
              <div className="container mx-auto px-4 max-w-4xl">
                <button
                  onClick={closeProductView}
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Gallery
                </button>
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Product Image Carousel */}
                      <div className="relative flex items-center justify-center bg-gray-100 rounded-lg p-4">
                        <img
                          src={currentImageUrl || "/placeholder.svg"}
                          alt={selectedProduct.productName}
                          className="max-w-full max-h-96 object-contain rounded-lg"
                        />
                        {images.length > 1 && (
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={handlePrevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100"
                            >
                              <ChevronLeft className="w-5 h-5" />
                              <span className="sr-only">Previous image</span>
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={handleNextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100"
                            >
                              <ChevronRight className="w-5 h-5" />
                              <span className="sr-only">Next image</span>
                            </Button>
                          </>
                        )}
                      </div>
                      {/* Product Details */}
                      <div className="flex flex-col justify-center">
                        <Badge className="mb-2 w-fit">{selectedProduct.categoryName}</Badge>
                        <h1 className="text-3xl font-bold mb-2">{selectedProduct.productName}</h1>
                        <p className="text-gray-600 text-lg mb-4">{selectedProduct.subCategoryName}</p>
                        {/* Display Color and Size if available */}
                        {(selectedProduct.color && selectedProduct.color.length > 0) && (
                          <div className="mb-2">
                            <span className="font-semibold text-gray-800">Colors: </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedProduct.color.map((c, i) => (
                                <Badge key={i} variant="secondary" className="capitalize">{c}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {(selectedProduct.size && selectedProduct.size.length > 0) && (
                          <div className="mb-4">
                            <span className="font-semibold text-gray-800">Sizes: </span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {selectedProduct.size.map((s, i) => (
                                <Badge key={i} variant="secondary">{s}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedProduct.description }} />
                        {/* Order Now Button and Options */}
                        <div className="mt-6 relative">
                          <Button onClick={() => setIsOrderModalOpen(true)} className="w-full"> Order Now</Button>
                          {isOrderModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
                              <Card className="w-full max-w-md p-6">
                                <CardHeader className="flex justify-between items-center pb-4">
                                  <CardTitle>Place Order</CardTitle>
                                  <Button variant="secondary" size="sm" onClick={() => setIsOrderModalOpen(false)}>
                                    <X className="w-5 h-5" />
                                    <span className="sr-only">Close Order Modal</span>
                                  </Button>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <div className="flex flex-col gap-4">
                                    <a href="tel:+14692482060">
                                      <Button variant="outline" className="w-full">
                                        Call Now
                                      </Button>
                                    </a>
                                    <Button onClick={() => {
                                      handleOpenChat(selectedProduct?.productName || '')
                                      setIsOrderModalOpen(false) // Close this modal when chat opens
                                    }} className="w-full">
                                      Message Us
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <BotpressChat />
            <Footer />
            {/* Chat Modal */}
            {isChatModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
                <Card className="w-full max-w-md p-6">
                  <CardHeader className="flex justify-between items-center pb-4">
                    <CardTitle>Message Us</CardTitle>
                    <Button variant="secondary" size="sm" onClick={() => setIsChatModalOpen(false)}>
                      <X className="w-5 h-5" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={5}
                      placeholder="Type your message here..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsChatModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendWhatsAppMessage} disabled={!chatMessage.trim()}>
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )
      }
      // --- Gallery View (Default) ---
      return (
        <>
          <Offer />
          <TopNavBar />
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-purple-600 text-white py-16 rounded-lg shadow-md">
            {/* Decorative Sparkles */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10 animate-pulse">
              <div className="grid grid-cols-8 gap-6 w-full h-full">
                {[...Array(48)].map((_, i) => (
                  <Sparkles key={i} className="w-5 h-5 mx-auto my-auto text-white" />
                ))}
              </div>
            </div>
            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
              <h1 className="text-5xl font-bold mb-4">Party Place & Rentals Gallery</h1>
              <p className="text-xl ">
                Discover stunning balloon art for every occasion, from elegant arches to custom sculptures.
              </p>
              {/* <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-white text-purple-700 hover:bg-gray-100">
                  🎈 Balloon Arches
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-white text-purple-700 hover:bg-gray-100">
                  ✨ Custom Designs
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-white text-purple-700 hover:bg-gray-100">
                  🎉 Event Decor
                </Badge>
              </div> */}
            </div>
          </section>
          <section className="py-16 bg-stone-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
  {loading && <p>Loading subcategories...</p>}
  {error && <p className="text-red-500">{error}</p>}
  {!loading && !error && categories.map((subcategory) => (
    <Button
      key={subcategory.subCategoryId}
      variant={selectedCategory === subcategory.subCategoryId ? "default" : "outline"}
      onClick={() => setSelectedCategory(subcategory.subCategoryId)}
      className={`rounded-full ${selectedCategory === subcategory.subCategoryId ? "bg-purple-600 text-white hover:bg-purple-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
    >
      {subcategory.subCategoryName}
    </Button>
  ))}
</div>

              {/* Gallery Grid */}
              {loading && <p className="text-center">Loading products...</p>}
              {error && !loading && <p className="text-red-500 text-center">{error}</p>}
              {!loading && !error && products.length === 0 && <p className="text-center text-gray-600">No products found for this category.</p>}
              {!loading && !error && products.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <Card key={product.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={product.imageOne || "/placeholder.svg?height=400&width=600&text=No+Image"}
                          alt={product.productName}
                          className="w-full h-64 object-cover cursor-pointer" // Increased height to h-64
                          onClick={() => handleImageClick(product)} // Click image for preview
                        />
                        <Badge className="absolute top-4 left-4">{product.categoryName}</Badge>
                      </div>
                      <CardHeader className="pt-6"> {/* Adjusted padding to push content down */}
                        <CardTitle className="text-lg hover:text-purple-600 transition-colors" onClick={() => handleTitleClick(product)}> {/* Click title for full details */}
                          {product.productName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2"> {/* Adjusted padding */}
                        <p className="text-gray-600 mb-4 text-sm">{product.subCategoryName}</p>
                        {/* Removed price display */}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {/* Newsletter Signup */}
              <div className="mt-16 relative bg-gray-600 text-white rounded-lg p-8 text-center overflow-hidden shadow-md">
                {/* Decorative Stars */}
                <div className="absolute inset-0 pointer-events-none animate-pulse opacity-20">
                  <div className="grid grid-cols-6 gap-4 w-full h-full">
                    {[...Array(36)].map((_, i) => (
                      <Sparkles key={i} className="w-4 h-4 text-white mx-auto my-auto opacity-50" />
                    ))}
                  </div>
                </div>
                {/* Main Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Get Inspired!</h3>
                  <p className="mb-6">
                    Subscribe to get the latest balloon art trends, party ideas, and exclusive content delivered to your inbox.
                  </p>
                  <div className="flex max-w-md mx-auto gap-4">
                    <FooterNewsletter />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <BotpressChat />
          <Footer />
        </>
      )
    }
