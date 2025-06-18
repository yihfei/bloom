import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { deleteBrewMethod } from "@/actions/brewMethodsController";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BrewMethodProps = {
  id: number;
  name: string;
  price: number;
  userId: string;
};

export default function BrewMethodCard({
  id,
  name,
  price,
  userId,
}: BrewMethodProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Price: ${price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Additional content can go here.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button>
          <Link href={`/brew-methods/edit/${id}`}>Edit</Link>
        </Button>
        <form action={deleteBrewMethod}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="userId" value={userId} />
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}