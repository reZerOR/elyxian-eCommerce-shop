import { connectToDatabase } from "@/configs/mongoose";
import { ProductModel, TProduct } from "@/models/product.model";
import { cookies } from "next/headers";
import { NextRequest} from "next/server";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
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
export async function GET(req: NextRequest) {
  cookies()
  const searchParams = req.nextUrl.searchParams
  const limit = searchParams.get('limit')
  console.log(limit);
  
  await connectToDatabase();
  try {
    const result = await ProductModel.find({ isDeleted: false }).sort().limit(Number(limit))
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({
      success: false,
      message: (error as any).message || "something went wrong",
    });
  }
}
