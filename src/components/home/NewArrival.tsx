import React from "react";
import Heading from "../common/Heading";
import Container from "../common/Container";
import ProductCard from "../common/ProductCard";
import { fakeData } from "@/lib/variables";
const NewArrival = () => {
  return (
    <Container className="py-10 space-y-6">
      <Heading>
        New <span className="text-red-500">Arrival</span>
      </Heading>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {fakeData.map((item, i) => (
          <ProductCard key={i} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default NewArrival;
