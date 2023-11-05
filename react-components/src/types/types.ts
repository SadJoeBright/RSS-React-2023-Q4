export interface Data {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
export interface Product {
  id: number;
  title: string;
  images: string[];
}

export interface Details {
  title: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
}
