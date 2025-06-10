import React from 'react';
import FormBox from '../components/formulario/FormBox';
import Image from 'next/image';

const NovoUsuarioPage = () => {
  return (
    <main className="flex flex-row justify-center min-h-screen p-0 h-fit">
      <div className="relative w-1/2 ">
        
        <Image
          src="/image/usuarioImagePage.png"
          alt="alunos"
          fill
          className="object-cover"
          priority
        />
        
        <h1 className="absolute top-24 left-1/2 -translate-x-1/2 text-white text-4xl font-bold drop-shadow-lg">
          Cadastro Usuário
        </h1>
      </div>

      <FormBox />

    </main>
  );
};

export default NovoUsuarioPage;