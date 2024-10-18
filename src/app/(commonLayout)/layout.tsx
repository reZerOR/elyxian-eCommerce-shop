import Navbar from "@/components/common/Navbar";
import React, { ReactNode } from "react";
interface TChildren {
  children: ReactNode;
}
const layout = ({ children }: TChildren) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
