"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrew, updateBrew } from "@/actions/brewsController";
import { Brew, CoffeeBean, Grinder, BrewMethod } from "@prisma/client";

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

const brewSchema = z.object({
  coffeeBeanId: z.number().int().positive("Coffee bean is required"),
  coffeeAmount: z.number().min(1, "Coffee amount is required"),
  waterAmount: z.number().min(1, "Water amount is required"),
  grinderId: z.number().int().positive("Grinder is required"),
  grindSetting: z.string().min(1, "Grind setting is required"),
  brewMethodId: z.number().int().positive("BrewMethod is required"),
  brewTime: z.number().int().min(1, "Brew time is required"),
  notes: z.string(),
});

export default function BrewForm({
  action,
  brew,
  coffeeBeans,
  grinders,
  brewMethods,
  userId,
}: {
  action: "create" | "edit";
  brew?: Brew;
  coffeeBeans?: CoffeeBean[];
  grinders?: Grinder[];
  brewMethods?: BrewMethod[];
  userId: string;
}) {
  if (action !== "create" && action !== "edit") {
    throw new Error("Invalid action");
  }
  console.log("brewmethods", brewMethods);
  const form = useForm<z.infer<typeof brewSchema>>({
    resolver: zodResolver(brewSchema),
    defaultValues: brew
      ? {
          ...brew,
          coffeeBeanId: brew.coffeeBeanId ?? coffeeBeans?.[0]?.id ?? 0,
          grinderId: brew.grinderId ?? grinders?.[0]?.id ?? 0,
          brewMethodId: brew.brewMethodId ?? brewMethods?.[0]?.id ?? 0,
        }
      : {
        coffeeBeanId: coffeeBeans?.[0]?.id ?? 0, // Default to first coffeeBeanId or 0
        grinderId: grinders?.[0]?.id ?? 0, // Default to first grinderId or 0
        brewMethodId: brewMethods?.[0]?.id ?? 0, // Default to first brewMethodId or 0
        coffeeAmount: 0,
        waterAmount: 0,
        grindSetting: "",
        brewTime: 0,
        notes: "",
        },
  });

  async function onSubmit(data: z.infer<typeof brewSchema>) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    if (action === "create") {
      console.log("Creating brew with data:", data);
      await createBrew(formData, userId);
    } else if (action === "edit" && brew) {
      await updateBrew(brew.id, formData, userId);
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
            name: "coffeeBeanId",
            label: "Coffee Bean",
            type: "number",
            placeholder: "Choose Coffee Bean",
          },
          {
            name: "coffeeAmount",
            label: "Coffee Amount (g)",
            type: "number",
            placeholder: "Enter Coffee Amount",
          },
          {
            name: "waterAmount",
            label: "Water Amount (ml)",
            type: "number",
            placeholder: "Enter Water Amount",
          },
          {
            name: "grinderId",
            label: "Grinder",
            type: "number",
            placeholder: "Choose Grinder",
          },
          {
            name: "grindSetting",
            label: "Grind Setting",
            type: "text",
            placeholder: "Enter Grind Setting",
          },
          {
            name: "brewMethodId",
            label: "Brew Method",
            type: "text",
            placeholder: "Choose Brew",
          },
          {
            name: "brewTime",
            label: "Brew Time (seconds)",
            type: "number",
            placeholder: "Enter Brew Time",
          },
          {
            name: "notes",
            label: "Notes",
            type: "text",
            placeholder: "Enter any notes",
          },
        ].map(({ name, label, type, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof z.infer<typeof brewSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  {name === "coffeeBeanId" && coffeeBeans ? (
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="" disabled>
                        Select Coffee Bean
                      </option>
                      {coffeeBeans.map((bean) => (
                        <option key={bean.id} value={bean.id}>
                          {bean.name}
                        </option>
                      ))}
                    </select>
                  ) : name === "grinderId" && grinders ? (
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="" disabled>
                        Select Grinder
                      </option>
                      {grinders.map((grinder) => (
                        <option key={grinder.id} value={grinder.id}>
                          {grinder.name}
                        </option>
                      ))}
                    </select>
                  ) : name === "brewMethodId" && brewMethods ? (
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      <option value="" disabled>
                        Select Brew Method
                      </option>
                      {brewMethods.map((brewMethod) => (
                        <option key={brewMethod.id} value={brewMethod.id}>
                          {brewMethod.name}
                        </option>
                      ))}
                    </select>
                  ) : (
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
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">
          {action === "edit" ? "Update Brew" : "Create Brew"}
        </Button>
      </form>
    </Form>
  );
}
