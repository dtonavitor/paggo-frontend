"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createOcr } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import SpinnerLoading from "../spinner";

export default function UploadForm({ setOcrText, setImageSrc }: { setOcrText: (text: string[]) => void, setImageSrc: (src: string) => void }) {
  const [imageSrc, setImageSrcLocal] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createOcr, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
          setImageSrcLocal(reader.result as string);
          setImageSrc(reader.result as string);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (state.errors) {
      setIsLoading(false);
    }
    if (state.success && state.data?.text) {
      setIsLoading(false);
      setOcrText(state.data.text);
    }
  }, [state.success, state.data?.text, state.errors, setOcrText]);

  return (
    <form action={formAction} className="flex flex-col gap-4 mt-10">
      <label className="flex flex-col gap-2">
        <div className="relative cursor-pointer">
          <input 
            type="file"
            name="file"
            className="absolute inset-0 z-50 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="w-56 flex items-center justify-center gap-2 px-4 py-2 bg-black cursor-pointer text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16V7a1 1 0 011-1h4m6 0h4a1 1 0 011 1v9m-5-7l-3 3m0 0l-3-3m3 3V4"></path>
            </svg>
            Escolher Arquivo
          </div>
        </div>
      </label>
      {imageSrc && (
        <div className="flex items-center justify-center mt-4">
          <Image 
            src={imageSrc} 
            alt="Uploaded Image" 
            width={imageDimensions.width}
            height={imageDimensions.height}
            className="object-contain rounded-md"
          />
        </div>
      )}
      {!isLoading ? (
        <button
          type="submit"
          onClick={handleLoading}
          className="w-32 flex items-center justify-center gap-2 rounded-md bg-black p-2 text-sm text-white font-medium hover:bg-gray-600 hover:text-white"
        >
          Enviar
        </button>
      ) : (
        <button
          className="w-32 flex items-center justify-center gap-2 rounded-md bg-black p-2 text-sm text-white font-medium hover:bg-gray-600 hover:text-white"
        >
          <SpinnerLoading />
        </button>
      )}
      <div className="flex h-8 items-end space-x-1">
          {(state && Object.keys(state.errors || {}).length > 0) && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.message}</p>
              </>
            )}
        </div>
    </form>
  );
}