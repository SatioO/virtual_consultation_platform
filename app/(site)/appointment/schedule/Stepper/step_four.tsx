import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AppointmentForm,
  stepFourFormValues,
} from '../FormModel/formInitialValues';
import { useFormState } from '../FormProvider';

const FormSchema = z.object({
  name: z.object({
    givenName: z.string().min(1, 'First Name is required'),
    middleName: z.string().max(2),
    familyName: z.string().min(1, 'Last Name is required'),
  }),
  email: z.string().min(1, 'Email is required'),
  dob: z.string().min(1, 'Date of Birth is required'),
  administrativeSex: z.string().min(1, 'Gender is required'),
  maritalStatus: z.string(),
  mrn: z.string().min(1, 'MRN is required'),
  ssn: z.string().min(1, 'SSN is required'),
});

type StepFourProps = {
  name: string;
  onSubmit: (values: AppointmentForm) => void;
};

export default function StepFour(props: StepFourProps) {
  const [state, setState] = useFormState();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { ...stepFourFormValues },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setState({ ...state, ...values });
    props.onSubmit({ ...state, ...values });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Personal Information</h1>
        <p>
          Please fill out the following form to update your personal details.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name.givenName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        placeholder="John"
                        maxLength={20}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name.middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        id="middleName"
                        placeholder="Quincy"
                        maxLength={2}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name.familyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        id="lastName"
                        maxLength={20}
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input id="dateOfBirth" type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="administrativeSex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="O">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent {...field}>
                          <SelectItem value="S">Single</SelectItem>
                          <SelectItem value="M">Married</SelectItem>
                          <SelectItem value="D">Divorced</SelectItem>
                          <SelectItem value="W">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Security Number</FormLabel>
                    <FormControl>
                      <Input
                        id="ssn"
                        type="number"
                        maxLength={12}
                        placeholder="123-45-6789"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="mrn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Record Number</FormLabel>
                    <FormControl>
                      <Input
                        id="medicalRecordNumber"
                        type="text"
                        placeholder="ABC123"
                        maxLength={12}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Create Appointment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
