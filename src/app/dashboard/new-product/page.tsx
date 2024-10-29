"use client";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Option } from "@/components/ui/multi-select";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import MultiSelectorInput from "@/components/form/MultiSelectorInput";
import AnyTypeInput from "@/components/form/AnyTypeInput";
import Container from "@/components/common/Container";

const sizeQuantitySchema = z.object({
  size: z.string().trim().min(1, "Size is required"),
  quantity: z.number().int().positive("Quantity must be a positive number"),
});

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

const img = z.object({
  img: z.string().regex(urlRegex, { message: "Please enter a valid URL" }),
});

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  categories: z.array(z.string()).nonempty(),
  thisIsFor: z.array(z.string()).nonempty(),
  price: z.number().min(0),
  comparePrice: z.number().min(0),
  images: z.array(img).min(1, "At least one image is required"),
  sizeQuantities: z
    .array(sizeQuantitySchema)
    .min(1, "At least one size-quantity pair is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      thisIsFor: [],
      sizeQuantities: [{ size: "", quantity: 0 }],
      images: [{ img: "" }],
    },
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control: form.control,
    name: "sizeQuantities",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray<FormValues>({
    control: form.control,
    name: "images",
  });

  console.log("rendered");

  const categories: Option[] = [
    { label: "Sneakers", value: "Sneakers" },
    { label: "Slides", value: "Slides" },
    { label: "Formal", value: "Formal" },
    { label: "Keds", value: "Keds" },
    { label: "Boots", value: "Boots" },
    { label: "Sports", value: "Sports" },
    { label: "Accessories", value: "Accessories" },
    { label: "Loafers", value: "Loafers" },
    { label: "Sandals", value: "Sandals" },
    { label: "Casual", value: "Casual" },
    { label: "Other", value: "Other" },
  ];

  const genderOptions: Option[] = [
    { label: "Men", value: "Men" },
    { label: "Women", value: "Women" },
    { label: "Boys", value: "Boys" },
    { label: "Girls", value: "Girls" },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Container>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <AnyTypeInput
            control={form.control}
            name="title"
            placeholder="Sneaker etc."
            label="Product Name"
            type="text"
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Product Details"
                    className="min-h-40"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <MultiSelectorInput
                control={form.control}
                name="categories"
                placeholder="Select categories"
                options={categories}
                label="Categories"
              />
            </div>

            <div className="col-span-6">
              <MultiSelectorInput
                control={form.control}
                name="thisIsFor"
                placeholder="Men, Women etc"
                options={genderOptions}
                label="This is for"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1450"
                        type="number"
                        value={value || ""} // This is the key fix
                        onChange={(event) =>
                          onChange(event.target.valueAsNumber || 0)
                        }
                        {...field}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="comparePrice"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Compare Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price to compare"
                        type="number"
                        value={value || ""} // This is the key fix
                        onChange={(event) =>
                          onChange(event.target.valueAsNumber || 0)
                        }
                        {...field}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2">
              <FormField
                control={form.control}
                name={`sizeQuantities.${index}.size`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={`size-${index}`}>Size</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id={`size-${index}`}
                        placeholder="e.g., S, M, L"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`sizeQuantities.${index}.quantity`}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={`quantity-${index}`}>
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id={`quantity-${index}`}
                        type="number"
                        placeholder="Add quantity"
                        value={value || ""}
                        onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSize(index)}
                  aria-label="Remove size"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendSize({ size: "", quantity: 0 })}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Size
          </Button>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2">
              <FormField
                control={form.control}
                name={`images.${index}.img`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={`image-${index}`}>
                      Image URL {index + 1}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id={`image-${index}`}
                        placeholder="Enter image URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImage(index)}
                  aria-label="Remove image"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendImage({ img: "" })}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Image
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
}
