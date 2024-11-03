import Container from "@/components/common/Container";
import ProductFilter from "@/components/products/ProductFilter";
import fakeimag from "@/assets/shoes 1.webp";
import ProductCard from "@/components/common/ProductCard";

const ClientProductPage = ({searchParams}:{searchParams: Record<string, string>}) => {
  const fakeData = {
    img: fakeimag,
    title: "Snekars Sniky",
    price: 550,
  };
  console.log(searchParams);
  
  console.log("search", searchParams.search);

  return (
    <Container>
      <div className="grid grid-cols-5 gap-6">
        <div className="">
          <ProductFilter />
        </div>
        <div className="grid grid-cols-2 col-span-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <ProductCard key={i} {...fakeData} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ClientProductPage;
