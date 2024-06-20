'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { allAppointmentsFetcher } from '@/services/provider';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AppointmentsPage() {
  const session = useSession();

  const appointments = useQuery({
    queryKey: ['provider/appointments/all'],
    queryFn: () =>
      session.data &&
      allAppointmentsFetcher(session.data.user.id, session.data.token),
    enabled: !!session.data,
  });

  console.log(appointments.data);

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
          <div className="p-8 bg-white">
            <div className="flex items-center gap-2 px-3 py-8 rounded-md hover:bg-muted transition-colors font-medium">
              <h1 className="text-3xl font-bold">Appointments</h1>
            </div>
            <Table>
              <TableHeader className="bg-slate-400">
                <TableRow>
                  <TableHead className="text-white">Patient Name</TableHead>
                  <TableHead className="text-white">Appointment Date</TableHead>
                  <TableHead className="text-white">Appointment Time</TableHead>
                  <TableHead className="text-white">
                    Appointment Status
                  </TableHead>
                  <TableHead className="text-white">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.isFetched &&
                  appointments.data?.map((appointment) => (
                    <TableRow className="bg-slate-50" key={appointment.id}>
                      <TableCell>{`${appointment.patient.name.givenName} ${appointment.patient.name.familyName}`}</TableCell>
                      <TableCell>
                        {format(appointment.dateTime, 'MMMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        {format(appointment.dateTime, 'hh:mm a')}
                      </TableCell>
                      <TableCell>{appointment.speciality.name}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

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
