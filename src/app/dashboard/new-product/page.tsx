"use client";
import { toast } from "sonner";
import {
  Control,
  InternalFieldName,
  useFieldArray,
  useForm,
} from "react-hook-form";
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
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";

const sizeQuantitySchema = z.object({
  size: z.string().trim().min(1, "Size is required"),
  quantity: z.number().int().positive("Quantity must be a positive number"),
});

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  categories: z.array(z.string()).nonempty(),
  thisIsFor: z.array(z.string()).nonempty(),
  price: z.number().min(0),
  comparePrice: z.number().min(0),
  sizeQuantities: z
    .array(sizeQuantitySchema)
    .min(1, "At least one size-quantity pair is required"),
});

interface MultiSelectorInputProps {
  control: Control<any>;
  options: Option[];
  placeholder: string;
  label: string;
  name: InternalFieldName;
}

const MultiSelectorInput: React.FC<MultiSelectorInputProps> = ({
  control,
  options,
  placeholder,
  label,
  name,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultipleSelector
              options={options}
              placeholder={placeholder}
              defaultOptions={options}
              value={field.value?.map(
                (value: string) =>
                  options.find((opt: Option) => opt.value === value) || {
                    value,
                    label: value,
                  }
              )}
              onChange={(options: Option[]) =>
                field.onChange(options.map((option: Option) => option.value))
              }
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      thisIsFor: [],
      sizeQuantities: [{ size: "", quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizeQuantities",
  });

  console.log("rendered");

  const OPTIONS: Option[] = [
    { label: "nextjs", value: "nextjs" },
    { label: "React", value: "react" },
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Angular", value: "angular" },
    { label: "Ember", value: "ember", disable: true },
    { label: "Gatsby", value: "gatsby", disable: true },
    { label: "Astro", value: "astro" },
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Sneaker xyz" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
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
                  className="resize-none"
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
              options={OPTIONS}
              label="Categories"
            />
          </div>

          <div className="col-span-6">
            <MultiSelectorInput
              control={form.control}
              name="thisIsFor"
              placeholder="Choose genders for this item."
              options={OPTIONS}
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
        {fields.map((field, index) => (
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
                  <FormLabel htmlFor={`quantity-${index}`}>Quantity</FormLabel>
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
                onClick={() => remove(index)}
                aria-label="Remove size"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ size: "", quantity: 0 })}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Size
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
