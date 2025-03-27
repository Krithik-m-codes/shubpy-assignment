"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/common-types';
import { useShop } from '@/context/store-context';
import Image from 'next/image';
import Link from 'next/link';

const ProductDetail = () => {
    const { addToCart } = useShop();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Get the product ID from the URL
    const params = useParams();
    const id = params?.id;

    useEffect(() => {
        if (!id) {
            setError('Product ID is missing');
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Correct API endpoint - using path parameter
                const res = await fetch(`/api/get-products/${id}`);

                if (!res.ok) {
                    throw new Error(res.status === 404
                        ? 'Product not found'
                        : 'Failed to fetch product');
                }

                const response = await res.json();

                if (!response.success) {
                    throw new Error(response.message || 'Failed to load product');
                }

                // Ensure product has required fields
                const productData = response.data || {};
                const completeProduct: Product = {
                    ...productData,
                    rating: productData.rating || 0,
                    price: productData.price || 0,
                    image: productData.image || '/placeholder-product.jpg'
                };

                setProduct(completeProduct);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch product');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{error}</p>
                </div>
                <Link
                    href="/products"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Products
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                    <p>Product not found</p>
                </div>
                <Link
                    href="/products"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                    <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">{(product.rating || 0).toFixed(1)}</span>
                    </div>

                    <div className="text-2xl font-bold text-gray-900 mb-4">
                        ₹{(product.price || 0).toFixed(2)}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">Description</h2>
                        <p className="text-gray-600">{product.description || 'No description available'}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">Category</h2>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {product.category || 'Uncategorized'}
                        </span>
                    </div>

                    <button
                        onClick={() => product && addToCart(product)}
                        className="w-full md:w-auto flex items-center justify-center bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                        disabled={!product}
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;