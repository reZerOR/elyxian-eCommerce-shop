import { TProduct } from "@/models/product.model";
import { create } from "zustand";

export interface TCartProduct extends TProduct {
  selectedSize: string;
  quantity: number;
}

interface CartState {
  cart: TCartProduct[];
  addToCart: (product: TProduct, size: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  addOne: (productId: string, size: string) => void;
  removeOne: (productId: string, size: string) => void;
}

export const useCart = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (product, size, quantity) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item._id === product._id && item.selectedSize === size
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += quantity;
        return { cart: updatedCart };
      }

      const newProduct: TCartProduct = {
        ...product,
        selectedSize: size,
        quantity,
      };

      return { cart: [...state.cart, newProduct] };
    }),
  removeFromCart: (productId, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item._id === productId && item.selectedSize === size)
      ),
    })),
  clearCart: () => set({ cart: [] }),
  calculateTotal: () => {
    return get().cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
  addOne: (productId, size) =>
    set((state) => {
      const updatedCart = state.cart.map((item) => {
        if (item._id === productId && item.selectedSize === size) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { cart: updatedCart };
    }),
  removeOne: (productId, size) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) => {
          if (item._id === productId && item.selectedSize === size) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return { cart: updatedCart };
    }),
}));
