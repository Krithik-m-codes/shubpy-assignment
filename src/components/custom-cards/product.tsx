import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/common-types';
import { useShop } from '@/context/store-context';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useShop();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/products/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <Image
                        width={300}
                        height={300}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                    />
                </div>
            </Link>

            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                </Link>

                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mb-2">
                    {product.category}
                </span>

                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-1">
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-sm text-gray-600">{product.rating.toFixed(1)}</p>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>

                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center bg-gray-900 text-white py-2 px-3 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;