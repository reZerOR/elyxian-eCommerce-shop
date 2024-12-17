import { TProduct } from "@/models/product.model";
import Image from "next/image";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const ProductCard: React.FC<TProduct> = ({ images, title, price, _id}) => {
  return (
    // <div className="p-2 md:p-4 group relative rounded-lg bg-slate-50 hover:shadow-[35px_34px_29px_-15px_rgba(212,212,212,0.69)] transition-all duration-200">
    //   <Image
    //     src={images?.[0].img}
    //     alt={title}
    //     width={250}
    //     height={200}
    //     className="mx-auto transition-all duration-200 scale-90 group-hover:scale-100"
    //   />
    //   <p className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full md:pb-1 md:pt-2 md:px-4 md:text-base top-6">
    //     Tk {price}
    //   </p>
    //   <p className="md:text-xl pl-[7px] font-bold font-syne">{title}</p>
    // </div>
    <Card className="group">
      <div className="p-2">
        <CardHeader className="rounded-lg bg-slate-200">
          <Image
            src={images?.[0].img}
            alt={title}
            width={250}
            height={200}
            className="object-contain mx-auto transition-all duration-200 scale-90 group-hover:scale-100"
          />
        </CardHeader>
      </div>
      <CardContent>
        <CardTitle><Link href={`/products/${_id}`}>{title}</Link></CardTitle>
        <CardFooter>
          <Button>
            Buy Now
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
