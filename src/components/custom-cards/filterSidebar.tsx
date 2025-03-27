import React, { useMemo } from 'react';
import { useShop } from '@/context/store-context';

const FilterSidebar: React.FC = () => {
    const { products, filterOptions, updateFilter } = useShop();

    // Extract unique categories from products
    const categories = useMemo(() => {
        const uniqueCategories = new Set<string>();
        products.forEach(product => uniqueCategories.add(product.category));
        return Array.from(uniqueCategories);
    }, [products]);

    // Find min and max prices
    const priceRange = useMemo(() => {
        if (products.length === 0) return { min: 0, max: 1000 };

        const min = Math.floor(products.reduce((min, p) => p.price < min ? p.price : min, Infinity));
        const max = Math.ceil(products.reduce((max, p) => p.price > max ? p.price : max, 0));

        return { min, max };
    }, [products]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Category Filter */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            id="category-all"
                            type="radio"
                            name="category"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            checked={filterOptions.category === null}
                            onChange={() => updateFilter({ category: null })}
                        />
                        <label htmlFor="category-all" className="ml-2 text-sm text-gray-600">
                            All Categories
                        </label>
                    </div>

                    {categories.map(category => (
                        <div key={category} className="flex items-center">
                            <input
                                id={`category-${category}`}
                                type="radio"
                                name="category"
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                checked={filterOptions.category === category}
                                onChange={() => updateFilter({ category })}
                            />
                            <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-600">
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-500">${filterOptions.priceRange.min}</span>
                        <span className="text-xs text-gray-500">${filterOptions.priceRange.max}</span>
                    </div>

                    <div className="flex space-x-4">
                        <div>
                            <label htmlFor="min-price" className="sr-only">Minimum Price</label>
                            <input
                                type="number"
                                id="min-price"
                                min={priceRange.min}
                                max={filterOptions.priceRange.max}
                                value={filterOptions.priceRange.min}
                                onChange={(e) => updateFilter({
                                    priceRange: {
                                        ...filterOptions.priceRange,
                                        min: parseInt(e.target.value) || priceRange.min
                                    }
                                })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="max-price" className="sr-only">Maximum Price</label>
                            <input
                                type="number"
                                id="max-price"
                                min={filterOptions.priceRange.min}
                                max={priceRange.max}
                                value={filterOptions.priceRange.max}
                                onChange={(e) => updateFilter({
                                    priceRange: {
                                        ...filterOptions.priceRange,
                                        max: parseInt(e.target.value) || priceRange.max
                                    }
                                })}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reset button */}
            <button
                type="button"
                className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => updateFilter({
                    category: null,
                    priceRange: { min: priceRange.min, max: priceRange.max }
                })}
            >
                Reset Filters
            </button>
        </div>
    );
};

export default FilterSidebar;