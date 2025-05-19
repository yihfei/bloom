"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCoffeeBean } from "@/actions/coffeeBeansController";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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

export default function CoffeeBeanForm() {
    const form = useForm<z.infer<typeof coffeeBeanSchema>>({
        resolver: zodResolver(coffeeBeanSchema),
        defaultValues: {
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
        formData.append("name", data.name);
        formData.append("quantity", data.quantity.toString());
        formData.append("roastLevel", data.roastLevel);
        formData.append("origin", data.origin);
        formData.append("variety", data.variety);
        formData.append("processingMethod", data.processingMethod);
        formData.append("flavourNotes", data.flavourNotes);
        formData.append("roastDate", data.roastDate);
        formData.append("purchasedFrom", data.purchasedFrom);
        formData.append("price", data.price.toString());

        await createCoffeeBean(formData);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Coffee Bean Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input className="w-full" type="number" placeholder="Quantity in grams" {...field} 
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="roastLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Roast Level</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Roast Level" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Origin</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Origin" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="variety"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Variety</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Variety" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="processingMethod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Processing Method</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Processing Method" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="flavourNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Flavour Notes</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Flavour Notes (comma separated)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="roastDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Roast Date</FormLabel>
                            <FormControl>
                                <Input className="w-full" type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="purchasedFrom"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Purchased From</FormLabel>
                            <FormControl>
                                <Input className="w-full" placeholder="Purchased From" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input className="w-full" type="number" placeholder="Price" {...field} 
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Create Coffee Bean</Button>
            </form>
        </Form>
    );
}
