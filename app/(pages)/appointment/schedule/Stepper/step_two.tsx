import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AppointmentForm } from "@/domain/appointment";
import { Provider } from "@/domain/provider";
import { cn } from "@/lib/utils";
import { providerFetcher } from "@/services/provider";
import { categoryFetcher, specialityFetcher } from "@/services/speciality";
import { useQuery } from "@tanstack/react-query";

export default function StepTwo({
    onChange,
    data,
}: {
    data: AppointmentForm;
    onChange: (property: keyof AppointmentForm, value: any) => void;
}) {
    const categories = useQuery({
        queryKey: ["speciality/category"],
        queryFn: categoryFetcher,
    });

    const specialities = useQuery({
        queryKey: ["speciality", data.category],
        queryFn: () => specialityFetcher(data.category),
        enabled: !!data.category,
    });

    const providers = useQuery({
        queryKey: ["provider", data.speciality],
        queryFn: () => providerFetcher(data.speciality),
        enabled: !!data.speciality,
    });

    function handleCategoryChange(value: string) {
        onChange("category", value);
    }

    function handleSpecialityChange(value: string) {
        onChange("speciality", String(value));
    }

    function handleSelectProvider(provider: Provider) {
        onChange("provider", provider.userId);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold">Book Your Appointment</h1>
                <p>Find the right provider for your needs.</p>
            </div>
            <div className="grid gap-4 ">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Select
                        value={data.category}
                        onValueChange={handleCategoryChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.data?.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={data.speciality}
                        onValueChange={handleSpecialityChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                        <SelectContent>
                            {specialities.data?.map((speciality) => (
                                <SelectItem
                                    key={speciality.name}
                                    value={speciality.id.toString()}
                                >
                                    {speciality.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {providers.data?.map((provider, index) => (
                        <Card
                            key={index}
                            className={cn(
                                "p-4 space-y-2 cursor-pointer",
                                data.provider === provider.userId
                                    ? "bg-slate-100"
                                    : ""
                            )}
                            onClick={() => handleSelectProvider(provider)}
                        >
                            <div className="font-semibold">
                                Dr. {provider.name.givenName}{" "}
                                {provider.name.familyName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {provider.specialities
                                    .map((speciality) => speciality.name)
                                    .join(",")}
                            </div>
                            <p className="text-sm">
                                Dr. {provider.name.givenName}{" "}
                                {provider.name.familyName} is a board-certified{" "}
                                {provider.specialities
                                    .map((speciality) => speciality.name)
                                    .join(",")}{" "}
                                with over 10 years of experience.
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
