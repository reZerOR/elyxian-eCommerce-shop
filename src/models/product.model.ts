import { model, models, Schema } from "mongoose";
import { StaticImageData } from "next/image";

export interface TProduct {
  title: string;
  price: number;
  comparePrice: number;
  description: string;
  sizeQuantities: {
    size: string;
    quantity: number;
  }[];
  thisIsFor: string[];
  categories: string[];
  isDeleted: boolean;
  images: {
    img: StaticImageData | string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

const ProductSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number, required: true },
    description: { type: String, required: true },
    sizeQuantities: [
      {
        _id: false,
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    thisIsFor: [{ type: String, _id: false }],
    categories: [{ type: String, _id: false }],
    images: [{ _id: false, img: { type: String } }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProductModel =
  models.Product || model<TProduct>("Product", ProductSchema);
