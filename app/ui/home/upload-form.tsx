"use client";

export default function UploadForm() {
  return (
    <form className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span>Selecione a imagem</span>
        <input type="file" />
      </label>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-md bg-sky-500 p-3 text-sm font-medium hover:bg-sky-600 hover:text-white"
      >
        Enviar
      </button>
    </form>
  );
}