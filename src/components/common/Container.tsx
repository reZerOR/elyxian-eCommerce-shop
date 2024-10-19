import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface TChildren {
  children: ReactNode;
  className?: string;
}
const Container = ({ children, className }: TChildren) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-2", className)}>
      {children}
    </div>
  );
};

export default Container;
