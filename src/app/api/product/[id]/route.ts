import { connectToDatabase } from "@/configs/mongoose";
import { ProductModel } from "@/models/product.model";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, props:{params: Promise<{id: string}>}) {
  const params = await props.params;
  await connectToDatabase();
  try {
    const result = await ProductModel.findById(params.id, { isDeleted: false })
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({
      success: false,
      message: (error as any).message || "something went wrong",
    });
  }
}