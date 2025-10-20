import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FilterSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
                <button 
                    type="button" 
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="font-medium text-gray-900">{title}</span>
                    <span className="ml-6 flex items-center">
                        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                </button>
            </h3>
            {isOpen && (
                <div className="pt-6">
                    <div className="space-y-4">{children}</div>
                </div>
            )}
        </div>
    );
};


const FilterSidebar = ({ onFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const categories = ['Kính Cường Lực', 'Silicone/Mềm', 'Chống Sốc', 'Da/Cao Cấp'];
    const brands = ['CaseMaster', 'PureCase', 'ArmorFlex', 'LuxuryTouch'];

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prev => 
            checked ? [...prev, value] : prev.filter(c => c !== value)
        );
    };

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        setSelectedBrands(prev => 
            checked ? [...prev, value] : prev.filter(b => b !== value)
        );
    };

    const handleApplyFilters = () => {
        onFilterChange({
            category: selectedCategories,
            brand: selectedBrands,
            price: {
                min: priceRange.min === '' ? 0 : Number(priceRange.min),
                max: priceRange.max === '' ? Infinity : Number(priceRange.max)
            }
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-bold mb-4 border-b pb-4">Bộ Lọc</h2>
            
            <FilterSection title="Danh Mục" defaultOpen={true}>
                {categories.map(category => (
                    <div key={category} className="flex items-center">
                        <input
                            id={`filter-category-${category}`}
                            name="category[]"
                            value={category}
                            type="checkbox"
                            onChange={handleCategoryChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-category-${category}`} className="ml-3 text-sm text-gray-600 cursor-pointer">
                            {category}
                        </label>
                    </div>
                ))}
            </FilterSection>

            <FilterSection title="Thương Hiệu">
                {brands.map(brand => (
                    <div key={brand} className="flex items-center">
                        <input
                            id={`filter-brand-${brand}`}
                            name="brand[]"
                            value={brand}
                            type="checkbox"
                            onChange={handleBrandChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-brand-${brand}`} className="ml-3 text-sm text-gray-600 cursor-pointer">
                            {brand}
                        </label>
                    </div>
                ))}
            </FilterSection>

            <FilterSection title="Khoảng Giá" defaultOpen={true}>
                <div className="flex items-center space-x-2">
                    <input 
                        type="number" 
                        placeholder="Từ" 
                        value={priceRange.min}
                        onChange={e => setPriceRange(p => ({ ...p, min: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                    />
                    <span>-</span>
                    <input 
                        type="number" 
                        placeholder="Đến" 
                        value={priceRange.max}
                        onChange={e => setPriceRange(p => ({ ...p, max: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                    />
                </div>
            </FilterSection>

            <button 
                onClick={handleApplyFilters}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
                Áp Dụng
            </button>
        </div>
    );
};

export default FilterSidebar;