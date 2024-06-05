'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import bg from '/public/images/logo.png';

const Header = () => {
  const router = useRouter();
  const session = useSession();

  async function handleLogout() {
    await signOut({ redirect: false });

    router.push('/login');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md px-4 md:px-6 h-16 flex items-center justify-between dark:bg-gray-950/90">
      <Link
        href="/"
        className="mr-6 flex items-center gap-2 text-lg font-semibold md:text-base"
        prefetch={false}
      >
        <Image src={bg} alt="hero image" height={64} width={152} priority />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <Image
                    src="/placeholder.svg"
                    height={64}
                    width={64}
                    alt="profile"
                  />
                </Avatar>
                <div className="text-sm font-medium cursor-pointer">
                  {session.data.user.name}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <Image
                        height={64}
                        width={64}
                        src="/placeholder.svg"
                        alt="profile"
                      />
                      {/* <AvatarFallback>JP</AvatarFallback> */}
                    </Avatar>
                    <div className="grid gap-0.5">
                      <div className="text-sm font-medium">
                        {session.data.user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {session.data.user.email}
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="#" className="flex w-full" prefetch={false}>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="#"
                  className="flex w-full"
                  prefetch={false}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
