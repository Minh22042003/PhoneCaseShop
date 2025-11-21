import React, { useEffect, useState } from 'react';
import { useDesign } from '../../hook/useDesign';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';

// Mapping styles for camera based on ID (duplicated from DesighPhoneCase.jsx)
const CAMERA_STYLES = {
    pm1: 'absolute top-4 right-4 w-10 h-10 rounded-lg z-30',
    pm2: 'absolute top-5 left-5 w-20 h-20 rounded-2xl z-30 flex flex-col items-center justify-center space-y-2 p-1',
    pm3: 'absolute top-4 left-1/2 -translate-x-1/2 w-8 h-24 rounded-full z-30'
};

const PersonalDesign = () => {
    const { fetchUserDesigns, designs, isLoading, error } = useDesign();
    const [phoneModels, setPhoneModels] = useState({});
    const userId = '1'; // Hardcoded for now

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserDesigns(userId);
            try {
                const response = await fetch('/api/phone-models');
                if (response.ok) {
                    const data = await response.json();
                    const models = {};
                    data.forEach(m => {
                        models[m.id] = {
                            id: m.id,
                            name: m.name,
                            aspectRatio: m.aspect_ratio,
                            borderRadius: m.border_radius,
                            cameraClasses: CAMERA_STYLES[m.id] || 'absolute top-4 right-4 w-10 h-10 rounded-lg z-30'
                        };
                    });
                    setPhoneModels(models);
                }
            } catch (err) {
                console.error("Error fetching phone models", err);
            }
        };
        fetchData();
    }, [fetchUserDesigns, userId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-red-500 text-lg">Lỗi: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Bộ Sưu Tập Thiết Kế Của Tôi</h1>
                    <Link
                        to="/custom"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Tạo Thiết Kế Mới
                    </Link>
                </div>

                {designs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg mb-4">Bạn chưa có thiết kế nào.</p>
                        <Link to="/custom" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Bắt đầu thiết kế ngay &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {designs.map((design) => {
                            const currentModel = phoneModels[design.phone_model_id];
                            const caseColor = design.color_hex_value || '#374151';

                            return (
                                <div key={design.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 flex flex-col">
                                    <div className="relative bg-gray-100 p-4 flex items-center justify-center h-80 overflow-hidden">
                                        {/* PREVIEW LOGIC */}
                                        {currentModel ? (
                                            <div style={{ transform: 'scale(0.45)', transformOrigin: 'center' }}>
                                                <div
                                                    className={`relative w-80 shadow-2xl overflow-hidden border-8 
                                    ${caseColor === 'transparent' ? 'border-gray-400' : 'border-gray-900'}`}
                                                    style={{
                                                        aspectRatio: currentModel.aspectRatio,
                                                        borderRadius: currentModel.borderRadius,
                                                        backgroundColor: caseColor === 'transparent' ? 'white' : caseColor,
                                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                                                    }}
                                                >
                                                    {/* Nền caro cho ốp trong suốt */}
                                                    {caseColor === 'transparent' && (
                                                        <div
                                                            className="absolute inset-0 w-full h-full z-0"
                                                            style={{
                                                                backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                                                                backgroundSize: '20px 20px',
                                                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                                            }}
                                                        ></div>
                                                    )}

                                                    {/* Camera cutout */}
                                                    <div
                                                        className={`${currentModel.cameraClasses} bg-black/70 border-2 border-black/50`}
                                                    >
                                                        {/* Lens giả cho Mẫu 2 */}
                                                        {currentModel.id === 'pm2' && (
                                                            <>
                                                                <div className='w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-500'></div>
                                                                <div className='w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-500'></div>
                                                            </>
                                                        )}
                                                    </div>

                                                    {design.image_url && (
                                                        <div
                                                            className="absolute"
                                                            style={{
                                                                left: `${design.position_x}%`,
                                                                top: `${design.position_y}%`,
                                                                transform: `translate(-50%, -50%) scale(${design.scale}) rotate(${design.rotation}deg)`,
                                                                width: '100%',
                                                                transformOrigin: 'center center',
                                                                zIndex: 20
                                                            }}
                                                        >
                                                            <img
                                                                src={design.image_url}
                                                                alt="Design"
                                                                className="w-full h-auto"
                                                                draggable="false"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">Loading model...</div>
                                        )}

                                        <div className="absolute top-2 right-2 flex space-x-2 z-10">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${design.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {design.status === 'draft' ? 'Bản nháp' : 'Đã đặt hàng'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 truncate" title={design.image_filename}>
                                                {design.image_filename || 'Thiết kế không tên'}
                                            </h3>
                                            <div className="mt-2 text-sm text-gray-500 space-y-1">
                                                <p>Mẫu máy: <span className="font-medium text-gray-700">{currentModel ? currentModel.name : design.phone_model_id}</span></p>
                                                <p>Ngày tạo: <span className="font-medium text-gray-700">{design.created_at ? new Date(design.created_at).toLocaleDateString('vi-VN') : 'N/A'}</span></p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end space-x-3">
                                            <button className="text-indigo-600 hover:text-indigo-900 flex items-center text-sm font-medium">
                                                <Edit2 className="w-4 h-4 mr-1" /> Sửa
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 flex items-center text-sm font-medium">
                                                <Trash2 className="w-4 h-4 mr-1" /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalDesign;
