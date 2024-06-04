import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { AppointmentForm } from "@/domain/appointment";
import { Slot } from "@/domain/provider";
import { cn } from "@/lib/utils";
import { slotsFetcher } from "@/services/provider";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useState } from "react";

export default function StepThree({
    onChange,
    data,
}: {
    data: AppointmentForm;
    onChange: (property: keyof AppointmentForm, value: any) => void;
}) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const availableSlots = useQuery({
        queryKey: ["provider/slots", selectedDate],
        queryFn: () =>
            slotsFetcher(
                data.provider,
                formatInTimeZone(
                    selectedDate,
                    "UTC",
                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                )
            ),
    });

    function handleDateChange(date: Date | undefined) {
        if (date) setSelectedDate(date);
    }

    function handleSlotSelect(slot: Slot) {
        onChange("slot", slot.startDateTime);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold">Book Your Appointment</h1>
                <p>Find the right provider for your needs.</p>
            </div>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Book an Appointment
                        </h2>
                        <Calendar
                            mode="single"
                            fromDate={new Date()}
                            selected={selectedDate}
                            onSelect={handleDateChange}
                            className="rounded-md border"
                        />
                    </div>
                    {availableSlots.data && (
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <h2 className="text-xl font-semibold">
                                    Available Time Slots
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Select a time slot to book your appointment.
                                </p>
                            </div>

                            {availableSlots.data.length > 0 ? (
                                <div className="grid sm:grid-cols-2 md:grid-cols-1 justify-center items-center lg:grid-cols-2 gap-4 max-h-72 overflow-x-auto bg-slate-100 p-4">
                                    {availableSlots.data.map((slot, index) => (
                                        <Button
                                            key={index}
                                            variant={
                                                slot.available
                                                    ? "outline"
                                                    : "ghost"
                                            }
                                            disabled={!slot.available}
                                            onClick={() =>
                                                handleSlotSelect(slot)
                                            }
                                            className={cn(
                                                "justify-center",
                                                data.slot === slot.startDateTime
                                                    ? "bg-slate-200"
                                                    : "bg-white",
                                                data.slot === slot.startDateTime
                                                    ? "border-gray-600"
                                                    : "border-1"
                                            )}
                                        >
                                            {format(
                                                slot.startDateTime,
                                                "HH:mm a"
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 max-h-72 overflow-x-auto bg-slate-100 p-4">
                                    <p>No slots available</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
