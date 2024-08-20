'use server'

import { z } from "zod";
import * as dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from "next/headers";

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
    accessToken?: string | null;
    text?: string[] | null;
    image?: string | null;
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

export async function createUser(state: UserState, formData: FormData): Promise<UserState> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      ...state,
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
      ...state,
      message: 'Usuário criado com sucesso!',
      errors: {},
      success: true, 
    };
  } catch (error) {
    return {
      ...state,
      message: 'Falha ao criar usuário.',
      errors: {
        backend: ['Falha ao criar usuário.'],
      },
      success: false,
    };
  }
}

export async function getUser(state: UserState, formData: FormData): Promise<UserState> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      ...state,
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      success: false,
    };
  }

  const { email, password } = validatedFields.data;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData =  await response.json();

    if (!responseData.access_token) {
      return {
        ...state,
        message: 'Email ou senha incorretos.',
        errors: {
          backend: ['Email ou senha incorretos.'],
        },
        success: false,
      };
    }
    
    return {
      ...state,
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
      ...state,
      message: 'Falha ao realizar login.',
      errors: {
        backend: ['Falha ao realizar login.'],
      },
      success: false,
    };
  }
}

function getPayload() {
  const token = cookies().get('access_token');
  
  if (!token) {
    return null;
  }
  
  const decoded = jwt.decode(token.value) as JwtPayload;
  
  const payload = {
    id: decoded?.sub,
    email: decoded?.email,
    accessToken: token,
  }

  return payload;
}

async function convertFileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Convert the buffer to a Base64 string
  return buffer.toString('base64');
}

export async function createOcr(state: UserState | undefined, formData: FormData): Promise<UserState> {
  const payload = getPayload();

  if (!payload) {
    return {
      ...state,
      message: 'Usuário não autenticado.',
      errors: {
        backend: ['Usuário não autenticado.'],
      },
      success: false,
    }
  }

  const file = formData.get('file');

  if (!file || !(file instanceof File) || file.size === 0) {
    return {
      ...state,
      message: 'Nenhum arquivo enviado.',
      errors: {
        backend: ['Nenhum arquivo enviado.'],
      },
      success: false,
    };
  }

  // Convert the file to a base64 string
  const base64String = await convertFileToBase64(file);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies().get('access_token')?.value}`,
      },
      body: JSON.stringify({ image: base64String, userId: payload.id }),
    });

    const responseData = await response.json();

    if (!responseData.text) {
      return {
        ...state,
        message: 'Falha ao criar OCR.',
        errors: {
          backend: ['Falha ao criar OCR.'],
        },
        success: false,
      };
    }
    return {
      ...state,
      message: 'OCR criado com sucesso!',
      errors: {},
      success: true,
      data: {
        text: responseData.text.split('\n'),
        image: responseData.image,
      }
    };
  } catch (error) {
    return {
      message: 'Falha ao criar OCR.',
      errors: {
        backend: ['Falha ao criar OCR.'],
      },
      success: false,
    };
  }
}
