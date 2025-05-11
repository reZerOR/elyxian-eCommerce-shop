"use server";
import { connectToDatabase } from "@/configs/mongoose";
import { ProductModel, TProduct } from "@/models/product.model";
import { cookies, headers } from "next/headers";

export const getProducts = async () => {
  await cookies(); //added because its prevent caching by default
  await connectToDatabase();

  const result = await ProductModel.find();
  console.log(result);

  return result;
};

export const addProduct = async (payload: Omit<TProduct, "isDeleted" | "_id">) => {
  await connectToDatabase();
  try {
    const result = await ProductModel.create(payload);
    console.log(result);
    const plainResult = {
      ...result.toObject(),
      _id: result._id.toString(), // Convert ObjectId to a string
    };
    return plainResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};
