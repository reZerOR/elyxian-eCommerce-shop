"use server";
import { connectToDatabase } from "@/configs/mongoose";
import { ProductModel, TProduct } from "@/models/product.model";
import { cookies } from "next/headers";

export const getProducts = async () => {
  cookies(); //added because its prevent caching by default
  await connectToDatabase();

  const result = await ProductModel.find();
  console.log(result);

  return Math.floor(Math.random() * 100) + 1;
};

export const addProduct = async (payload: Omit<TProduct, "isDeleted">) => {
  await connectToDatabase();
  try {
    const result = await ProductModel.create(payload);
    console.log(result);
    
    return result.toObject();
  } catch (error) {
    console.log(error);
    return error;
  }
};
