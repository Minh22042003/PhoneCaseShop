import React from 'react';
import { useOrders } from '../../hook/useOrder';
import { Loader, Package, CheckCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../../util/format';
import { Link } from 'react-router-dom';

const OrderProcess = () => {
    const { orders, isLoading, error } = useOrders();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin h-10 w-10 text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">Có lỗi xảy ra khi tải danh sách đơn hàng.</div>;
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto text-center py-20">
                <Package className="mx-auto h-24 w-24 text-gray-300" />
                <h1 className="mt-4 text-3xl font-bold text-gray-800">Bạn chưa có đơn hàng nào</h1>
                <Link
                    to="/product"
                    className="mt-6 inline-block px-8 py-3 bg-indigo-600 text-white font-bold uppercase rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
                >
                    Mua sắm ngay
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 py-12 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10">Theo Dõi Đơn Hàng</h1>

                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center flex-wrap gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                                    <p className="font-bold text-gray-900">#{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Ngày đặt</p>
                                    <p className="font-medium text-gray-900">{order.create_at || 'Vừa xong'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Tổng tiền</p>
                                    <p className="font-bold text-indigo-600">{formatCurrency(order.total_amount)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {order.status === 'pending' ? (
                                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                                            <Clock size={16} /> Chờ xử lý
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                                            <CheckCircle size={16} /> Hoàn thành
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Note: In a real app, we might fetch order items separately or include them in the order object. 
                     The mock handler currently returns items in the order object for detail view, but maybe not for list view.
                     Let's assume for now the list view might not have items or we need to fetch details. 
                     However, based on the mock handler for GET /api/orders, it returns [MOCK_ORDER] which doesn't explicitly have items array in mockData.js definition, 
                     but let's see if we can display basic info or if we need to fetch details.
                     
                     Actually, MOCK_ORDER in mockData.js doesn't have items. 
                     The GET /api/orders/:orderId handler adds them.
                     So for the list view, we might not see items unless we fetch details for each or update the list handler.
                     
                     For this demo, let's just show the summary and maybe a "View Details" button if we were building a detail page.
                     Or, I can update the GET /api/orders handler to include items for better display here.
                     
                     Let's stick to the summary for now as requested "theo dõi đơn hàng" usually implies status and list.
                 */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">Giao đến: {order.shipping_name || 'Khách hàng'}</p>
                                        <p className="text-gray-500">{order.shipping_address}</p>
                                    </div>
                                    {/* Placeholder for items preview if available, or just a status message */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderProcess;
