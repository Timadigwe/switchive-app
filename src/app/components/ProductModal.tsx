import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Product } from '../services/productService';
import { useDarkMode } from '../context/DarkModeContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { darkMode } = useDarkMode();

  if (!isOpen || !product) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div
        className={`p-4 rounded-lg shadow-lg max-w-lg w-full relative ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
          <FaTimes className="w-6 h-6" />
        </button>
        <div className=" flex  w-full h-48 m-auto justify-center mb-4  ">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-1/2 h-48  object-cover rounded-lg"
          />
        </div>
        <h3
          className={`text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
          {product.title}
        </h3>
        <p
          className={`text-lg mb-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
          {product.category}
        </p>
        <p
          className={`text-xl font-semibold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}>
          ${product.price}
        </p>
        <p
          className={`text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductModal;
