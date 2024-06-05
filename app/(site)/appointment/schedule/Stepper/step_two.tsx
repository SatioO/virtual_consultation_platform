'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Provider } from '@/domain/provider';
import { cn } from '@/lib/utils';
import { providerFetcher } from '@/services/provider';
import { categoryFetcher, specialityFetcher } from '@/services/speciality';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { stepTwoFormValues } from '../FormModel/formInitialValues';
import { useFormState } from '../FormProvider';

type StepTwoProps = {
  name: string;
  onNext: () => void;
};

const FormSchema = z.object({
  category: z.string().min(1, 'Category is required!'),
  speciality: z.string().min(1, 'Speciality is required!'),
  provider: z.number().min(1, 'Provider is required'),
});

export default function StepTwo(props: StepTwoProps) {
  const [state, setState] = useFormState();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...stepTwoFormValues,
      category: state.category,
      speciality: state.speciality,
    },
  });
  const categories = useQuery({
    queryKey: ['speciality/category'],
    queryFn: categoryFetcher,
  });
  const selectedCategory = form.watch('category');

  const specialities = useQuery({
    queryKey: ['speciality/category', selectedCategory],
    queryFn: () => specialityFetcher(selectedCategory),
    enabled: !!selectedCategory,
  });
  const selectedSpeciality = form.watch('speciality');

  const providers = useQuery({
    queryKey: ['speciality/provider', selectedSpeciality],
    queryFn: () => providerFetcher(selectedSpeciality),
    enabled: !!selectedSpeciality,
  });
  const selectedProvider = form.watch('provider');

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setState({ ...state, ...values });
    props.onNext();
  };

  function handleCategoryChange(value: string) {
    form.setValue('category', value);
    form.resetField('speciality', {
      defaultValue: form.formState.defaultValues?.speciality,
    });
  }

  function handleSpecialityChange(value: string) {
    form.setValue('speciality', value);
    form.setValue('provider', 0);
  }

  function handleSelectProvider(provider: Provider) {
    form.setValue('provider', provider.userId);
  }

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
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          {categories.data?.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="speciality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speciality</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value as any}
                        onValueChange={handleSpecialityChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a speciality" />
                        </SelectTrigger>
                        <SelectContent {...field}>
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
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedSpeciality &&
                providers.data?.map((provider, index) => (
                  <Card
                    key={index}
                    className={cn(
                      'p-4 space-y-2 cursor-pointer',
                      form.formState.isSubmitted &&
                        !form.formState.isValid &&
                        !selectedProvider &&
                        'bg-red-100 border-2',
                      selectedProvider === provider.userId ? 'bg-slate-100' : ''
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
                      Dr. {provider.name.givenName} {provider.name.familyName}{' '}
                      is a board-certified{' '}
                      {provider.specialities
                        .map((speciality) => speciality.name)
                        .join(',')}{' '}
                      with over 10 years of experience.
                    </p>
                  </Card>
                ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
