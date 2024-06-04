"use client";

import { Button } from "@/components/ui/button";
import { AppointmentForm } from "@/domain/appointment";
import { cn } from "@/lib/utils";
import { StateMachineProvider } from "little-state-machine";
import { useState } from "react";
import StepFour from "./Stepper/step_four";
import StepOne from "./Stepper/step_one";
import StepThree from "./Stepper/step_three";
import StepTwo from "./Stepper/step_two";

export default function ScheduleAppointmentPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [values, setValues] = useState<AppointmentForm>({
        category: "",
        speciality: "",
        provider: 0,
        slot: "",
    });

    function handleChange(key: keyof AppointmentForm, value: any) {
        setValues({ ...values, [key]: value });
    }

    function handleNext() {
        if (currentStep === 1 && values.speciality) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2 && values.provider) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 3 && values.slot) {
            setCurrentStep(currentStep + 1);
        }
    }

    function handlePrevious() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    return (
        <section className="w-full h-[100dvh] flex flex-col items-center justify-center bg-[url('/placeholder.svg')] bg-cover bg-center">
            <div className="bg-white space-y-8 max-w-3xl w-full  dark:bg-gray-900 rounded-xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
                <StateMachineProvider>
                    {currentStep === 1 && (
                        <StepOne data={values} onChange={handleChange} />
                    )}
                    {currentStep === 2 && (
                        <StepTwo data={values} onChange={handleChange} />
                    )}
                    {currentStep === 3 && (
                        <StepThree data={values} onChange={handleChange} />
                    )}
                    {currentStep === 4 && (
                        <StepFour data={values} onChange={handleChange} />
                    )}
                </StateMachineProvider>
                <div
                    className={cn(
                        "flex",
                        currentStep === 1 ? "justify-end" : "justify-between"
                    )}
                >
                    {currentStep > 1 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrevious}
                        >
                            Previous
                        </Button>
                    )}
                    <Button size="sm" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}
