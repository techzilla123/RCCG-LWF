export interface Product {
    id: string;
    image: string;
    title: string;
    price: number;
    isOutOfStock?: boolean;
    isWishlisted?: boolean;
  }
  