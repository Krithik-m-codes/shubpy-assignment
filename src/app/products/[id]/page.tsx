// pages/products/[id].tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/common-types';
import { useShop } from '@/context/store-context';
import Link from 'next/link';

const ProductDetail = () => {
    const router = useRouter();
    const { addToCart } = useShop();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get the product ID from the URL
    const { id } = useParams();
    console.log('Product ID:', id);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/get-products/${id}`);

                if (!res.ok) {
                    throw new Error('Product not found');
                }

                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/products"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                    <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">{product.rating.toFixed(1)}</span>
                    </div>

                    <div className="text-2xl font-bold text-gray-900 mb-4">
                        ${product.price.toFixed(2)}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">Description</h2>
                        <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">Category</h2>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {product.category}
                        </span>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full md:w-auto flex items-center justify-center bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
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