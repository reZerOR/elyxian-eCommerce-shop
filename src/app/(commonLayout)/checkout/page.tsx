"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/store/useCart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts } from "bd-geojs";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().regex(/^01\d{9}$/, {
    message: "Phone number must start with '01' and be 11 digits long.",
  }),

  email: z.string().email({ message: "Invalid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  notes: z.string().optional(),
  deliveryOption: z.enum(["cashOnDelivery"]),
  deliveryCharge: z.enum(["60", "120"]),
});

export type TCustomerDetails = z.infer<typeof formSchema>;

export default function CheckoutPage() {
  const { cart, clearCart, calculateTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TCustomerDetails>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      notes: "",
      deliveryOption: "cashOnDelivery",
      deliveryCharge: "60",
    },
  });

  const subtotal = calculateTotal();
  const deliveryCharge = form.watch("deliveryCharge") === "60" ? 60 : 120;
  const total = subtotal + deliveryCharge;

  async function onSubmit(values: TCustomerDetails) {
    setIsSubmitting(true);

    console.log(values);
    console.log(cart);
    const customerDetails = {
      ...values,
    };
    const productDetails = cart;

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerDetails,
          productDetails,
          total,
        }),
      });

      const data = await response.json();
      if (data.data) {
        form.reset();
        clearCart();
        toast.success("Order placed successfully!");
      }
    } catch (error) {
      toast.error("Error placing order");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-2/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="01XXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Give your address..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((item) => (
                          <SelectItem key={item.name} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special instructions..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryOption"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Delivery Option</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cashOnDelivery" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Cash on Delivery
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryCharge"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Delivery Charge</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="60" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Chittagong (60 Tk)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="120" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Outside Chittagong (120 Tk)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={`${item._id}-${item.selectedSize}`}
                    className="flex justify-between"
                  >
                    <span>
                      {item.title} ({item.selectedSize}) x{item.quantity}
                    </span>
                    <span>৳{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 font-bold border-t">
                  <span>Total</span>
                  <span>৳{total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
