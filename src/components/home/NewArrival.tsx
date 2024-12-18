import Heading from "../common/Heading";
import Container from "../common/Container";
import ProductCard from "../common/ProductCard";
import { TProduct } from "@/models/product.model";
export const fetchProductData = async () => {
  const res = await fetch("http://localhost:3000/api/product", {cache: 'no-store'});
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  return res.json();
};
const NewArrival = async () => {
  const productData: { success: boolean; data: TProduct[] } =
    await fetchProductData();

  // const data = await fetch('')
  return (
    <Container className="py-10 space-y-6">
      <Heading>
        New <span className="text-red-500">Arrival</span>
      </Heading>
      {productData.success && productData.data.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productData.data.map((item, i) => (
            <ProductCard key={i} {...item} />
          ))}
        </div>
      ) : (
        <p>Wheres is all the producs go</p>
      )}
    </Container>
  );
};

export default NewArrival;
