export interface Product {
  id: string
  image: string
  title: string
  price: number
  originalPrice?: number
  discountPrice?: number
  finalPrice: number
  isOutOfStock?: boolean
  isWishlisted?: boolean
  isAdded?: boolean
}
