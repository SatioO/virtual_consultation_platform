'use client';

import MountainIcon from '@/public/icons/MountainIcon';
import { PlaceholderIcon } from '@/public/icons/Placeholder';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './button';

const Header = () => {
  const session = useSession();

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md px-4 md:px-6 h-14 flex items-center justify-between dark:bg-gray-950/90">
      <Link
        href="#"
        className="mr-6 flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={false}
      >
        <MountainIcon className="w-6 h-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      {session.status === 'unauthenticated' && (
        <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
          <Link href={'/login'}>
            <Button variant="outline" className="bg-white/90 backdrop-blur-md">
              Login
            </Button>
          </Link>
        </div>
      )}
      {session.status === 'authenticated' && (
        <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlaceholderIcon />
            <span className="sr-only">Toggle user menu</span>
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-white/90 backdrop-blur-md"
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
