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
  }
  
  export interface SummaryItemType {
    label: string;
    amount: string;
    bold?: boolean;
  }
  