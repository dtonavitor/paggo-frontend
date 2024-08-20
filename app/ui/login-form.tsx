'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { authenticate, getUser, UserState } from '../lib/actions';
import { useEffect } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { cookies } from 'next/headers';

interface SignUpFormProps {
  router: AppRouterInstance;
}

export default function LoginForm({ router }: SignUpFormProps) {
  const initialState: UserState = { message: null, errors: {}};
  const [state, formAction] = useFormState(getUser, initialState);

  useEffect(() => {
    if (state.success && state.data) {
      console.log(state.data)
      cookies().set('access_token', state.data.accessToken, { expires: new Date(0) });
      // setTimeout(() => {
      //   router.push('/home');
      // }, 2000);
    }
  }, [state.success, router, state.data]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className='mb-3 text-2xl'>
          Por favor, faça login para continuar.
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
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {Object.keys(state.errors).length > 0 && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.message}</p>
              </>
            )}
        </div>
        <p>Ainda não tem uma conta?
          <Link
            href="/signup"
            className="text-blue-500 hover:underline"
          > Cadastre-se
          </Link>
        </p>
      </div>
    </form>
  );
}
