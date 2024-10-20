import React from "react";
import Heading from "../common/Heading";
import Container from "../common/Container";
import fakeimag from "@/assets/shoes 1.webp";
import Image from "next/image";

const NewArrival = () => {
  const fakeData = {
    img: fakeimag,
    title: "Snekars Sniky",
    price: 550,
  };
  return (
    <Container>
      <Heading>New Arrival</Heading>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(9)].map((_, i) => (
          <div className="shadow-sm p-2 md:p-4 group relative rounded-lg bg-slate-100">
            <Image
              src={fakeData.img}
              alt={fakeData.title}
              className="group-hover:scale-100 transition-all duration-200 scale-90"
            />
            <p className="bg-red-500 md:pb-1 md:pt-2 md:px-4 py-1 px-2 text-xs md:text-base absolute top-6 text-white rounded-full font-bold">Tk {fakeData.price}</p>
            <p className="md:text-xl pl-[7px] font-bold font-syne">
              {fakeData.title}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NewArrival;
