'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import { createUser } from '../lib/actions';
import { UserState } from '../lib/actions';
import { useEffect, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import SpinnerLoading from './spinner';

interface SignUpFormProps {
  router: AppRouterInstance;
}

export default function LoginForm({ router }: SignUpFormProps ) {
  const initialState: UserState = { message: null, errors: {}};
  const [state, formAction] = useFormState(createUser, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
  }
  
  useEffect(() => {
    if (state.errors) {
      setIsLoading(false);
    }
    if (state.success) {
      setIsLoading(false);
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    }
  }, [state.success, router, state.errors]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 flex-row rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="flex gap-1">  
          <Link href="/login">
            <ArrowLeftIcon className="h-8 w-8 text-black cursor-pointer" />
          </Link>
          <h1 className='mb-3 text-2xl'>
            Cadastre-se
          </h1>
        </div>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-3 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Insira seu email"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors && 'email' in state.errors && state.errors.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Senha
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Insira sua senha"
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password && 
              state.errors?.password?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {!isLoading ? (
        <Button className="mt-4 w-full" type="submit" onClick={handleLoading}>
          Cadastrar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        ) : (
          <Button className="flex justify-center items-center mt-4 w-full">
            <SpinnerLoading />
          </Button>
        )}
        <div className="flex h-8 items-end space-x-1">
          {state.message && (
            <>
              {Object.keys(state.errors || {}).length > 0 ? (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{state.message}</p>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-green-500">{state.message}</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </form>
  );
}
