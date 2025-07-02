"use client";

import React, { useState, useRef } from 'react';
import cameraImage from "../../../public/svg/cameraImage.svg";
import EditIcon from "../../../public/svg/edit.svg";
import UploadingAnimation from "../../../public/gif/uploading.gif";
import { StaticImageData } from 'next/image';

interface ImageUploadProps {
  onImageChange?: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange }) => {
  const [avatarURL, setAvatarURL] = useState<string | StaticImageData>(cameraImage);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileUploadRef.current?.click();
  };

  const uploadImageDisplay = async () => {
    try {
      setAvatarURL(UploadingAnimation); // mostra animação de upload (opcional)

      const uploadedFile = fileUploadRef.current?.files?.[0];
      if (!uploadedFile) return;

      // Gera uma URL temporária para exibir a imagem localmente
      const localImageURL = URL.createObjectURL(uploadedFile);
      setAvatarURL(localImageURL); // atualiza o avatar com a imagem local

      // Notifica o componente pai
      if (onImageChange) {
        onImageChange(uploadedFile);
      }

    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
    }
  };

  return (
    <div
      className="
        w-1/2
        max-h-1/4
        mt-12
        m-5
        flex
        flex-col
        justify-center
        items-center
        gap-0.5
      "
    >
      <img
        src={typeof avatarURL === 'string' ? avatarURL : avatarURL.src}
        alt="Avatar"
        className="
          w-1/2
          h-auto
          rounded-full
          object-cover
          border-[5px]
          border-[#222E50]
          p-0.5
        "
      />

      <button
        type="button"
        onClick={handleImageUpload}
        className="
          w-[10%]
          h-auto
          border-2
          border-[#222E50]
          rounded-full
          p-[5px]
          cursor-pointer
          transition-colors
          duration-200
          hover:bg-black/10
          focus:bg-black/10
        "
      >
        <img
          src={EditIcon.src}
          alt="Edit"
          className="w-full h-auto object-cover"
        />
      </button>

      <input
        type="file"
        id="file"
        ref={fileUploadRef}
        onChange={uploadImageDisplay}
        hidden
      />
    </div>
  );
};

export default ImageUpload;