import { TProduct } from "@/models/product.model";
import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { PackageCheck, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";

const ProductCard: React.FC<TProduct> = ({
  images,
  title,
  price,
  _id,
  sizeQuantities,
}) => {
  return (
    <Card className="relative flex flex-col border-red-200 shadow-none group">
      <div className="p-2">
        <CardHeader className="rounded-lg bg-slate-200/60">
          <Image
            src={images?.[0].img}
            alt={title}
            width={250}
            height={200}
            className="object-contain mx-auto transition-all duration-200 scale-90 group-hover:scale-100"
          />
        </CardHeader>
      </div>
      <CardContent className="flex flex-col justify-between flex-1">
        <CardTitle className="text-sm md:text-base">
          <Link href={`/products/${_id}`}>{title}</Link>
        </CardTitle>
        <CardDescription className="flex flex-wrap gap-2 my-[2px] md:my-0">
          <Badge className="flex gap-1 bg-green-500">
            <PackageCheck size={16} />{" "}
            {sizeQuantities.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
            Available
          </Badge>
        </CardDescription>
        <CardFooter className="justify-self-end">
          <Button className="w-full font-semibold bg-red-800 hover:bg-red-900 font-syne">
            <ShoppingCart /> Buy Now
          </Button>
        </CardFooter>
      </CardContent>
      <p className="absolute px-2 text-sm font-semibold text-white bg-red-800 rounded-md md:text-base top-2 right-2">
        tk {price}
      </p>
    </Card>
  );
};

export default ProductCard;
