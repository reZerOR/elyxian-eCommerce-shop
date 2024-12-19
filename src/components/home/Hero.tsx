import { ArrowRight } from "lucide-react";
import Container from "../common/Container";
import { FlipWords } from "../ui/FlipWords";
import ShoesCarousel from "./ShoesCarousel";
import Link from "next/link";

const Hero = () => {
  const words = ["Comfortable", "Stylish", "Durable"];
  return (
    <div className="bg-red-500/5">
      <Container>
        <div className="flex flex-col pt-20 lg:py-40 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-syne font-bold leading-[125%]">
              Discover{" "}
              <FlipWords
                words={words}
                className="text-4xl font-bold text-red-500 md:text-6xl font-syne"
              />{" "}
              <br />
              Shoes that <br /> Keep you Moving
            </h1>
            <p className="mt-4 text-sm font-medium md:text-base mb-7">
              - With{" "}
              <span className="font-bold text-red-500 font-syne">ELYXIAN</span>
            </p>
            <Link href="/products">
              <button className="flex items-center justify-center w-full gap-2 px-10 py-2 text-base text-white bg-red-500 md:text-xl group md:w-auto md:py-4 rounded-xl">
                Shop Now{" "}
                <ArrowRight className="transition-all duration-500 group-hover:translate-x-2" />
              </button>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <ShoesCarousel />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
