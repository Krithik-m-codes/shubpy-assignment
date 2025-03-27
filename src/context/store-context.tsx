"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, FilterOptions, SortOption } from '@/types/common-types';

interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  filterOptions: FilterOptions;
  sortOption: SortOption;

  // Methods
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateFilter: (newFilter: Partial<FilterOptions>) => void;
  updateSort: (option: SortOption) => void;
}

const defaultFilterOptions: FilterOptions = {
  category: null,
  priceRange: {
    min: 0,
    max: 1000,
  },
};

// Create context with default values
const ShopContext = createContext<ShopContextType>({
  products: [],
  filteredProducts: [],
  cart: [],
  loading: true,
  error: null,
  filterOptions: defaultFilterOptions,
  sortOption: 'price-low-to-high',
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  updateFilter: () => { },
  updateSort: () => { },
});

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);
  const [sortOption, setSortOption] = useState<SortOption>('price-low-to-high');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/get-products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();
        console.log('Fetched data:', result);

        const productsArray = result.data;

        if (result && productsArray && Array.isArray(productsArray)) {
          console.log('Fetched products:', productsArray);
          setProducts(productsArray);
          setFilteredProducts(productsArray);
        } else {
          setError('Invalid product data format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (!products || products.length === 0) return;

    let result = [...products];

    // Apply category filter
    if (filterOptions.category) {
      result = result.filter(product => product.category === filterOptions.category);
    }

    // Apply price range filter
    result = result.filter(
      product =>
        product.price >= filterOptions.priceRange.min &&
        product.price <= filterOptions.priceRange.max
    );

    // Apply sorting
    result = sortProducts(result, sortOption);

    setFilteredProducts(result);
  }, [products, filterOptions, sortOption]);

  // Sort products based on selected option
  const sortProducts = (productsToSort: Product[], option: SortOption): Product[] => {
    const sortedProducts = [...productsToSort];

    switch (option) {
      case 'price-low-to-high':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high-to-low':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating-high-to-low':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      default:
        return sortedProducts;
    }
  };

  // Cart methods
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Filter methods
  const updateFilter = (newFilter: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...newFilter,
    }));
  };

  // Sort methods
  const updateSort = (option: SortOption) => {
    setSortOption(option);
  };

  const value: ShopContextType = {
    products,
    filteredProducts,
    cart,
    loading,
    error,
    filterOptions,
    sortOption,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateFilter,
    updateSort,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  return context;
};