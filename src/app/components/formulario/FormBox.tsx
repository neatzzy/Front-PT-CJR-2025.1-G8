"use client"
import React, { useRef } from 'react';
import InputForm from './InputForm';
import ButtonForm from './buttonForm';
import axios from 'axios';
import ImageUpload from '../../components/ImageUpload'
import { useState } from 'react';

const FormBox = () => {
  // Referências para cada input
  const inputNome = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSenha = useRef<HTMLInputElement>(null);
  const inputCurso = useRef<HTMLInputElement>(null);
  const inputDepartamento = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cria o FormData para envio multipart/form-data
    const formData = new FormData();
    if (inputNome.current?.value) formData.append('nome', inputNome.current.value);
    if (inputEmail.current?.value) formData.append('email', inputEmail.current.value);
    if (inputSenha.current?.value) formData.append('senha', inputSenha.current.value);
    if (inputCurso.current?.value) formData.append('curso', inputCurso.current.value);
    if (inputDepartamento.current?.value) formData.append('departamento', inputDepartamento.current.value);
    if (selectedImage) formData.append('fotoPerfil', selectedImage);

    try {
      const response = await axios.post(
        'http://localhost:5000/usuario',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Usuário cadastrado:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-[#ededed]
        w-1/2
        h-auto
        flex
        flex-col
        justify-between
        items-center
        p-5
      "
    >
      <ImageUpload onImageChange={setSelectedImage} />

      <InputForm label="Nome" placeholder="Digite seu nome" ref={inputNome} />

      <InputForm label="Email" placeholder="Digite seu e-mail" ref={inputEmail} />

      <InputForm label="Senha" placeholder="Digite sua senha" type="password" ref={inputSenha} />

      <InputForm label="Curso" placeholder="Digite seu curso" ref={inputCurso} />

      <InputForm label="Departamento" placeholder="Digite seu Departamento" ref={inputDepartamento} />

      <ButtonForm
        label="Criar Conta"
        type="submit"
        className="
          cursor-pointer
          bg-[#A4FED3]
          text-[#222E50]
          border
          border-[#222E50]
          w-1/2
          rounded-[10px]
          my-2
        "
      />
    </form>
  );
};

export default FormBox;
