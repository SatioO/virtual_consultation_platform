'use client';

import { useState } from 'react';
import { FormProvider } from './FormProvider';
import StepOne from './Stepper/step_one';
import StepThree from './Stepper/step_three';
import StepTwo from './Stepper/step_two';
import { AppointmentForm } from './FormModel/formInitialValues';
import StepFour from './Stepper/step_four';

export type Step = {
  /** Identifies the name of the step & key in initialValues
   * Can use an 'id' here, doesn't necessarily have to be a 'name' prop.
   */
  name: string;
  component: React.ElementType;
};

const steps: Step[] = [
  {
    name: 'speciality',
    component: StepOne,
  },
  {
    name: 'provider',
    component: StepTwo,
  },
  {
    name: 'schedule',
    component: StepThree,
  },
  {
    name: 'patient_details',
    component: StepFour,
  },
];

const renderCurrentStepForm = (
  currentIndex: number,
  onNext: () => void,
  onPrevious: () => void
) => {
  const step = steps[currentIndex - 1];

  const commonProps = {
    name: step.name,
    onNext,
    onPrevious,
  };

  const StepComponent = step.component;

  return <StepComponent {...commonProps} />;
};

export default function ScheduleAppointmentPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  function handleNext() {
    setCurrentStep((currentStep) => currentStep + 1);
  }

  function handlePrevious() {
    setCurrentStep((currentStep) => currentStep - 1);
  }

  function handleFormSubmit(values: AppointmentForm) {}

  return (
    <section className="w-full h-[100dvh] flex flex-col items-center justify-center bg-[url('/placeholder.svg')] bg-cover bg-center">
      <div className="bg-white space-y-8 max-w-3xl w-full  dark:bg-gray-900 rounded-xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <FormProvider>
          {renderCurrentStepForm(currentStep, handleNext, handlePrevious)}
        </FormProvider>
        {/* <div
          className={cn(
            'flex',
            currentStep === 1 ? 'justify-end' : 'justify-between'
          )}
        >
          {currentStep > 1 && (
            <Button variant="outline" size="sm" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          <Button size="sm" onClick={handleNext}>
            Next
          </Button>
        </div> */}
      </div>
    </section>
  );
}
