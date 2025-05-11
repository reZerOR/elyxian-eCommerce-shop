import { type NextRequest, NextResponse } from "next/server";
import { OrderModel } from "@/models/order.model";
import { connectToDatabase } from "@/configs/mongoose";

// Connect to MongoDB
// GET a single order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const order = await OrderModel.findById(params.id).populate({
      path: "products.productId",
      model: "Product",
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// UPDATE an order
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE an order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const deletedOrder = await OrderModel.findByIdAndDelete(params.id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
