'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import { createUser } from '../lib/actions';
import { UserState } from '../lib/actions';
import { redirect } from "next/navigation";
import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SignUpFormProps {
  router: AppRouterInstance;
}

export default function LoginForm({ router }: SignUpFormProps ) {
  const initialState: UserState = { message: null, errors: {}};
  const [state, formAction] = useFormState(createUser, initialState);
  
  useEffect(() => {
    if (state.success) {
      //create cookie with token
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className='mb-3 text-2xl'>
          Cadastre-se
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
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
              {state.errors?.email &&
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
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Cadastrar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {state.message && (
            <>
              {Object.keys(state.errors).length > 0 ? (
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
