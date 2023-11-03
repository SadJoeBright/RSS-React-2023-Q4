export interface Data {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
export interface Product {
  title: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
}
