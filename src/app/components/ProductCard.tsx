import { motion } from 'framer-motion';
import { Product } from '../services/productService';
import { useDarkMode } from '../context/DarkModeContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { darkMode } = useDarkMode();

  return (
    <motion.div
      className={`border rounded-lg p-4 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
        darkMode
          ? 'bg-gray-800 border-gray-700 text-white'
          : 'bg-white border-gray-300 text-gray-900'
      }`}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3
        className={`text-lg font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
        {product.title}
      </h3>
      <p
        className={`text-sm mb-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
        {product.category}
      </p>
      <p
        className={`text-xl font-semibold ${
          darkMode ? 'text-white' : 'text-gray-700'
        }`}>
        ${product.price}
      </p>
    </motion.div>
  );
};

export default ProductCard;
