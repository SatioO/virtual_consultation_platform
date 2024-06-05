import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import bg from '/public/images/bg.webp';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src={bg}
        alt="hero image"
        fill
        priority
        className="brightness-50"
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <div className="flex flex-col space-y-10 text-center">
        <div className="flex flex-col space-y-4">
          <h1 className="text-white text-5xl font-bold">
            Find and book healthcare providers
          </h1>
          <p className="text-xl text-gray-300">
            How is health today, Sounds like not good!
            <br />
            Don&rsquo;t worry. Find your doctor online Book as you wish with
            Accion. <br />
            We offer you a free doctor channeling service, Make your appointment
            now.
          </p>
        </div>
        <Link href={'/appointment/schedule'} prefetch>
          <Button variant="outline">
            <b>Book Appointment</b>
          </Button>
        </Link>
      </div>
    </main>
  );
}
