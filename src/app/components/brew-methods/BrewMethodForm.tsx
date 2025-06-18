"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBrewMethod,
  updateBrewMethod,
} from "@/actions/brewMethodsController";
import { BrewMethod } from "@prisma/client";

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

const brewMethodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number({
      invalid_type_error: "Price must be a number", // Custom error for invalid type
    })
    .min(0, "Price must be a positive number"),
  description: z.string().optional(),
});

export default function BrewMethodForm({
  action,
  brewMethod,
  userId,
}: {
  action: "create" | "edit";
  brewMethod?: BrewMethod;
  userId: string;
}) {
  if (action !== "create" && action !== "edit") {
    throw new Error("Invalid action");
  }

  const form = useForm<z.infer<typeof brewMethodSchema>>({
    resolver: zodResolver(brewMethodSchema),
    defaultValues: brewMethod
      ? {
          ...brewMethod,
          description: brewMethod.description || "",
        }
      : {
          name: "",
          price: 0,
          description: "",
        },
  });

  async function onSubmit(data: z.infer<typeof brewMethodSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    console.log("submit data");
    if (action === "create") {
      await createBrewMethod(formData, userId);
    } else {
      await updateBrewMethod(brewMethod!.id, formData, userId);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {[
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter brew method name",
          },
          {
            name: "price",
            label: "Price",
            type: "number",
            placeholder: "Enter brew method price",
          },
          {
            name: "description",
            label: "Description",
            type: "text",
            placeholder: "Enter brew method description (optional)",
          },
        ].map(({ name, label, type, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof z.infer<typeof brewMethodSchema>}
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
                        ? field.onChange(
                            e.target.value === ""
                              ? ""
                              : parseFloat(e.target.value) // Handle empty input
                          )
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
          {action === "create" ? "Create" : "Update"} Brew Method
        </Button>
      </form>
    </Form>
  );
}
