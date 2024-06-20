'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { appointmentsFetcher } from '@/services/provider';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const IsProvider = (roles: string[]) => roles.includes('provider');
const IsPatient = (roles: string[]) => roles.includes('patient');

function DashboardPage() {
  const session = useSession();

  console.log(session.data && IsProvider(session.data.user.roles));

  const appointments = useQuery({
    queryKey: ['provider/appointments'],
    queryFn: () =>
      session.data &&
      appointmentsFetcher(session.data.user.id, session.data.token),
    enabled: !!session.data,
  });

  return (
    <div className="flex mt-16">
      <div className="flex h-screen w-full">
        <div className="border-r w-64 flex flex-col gap-4 bg-white p-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors font-medium"
              prefetch={false}
            >
              <HomeIcon className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/appointments"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors font-medium"
              prefetch={false}
            >
              <CalendarIcon className="h-5 w-5" />
              My Appointments
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors font-medium"
              prefetch={false}
            >
              <VideoIcon className="h-5 w-5" />
              My Sessions
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors font-medium"
              prefetch={false}
            >
              <UsersIcon className="h-5 w-5" />
              My Patients
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors font-medium"
              prefetch={false}
            >
              <SettingsIcon className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex-1 p-6">
          <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
            <Image
              src="/images/b8.jpg"
              alt="Banner"
              fill
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)]" /> */}
            <div className="absolute inset-0 flex flex-col items-start justify-center text-black px-4 md:px-8 lg:px-12">
              <h1 className="text-sm font-bold mb-2">Welcome!</h1>
              <p className="text-3xl mb-4 font-bold">
                Hello, {session.data?.user.name}
              </p>
              <p className="text-lg mb-4 max-w-3xl">
                Thanks for joining with us. We are always trying to get you a
                complete service. You can view your daily schedule, Reach
                Patients Appointment at home!
              </p>
              <Link href={'/appointments'} prefetch>
                <Button className="mt-4 bg-blue-500">
                  Join Consultation Room
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-row flex-1 my-8 gap-4 ">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.isFetched &&
                  appointments.data?.map((appointment) => (
                    <div className="grid gap-3" key={appointment.id}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{`${appointment.patient.name.givenName} ${appointment.patient.name.familyName}`}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(
                              appointment.dateTime,
                              'MMMM dd, yyyy - hh:mm a'
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
            <Card className="flex-1"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LayoutGridIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
