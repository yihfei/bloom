import CoffeeBeanForm from "@/app/components/coffee-beans/CoffeeBeanForm";

export default function CreateCoffeeBeanPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <CoffeeBeanForm action="create" />
    </div>
  );
}
