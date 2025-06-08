import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { deleteGrinder } from "@/actions/grindersController";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type GrinderProps = {
  id: number;
  name: string;
  price: number;
  userId: string;
};

export default function GrinderCard({ id, name, price, userId }: GrinderProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Price: ${price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>card content</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button>
          <Link href={`/grinders/edit/${id}`}>Edit</Link>
        </Button>
        <form action={deleteGrinder}>
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
