import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.model";

export interface TOrder {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  deliveryOptions: string;
  deliveryCharge: number;
  total: number;
  products: {
    productId: string | TProduct;
    selectedSize: string;
    quantity: number;
    buyingPrice: number;
  }[];
  discount?: number;
  status:
    | "pending"
    | "confirmed"
    | "in delivery"
    | "completed"
    | "returned"
    | "exchange";
  coupon?: string;
  createdAt?: string;
  updatedAt?: string;
}

const orderSchema = new Schema<TOrder>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    deliveryOptions: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedSize: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        buyingPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    discount: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in delivery",
        "completed",
        "returned",
        "exchange",
      ],
      default: "pending",
      required: true,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
