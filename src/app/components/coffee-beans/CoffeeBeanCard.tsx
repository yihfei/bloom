"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteCoffeeBean } from "@/actions/coffeeBeansController";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  userId: string;
};

export default function CoffeeBeanCard({
  id,
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
  userId
}: CoffeeBeanProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{purchasedFrom}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>quantity: {quantity}g</p>
        <p>roast level: {roastLevel}</p>
        <p>origin: {origin}</p>
        <p>variety: {variety}</p>
        <p>processing method: {processingMethod}</p>
        <div className="flex flex-wrap gap-2">
          flavour notes:
          {flavourNotes.map((note, idx) => (
            <Badge key={idx} variant="outline">
              {note}
            </Badge>
          ))}
        </div>
        <p>roast date: {roastDate.toDateString()}</p>
        {/* <p>Purchased From: {purchasedFrom}</p> */}
        <p>price: ${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button>
          <Link href={`/coffee-beans/edit/${id}`}>edit</Link>
        </Button>
        <form action={deleteCoffeeBean}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="userId" value={userId} />
          <Button type="submit" variant="destructive">
            delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
