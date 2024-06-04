'use client';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppointmentForm } from '@/domain/appointment';
import { Provider } from '@/domain/provider';
import { cn } from '@/lib/utils';
import { providerFetcher } from '@/services/provider';
import { categoryFetcher, specialityFetcher } from '@/services/speciality';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';

type StepTwoProps = {
  form: FormikProps<AppointmentForm>;
  name: string;
};

export default function StepTwo({ form }: StepTwoProps) {
  const categories = useQuery({
    queryKey: ['speciality/category'],
    queryFn: categoryFetcher,
  });

  const specialities = useQuery({
    queryKey: ['speciality', form.values.category],
    queryFn: () => specialityFetcher(form.values.category),
    enabled: !!form.values.category,
  });

  const providers = useQuery({
    queryKey: ['provider', form.values.speciality],
    queryFn: () => providerFetcher(form.values.speciality),
    enabled: !!form.values.speciality,
  });

  function handleCategoryChange(value: string) {
    form.setFieldValue('category', value);
  }

  function handleSpecialityChange(value: string) {
    form.setFieldValue('speciality', value);
  }

  function handleSelectProvider(provider: Provider) {
    form.setFieldValue('provider', provider.userId);
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
            value={form.values.category}
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
            value={form.values.speciality}
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
                'p-4 space-y-2 cursor-pointer',
                form.values.provider === provider.userId ? 'bg-slate-100' : ''
              )}
              onClick={() => handleSelectProvider(provider)}
            >
              <div className="font-semibold">
                Dr. {provider.name.givenName} {provider.name.familyName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {provider.specialities
                  .map((speciality) => speciality.name)
                  .join(',')}
              </div>
              <p className="text-sm">
                Dr. {provider.name.givenName} {provider.name.familyName} is a
                board-certified{' '}
                {provider.specialities
                  .map((speciality) => speciality.name)
                  .join(',')}{' '}
                with over 10 years of experience.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
