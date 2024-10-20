import Hero from "@/components/home/Hero";
import NewArrival from "@/components/home/NewArrival";
import { ReactNode } from "react";

export default function Home({newArrival}:{newArrival: ReactNode}) {
  return (
    <div>
      <Hero />
      <NewArrival/>
    </div>
  );
}
