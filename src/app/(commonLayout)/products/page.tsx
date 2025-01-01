import Container from "@/components/common/Container";
import ProductFilter from "@/components/products/ProductFilter";
import ProductCard from "@/components/common/ProductCard";
import { TProduct } from "@/models/product.model";
import { fetchProductData } from "@/components/home/NewArrival";

const ClientProductPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  // Parse URL parameters
  const categories = searchParams.category?.split(",") || [];
  const genders = searchParams.gender?.split(",") || [];
  const priceSort = searchParams.priceFilter || "";
  const searchQuery = searchParams.search?.toLowerCase() || "";
  const productData = await fetchProductData();
  

  // Filter function
  const filterProducts = (products: TProduct[]) => {
    if(products.length === 0) return [];
    return products
      .filter((product) => {
        // Category filter
        const categoryMatch =
          categories.length === 0 ||
          product.categories.some((cat) => categories.includes(cat));

        // Gender filter (thisIsFor in the data represents gender)
        const genderMatch =
          genders.length === 0 ||
          product.thisIsFor.some((gender) => genders.includes(gender));

        // Search query filter
        const searchMatch =
          !searchQuery ||
          product.title.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery);

        return categoryMatch && genderMatch && searchMatch;
      })
      .sort((a, b) => {
        // Price sorting
        if (priceSort === "asc") {
          return a.price - b.price;
        } else if (priceSort === "dsc") {
          return b.price - a.price;
        }
        return 0;
      });
  };

  // Apply filters to fakeData
  const filteredProducts = filterProducts(productData.data || []);

  return (
    <Container>
      <div className="flex flex-col gap-6 my-10">
        <div className="basis-1/4">
          <ProductFilter />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 basis-3/4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {
              filteredProducts.length > 0 ? (
                filteredProducts.map((item, i) => (
                  <ProductCard key={i} {...item} />
                ))) : (
                <p>Wheres is all the producs go</p>
              )
            }
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientProductPage;
