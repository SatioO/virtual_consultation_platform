'use client';

import {
  createAppointment,
  createOpenAppointment,
} from '@/services/appointment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { AppointmentForm } from './FormModel/formInitialValues';
import { FormProvider } from './FormProvider';
import StepFour from './Stepper/step_four';
import StepOne from './Stepper/step_one';
import StepThree from './Stepper/step_three';
import StepTwo from './Stepper/step_two';

export default function ScheduleAppointmentPage() {
  const session = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  function handleNext() {
    setCurrentStep((currentStep) => currentStep + 1);
  }

  function handlePrevious() {
    setCurrentStep((currentStep) => currentStep - 1);
  }

  async function handleFormSubmit(values: AppointmentForm) {
    if (session.status === 'authenticated') {
      await createAppointment(values, session.data?.token);
    } else {
      await createOpenAppointment(values);
    }

    router.push('/dashboard');
    toast('Appointment has been created', {
      description: new Date().toISOString(),
      important: true,
      position: 'bottom-center',
    });
  }

  return (
    <section className="w-full h-[100dvh] flex flex-col items-center justify-center">
      <div className="bg-white space-y-8 max-w-3xl w-full  dark:bg-gray-900 rounded-xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <FormProvider>
          {currentStep === 1 && (
            <StepOne name={'speciality'} onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <StepTwo name={'provider'} onNext={handleNext} />
          )}
          {currentStep === 3 && (
            <StepThree
              name={'schedule'}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleFormSubmit}
            />
          )}
          {currentStep === 4 && (
            <StepFour name={'provider'} onSubmit={handleFormSubmit} />
          )}
        </FormProvider>
      </div>
    </section>
  );
}
