import React, { useState, useRef, useCallback } from 'react';
import { Upload, Minimize2, Maximize2, RotateCcw, RotateCw, Trash2, Move, Check } from 'lucide-react';

// Dữ liệu cho các mẫu điện thoại
const phoneModels = {
  model1: {
    id: 'model1',
    name: 'Mẫu 1 (Góc Bo)',
    aspectRatio: '9/18',
    borderRadius: '3rem',
    cameraClasses: 'absolute top-4 right-4 w-10 h-10 rounded-lg z-30'
  },
  model2: {
    id: 'model2',
    name: 'Mẫu 2 (Cụm Camera Vuông)',
    aspectRatio: '9/19.5',
    borderRadius: '2.75rem',
    cameraClasses: 'absolute top-5 left-5 w-20 h-20 rounded-2xl z-30 flex flex-col items-center justify-center space-y-2 p-1'
  },
  model3: {
    id: 'model3',
    name: 'Mẫu 3 (Camera Dọc)',
    aspectRatio: '9/19',
    borderRadius: '2.5rem',
    cameraClasses: 'absolute top-4 left-1/2 -translate-x-1/2 w-8 h-24 rounded-full z-30'
  }
};

// Dữ liệu cho các màu ốp lưng
const caseColors = [
  { name: 'Đen', value: '#374151' }, // gray-700
  { name: 'Trắng', value: '#F3F4F6' }, // gray-100
  { name: 'Xanh Navy', value: '#1E3A8A' }, // blue-800
  { name: 'Hồng Phấn', value: '#FBCFE8' }, // pink-200
  { name: 'Trong Suốt', value: 'transparent' }
];

// Dữ liệu ban đầu cho hình ảnh thiết kế
const initialDesign = {
  url: null,
  filename: null, 
  x: 50, 
  y: 50,
  scale: 1.0, 
  rotation: 0, 
};

