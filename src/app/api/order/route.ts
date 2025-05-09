import { TCustomerDetails } from "@/app/(commonLayout)/checkout/page";
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
  return Response.json(
    {
      message: "Order created successfully",
    },
    { status: 201 }
  );
}
