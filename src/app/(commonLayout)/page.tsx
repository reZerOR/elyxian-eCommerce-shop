import Hero from "@/components/home/Hero";
import NewArrival from "@/components/home/NewArrival";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { ReactNode } from "react";

export default function Home({ newArrival }: { newArrival: ReactNode }) {
  return (
    <div>
      <Hero />
      <NewArrival />
      <WhyChooseUs />
    </div>
  );
}
