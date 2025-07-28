// Define the product structure for mobile display
export interface Product {
  id: string
  image: string
  title: string
  price: number
  isOutOfStock?: boolean
  isWishlisted?: boolean
  isAdded?: boolean // if you're tracking cart add state
  selectedImage: string // The currently displayed image
  imageList: string[] // All available images for the product
  currentImageIndex: number // Index of the currently displayed image
}

// Interface for localStorage items (matching desktop)
export interface LocalStorageItem {
  product_id: string
  quantity: string
  size: string
  color: string
  productName?: string
  price?: number
  discountPrice?: number
  finalPrice?: number
  imageOne?: string
}
