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
import { Textarea } from "@/components/ui/textarea";
import { Minus, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import MultiSelectorInput from "@/components/form/MultiSelectorInput";
import CustomInput from "@/components/form/CustomInput";
import Container from "@/components/common/Container";
import { categories, genderOptions } from "@/lib/variables";
import { productSchema } from "@/lib/FormValidations";

type FormValues = z.infer<typeof productSchema>;

const DeleteButton = ({ deleteFun }: { deleteFun: () => void }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => deleteFun()}
    >
      <Trash className="text-red-500" />
    </Button>
  );
};
const AddButton = ({ addFun, text }: { addFun: () => void; text: string }) => {
  return (
    <Button
      type="button"
      onClick={() => addFun()}
      variant="outline"
      className="w-full"
      size="default"
    >
      <Plus className="h-4 w-4 mr-2" />{" "}{text}
    </Button>
  );
};

export default function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(productSchema),
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

  function onSubmit(values: FormValues) {
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
          <CustomInput
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
              <CustomInput
                control={form.control}
                label="Price"
                name="price"
                placeholder="e,g 1450"
                type="number"
              />
            </div>

            <div className="col-span-6">
              <CustomInput
                control={form.control}
                label="Compare Price"
                name="comparePrice"
                placeholder="Price to compare"
                type="number"
              />
            </div>
          </div>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2">
              <div className="flex-1">
                <CustomInput
                  control={form.control}
                  name={`sizeQuantities.${index}.size`}
                  htmlFor={`size-${index}`}
                  placeholder="e.g., S, M, L"
                  label="Size"
                />
              </div>
              <div className="flex-1">
                <CustomInput
                  control={form.control}
                  name={`sizeQuantities.${index}.quantity`}
                  htmlFor={`quantity-${index}`}
                  placeholder="Add quantity"
                  type="number"
                  label="Quantity"
                />
              </div>
              {index > 0 && (
                <DeleteButton deleteFun={() => removeSize(index)} />
              )}
            </div>
          ))}
          <AddButton
            text="Add Size"
            addFun={() => appendSize({ size: "", quantity: 0 })}
          />
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-2">
              <div className="flex-1">
                <CustomInput
                  control={form.control}
                  name={`images.${index}.img`}
                  htmlFor={`image-${index}`}
                  placeholder="e,g https://image.url"
                  label="Image"
                />
              </div>

              {index > 0 && (
                <DeleteButton deleteFun={() => removeImage(index)} />
              )}
            </div>
          ))}
          <AddButton addFun={() => appendImage({ img: "" })} text="Add Image" />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Container>
  );
}
