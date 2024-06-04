"use client";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AppointmentForm } from "@/domain/appointment";
import { categoryFetcher, specialityFetcher } from "@/services/speciality";
import { useQuery } from "@tanstack/react-query";

export default function StepOne({
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

    function handleCategoryChange(value: string) {
        onChange("category", value);
    }

    function handleSpecialityChange(value: string) {
        onChange("speciality", String(value));
    }

    return (
        <div>
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold">Book Your Appointment</h1>
                <p>Find the right provider for your needs.</p>
            </div>
            <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                    <div className="space-y-1">
                        <Label htmlFor="category">Category</Label>
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
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="specialty">Specialty</Label>
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
            </form>
        </div>
    );
}
