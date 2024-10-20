import { cn } from "@/lib/utils";
import { TChildren } from "./Container";

const Heading = ({ children, className }: TChildren) => {
  return (
    <p
      className={cn(
        "font-bold font-syne text-center text-3xl md:text-4xl",
        className
      )}
    >
      {children}
    </p>
  );
};

export default Heading;
