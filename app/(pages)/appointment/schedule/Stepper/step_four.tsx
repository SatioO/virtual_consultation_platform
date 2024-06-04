import { AppointmentForm } from "@/domain/appointment";

export default function StepFour({
    onChange,
    data,
}: {
    data: AppointmentForm;
    onChange: (property: keyof AppointmentForm, value: any) => void;
}) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold">Book Your Appointment</h1>
                <p>Find the right provider for your needs.</p>
            </div>
        </div>
    );
}
