import { motion } from 'framer-motion';
import { Product } from '../services/productService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      className="border rounded-lg p-4 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold mb-2">{product.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      <p className="text-xl font-semibold text-gray-700">${product.price}</p>
    </motion.div>
  );
};

export default ProductCard;
