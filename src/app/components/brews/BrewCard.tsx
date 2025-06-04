
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteBrew } from "@/actions/brewsController";
import { Button } from "@/components/ui/button";

type BrewCardProps = {
  id: number;
  coffeeBeanName: string;
  coffeeAmount: number;
  waterAmount: number;
  grinderName: string;
  grindSetting: string;
  brewMethod: string;
  brewTime: number;
  notes: string | null;
  createdAt: Date;
  updatedAt?: Date;
};

export default function BrewCard({
  id,
  coffeeBeanName,
  coffeeAmount,
  waterAmount,
  grinderName,
  grindSetting,
  brewMethod,
  brewTime,
  notes,
  createdAt,
}: BrewCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brew #{id}</CardTitle>
        <CardDescription>
          Created at: {createdAt.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Coffee Bean: {coffeeBeanName}</p>
        <p>Coffee Amount: {coffeeAmount}g</p>
        <p>Water Amount: {waterAmount}ml</p>
        <p>Grinder ID: {grinderName}</p>
        <p>Grind Setting: {grindSetting}</p>
        <p>Brew Method: {brewMethod}</p>
        <p>Brew Time: {brewTime} seconds</p>
        <p>Notes: {notes}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button>
          <Link href={`/brews/edit/${id}`}>Edit</Link>
        </Button>
        <form action={deleteBrew}>
          <input type="hidden" name="id" value={id} />
          <Button type="submit" variant="destructive">
            Delete
          </Button>
        </form>
      </CardFooter>    </Card>
  );
}
