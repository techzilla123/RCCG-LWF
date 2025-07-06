export interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  isOutOfStock?: boolean;
  isWishlisted?: boolean;
  isAdded?: boolean; // if you're tracking cart add state
}
