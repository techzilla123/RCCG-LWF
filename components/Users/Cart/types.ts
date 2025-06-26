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

  
  export interface SummaryItemType {
    label: string;
    amount: string;
    bold?: boolean;
  }
  