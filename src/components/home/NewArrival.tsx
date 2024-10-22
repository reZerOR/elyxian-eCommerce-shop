import React from "react";
import Heading from "../common/Heading";
import Container from "../common/Container";
import fakeimag from "@/assets/shoes 1.webp";
import ProductCard from "../common/ProductCard";

const NewArrival = () => {
  const fakeData = {
    img: fakeimag,
    title: "Snekars Sniky",
    price: 550,
  };
  return (
    <Container className="py-10 space-y-6">
      <Heading>New <span className="text-red-500">Arrival</span></Heading>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <ProductCard key={i} {...fakeData} />
        ))}
      </div>
    </Container>
  );
};

export default NewArrival