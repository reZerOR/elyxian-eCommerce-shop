import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    description: { type: String },
    sizes: [
      {
        _id: false,
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    thisIsFor: [{ type: String, _id: false }],
    categories: [{ type: String, _id: false }],
    images: [{ type: String, _id: false }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
