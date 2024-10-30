import { z } from "zod";

const sizeQuantitySchema = z.object({
  size: z.string().trim().min(1, "Size is required"),
  quantity: z.number().int().positive("Quantity must be a positive number"),
});

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

const img = z.object({
  img: z.string().regex(urlRegex, { message: "Please enter a valid URL" }),
});

export const productSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  categories: z.array(z.string()).nonempty(),
  thisIsFor: z.array(z.string()).nonempty(),
  price: z.number().min(0),
  comparePrice: z.number().min(0),
  images: z.array(img).min(1, "At least one image is required"),
  sizeQuantities: z
    .array(sizeQuantitySchema)
    .min(1, "At least one size-quantity pair is required"),
});
