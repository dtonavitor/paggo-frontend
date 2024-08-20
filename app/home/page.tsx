'use client'
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import UploadForm from "../ui/home/upload-form";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-2xl'>Envie sua imagem</h1>
      </div>
      <div>
        <UploadForm />
      </div>
    </div>
  );
}