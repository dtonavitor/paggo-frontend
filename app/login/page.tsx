'use client'

import { useRouter } from 'next/navigation';
import LoginForm from '../ui/login-form';
 
export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm router={router}/>
      </div>
    </main>
  );
}