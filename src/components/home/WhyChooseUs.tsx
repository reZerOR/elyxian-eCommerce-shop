import React from "react";
import Container from "../common/Container";
import Heading from "../common/Heading";
import { Footprints, Truck, Wallet } from "lucide-react";

const WhyChooseUs = () => {
  const chooselist = [
    {
      icon: Truck,
      text: "Fast Delivery",
    },
    {
      icon: Footprints,
      text: "Finest Quality",
    },
    {
      icon: Wallet,
      text: "Reasonable Price",
    },
  ];

  return (
    <Container className="pb-10 space-y-6">
      <Heading>Why <span className="text-red-500">Choose</span> Us?</Heading>
      <div className="grid md:grid-cols-3 gap-2 lg:gap-6 xl:gap-10 text-center">
        {chooselist.map((item, i) => (
          <div
            key={i}
            className="flex flex-col bg-red-50 rounded-xl py-16 px-6 items-center gap-4"
          >
            <item.icon className="text-red-500 size-12 lg:size-16" />
            <p className="text-2xl lg:text-4xl font-semibold">{item.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default WhyChooseUs;
