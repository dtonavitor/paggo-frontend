'use server'

import { z } from "zod";
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

export type UserState = {
  errors?: {
    email?: string[];
    password?: string[];
    backend?: string[];
  };
  message?: string | null;
  success?: boolean;
  data?: {
    accessToken: string;
  };
};

const FormSchema = z.object({
  email: z.string({
    invalid_type_error: 'Por favor, insira um email.',
  }).email({
    message: 'Por favor, insira um email válido.',
  }),
  password: z.string({
    invalid_type_error: 'Por favor, insira uma senha.',
  }).min(6, {message: 'A senha deve ter no mínimo 6 caracteres.'}),
});

export async function createUser(prevState: UserState, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      success: false,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();

    return {
      message: 'Usuário criado com sucesso!',
      errors: {},
      success: true, 
    };
  } catch (error) {
    return {
      message: 'Falha ao criar usuário.',
      errors: {
        backend: [error],
      },
      success: false,
    };
  }
}

export async function getPayload() {
    const token = document.cookie.split('access_token=')[1].split(';')[0];

    const decoded = jwt.decode(token);

    const payload = {
      id: decoded?.sub,
      email: decoded?.email,
      accessToken: token,
    }

    console.log(payload);

    return payload;
}

export async function getUser(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData =  await response.json();
    console.log(responseData);

    if (!responseData.access_token) {
      throw new AuthError('CredentialsSignin', {
        message: 'Email ou senha incorretos.',
      });
    }
    
    return {
      message: 'Login realizado com sucesso!',
      errors: {},
      success: true,
      data: {
        accessToken: responseData.access_token,
      }
    }

  } catch (error) {
    console.error(error)
    return {
      message: 'Falha ao realizar login.',
      errors: {
        backend: [error],
      },
      success: false,
    };
  }
}

export async function createOcr(prevState: string | undefined, formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}ocr`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${document.cookie.split('access_token=')[1].split(';')[0]}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email ou senha incorretos.';
        default:
          return 'Algo deu errado.';
      }
    }
    throw error;
  }
}
