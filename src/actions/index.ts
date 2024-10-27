"use server";

import { connectToDatabase } from "@/configs/mongoose";
import productModel from "@/models/product.model";
import { cookies } from "next/headers";

export const getProducts = async () => {
  cookies(); //added because its prevent caching by default
  await connectToDatabase();

  const result = await productModel.find();
  console.log(result);

  return Math.floor(Math.random() * 100) + 1;
};
