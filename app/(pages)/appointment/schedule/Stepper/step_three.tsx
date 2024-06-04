import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form } from '@/components/ui/form';
import { Slot } from '@/domain/provider';
import { cn } from '@/lib/utils';
import { slotsFetcher } from '@/services/provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { stepThreeFormValues } from '../FormModel/formInitialValues';
import { useFormState } from '../FormProvider';

type StepThreeProps = {
  name: string;
  onNext: () => void;
  onPrevious: () => void;
};

const FormSchema = z.object({
  slot: z.string().min(2, 'Slot is required!'),
  provider: z.number().min(1, 'Provider is required'),
});

export default function StepThree(props: StepThreeProps) {
  const [state, setState] = useFormState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { ...stepThreeFormValues, provider: state.provider },
  });
  const selectedProvider = form.watch('provider');
  const selectedSlot = form.watch('slot');

  const availableSlots = useQuery({
    queryKey: ['provider/slots', selectedDate],
    queryFn: () =>
      slotsFetcher(
        selectedProvider,
        formatInTimeZone(selectedDate, 'UTC', "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      ),
  });

  function handleDateChange(date: Date | undefined) {
    if (date) setSelectedDate(date);
  }

  function handleSlotSelect(slot: Slot) {
    form.setValue('slot', slot.startDateTime);
  }

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setState({ ...state, ...values });
    props.onNext();
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold">Book Your Appointment</h1>
            <p>Find the right provider for your needs.</p>
          </div>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
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
                          variant={slot.available ? 'outline' : 'ghost'}
                          disabled={!slot.available}
                          onClick={() => handleSlotSelect(slot)}
                          className={cn(
                            'justify-center',
                            form.formState.isSubmitted &&
                              !form.formState.isValid &&
                              !selectedSlot &&
                              'bg-red-100 border-2',
                            selectedSlot === slot.startDateTime &&
                              'bg-slate-200 border-gray-600'
                          )}
                          type="button"
                        >
                          {format(slot.startDateTime, 'HH:mm a')}
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
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={props.onPrevious}>
                Previous
              </Button>
              <Button size="sm" type="submit">
                Next
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
