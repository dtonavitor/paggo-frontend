'use client'

import { useState } from "react";
import UploadForm from "../ui/home/upload-form";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Page() {
  const [ocrText, setOcrText] = useState<string[] | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!ocrText || !imageSrc) return;

    const zip = new JSZip();

    // Add the image to the ZIP file
    const imgData = imageSrc.split(',')[1]; // Remove the data URL prefix
    zip.file("image.png", imgData, { base64: true });

    // Add the text to the ZIP file
    const textContent = ocrText.join("\n");
    zip.file("extracted-text.txt", textContent);

    // Generate the ZIP file and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "ocr-output.zip");
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-2xl'>Envie sua imagem</h1>
      </div>
      <div>
        <UploadForm setOcrText={setOcrText} setImageSrc={setImageSrc}/>
      </div>
      {ocrText &&
      <div className="flex justify-center flex-col">
        <p><strong>Este foi o texto extraído: </strong></p>
        {ocrText && ocrText.map((text: string, index: number) => (
            <p className="mt-2" key={index}>L{index+1}: {text}</p>
          ))}
          <button
            className="mt-4 w-56 flex items-center justify-center gap-2 rounded-md bg-black p-2 text-sm text-white font-medium hover:bg-gray-600 hover:text-white"
            onClick={handleDownload}
          >
            Download da Imagem e Texto
          </button>
      </div>
      }
    </div>
  );
}