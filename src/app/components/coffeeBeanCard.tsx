"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Badge } from "@/components/ui/badge"


  type CoffeeBeanProps = {
    id: number;
    name: string;
    quantity: number;
    roastLevel: string;
    origin: string;
    variety: string;
    processingMethod: string;
    flavourNotes: string[];
    roastDate: Date;
    purchasedFrom: string;
    price: number;
  };
  
  export default function CoffeeBeanCard({
    name,
    quantity,
    roastLevel,
    origin,
    variety,
    processingMethod,
    flavourNotes,
    roastDate,
    purchasedFrom,
    price,
  }: CoffeeBeanProps) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{origin}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Quantity: {quantity}g</p>
          <p>Roast Level: {roastLevel}</p>
          <p>Origin: {origin}</p>
          <p>Variety: {variety}</p>
          <p>Processing Method: {processingMethod}</p>
          <div className="flex flex-wrap gap-2">
            Flavour Notes:{flavourNotes.map((note, idx) => (
              <Badge key={idx} variant="outline">
                {note}
              </Badge>
            ))}
          </div>         
          <p>Roast Date: {roastDate.toDateString()}</p>
          <p>Purchased From: {purchasedFrom}</p>
          <p>Price: ${price.toFixed(2)}</p>

        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    )
  }