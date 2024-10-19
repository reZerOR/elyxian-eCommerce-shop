"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import shoes1 from "@/assets/shoes 1.webp";
import shoes2 from "@/assets/shoes 2.webp";
import Image from "next/image";

const ShoesCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const images = [shoes1, shoes2];

  useEffect(() => {
    if (!api) {
      return;
    }
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);
  return (
    <div className="lg:w-3/4 w-2/4 mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
        className={``}
      >
        <CarouselContent>
          {images?.map((img, index) => (
            <CarouselItem key={index} className="">
              <Image src={img} alt="shoes" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ShoesCarousel;
