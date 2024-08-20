'use client'

import { useRouter } from 'next/navigation';
import SignUpForm from '../ui/signup-form';
 
export default function SignUpPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <SignUpForm  router={router} />
      </div>
    </main>
  );
}