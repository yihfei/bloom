
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
  userId: string;
  brewNumber: number;
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
  userId,
  brewNumber,
}: BrewCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brew #{brewNumber}</CardTitle>
        <CardDescription>
          Created at: {createdAt.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>coffee bean: {coffeeBeanName}</p>
        <p>coffee amount: {coffeeAmount}g</p>
        <p>water amount: {waterAmount}ml</p>
        <p>grinder: {grinderName}</p>
        <p>grind setting: {grindSetting}</p>
        <p>brew method: {brewMethod}</p>
        <p>brew time: {brewTime} seconds</p>
        <p>notes: {notes}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button>
          <Link href={`/brews/edit/${id}`}>edit</Link>
        </Button>
        <form action={deleteBrew}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="userId" value={userId} />
          <Button type="submit" variant="destructive">
            delete
          </Button>
        </form>
      </CardFooter>    </Card>
  );
}
