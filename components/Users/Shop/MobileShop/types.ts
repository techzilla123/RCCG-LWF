export interface Product {
  id: string
  image: string
  title: string
  price: number
  originalPrice?: number // For showing crossed-out price
  discountPrice?: number // Discount amount
  finalPrice?: number // Final calculated price
  isOutOfStock?: boolean
  isWishlisted?: boolean
  isAdded?: boolean // if you're tracking cart add state
}
