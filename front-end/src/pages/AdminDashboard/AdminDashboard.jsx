import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkAdminAuth } from '../../api/userApi';
import { useAdminUsers, useAdminProducts, useAdminInventory, useAdminPhoneModels } from '../../hook/useAdmin';
import { useUpdateAdminUser, useCreateAdminUser, useDeleteAdminUser, useRoles, useCreateAdminProduct, useUpdateAdminProduct, useDeleteAdminProduct, useCreateAdminPhoneModel, useUpdateAdminPhoneModel, useDeleteAdminPhoneModel, useCreateAdminInventory, useUpdateAdminInventory, useDeleteAdminInventory } from '../../hook/useUser';
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
    const { data: inventory, isLoading: isLoadingInventory } = useAdminInventory();
    const { data: phoneModels, isLoading: isLoadingPhoneModels } = useAdminPhoneModels();

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

    // Product management state
    const [creatingProduct, setCreatingProduct] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductImageUrl, setNewProductImageUrl] = useState('');

    // Edit product state
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProductName, setEditProductName] = useState('');
    const [editProductDescription, setEditProductDescription] = useState('');
    const [editProductPrice, setEditProductPrice] = useState('');
    const [editProductImageUrl, setEditProductImageUrl] = useState('');

    const createProductMutation = useCreateAdminProduct();
    const updateProductMutation = useUpdateAdminProduct();
    const deleteProductMutation = useDeleteAdminProduct();

    // Phone model management state
    const [creatingPhoneModel, setCreatingPhoneModel] = useState(false);
    const [newPhoneModelName, setNewPhoneModelName] = useState('');
    const [newPhoneModelAspectRatio, setNewPhoneModelAspectRatio] = useState('');
    const [newPhoneModelBorderRadius, setNewPhoneModelBorderRadius] = useState('');
    const [newPhoneModelCameraTop, setNewPhoneModelCameraTop] = useState('');
    const [newPhoneModelCameraRight, setNewPhoneModelCameraRight] = useState('');

    // Edit phone model state
    const [editingPhoneModel, setEditingPhoneModel] = useState(null);
    const [editPhoneModelName, setEditPhoneModelName] = useState('');
    const [editPhoneModelAspectRatio, setEditPhoneModelAspectRatio] = useState('');
    const [editPhoneModelBorderRadius, setEditPhoneModelBorderRadius] = useState('');
    const [editPhoneModelCameraTop, setEditPhoneModelCameraTop] = useState('');
    const [editPhoneModelCameraRight, setEditPhoneModelCameraRight] = useState('');

    const createPhoneModelMutation = useCreateAdminPhoneModel();
    const updatePhoneModelMutation = useUpdateAdminPhoneModel();
    const deletePhoneModelMutation = useDeleteAdminPhoneModel();

    // Inventory management state
    const [creatingInventory, setCreatingInventory] = useState(false);
    const [newInventoryPhoneModelId, setNewInventoryPhoneModelId] = useState('');
    const [newInventoryCaseTypeId, setNewInventoryCaseTypeId] = useState('');
    const [newInventoryQuantity, setNewInventoryQuantity] = useState('');

    // Edit inventory state
    const [editingInventory, setEditingInventory] = useState(null);
    const [editInventoryPhoneModelId, setEditInventoryPhoneModelId] = useState('');
    const [editInventoryCaseTypeId, setEditInventoryCaseTypeId] = useState('');
    const [editInventoryQuantity, setEditInventoryQuantity] = useState('');

    const createInventoryMutation = useCreateAdminInventory();
    const updateInventoryMutation = useUpdateAdminInventory();
    const deleteInventoryMutation = useDeleteAdminInventory();

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
        { id: 'phonemodels', label: 'Quản lý dòng máy', icon: Layers },
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
                            <button 
                                onClick={() => setCreatingProduct(true)}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Plus className="w-4 h-4 mr-2" /> Thêm mới
                            </button>
                        </div>

                        {isLoadingProducts ? (
                            <div className="text-center py-4">Đang tải...</div>
                        ) : (
                            <div>
                                {/* Inline create form for products */}
                                {creatingProduct && (
                                    <div className="mb-6 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Thêm sản phẩm mới</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={newProductName}
                                                onChange={e => setNewProductName(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Tên sản phẩm"
                                            />
                                            <input
                                                type="text"
                                                value={newProductDescription}
                                                onChange={e => setNewProductDescription(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Mô tả"
                                            />
                                            <input
                                                type="number"
                                                value={newProductPrice}
                                                onChange={e => setNewProductPrice(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Giá"
                                            />
                                            <input
                                                type="text"
                                                value={newProductImageUrl}
                                                onChange={e => setNewProductImageUrl(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="URL hình ảnh"
                                            />
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => createProductMutation.mutate({ productData: { name: newProductName, description: newProductDescription, price: newProductPrice, imageUrl: newProductImageUrl } }, {
                                                    onSuccess: () => {
                                                        setNewProductName(''); setNewProductDescription(''); setNewProductPrice(''); setNewProductImageUrl(''); setCreatingProduct(false);
                                                    }
                                                })}
                                                disabled={createProductMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {createProductMutation.isLoading ? 'Đang tạo...' : 'Tạo'}
                                            </button>
                                            <button
                                                onClick={() => setCreatingProduct(false)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Inline edit form for products */}
                                {editingProduct && (
                                    <div className="mb-6 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Chỉnh sửa sản phẩm (ID: {editingProduct._id})</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={editProductName}
                                                onChange={e => setEditProductName(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Tên sản phẩm"
                                            />
                                            <input
                                                type="text"
                                                value={editProductDescription}
                                                onChange={e => setEditProductDescription(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Mô tả"
                                            />
                                            <input
                                                type="number"
                                                value={editProductPrice}
                                                onChange={e => setEditProductPrice(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Giá"
                                            />
                                            <input
                                                type="text"
                                                value={editProductImageUrl}
                                                onChange={e => setEditProductImageUrl(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="URL hình ảnh"
                                            />
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => updateProductMutation.mutate({ productId: editingProduct._id, productData: { name: editProductName, description: editProductDescription, price: editProductPrice, imageUrl: editProductImageUrl } })}
                                                disabled={updateProductMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {updateProductMutation.isLoading ? 'Đang lưu...' : 'Lưu'}
                                            </button>
                                            <button
                                                onClick={() => setEditingProduct(null)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products?.data?.map((product) => (
                                        <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                                                {product.imageUrl ? (
                                                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Package className="h-12 w-12 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h4>
                                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                                <div className="mt-auto">
                                                    <div className="mb-2">
                                                        <span className="text-red-600 font-bold">{product.price.toLocaleString()} ₫</span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingProduct(product);
                                                                setEditProductName(product.name || '');
                                                                setEditProductDescription(product.description || '');
                                                                setEditProductPrice(product.price || '');
                                                                setEditProductImageUrl(product.imageUrl || '');
                                                            }}
                                                            className="text-sm text-blue-600 hover:underline"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Xóa sản phẩm ${product.name}?`)) {
                                                                    deleteProductMutation.mutate(product._id);
                                                                }
                                                            }}
                                                            disabled={deleteProductMutation.isLoading}
                                                            className="text-sm text-red-600 hover:text-red-900"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'phonemodels':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Danh sách dòng máy</h3>
                            <button 
                                onClick={() => setCreatingPhoneModel(true)}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Plus className="w-4 h-4 mr-2" /> Thêm mới
                            </button>
                        </div>

                        {isLoadingPhoneModels ? (
                            <div className="text-center py-4">Đang tải...</div>
                        ) : (
                            <div>
                                {/* Inline create form for phone models */}
                                {creatingPhoneModel && (
                                    <div className="mb-6 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Thêm dòng máy mới</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={newPhoneModelName}
                                                onChange={e => setNewPhoneModelName(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Tên dòng máy (vd: iPhone 14 Pro)"
                                            />
                                            <input
                                                type="text"
                                                value={newPhoneModelAspectRatio}
                                                onChange={e => setNewPhoneModelAspectRatio(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Aspect Ratio (vd: 9/18)"
                                            />
                                            <input
                                                type="text"
                                                value={newPhoneModelBorderRadius}
                                                onChange={e => setNewPhoneModelBorderRadius(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Border Radius (vd: 3rem)"
                                            />
                                            <input
                                                type="text"
                                                value={newPhoneModelCameraTop}
                                                onChange={e => setNewPhoneModelCameraTop(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Camera Top (vd: 1rem)"
                                            />
                                            <input
                                                type="text"
                                                value={newPhoneModelCameraRight}
                                                onChange={e => setNewPhoneModelCameraRight(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Camera Right (vd: 1rem)"
                                            />
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => createPhoneModelMutation.mutate({ phoneModelData: { name: newPhoneModelName, aspect_ratio: newPhoneModelAspectRatio, border_radius: newPhoneModelBorderRadius, camera_position: { top: newPhoneModelCameraTop, right: newPhoneModelCameraRight } } }, {
                                                    onSuccess: () => {
                                                        setNewPhoneModelName(''); setNewPhoneModelAspectRatio(''); setNewPhoneModelBorderRadius(''); setNewPhoneModelCameraTop(''); setNewPhoneModelCameraRight(''); setCreatingPhoneModel(false);
                                                    }
                                                })}
                                                disabled={createPhoneModelMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {createPhoneModelMutation.isLoading ? 'Đang tạo...' : 'Tạo'}
                                            </button>
                                            <button
                                                onClick={() => setCreatingPhoneModel(false)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Inline edit form for phone models */}
                                {editingPhoneModel && (
                                    <div className="mb-6 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Chỉnh sửa dòng máy (ID: {editingPhoneModel._id})</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={editPhoneModelName}
                                                onChange={e => setEditPhoneModelName(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Tên dòng máy"
                                            />
                                            <input
                                                type="text"
                                                value={editPhoneModelAspectRatio}
                                                onChange={e => setEditPhoneModelAspectRatio(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Aspect Ratio"
                                            />
                                            <input
                                                type="text"
                                                value={editPhoneModelBorderRadius}
                                                onChange={e => setEditPhoneModelBorderRadius(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Border Radius"
                                            />
                                            <input
                                                type="text"
                                                value={editPhoneModelCameraTop}
                                                onChange={e => setEditPhoneModelCameraTop(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Camera Top"
                                            />
                                            <input
                                                type="text"
                                                value={editPhoneModelCameraRight}
                                                onChange={e => setEditPhoneModelCameraRight(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Camera Right"
                                            />
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => updatePhoneModelMutation.mutate({ phoneModelId: editingPhoneModel._id, phoneModelData: { name: editPhoneModelName, aspect_ratio: editPhoneModelAspectRatio, border_radius: editPhoneModelBorderRadius, camera_position: { top: editPhoneModelCameraTop, right: editPhoneModelCameraRight } } })}
                                                disabled={updatePhoneModelMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {updatePhoneModelMutation.isLoading ? 'Đang lưu...' : 'Lưu'}
                                            </button>
                                            <button
                                                onClick={() => setEditingPhoneModel(null)}
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect Ratio</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Border Radius</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Camera Position</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {phoneModels?.data?.map((model) => (
                                                <tr key={model._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.aspect_ratio}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.border_radius}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        top: {model.camera_position?.top}, right: {model.camera_position?.right}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                                        <button
                                                            onClick={() => {
                                                                setEditingPhoneModel(model);
                                                                setEditPhoneModelName(model.name || '');
                                                                setEditPhoneModelAspectRatio(model.aspect_ratio || '');
                                                                setEditPhoneModelBorderRadius(model.border_radius || '');
                                                                setEditPhoneModelCameraTop(model.camera_position?.top || '');
                                                                setEditPhoneModelCameraRight(model.camera_position?.right || '');
                                                            }}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Xóa dòng máy ${model.name}?`)) {
                                                                    deletePhoneModelMutation.mutate(model._id);
                                                                }
                                                            }}
                                                            disabled={deletePhoneModelMutation.isLoading}
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
            case 'inventory':
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Quản lý tồn kho</h3>
                            <button 
                                onClick={() => setCreatingInventory(true)}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                <Plus className="w-4 h-4 mr-2" /> Thêm mới
                            </button>
                        </div>

                        {isLoadingInventory ? (
                            <div className="text-center py-4">Đang tải...</div>
                        ) : (
                            <div>
                                {/* Inline create form for inventory */}
                                {creatingInventory && (
                                    <div className="mb-6 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Thêm tồn kho mới</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <select
                                                value={newInventoryPhoneModelId}
                                                onChange={e => setNewInventoryPhoneModelId(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                            >
                                                <option value="">Chọn dòng máy</option>
                                                {phoneModels?.data?.map((model) => (
                                                    <option key={model._id} value={model._id}>
                                                        {model.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                value={newInventoryCaseTypeId}
                                                onChange={e => setNewInventoryCaseTypeId(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                            >
                                                <option value="">Chọn sản phẩm (Case)</option>
                                                {products?.data?.map((product) => (
                                                    <option key={product._id} value={product._id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={newInventoryQuantity}
                                                onChange={e => setNewInventoryQuantity(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Số lượng"
                                            />
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => createInventoryMutation.mutate({ inventoryData: { phone_model_id: newInventoryPhoneModelId, case_type_id: newInventoryCaseTypeId, quantity: parseInt(newInventoryQuantity) } }, {
                                                    onSuccess: () => {
                                                        setNewInventoryPhoneModelId(''); setNewInventoryCaseTypeId(''); setNewInventoryQuantity(''); setCreatingInventory(false);
                                                    }
                                                })}
                                                disabled={createInventoryMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {createInventoryMutation.isLoading ? 'Đang tạo...' : 'Tạo'}
                                            </button>
                                            <button
                                                onClick={() => setCreatingInventory(false)}
                                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Inline edit form for inventory */}
                                {editingInventory && (
                                    <div className="mb-6 bg-white p-4 rounded-md border">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Chỉnh sửa tồn kho (ID: {editingInventory._id})</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <select
                                                value={editInventoryPhoneModelId}
                                                onChange={e => setEditInventoryPhoneModelId(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                            >
                                                <option value="">Chọn dòng máy</option>
                                                {phoneModels?.data?.map((model) => (
                                                    <option key={model._id} value={model._id}>
                                                        {model.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                value={editInventoryCaseTypeId}
                                                onChange={e => setEditInventoryCaseTypeId(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                            >
                                                <option value="">Chọn sản phẩm (Case)</option>
                                                {products?.data?.map((product) => (
                                                    <option key={product._id} value={product._id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                value={editInventoryQuantity}
                                                onChange={e => setEditInventoryQuantity(e.target.value)}
                                                className="px-3 py-2 border rounded"
                                                placeholder="Số lượng"
                                            />
                                        </div>
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() => updateInventoryMutation.mutate({ inventoryId: editingInventory._id, inventoryData: { phone_model_id: editInventoryPhoneModelId, case_type_id: editInventoryCaseTypeId, quantity: parseInt(editInventoryQuantity) } })}
                                                disabled={updateInventoryMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                                            >
                                                {updateInventoryMutation.isLoading ? 'Đang lưu...' : 'Lưu'}
                                            </button>
                                            <button
                                                onClick={() => setEditingInventory(null)}
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dòng máy</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {inventory?.data?.map((item) => (
                                                <tr key={item._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.phone_model_id?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.case_type_id?.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{item.quantity}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {item.quantity > 50 ? 'Còn hàng' : 'Sắp hết'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                                        <button
                                                            onClick={() => {
                                                                setEditingInventory(item);
                                                                setEditInventoryPhoneModelId(item.phone_model_id?._id || '');
                                                                setEditInventoryCaseTypeId(item.case_type_id?._id || '');
                                                                setEditInventoryQuantity(item.quantity || '');
                                                            }}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Xóa tồn kho cho ${item.phone_model_id?.name} - ${item.case_type_id?.name}?`)) {
                                                                    deleteInventoryMutation.mutate(item._id);
                                                                }
                                                            }}
                                                            disabled={deleteInventoryMutation.isLoading}
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
