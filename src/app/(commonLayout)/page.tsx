import { getProducts } from "@/actions";
import Hero from "@/components/home/Hero";
import NewArrival from "@/components/home/NewArrival";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <div>
      <Hero />
      <NewArrival />
      {products}
      <WhyChooseUs />
    </div>
  );
}
