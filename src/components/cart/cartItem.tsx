import { Button } from "@/components/ui/button";
import { TCartProduct, useCart } from "@/store/useCart";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: TCartProduct;
}

export function CartItem({ item }: CartItemProps) {
  const { addOne, removeOne, removeFromCart } = useCart();

  return (
    <div className="flex flex-col justify-between py-4">
      <div className="flex items-center space-x-4">
        {/* <img src={item.image} alt={item.name} className="object-cover w-16 h-16 rounded" /> */}
        <Image
          src={item.images[0].img}
          width={64}
          height={64}
          alt={item.title}
          className="object-cover w-16 h-16 rounded"
        />
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeOne(item._id, item.selectedSize)}
        >
          <Minus />
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => addOne(item._id, item.selectedSize)}
        >
          <Plus />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600"
          onClick={() => removeFromCart(item._id, item.selectedSize)}
        >
          <Trash2/>
        </Button>
      </div>
    </div>
  );
}
