import HeroBanner from "../../components/HeroBanner/HeroBanner"
import ProductCard from "../../components/ProductCard/ProductCard";
import { sampleProducts } from "../../data/products";
import { useProduct } from "../../hook/useProduct";

const Home = () => {
    const { data: productData, isLoading, isError, error } = useProduct();

    let content;

    if (isLoading) {
        content = <div className="text-center py-20 text-xl font-medium">Đang tải sản phẩm...</div>;
    } else if (isError) {
        content = <div className="text-center py-20 text-xl text-red-600">Lỗi khi tải dữ liệu: {error.message}</div>;
    } else {
        // 2. Lấy 4 sản phẩm đầu tiên từ dữ liệu thật
        const productsToShow = productData ? productData.slice(0, 4) : []; 

        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {productsToShow.map((product) => (
                    <div key={product.id}>
                        {product.case_type_name}
                    </div>
                ))}
            </div>
        );
    }

    const productListing = (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Sản Phẩm Mới Nhất Theo Mẫu Điện Thoại</h2>
                    <p className="text-xl text-gray-500">Bộ sưu tập ốp lưng xu hướng năm 2024</p>
                </div>

                {/* Danh sách các ProductCard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sampleProducts.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                {/* Nút xem thêm */}
                <div className="text-center mt-12">
                    <a 
                        href="/product"
                        className="inline-block px-10 py-3 border-2 border-indigo-600 text-indigo-600 font-bold uppercase rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"
                    >
                        Xem Tất Cả Sản Phẩm
                    </a>
                </div>
            </div>
        </section>
    );

    return (
      <div>
        <HeroBanner></HeroBanner>
        {productListing}
        {content}
      </div>
    )
  }

export default Home