import React, { useState, useMemo, useEffect } from "react";
import { useProduct } from "../../hook/useProduct";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import ProductCardv2 from "../../components/ProductCard/ProductCardv2";

export default function ProductSearch() {
  const { data: productData, isLoading, isError, error } = useProduct();
  
  const products = useMemo(() => {
    return productData?.data || [];
  }, [productData]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModel, setSelectedModel] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedModel, priceRange, minPrice, maxPrice, sortOrder]);

  const phoneModels = useMemo(() => {
    const models = new Set();
    products.forEach((p) => models.add(p.name));
    return ["all", ...models];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (
          searchTerm.trim() !== "" &&
          !p.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        if (selectedModel !== "all" && p.name !== selectedModel) {
          return false;
        }

        if (priceRange !== "all") {
          if (priceRange === "under300" && p.price > 300000) return false;
          if (priceRange === "300to500" && (p.price < 300000 || p.price > 500000)) return false;
          if (priceRange === "above500" && p.price < 500000) return false;
        }

        if (minPrice !== "" && p.price < Number(minPrice)) return false;
        if (maxPrice !== "" && p.price > Number(maxPrice)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
      });
  }, [products, searchTerm, selectedModel, priceRange, minPrice, maxPrice, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="flex">
      <FilterSidebar
        phoneModels={phoneModels}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="flex-1 p-6 py-12">
        {/* UI: loading / error */}
        {isLoading && (
          <div className="text-center text-gray-500">Đang tải sản phẩm...</div>
        )}

        {isError && (
          <div className="text-center text-red-500">
            Lỗi tải dữ liệu: {error?.message}
          </div>
        )}

        {/* Khi đã có dữ liệu */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCardv2 key={product._id} product={product} />
              ))}
            </div>

            {currentProducts.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                Không tìm thấy sản phẩm.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded"
                >
                  ← Trước
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === page ? "bg-black text-white" : ""
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded"
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

