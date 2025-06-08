"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGrinder, updateGrinder } from "@/actions/grindersController";
import { Grinder } from "@prisma/client";

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

const grinderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
});

export default function GrinderForm({
  action,
  grinder,
  userId,
}: {
  action: "create" | "edit";
  grinder?: Grinder;
  userId: string;
}) {
  if (action !== "create" && action !== "edit") {
    throw new Error("Invalid action");
  }
  const form = useForm<z.infer<typeof grinderSchema>>({
    resolver: zodResolver(grinderSchema),
    defaultValues: grinder
      ? {
          ...grinder,
        }
      : {
          name: "",
          price: 0,
        },
  });

  async function onSubmit(data: z.infer<typeof grinderSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (action === "create") {
      await createGrinder(formData, userId);
    } else {
      await updateGrinder(grinder!.id, formData, userId);
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
            placeholder: "Enter grinder name",
          },
          {
            name: "price",
            label: "Price",
            type: "number",
            placeholder: "Enter grinder price",
          },
        ].map(({ name, label, type, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof z.infer<typeof grinderSchema>}
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
                          e.target.value === "" ? undefined : parseFloat(e.target.value) // Handle empty input
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
          {action === "create" ? "Create" : "Update"} Grinder
        </Button>
      </form>
    </Form>
  );
}
