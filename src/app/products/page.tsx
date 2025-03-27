"use client";
import React from 'react';
import { useShop } from '@/context/store-context';
import ProductCard from '@/components/custom-cards/product';
import FilterSidebar from '@/components/custom-cards/filterSidebar';
import { Loader } from 'lucide-react';
import { SortOption } from '@/types/common-types';

const ProductsPage: React.FC = () => {
    const { filteredProducts, loading, error, sortOption, updateSort } = useShop();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
                <FilterSidebar />
            </div>

            <div className="w-full md:w-3/4">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Products</h1>

                    <div className="flex items-center">
                        <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => updateSort(e.target.value as SortOption)}
                            className="border border-gray-300 rounded-md py-1 pl-3 pr-10 text-sm"
                        >
                            <option value="price-low-to-high">Price: Low to High</option>
                            <option value="price-high-to-low">Price: High to Low</option>
                            <option value="rating-high-to-low">Rating: High to Low</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded">
                        <p>No products found with the selected filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;