'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/useCart";
import { CartItem } from "./cartItem";
import { ShoppingCart } from "lucide-react";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import Link from "next/link";

export function CartSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, clearCart, calculateTotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingCart />
          <span className="absolute flex items-center justify-center text-xs text-white bg-red-500 rounded-full -right-2 -top-1 size-5">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[300px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6 h-[calc(100dvh-250px)] -mx-6">
              {cart.map((item) => (
                <CartItem
                  key={`${item._id}-${item.selectedSize}`}
                  item={item}
                />
              ))}
              <Scrollbar orientation="vertical" />
            </ScrollArea>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">
                  Tk {calculateTotal().toFixed(2)}
                </span>
              </div>
              <Link href={"/checkout"}>
                <Button
                  className="w-full"
                  onClick={() => {
                    // Implement checkout logic here
                    console.log("Proceeding to checkout");
                  }}
                >
                  Checkout
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  clearCart();
                  setIsOpen(false);
                }}
              >
                Clear Cart
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button
              variant="link"
              onClick={() => setIsOpen(false)}
              className="mt-4"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
