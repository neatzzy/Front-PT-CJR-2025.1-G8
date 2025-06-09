"use client";

import React, { useState, useRef } from 'react';
import DefaultImage from "../../../public/image/upload-photo-here.png";
import EditIcon from "../../../public/svg/edit.svg";
import UploadingAnimation from "../../../public/gif/uploading.gif";
import { StaticImageData } from 'next/image';


const ImageUpload: React.FC = () => {
   const [avatarURL, setAvatarURL] = useState<string | StaticImageData>(DefaultImage);
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

    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
    }
  };


   return (
    <div className="relative h-96 w-96 m-8">
      <img 
        src={typeof avatarURL === 'string' ? avatarURL : avatarURL.src}
        alt="Avatar"
        className="h-96 w-96 rounded-full"
      />

      <button
        type="button"
        onClick={handleImageUpload}
        className="flex-center absolute bottom-12 right-14 h-9 w-9 rounded-full"
      >
        <img
          src={EditIcon.src}
          alt="Edit"
          className="object-cover"
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
