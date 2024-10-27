"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  categories: z.array(z.string()).nonempty(),
  thisIsFor: z.array(z.string()).nonempty(),
  price: z.number().min(0),
  comparePrice: z.number().min(0),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      thisIsFor: [],
    },
  });
  console.log('rendered');
  

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
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      options={OPTIONS}
                      placeholder="Select Categories"
                      defaultOptions={OPTIONS}
                      value={field.value?.map(
                        (value) =>
                          OPTIONS.find((opt) => opt.value === value) || {
                            value,
                            label: value,
                          }
                      )}
                      onChange={(options) =>
                        field.onChange(options.map((option) => option.value))
                      }
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
              name="thisIsFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>This is for</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      options={OPTIONS}
                      placeholder="Select Categories"
                      defaultOptions={OPTIONS}
                      value={field.value?.map(
                        (value) =>
                          OPTIONS.find((opt) => opt.value === value) || {
                            value,
                            label: value,
                          }
                      )}
                      onChange={(options) =>
                        field.onChange(options.map((option) => option.value))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
