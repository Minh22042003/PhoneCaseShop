import React, { useState, useEffect } from 'react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { sampleProducts } from '../../data/products';

const ProductSearch = () => {
  const [allProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    price: { min: 0, max: Infinity }
  });

  useEffect(() => {
    let result = allProducts;

    // Search filter
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter(p => filters.category.includes(p.category));
    }

    // Brand filter
    if (filters.brand.length > 0) {
      result = result.filter(p => filters.brand.includes(p.brand));
    }
    
    // Price filter
    result = result.filter(p => p.price >= filters.price.min && p.price <= filters.price.max);


    setFilteredProducts(result);
  }, [searchTerm, filters, allProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">Tất Cả Sản Phẩm</h1>
                <p className="text-xl text-gray-500 mt-2">Tìm kiếm và khám phá những chiếc ốp lưng hoàn hảo</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <FilterSidebar onFilterChange={handleFilterChange} />
                </aside>

                {/* Product Grid */}
                <main className="lg:col-span-3">
                    {/* Search and Sort */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên sản phẩm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                            {/* Sort dropdown can be added here */}
                        </div>
                    </div>

                    {/* Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-md">
                            <p className="text-xl text-gray-600">Không tìm thấy sản phẩm nào phù hợp.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    </div>
  );
};

export default ProductSearch;