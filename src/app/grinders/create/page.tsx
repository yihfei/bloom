import GrinderForm from "@/app/components/GrinderForm";

export default function CreateGrinderPage() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <GrinderForm action="create"/>
        </div>
    );
}