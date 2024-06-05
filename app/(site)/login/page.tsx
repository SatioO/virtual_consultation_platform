'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import bg from '/public/images/bg.webp';

type LoginInput = {
  username: string;
  password: string;
};

type PageProps = { searchParams: { error?: string } };

export default function LoginPage(props: PageProps) {
  const [inputs, setInputs] = useState<LoginInput>({
    username: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn('credentials', {
      username: inputs.username,
      password: inputs.password,
      callbackUrl: '/',
    });
  };
  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto w-[350px] space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    required
                    value={inputs.username || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                      prefetch={false}
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    required
                    value={inputs.password || ''}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <Button variant="outline" className="w-full">
                  Sign In with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline" prefetch={false}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
          <Image
            src={bg}
            alt="hero image"
            priority
            width="1920"
            height="1080"
            className="h-full w-full object-cover brightness-70"
          />
        </div>
      </div>
    </>
  );
}
