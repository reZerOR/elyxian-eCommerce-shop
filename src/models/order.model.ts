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
