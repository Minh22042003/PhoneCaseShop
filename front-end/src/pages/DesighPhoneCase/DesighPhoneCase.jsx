import React, { useState, useRef, useCallback } from 'react';
import { Upload, Minimize2, Maximize2, RotateCcw, RotateCw, Trash2, Move, Check } from 'lucide-react';

// Initial data for design image
const initialDesign = {
  url: null,
  filename: null,
  x: 50,
  y: 50,
  scale: 1.0,
  rotation: 0,
};

const DesighPhoneCase = () => {
  const [design, setDesign] = useState(initialDesign);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSpecs, setShowSpecs] = useState(false);
  
  const caseRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (design.url) {
        URL.revokeObjectURL(design.url);
      }
      
      const url = URL.createObjectURL(file);
      
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

  const handleMouseDown = useCallback((e) => {
    if (!design.url) return;
    e.preventDefault(); 
    
    setIsDragging(true);

    const imgBounds = imageRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - imgBounds.left - imgBounds.width / 2,
      y: e.clientY - imgBounds.top - imgBounds.height / 2,
    });
  }, [design.url]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !caseRef.current) return;
    e.preventDefault();

    const caseBounds = caseRef.current.getBoundingClientRect();
    const newClientX = e.clientX - dragOffset.x;
    const newClientY = e.clientY - dragOffset.y;
    
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

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleScaleChange = (factor) => {
    setDesign(prev => ({
      ...prev,
      scale: Math.max(0.2, Math.min(5.0, prev.scale + factor)),
    }));
  };

  const handleRotateChange = (angle) => {
    setDesign(prev => ({
      ...prev,
      rotation: (prev.rotation + angle) % 360,
    }));
  };

  const handleDeleteImage = () => {
    if (design.url) {
      URL.revokeObjectURL(design.url);
    }
    setDesign(initialDesign);
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          Design Your Phone Case
        </h1>
        <p className="text-gray-600">Upload, drag, rotate, and customize your design.</p>
      </header>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        
        {/* CONTROLS SECTION */}
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Tools
          </h2>
          
          {/* UPLOAD BUTTON */}
          <div className="mb-6">
            <label 
              htmlFor="imageUpload" 
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-green-500 hover:bg-green-600 transition duration-150 cursor-pointer"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Image
            </label>
            <input 
              id="imageUpload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </div>

          {/* OTHER CONTROLS (ONLY SHOW WHEN IMAGE IS LOADED) */}
          {design.url && (
            <div className="space-y-6">
              {/* SCALE CONTROLS */}
              <div className="p-4 bg-indigo-50 rounded-lg shadow-inner">
                <h3 className="text-lg font-medium text-indigo-700 mb-3 flex items-center">
                  <Maximize2 className="w-4 h-4 mr-2" />
                  Scale
                </h3>
                <div className="flex justify-between items-center space-x-3">
                  <button 
                    onClick={() => handleScaleChange(-0.1)}
                    className="p-3 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition disabled:opacity-50"
                    title="Zoom Out"
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
                    title="Zoom In"
                    disabled={design.scale >= 5.0}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-xs text-indigo-500 mt-2">
                  Current Scale
                </p>
              </div>

              {/* ROTATION CONTROLS */}
              <div className="p-4 bg-purple-50 rounded-lg shadow-inner">
                <h3 className="text-lg font-medium text-purple-700 mb-3 flex items-center">
                  <RotateCw className="w-4 h-4 mr-2" />
                  Rotate
                </h3>
                <div className="flex justify-between items-center space-x-3">
                  <button 
                    onClick={() => handleRotateChange(-15)}
                    className="p-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition"
                    title="Rotate Left"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-mono text-purple-700 w-20 text-center">
                    {design.rotation}°
                  </span>
                  <button 
                    onClick={() => handleRotateChange(15)}
                    className="p-3 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition"
                    title="Rotate Right"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-center text-xs text-purple-500 mt-2">
                  Current Rotation
                </p>
              </div>

              {/* DELETE BUTTON */}
              <button 
                onClick={handleDeleteImage}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-red-500 hover:bg-red-600 transition duration-150"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Image
              </button>

              {/* CONFIRM DESIGN BUTTON */}
              <button 
                onClick={() => setShowSpecs(true)}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
              >
                <Check className="w-5 h-5 mr-2" />
                Confirm Design
              </button>
            </div>
          )}
        </div>

        {/* DESIGN CANVAS */}
        <div className="md:w-2/3 flex justify-center items-start">
          <div 
            ref={caseRef}
            className="relative w-full max-w-xs aspect-[9/18] bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800"
            style={{ 
                borderRadius: '3rem', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                background: 'linear-gradient(to bottom right, #333, #111)',
            }}
          >
            {/* Camera cutout */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-gray-950 rounded-lg border-2 border-gray-600 z-30"></div>

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
                    zIndex: 20
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                  onTouchMove={handleMouseMove}
                  onTouchEnd={handleMouseUp}
                >
                  <img
                    src={design.url}
                    alt="Design"
                    className="w-full h-auto"
                    draggable="false"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
                {/* Transparent overlay for drag hint */}
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
                <p className="font-semibold">Please upload an image to start designing!</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="mt-10 pt-4 border-t w-full max-w-4xl text-center text-sm text-gray-500">
        <p>Note: This is a 2D simulation. Drag and drop is performed by clicking and moving the mouse on the image. Zoom and rotation are controlled by the buttons.</p>
      </footer>

      {/* SPECIFICATIONS MODAL */}
      {showSpecs && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Technical Specifications
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Here are the specifications for manufacturing your design:
            </p>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Image Filename:</span>
                <span className="font-mono text-black max-w-[60%] truncate" title={design.filename || 'N/A'}>
                  {design.filename || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Position (X, Y):</span>
                <span className="font-mono text-black">
                  ({design.x.toFixed(2)}%, {design.y.toFixed(2)}%)
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Scale:</span>
                <span className="font-mono text-black">
                  {(design.scale * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Rotation:</span>
                <span className="font-mono text-black">
                  {design.rotation}°
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowSpecs(false)}
              className="w-full mt-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesighPhoneCase;