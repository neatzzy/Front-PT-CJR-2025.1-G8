import React, { useState, useRef } from 'react';
import cameraImage from "../../../public/svg/cameraImage.svg";
import EditIcon from "../../../public/svg/edit.svg";

interface UploadImageProfessorProps {
  
  onFileSelect: (file: File | null, previewUrl: string | null) => void;
}

export default function UploadImageProfessor({ onFileSelect }: UploadImageProfessorProps) {
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setPhotoPreviewUrl(url); 
        onFileSelect(file, url); 
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreviewUrl(null);
      onFileSelect(null, null); 
    }
  };

  const handleEditButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-32 h-32 rounded-full bg-gray-300 overflow-hidden mb-4 border-2 border-gray-300 flex items-center justify-center">
      {photoPreviewUrl ? (
        <img src={photoPreviewUrl} alt="Pré-visualização do Professor" className="w-full h-full object-cover" />
      ) : (
        <img src={cameraImage.src} alt="Câmera Placeholder" className="w-24 h-24 text-gray-500" />
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <button
        onClick={handleEditButtonClick}
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center
        border border-gray-300 shadow-md cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300">

        <img
          src={EditIcon.src} 
          alt="Edit"
          className="w-5 h-5 object-cover"/>
      </button>
    </div>
  );
}