import { TCustomerDetails } from "@/app/(commonLayout)/checkout/page";
import { auth } from "@/auth";
import { connectToDatabase } from "@/configs/mongoose";
import { OrderModel } from "@/models/order.model";
import { TCartProduct } from "@/store/useCart";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    customerDetails,
    productDetails,
    total,
  }: {
    customerDetails: TCustomerDetails;
    productDetails: TCartProduct[];
    total: number;
  } = await request.json();
  const userData = await auth();
  const user: any = {};
  if (userData?.user) {
    user.userId = userData.user.id;
  }

  const productTotal =
    productDetails.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    ) + Number(customerDetails.deliveryCharge);
  if (productTotal !== total) {
    return Response.json(
      {
        message: "Total price mismatch",
      },
      { status: 400 }
    );
  }
  const products = productDetails.map((product) => ({
    productId: product._id,
    selectedSize: product.selectedSize,
    quantity: product.quantity,
    buyingPrice: product.price,
  }));
  const order = {
    ...customerDetails,
    products,
    total,
    status: "pending",
    ...user,
  };
  await connectToDatabase();
  try {
    const orderToDb = await OrderModel.create(order);
    return Response.json(
      {
        message: "Order created successfully",
        data: orderToDb,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Order creation failed",
      },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const userData = await auth();
    if (userData?.user?.role !== "admin") {
      return Response.json(
        {
          message: "Unauthorized",
        },
        { status: 403 }
      );
    }
    await connectToDatabase();

    const orders = await OrderModel.find({})
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .sort({ createdAt: -1 });

    return Response.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
