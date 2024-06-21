export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  description: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products;
};
