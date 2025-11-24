import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkAdminAuth } from '../../api/userApi';
import { useAdminUsers, useAdminProducts, useAdminInventory } from '../../hook/useAdmin';
import { useUpdateAdminUser, useCreateAdminUser, useDeleteAdminUser, useRoles } from '../../hook/useUser';
import {
    Users,
    BarChart2,
    Package,
    Layers,
    ShoppingCart,
    Menu,
    X,
    LogOut,
    Search,
    Plus
} from 'lucide-react';

const AdminDashboard = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('statistics');

    // Data fetching hooks
    const { data: users, isLoading: isLoadingUsers } = useAdminUsers();
    const { data: products, isLoading: isLoadingProducts } = useAdminProducts();
    const { data: inventory, isLoading: isLoadingInventory } = useAdminInventory();//

    // useUpdateAdminUser hook handles invalidation internally

    // Create user state
    const [creatingUser, setCreatingUser] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newRoleId, setNewRoleId] = useState('');

    // Edit user state - now includes role_id
    const [editingUser, setEditingUser] = useState(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editRoleId, setEditRoleId] = useState('');

    const updateMutation = useUpdateAdminUser();
    const createMutation = useCreateAdminUser();
    const deleteMutation = useDeleteAdminUser();
    const { data: rolesData } = useRoles();

    useEffect(() => {
        const verifyAdmin = async () => {
            const token = auth.token;
            if (!token) {
                navigate('/admin/login');
                return;
            }

            try {
                await checkAdminAuth(token);
                setIsLoading(false);
            } catch (error) {
                console.error("Admin auth check failed", error);
                setAuth({ user: null, token: null });
                navigate('/admin/login');
            }
        };

        verifyAdmin();
    }, [auth.token, navigate, setAuth]);

    const handleLogout = () => {
        setAuth({ user: null, token: null });
        navigate('/admin/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    const menuItems = [
        { id: 'statistics', label: 'Thống kê', icon: BarChart2 },
        { id: 'users', label: 'Quản lý người dùng', icon: Users },
        { id: 'products', label: 'Quản lý sản phẩm', icon: Package },
        { id: 'inventory', label: 'Quản lý tồn kho', icon: Layers },
        { id: 'orders', label: 'Quản lý đơn hàng', icon: ShoppingCart },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'statistics':
                return (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Tổng quan thống kê</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-600 font-medium">Tổng doanh thu</p>
                                <p className="text-2xl font-bold text-blue-900 mt-2">150.000.000 ₫</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <p className="text-sm text-green-600 font-medium">Đơn hàng mới</p>
                                <p className="text-2xl font-bold text-green-900 mt-2">24</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                                <p className="text-sm text-purple-600 font-medium">Khách hàng mới</p>
                                <p className="text-2xl font-bold text-purple-900 mt-2">{users?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'users':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Danh sách người dùng</h3>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                                <button
                                    onClick={() => setCreatingUser(true)}
                                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Thêm mới
                                </button>
                            </div>
                        </div>

                        {isLoadingUsers ? (
                            <div className="text-center py-4">Đang tải...</div>
                        ) : (
                            <div>
                                {/* Inline create form shown when creatingUser is set */}
                                {creatingUser && (
                                    <div className="mb-4 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Thêm người dùng mới</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={e => setNewName(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Tên"
                                            />
                                            <input
                                                type="email"
                                                value={newEmail}
                                                onChange={e => setNewEmail(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Email"
                                            />
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={e => setNewPassword(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Mật khẩu"
                                            />
                                            <input
                                                type="text"
                                                value={newPhone}
                                                onChange={e => setNewPhone(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="SĐT"
                                            />
                                            <select
                                                value={newRoleId}
                                                onChange={e => setNewRoleId(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                            >
                                                <option value="">Chọn vai trò</option>
                                                {rolesData?.data?.map((role) => (
                                                    <option key={role._id} value={role._id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => createMutation.mutate({ userData: { name: newName, email: newEmail, password: newPassword, phone: newPhone, role_id: newRoleId } }, {
                                                    onSuccess: () => {
                                                        setNewName(''); setNewEmail(''); setNewPassword(''); setNewPhone(''); setNewRoleId(''); setCreatingUser(false);
                                                    }
                                                })}
                                                disabled={createMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {createMutation.isLoading ? 'Đang tạo...' : 'Tạo'}
                                            </button>
                                            <button
                                                onClick={() => setCreatingUser(false)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Inline edit form shown when editingUser is set */}
                                {editingUser && (
                                    <div className="mb-4 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-2">Chỉnh sửa người dùng (ID: {editingUser._id})</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={e => setEditName(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Tên"
                                            />
                                            <input
                                                type="email"
                                                value={editEmail}
                                                onChange={e => setEditEmail(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Email"
                                            />
                                            <input
                                                type="text"
                                                value={editPhone}
                                                onChange={e => setEditPhone(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="SĐT"
                                            />
                                            <select
                                                value={editRoleId}
                                                onChange={e => setEditRoleId(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                            >
                                                <option value="">Chọn vai trò</option>
                                                {rolesData?.data?.map((role) => (
                                                    <option key={role._id} value={role._id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => updateMutation.mutate({ userId: editingUser._id, userData: { name: editName, email: editEmail, phone: editPhone, role_id: editRoleId } })}
                                                disabled={updateMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {updateMutation.isLoading ? 'Đang lưu...' : 'Lưu'}
                                            </button>
                                            <button
                                                onClick={() => setEditingUser(null)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users?.data?.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                                        <button
                                                            onClick={() => {
                                                                setEditingUser(user);
                                                                setEditName(user.name || '');
                                                                setEditEmail(user.email || '');
                                                                setEditPhone(user.phone || '');
                                                                setEditRoleId(user.role_id || '');
                                                            }}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Xóa người dùng ${user.name || user.email}?`)) {
                                                                    deleteMutation.mutate(user._id);
                                                                }
                                                            }}
                                                            disabled={deleteMutation.isLoading}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'products':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Danh sách sản phẩm (Case Types)</h3>
                            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Plus className="w-4 h-4 mr-2" /> Thêm mới
                            </button>
                        </div>
                        {isLoadingProducts ? (
                            <div className="text-center py-4">Đang tải...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products?.map((product) => (
                                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                                        <div className="h-40 bg-gray-100 flex items-center justify-center">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <Package className="h-12 w-12 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h4>
                                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                            <div className="mt-auto flex justify-between items-center">
                                                <span className="text-red-600 font-bold">{product.price.toLocaleString()} ₫</span>
                                                <button className="text-sm text-blue-600 hover:underline">Chi tiết</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'inventory':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Quản lý tồn kho</h3>
                        </div>
                        {isLoadingInventory ? (
                            <div className="text-center py-4">Đang tải...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dòng máy</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {inventory?.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.case_type_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone_model_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {item.quantity > 50 ? 'Còn hàng' : 'Sắp hết'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            case 'orders':
                return (
                    <div className="text-center py-12">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Quản lý đơn hàng</h3>
                        <p className="mt-1 text-sm text-gray-500">Chức năng đang được phát triển.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div
                className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
            >
                <div className="flex items-center justify-between px-4">
                    <h2 className="text-2xl font-bold text-red-500">Admin Panel</h2>
                    <button
                        className="md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="space-y-2 px-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 py-3 px-4 rounded transition duration-200 ${activeTab === item.id
                                    ? 'bg-red-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-0 w-full px-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 py-3 px-4 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <button
                            className="md:hidden text-gray-500 focus:outline-none"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {menuItems.find(item => item.id === activeTab)?.label}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Xin chào, {auth.user?.name || 'Admin'}</span>
                            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                                {auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-lg shadow p-6 min-h-[500px]">
                            {renderContent()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
