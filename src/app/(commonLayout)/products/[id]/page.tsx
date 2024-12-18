"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { Plus, Minus, Cross, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { TProduct } from "@/models/product.model";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: product, isLoading } = useSWR<{
    success: boolean;
    data: TProduct;
  }>(id && `/api/product/${id}`, fetcher);
  console.log(product)
  
  // const product = {
  //   title: "Classic Sneakers",
  //   price: 80.0,
  //   comparePrice: 100.0,
  //   description: "Comfortable and stylish classic sneakers.",
  //   sizeQuantities: [
  //     { size: "L", quantity: 7 },
  //     { size: "M", quantity: 15 },
  //     { size: "XL", quantity: 10 },
  //   ],
  //   thisIsFor: ["Men"],
  //   categories: ["Sneakers"],
  //   isDeleted: false,
  //   images: [{ img: fakeimag }, {img: img2}],
  //   createdAt: "2024-11-08T00:00:00.000Z",
  //   updatedAt: "2024-11-08T00:00:00.000Z",
  // };
  const [selectedImage, setSelectedImage] = useState(
    product?.data?.images[0]?.img
  );
  const [quantity, setQuantity] = useState(1);
  const [selectSize, SetSelectSize] = useState<string | null>(null);

  const handleImageClick = (img: StaticImageData | string) => {
    setSelectedImage(img);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!product?.data) {
    return <div>Product not found</div>;
  }
  const handleQuantityChange = (amount: number) => {
    if (selectSize) {
      const selectedSizeQuantity = product?.data?.sizeQuantities.find(
        (item) => item.size === selectSize
      )?.quantity;
      if (selectedSizeQuantity && selectedSizeQuantity >= quantity + amount) {
        setQuantity((prev) => Math.max(1, prev + amount));
      } else {
        toast.warning("Selected size is out of stock!");
      }
    } else {
      toast.warning("Please select size!");
    }
  };

  const handleAddtoCart = () => {
    if (selectSize) {
      toast.success("Added successfully");
    } else {
      toast.warning("Please select size!");
    }
  };

  const totalQuantity = product?.data?.sizeQuantities.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  console.log(totalQuantity);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative w-full overflow-hidden border rounded-lg aspect-square">
            <Image src={selectedImage!}
            width={250}
            height={200}
            alt={product?.data?.title!} />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product?.data?.images.map((image, index) => (
              <button
                key={index}
                className="relative w-full overflow-hidden border rounded-lg aspect-square"
                onClick={() => handleImageClick(image.img)}
              >
                <Image
                  src={image.img}
                  width={100}
                  height={100}
                  alt={`${product.data.title} ${index + 1}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold font-syne">
            {product?.data?.title}
          </h1>
          <p className="text-gray-600">{product?.data?.description}</p>
          <div>
            {totalQuantity! > 0 ? (
              <div>
                {/* <div className="bg-green-500 rounded-full size-3"></div> */}
                <div className="inline px-2 py-1 bg-green-200 rounded-full">
                  {totalQuantity} In Stock
                </div>
              </div>
            ) : (
              <div>
                <div className="inline px-2 py-1 bg-red-200 rounded-full">
                  Out of stock
                </div>
              </div>
            )}
          </div>
          {/* prices */}
          <div className="flex space-x-4">
            <span className="text-2xl font-bold">
              Tk {product?.data?.price.toFixed(2)}
            </span>
            {product?.data?.comparePrice! > product?.data?.price! && (
              <span className="text-xl text-gray-500 line-through">
                Tk {product?.data?.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          {/* size and quantities */}
          <div className="space-y-2">
            <h3 className="font-semibold">Size</h3>
            <div className="flex gap-4">
              {product?.data?.sizeQuantities.map(
                (sq, index) =>
                  sq.quantity > 0 && (
                    <button
                      key={index}
                      onClick={() => {
                        SetSelectSize(sq.size);
                      }}
                      className={`relative px-5 py-2 rounded-lg border disabled:bg-gray-300 ${
                        selectSize === sq.size
                          ? "border-green-500 bg-green-50"
                          : ""
                      }`}
                    >
                      {sq.size}
                    </button>
                  )
              )}
            </div>
          </div>
          {/* categories */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {product?.data?.categories.map((category, index) => (
                <Badge key={index} variant="default">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          {/* this is for */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">This is for:</h3>

            <div className="flex gap-1">
              {product?.data?.thisIsFor.map((item, index) => (
                <Badge key={index} variant="default">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          {/* add to cart */}
          <div className="flex items-center space-x-4">
            {totalQuantity! > 0 && (
              <div className="flex items-center border rounded-md">
                <button
                  className="p-2 mr-4"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  className="w-12 h-full text-center border-none outline-none"
                  value={quantity}
                  readOnly
                />
                <button
                  className="p-2"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
            <Button
              disabled={totalQuantity! <= 0}
              onClick={handleAddtoCart}
              className="bg-green-500 hover:bg-green-400 disabled:bg-gray-300"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
