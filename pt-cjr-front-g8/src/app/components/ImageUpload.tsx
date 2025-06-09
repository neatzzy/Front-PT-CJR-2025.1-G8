"use client";

import React, { useState, useRef } from 'react';
import cameraImage from "../../../public/svg/cameraImage.svg";
import EditIcon from "../../../public/svg/edit.svg";
import UploadingAnimation from "../../../public/gif/uploading.gif";
import { StaticImageData } from 'next/image';


const ImageUpload: React.FC = () => {
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

    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
    }
  };


   return (
    <div style={{
      width: '50%', 
      height: 'fit-content',
      maxHeight: '25%', 
      margin: '20px',
      marginTop: '50px',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      gap: '2px',
    }}>
      <img 
        src={typeof avatarURL === 'string' ? avatarURL : avatarURL.src}
        alt="Avatar"
        style={{
          width: '50%',
          height: 'auto',
          borderRadius: '50%',
          objectFit: 'cover', // mantém o conteúdo centralizado e sem distorções
          border: '10px solid rgba(0, 0, 0, 0.1)', // borda suave
          padding: '2px',
        }}
      />

      <button
        type="button"
        onClick={handleImageUpload}
        style={{
          width: '10%',
          height: 'fit-content',
          border: '2px solid rgba(0, 0, 0, 0.1)', // borda suave
          borderRadius: '50%', // bordas arredondadas para suavizar o botão
          padding: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'}
      >
        <img
          src={EditIcon.src}
          alt="Edit"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
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
