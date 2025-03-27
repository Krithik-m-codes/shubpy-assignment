"use client";
import React, { useMemo } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/store-context';
import ProductCard from '@/components/custom-cards/product';
import { Loader, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { products, loading, error } = useShop();

  const featuredProducts = useMemo(() => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      return [];
    }

    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [products]);

  return (
    <div>
      {/* Hero section */}
      <div className="relative  text-black py-16 px-4 rounded-xl mb-12 flex justify-center items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Motorcycle Riding Essentials</h1>
          <p className="text-gray-700 mb-6">Discover our premium collection of gear and accessories for every rider.</p>
          <Link
            href="/products"
            className="inline-block bg-amber-400 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured products section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Gear</h2>
          <Link href="/products" className="text-blue-600 hover:text-blue-800 flex items-center">
            View All <span> <ArrowRight size={24} /> </span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No products available</p>
          </div>
        )}
      </div>

      {/* Categories section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Helmets', 'Apparel', 'Electronics', 'Maintenance'].map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 text-center"
            >
              <h3 className="font-medium text-gray-900">{category}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;