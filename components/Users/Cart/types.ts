export interface ProductItemType {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
  discount?: {
    percentage: number;
    originalPrice: number;
  };

  // Optional fields that may come from API or are useful for rendering logic
  categoryName?: string;         // From productDetails.categoryName
  subCategoryName?: string;      // From productDetails.subCategoryName
  rawPrice?: number;             // For debugging or UI
  rawDiscountPrice?: number;     // For debugging or comparisons
}

  
 export interface SummaryItemType<T = number | string> {
  value?: (value: T) => T;
  label: string;
  amount: string;
  bold?: boolean;
}
export interface CartSummaryType {
  items: SummaryItemType[];
  totalItems: number;
  totalPrice: string;
  totalDiscount?: string;
  totalTax?: string;
  totalShipping?: string;
  grandTotal: string;
}
  