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
  name: z.string().min(1, "name is required"),
  quantity: z
    .number({
      invalid_type_error: "quantity must be a number", // Custom error for invalid type
    })
    .min(1, "quantity is required"),
  roastLevel: z.string().min(1, "roast level is required"),
  origin: z.string().min(1, "origin is required"),
  variety: z.string().min(1, "variety is required"),
  processingMethod: z.string().min(1, "processing method is required"),
  flavourNotes: z.string().min(1, "flavour notes are required"),
  roastDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  purchasedFrom: z.string().min(1, "purchased from is required"),
  price: z
    .number({
      invalid_type_error: "price must be a number", // Custom error for invalid type
    })
    .min(0, "price must be a positive number"),
});

export default function CoffeeBeanForm(
  {
    action,
    coffeeBean,
    userId,
  }: { action: "create" | "edit"; coffeeBean?: CoffeeBean; userId: string } = {
    action: "create",
    coffeeBean: undefined,
    userId: "",
  }
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
            label: "name",
            type: "text",
            placeholder: "coffee bean name",
          },
          {
            name: "quantity",
            label: "quantity",
            type: "number",
            placeholder: "quantity in grams",
          },
          {
            name: "roastLevel",
            label: "roast level",
            type: "text",
            placeholder: "roast level",
          },
          {
            name: "origin",
            label: "origin",
            type: "text",
            placeholder: "origin",
          },
          {
            name: "variety",
            label: "variety",
            type: "text",
            placeholder: "variety",
          },
          {
            name: "processingMethod",
            label: "processing method",
            type: "text",
            placeholder: "processing method",
          },
          {
            name: "flavourNotes",
            label: "flavour notes",
            type: "text",
            placeholder: "flavour notes (comma separated)",
          },
          {
            name: "roastDate",
            label: "roast date",
            type: "date",
            placeholder: "",
          },
          {
            name: "purchasedFrom",
            label: "purchased from",
            type: "text",
            placeholder: "purchased from",
          },
          {
            name: "price",
            label: "price",
            type: "number",
            placeholder: "price",
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
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(
                        type === "number" ? (value === "" ? "" : value) : value
                      ); // Allow incomplete decimals
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">
          {action === "edit" ? "update coffee bean" : "create coffee bean"}
        </Button>
      </form>
    </Form>
  );
}
