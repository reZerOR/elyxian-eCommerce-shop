import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import Hero from "@/components/home/Hero";
import NewArrival from "@/components/home/NewArrival";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <>
            <Container className="py-10 space-y-6">
              <Heading>
                New <span className="text-red-500">Arrival</span>
              </Heading>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="p-2 md:p-4 group relative rounded-lg bg-gray-200 animate-pulse"
                    >
                      <div className="w-[250px] h-[200px] mx-auto"></div>
                      <div className="h-4 w-1/2 bg-gray-200 absolute top-6 mt-2"></div>
                      <div className="h-6 w-1/2 bg-gray-200 mt-2"></div>
                    </div>
                  ))}
              </div>
            </Container>
          </>
        }
      >
        <NewArrival />
      </Suspense>
      <WhyChooseUs />
    </div>
  );
}
