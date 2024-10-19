import { ArrowBigRight, ArrowRight } from "lucide-react";
import Container from "../common/Container";
import { FlipWords } from "../ui/FlipWords";
import ShoesCarousel from "./ShoesCarousel";

const Hero = () => {
  const words = ["Comfortable", "Stylish", "Durable"];
  return (
    <div className="bg-red-500/5">
      <Container>
        <div className="lg:py-40 pt-20 flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-syne font-bold leading-[125%]">
              Discover {" "}
              <FlipWords
                words={words}
                className="text-4xl md:text-6xl font-syne font-bold text-red-500"
              />{" "}
              <br />
              Shoes that <br /> Keep you Moving
            </h1>
            <p className="font-medium text-sm md:text-base mt-4 mb-7">
              - With{" "}
              <span className="font-syne font-bold text-red-500">ELYXIAN</span>
            </p>
            <button className="bg-red-500 text-base md:text-xl group w-full md:w-auto justify-center items-center text-white md:py-4 py-2 px-10 flex gap-2 rounded-2xl">
              Shop Now <ArrowRight  className="group-hover:translate-x-2 transition-all duration-500"/>
            </button>
          </div>
          <div className="lg:w-1/2">
            <ShoesCarousel/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
