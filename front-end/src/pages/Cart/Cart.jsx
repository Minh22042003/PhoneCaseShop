import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { sampleProducts } from '../../data/products';
import { formatCurrency } from '../../util/format';
import { Link } from 'react-router-dom';

// Mock data for cart items by adding quantity to sample products
const initialCartItems = [
    { ...sampleProducts[0], quantity: 1 },
    { ...sampleProducts[2], quantity: 2 },
    { ...sampleProducts[4], quantity: 1 },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (productId) => {
        setCartItems(items => items.filter(item => item.id !== productId));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = 30000; // Example shipping fee
    const total = subtotal + shippingFee;

    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20">
                <ShoppingCart className="mx-auto h-24 w-24 text-gray-300" />
                <h1 className="mt-4 text-3xl font-bold text-gray-800">Giỏ hàng của bạn đang trống</h1>
                <p className="mt-2 text-lg text-gray-500">
                    Có vẻ như bạn chưa thêm sản phẩm nào. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
                </p>
                <Link
                    to="/product"
                    className="mt-6 inline-block px-8 py-3 bg-indigo-600 text-white font-bold uppercase rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
                >
                    Bắt đầu mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">Giỏ Hàng Của Bạn</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 space-y-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-6 last:border-b-0">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                                
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.brand}</p>
                                    <p className="text-md font-semibold text-indigo-600 mt-1">{formatCurrency(item.price)}</p>
                                </div>

                                {/* Quantity and Remove */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md">
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-4 font-semibold">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button onClick={() => handleRemoveItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Tóm Tắt Đơn Hàng</h2>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-semibold">{formatCurrency(shippingFee)}</span>
                                </div>
                                <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Tổng cộng</span>
                                    <span>{formatCurrency(total)}</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold uppercase tracking-wider hover:bg-indigo-700 transition-all duration-300 shadow-md">
                                Tiến hành Thanh toán
                            </button>
                            <Link to="/product" className="block text-center mt-4 text-indigo-600 hover:underline font-medium">
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
