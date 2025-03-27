import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useShop } from '@/context/store-context';
import Image from 'next/image';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity } = useShop();

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button onClick={onClose} className="p-1">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="flex-grow flex items-center justify-center p-8">
                        <p className="text-gray-500">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-auto p-4">
                        <ul className="space-y-4">
                            {cart.map(item => (
                                <li key={item.id} className="flex border-b pb-4">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                        <Image
                                            width={80}
                                            height={80}
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.name}</h3>
                                            <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="ml-auto p-1 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="border-t p-4">
                    <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>Subtotal</p>
                        <p>₹{totalPrice.toFixed(2)}</p>
                    </div>
                    <button
                        className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800"
                        disabled={cart.length === 0}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;