// Component chính của ứng dụng
const DesighPhoneCase = () => {
  const [design, setDesign] = useState(initialDesign);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSpecs, setShowSpecs] = useState(false); 
  
  // THÊM MỚI: Trạng thái cho màu và mẫu ốp
  const [caseColor, setCaseColor] = useState(caseColors[0].value); // Mặc định là màu Đen
  const [selectedModelId, setSelectedModelId] = useState('model1'); // Mặc định là Mẫu 1
  
  // Lấy thông tin mẫu ốp hiện tại
  const currentModel = phoneModels[selectedModelId];
  
  // Ref cho vùng ốp lưng để tính toán giới hạn kéo thả
  const caseRef = useRef(null);
  const imageRef = useRef(null);

  // Xử lý tải ảnh lên
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Nếu có ảnh cũ, thu hồi URL
      if (design.url) {
        URL.revokeObjectURL(design.url);
      }
      
      const url = URL.createObjectURL(file);
      
      // Đặt lại vị trí, tỉ lệ và xoay khi tải ảnh mới
      setDesign({ 
        url, 
        filename: file.name, 
        x: 50, 
        y: 50, 
        scale: 1.0,
        rotation: 0 
      });
    }
  };

  // Bắt đầu kéo
  const handleMouseDown = useCallback((e) => {
    if (!design.url) return;
    e.preventDefault(); 
    
    setIsDragging(true);

    const imgBounds = imageRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    setDragOffset({
      x: clientX - imgBounds.left - imgBounds.width / 2,
      y: clientY - imgBounds.top - imgBounds.height / 2,
    });
  }, [design.url]);

  // Đang kéo
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !caseRef.current) return;
    e.preventDefault();

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const caseBounds = caseRef.current.getBoundingClientRect();
    const newClientX = clientX - dragOffset.x;
    const newClientY = clientY - dragOffset.y;
    
    let newX = ((newClientX - caseBounds.left) / caseBounds.width) * 100;
    let newY = ((newClientY - caseBounds.top) / caseBounds.height) * 100;

    newX = Math.max(-20, Math.min(120, newX));
    newY = Math.max(-20, Math.min(120, newY));

    setDesign(prev => ({
      ...prev,
      x: newX,
      y: newY,
    }));
  }, [isDragging, dragOffset]);

  // Kết thúc kéo
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Thay đổi tỉ lệ (scale)
  const handleScaleChange = (factor) => {
    setDesign(prev => ({
      ...prev,
      scale: Math.max(0.2, Math.min(5.0, prev.scale + factor)), // Giới hạn từ 0.2x đến 5.0x
    }));
  };

  // Thay đổi góc xoay (rotation)
  const handleRotateChange = (angle) => {
    setDesign(prev => ({
      ...prev,
      rotation: (prev.rotation + angle) % 360, // Giới hạn góc xoay từ 0 đến 359
    }));
  };

  // Xóa ảnh
  const handleDeleteImage = () => {
    if (design.url) {
      URL.revokeObjectURL(design.url); // Giải phóng bộ nhớ của ảnh đã tải lên
    }
    setDesign(initialDesign);
  };

  // Đăng ký sự kiện kéo thả toàn cục
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Thiết Kế Ốp Lưng Điện Thoại 2D
        </h1>
        <p className="text-gray-600">Tải ảnh lên, kéo thả, xoay và tùy chỉnh kích thước theo ý bạn.</p>
      </header>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        
          {/* KHU VỰC ĐIỀU KHIỂN (CONTROLS) */}
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Công Cụ
          </h2>
          
          {/* THÊM MỚI: TÙY CHỈNH ỐP LƯNG */}
          <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-medium text-gray-700">1. Chọn Mẫu Ốp Lưng</h3>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.values(phoneModels).map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>

            <h3 className="text-lg font-medium text-gray-700 pt-2">2. Chọn Màu Ốp Lưng</h3>
            <div className="flex flex-wrap gap-3">
              {caseColors.map(color => (
                <button
                  key={color.value}
                  title={color.name}
                  onClick={() => setCaseColor(color.value)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform duration-150 ${caseColor === color.value ? 'ring-4 ring-offset-2 ring-indigo-500 transform scale-110' : 'border-gray-300'}`}
                  style={{ 
                    backgroundColor: color.value === 'transparent' ? '#fff' : color.value,
                    backgroundImage: color.value === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                    backgroundSize: color.value === 'transparent' ? '12px 12px' : 'auto',
                    backgroundPosition: color.value === 'transparent' ? '0 0, 0 6px, 6px -6px, -6px 0px' : 'auto'
                  }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="mb-6" />

          {/* NÚT TẢI LÊN */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">3. Tải Ảnh Thiết Kế</h3>
            <label 
              htmlFor="imageUpload" 
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-green-500 hover:bg-green-600 transition duration-150 cursor-pointer"
            >
              <Upload className="w-5 h-5 mr-2" />
              Tải Ảnh Lên
            </label>
            <input 
              id="imageUpload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </div>

          {/* CÁC ĐIỀU KHIỂN KHÁC (CHỈ HIỂN THỊ KHI CÓ ẢNH) */}
          {design.url && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700 -mb-2">4. Tùy Chỉnh Ảnh</h3>
              {/* ĐIỀU KHIỂN KÍCH THƯỚC */}
              <div className="p-4 bg-indigo-50 rounded-lg shadow-inner">
                <h3 className="text-lg font-medium text-indigo-700 mb-3 flex items-center">
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Phóng To / Thu Nhỏ
                </h3>
                <div className="flex justify-between items-center space-x-3">
                  <button 
                    onClick={() => handleScaleChange(-0.1)}
                    className="p-3 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition disabled:opacity-50"
                    title="Thu nhỏ"
                    disabled={design.scale <= 0.2}
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-mono text-indigo-700 w-20 text-center">
                    {(design.scale * 100).toFixed(0)}%
                  </span>
                  <button 
                    onClick={() => handleScaleChange(0.1)}
                    className="p-3 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition disabled:opacity-50"
                    title="Phóng to"
                    disabled={design.scale >= 5.0}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-xs text-indigo-500 mt-2">
                  Tỉ lệ hiện tại
                </p>
              </div>

              {/* ĐIỀU KHIỂN XOAY ẢNH */}
              <div className="p-4 bg-purple-50 rounded-lg shadow-inner">
                <h3 className="text-lg font-medium text-purple-700 mb-3 flex items-center">
                  <RotateCw className="w-4 h-4 mr-2" />
                  Xoay Ảnh
                </h3>
                <div className="flex justify-between items-center space-x-3">
                  <button 
                    onClick={() => handleRotateChange(-15)} // Xoay 15 độ ngược chiều kim đồng hồ
                    className="p-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition"
                    title="Xoay trái"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-mono text-purple-700 w-20 text-center">
                    {design.rotation}°
                  </span>
                  <button 
                    onClick={() => handleRotateChange(15)} // Xoay 15 độ cùng chiều kim đồng hồ
                    className="p-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition"
                    title="Xoay phải"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-xs text-purple-500 mt-2">
                  Góc xoay hiện tại
                </p>
              </div>

              {/* NÚT XÓA ẢNH */}
              <button 
                onClick={handleDeleteImage}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-red-500 hover:bg-red-600 transition duration-150"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Xóa Ảnh
              </button>

              {/* NÚT XÁC NHẬN THIẾT KẾ */}
              <button 
                onClick={() => setShowSpecs(true)}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
              >
                <Check className="w-5 h-5 mr-2" />
                Xác Nhận Thiết Kế
              </button>
            </div>
          )}
        </div>

        {/* KHU VỰC THIẾT KẾ (DESIGN CANVAS) */}
        <div className="md:w-2/3 flex justify-center items-start">
          <div 
            ref={caseRef}
            className={`relative w-full max-w-xs shadow-2xl overflow-hidden border-8 
                        ${caseColor === 'transparent' ? 'border-gray-400' : 'border-gray-900'}`}
            style={{ 
                aspectRatio: currentModel.aspectRatio,
                borderRadius: currentModel.borderRadius, 
                backgroundColor: caseColor === 'transparent' ? 'white' : caseColor,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease' // Thêm hiệu ứng chuyển động mượt
            }}
          >
            {/* THAY ĐỔI: Nền caro cho ốp trong suốt */}
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
            
            {/* THAY ĐỔI: Vùng cắt camera động */}
            <div 
              className={`${currentModel.cameraClasses} bg-black/70 border-2 border-black/50`}
            >
              {/* Thêm lens giả cho Mẫu 2 */}
              {currentModel.id === 'model2' && (
                <>
                  <div className='w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-500'></div>
                  <div className='w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-500'></div>
                </>
              )}
            </div>

            {design.url ? (
              <>
                <div 
                  ref={imageRef}
                  className={`absolute cursor-move transition-shadow duration-300 ${isDragging ? 'shadow-2xl shadow-yellow-500/50 border-4 border-yellow-500' : 'shadow-lg'}`}
                  style={{
                    left: `${design.x}%`,
                    top: `${design.y}%`,
                    transform: `translate(-50%, -50%) scale(${design.scale}) rotate(${design.rotation}deg)`, 
                    width: '100%', 
                    transformOrigin: 'center center',
                    zIndex: 20 // Nằm trên nền (z-0) và placeholder (z-10), dưới camera (z-30)
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <img
                    src={design.url}
                    alt="Ảnh thiết kế"
                    className="w-full h-auto"
                    draggable="false"
                    style={{ pointerEvents: 'none' }} 
                  />
                </div>
                {/* Lớp overlay trong suốt để người dùng biết có thể kéo thả */}
                <div 
                  className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none 
                              ${isDragging ? 'bg-indigo-500/10' : 'hover:bg-indigo-500/10'}`}
                >
                    <Move className={`w-10 h-10 text-white/70 transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-6 text-center z-10">
                <Upload className="w-12 h-12 mb-3" />
                <p className="font-semibold">Vui lòng tải ảnh lên để bắt đầu thiết kế!</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="mt-10 pt-4 border-t w-full max-w-4xl text-center text-sm text-gray-500">
        <p>Ghi chú: Ứng dụng này chỉ là mô phỏng 2D. Kéo thả được thực hiện bằng cách click chuột vào ảnh và di chuyển. Phóng to/thu nhỏ và xoay bằng các nút điều khiển.</p>
      </footer>

      {/* MODAL HIỂN THỊ THÔNG SỐ KỸ THUẬT */}
      {showSpecs && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Thông Số Kỹ Thuật
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Đây là thông tin (mô phỏng) để nhà sản xuất tái tạo thiết kế của bạn:
            </p>
            <div className="space-y-3 text-gray-700">
              {/* THAY ĐỔI: Thêm thông tin mẫu và màu */}
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Mẫu Ốp Lưng:</span>
                <span className="font-mono text-black">
                  {currentModel.name}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Màu Ốp Lưng:</span>
                <span className="font-mono text-black flex items-center gap-2">
                  {caseColors.find(c => c.value === caseColor)?.name || caseColor}
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-400" 
                    style={{ 
                      backgroundColor: caseColor === 'transparent' ? '#fff' : caseColor,
                      backgroundImage: caseColor === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%)' : 'none',
                      backgroundSize: '8px 8px'
                    }}
                  ></div>
                </span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Tên File Ảnh:</span>
                <span className="font-mono text-black max-w-[60%] truncate" title={design.filename || 'N/A'}>
                  {design.filename || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Vị Trí (X, Y):</span>
                <span className="font-mono text-black">
                  ({design.x.toFixed(2)}%, {design.y.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Tỉ Lệ Phóng:</span>
                <span className="font-mono text-black">
                  {(design.scale * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Góc Xoay:</span>
                <span className="font-mono text-black">
                  {design.rotation}°
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowSpecs(false)}
              className="w-full mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesighPhoneCase;