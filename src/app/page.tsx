'use client';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from './services/productService';

//components
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Loader from './components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from './context/DarkModeContext';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [filterOption, setFilterOption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { darkMode } = useDarkMode();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const products = await fetchProducts();
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    };

    getProducts();
  }, []);

  //console.log('products', products);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    const sortedProducts = [...filteredProducts];
    if (option === 'priceLowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'priceHighToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = e.target.value;
    setFilterOption(option);
    setLoading(true);
    setTimeout(() => {
      const filtered = products.filter((product) =>
        product.category.toLowerCase().includes(option.toLowerCase())
      );
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500); // Simulate a delay for filtering
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-5 lg:p-24 ${
        darkMode ? '' : 'bg-gray-100'
      }`}>
      <div
        className={`container mx-auto p-4 bg-gradient-to-t ${
          darkMode ? 'from-black via-black' : 'from-white via-white'
        } rounded-lg shadow-md`}>
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <input
            type="text"
            placeholder="Filter by category"
            value={filterOption}
            onChange={handleFilter}
            className={`mb-2 md:mb-0 p-2 border rounded-md ${
              darkMode ? 'bg-black text-white' : 'bg-white text-gray-600'
            } outline-none`}
          />
          <select
            value={sortOption}
            onChange={handleSort}
            className={`p-2 border rounded-md ${
              darkMode ? 'bg-black text-white' : 'bg-white text-gray-400'
            }`}>
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
        <AnimatePresence>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleCardClick(product)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center mt-8 lg:mt-[6.25rem] ">
              <h2 className="text-2xl font-bold">No products found</h2>
              <p className="text-gray-600">
                Try adjusting your filter criteria.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
