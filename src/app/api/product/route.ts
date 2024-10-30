import { connectToDatabase } from "@/configs/mongoose";
import { ProductModel, TProduct } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectToDatabase();
  const productData: Omit<TProduct, "isDeleted"> = await req.json();
  try {
    const result = await ProductModel.create(productData);
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: (error as Error).message });
  }
}
