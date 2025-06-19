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
  description?: string | null;
};

export default function BrewMethodCard({
  id,
  name,
  price,
  userId,
  description,
}: BrewMethodProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>price: ${price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button>
          <Link href={`/brew-methods/edit/${id}`}>edit</Link>
        </Button>
        <form action={deleteBrewMethod}>
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
