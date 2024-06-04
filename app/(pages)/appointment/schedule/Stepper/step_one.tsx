'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryFetcher, specialityFetcher } from '@/services/speciality';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { stepOneFormValues } from '../FormModel/formInitialValues';
import { useFormState } from '../FormProvider';

type StepOneProps = {
  name: string;
  onNext: () => void;
};

const FormSchema = z.object({
  category: z.string().min(1, 'Category is required!'),
  speciality: z.string().min(1, 'Speciality is required!'),
});

export default function StepOne(props: StepOneProps) {
  const [state, setState] = useFormState();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...stepOneFormValues,
      speciality: state.speciality,
      category: state.category,
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

  return (
    <div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Book Your Appointment</h1>
        <p>Find the right provider for your needs.</p>
      </div>
      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="space-y-1">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="speciality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speciality</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={'flex justify-end'}>
                <Button size="sm" type="submit">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
