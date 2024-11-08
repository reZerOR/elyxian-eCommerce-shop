"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import fakeimag from "@/assets/shoes 1.webp";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const product = {
    title: "Classic Sneakers",
    price: 80.0,
    comparePrice: 100.0,
    description: "Comfortable and stylish classic sneakers.",
    sizeQuantities: [
      { size: "7", quantity: 20 },
      { size: "8", quantity: 15 },
      { size: "9", quantity: 10 },
    ],
    thisIsFor: ["Men"],
    categories: ["Sneakers"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  };
  const [selectedImage, setSelectedImage] = useState(product.images[0].img);
  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (img: StaticImageData) => {
    setSelectedImage(img);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={selectedImage}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-md"
                onClick={() => handleImageClick(image.img)}
              >
                <Image
                  src={image.img}
                  alt={`${product.title} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex space-x-4">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Size & Quantity:</h3>
            {product.sizeQuantities.map((sq, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`size-${sq.size}`} />
                <label
                  htmlFor={`size-${sq.size}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {sq.size} ({sq.quantity} available)
                </label>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">This is for:</h3>
            <ul className="list-disc list-inside">
              {product.thisIsFor.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                className="p-2"
                onClick={() => handleQuantityChange(-1)}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                className="w-12 text-center"
                value={quantity}
                readOnly
              />
              <button
                className="p-2"
                onClick={() => handleQuantityChange(1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
