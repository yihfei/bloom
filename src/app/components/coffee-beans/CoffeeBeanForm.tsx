"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCoffeeBean,
  updateCoffeeBean,
} from "@/actions/coffeeBeansController";
import { CoffeeBean } from "@prisma/client";

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

const coffeeBeanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(1, "Quantity is required"),
  roastLevel: z.string().min(1, "Roast level is required"),
  origin: z.string().min(1, "Origin is required"),
  variety: z.string().min(1, "Variety is required"),
  processingMethod: z.string().min(1, "Processing method is required"),
  flavourNotes: z.string().min(1, "Flavour notes are required"),
  roastDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  purchasedFrom: z.string().min(1, "Purchased from is required"),
  price: z.number().min(0, "Price must be a positive number"),
});

export default function CoffeeBeanForm(
  {
    action,
    coffeeBean,
    userId
  }: { action: "create" | "edit"; coffeeBean?: CoffeeBean; userId: string } = { action: "create", coffeeBean: undefined, userId: "" }
  
) {
  if (action !== "create" && action !== "edit") {
    throw new Error("Invalid action");
  }

  const form = useForm<z.infer<typeof coffeeBeanSchema>>({
    resolver: zodResolver(coffeeBeanSchema),
    defaultValues: coffeeBean
      ? {
          ...coffeeBean,
          roastDate: new Date(coffeeBean.roastDate).toISOString().split("T")[0],
          flavourNotes: coffeeBean.flavourNotes.join(", "),
        }
      : {
          name: "",
          quantity: 0,
          roastLevel: "",
          origin: "",
          variety: "",
          processingMethod: "",
          flavourNotes: "",
          roastDate: new Date().toISOString().split("T")[0],
          purchasedFrom: "",
          price: 0,
        },
  });

  async function onSubmit(data: z.infer<typeof coffeeBeanSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    if (action === "create") {
      await createCoffeeBean(formData, userId);
    } else if (action === "edit" && coffeeBean) {
      await updateCoffeeBean(coffeeBean.id, formData, userId);
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-8"
      >
        {[
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Coffee Bean Name",
          },
          {
            name: "quantity",
            label: "Quantity",
            type: "number",
            placeholder: "Quantity in grams",
          },
          {
            name: "roastLevel",
            label: "Roast Level",
            type: "text",
            placeholder: "Roast Level",
          },
          {
            name: "origin",
            label: "Origin",
            type: "text",
            placeholder: "Origin",
          },
          {
            name: "variety",
            label: "Variety",
            type: "text",
            placeholder: "Variety",
          },
          {
            name: "processingMethod",
            label: "Processing Method",
            type: "text",
            placeholder: "Processing Method",
          },
          {
            name: "flavourNotes",
            label: "Flavour Notes",
            type: "text",
            placeholder: "Flavour Notes (comma separated)",
          },
          {
            name: "roastDate",
            label: "Roast Date",
            type: "date",
            placeholder: "",
          },
          {
            name: "purchasedFrom",
            label: "Purchased From",
            type: "text",
            placeholder: "Purchased From",
          },
          {
            name: "price",
            label: "Price",
            type: "number",
            placeholder: "Price",
          },
        ].map(({ name, label, type, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof z.infer<typeof coffeeBeanSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    onChange={(e) =>
                      type === "number"
                        ? field.onChange(parseFloat(e.target.value))
                        : field.onChange(e.target.value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">
          {action === "edit" ? "Update Coffee Bean" : "Create Coffee Bean"}
        </Button>
      </form>
    </Form>
  );
}
