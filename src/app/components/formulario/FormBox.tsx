"use client"
import React, { useEffect, useRef } from 'react';
import InputForm from './InputForm';
import ButtonForm from './buttonForm';
import ImageUpload from '../../components/ImageUpload'
import { useState } from 'react';
import { postUser } from '@/app/utils/api/apiUser';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';


const FormBox = () => {
  // Referências para cada input
  const inputNome = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSenha = useRef<HTMLInputElement>(null);
  const inputCurso = useRef<HTMLInputElement>(null);
  const inputDepartamento = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [inputErrors, setInputErrors] = useState<{ 
    nome?: string;
    email?: string; 
    senha?: string;
    curso?: string;
    departamento?: string;
  }>({});
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const validateNome = (nome: string) => nome.length > 0;
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateSenha = (senha: string) => senha.length >= 6;
  const validateCurso = (curso: string) => curso.length > 0;
  const validateDepartamento = (deparamento: string) => deparamento.length > 0;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nome = inputNome.current?.value || '';
    const email = inputEmail.current?.value || '';
    const senha = inputSenha.current?.value || '';
    const curso = inputCurso.current?.value || '';
    const departamento = inputDepartamento.current?.value || '';

    let errors: {
      nome?: string;
      email?: string; 
      senha?: string;
      curso?: string;
      departamento?: string;

    } = {};

    if (!validateNome(nome)) {
      errors.nome = 'O nome dever ser preenchido.';
    }
    if (!validateEmail(email)) {
      errors.email = 'E-mail inválido.';
    }
    if (!validateSenha(senha)) {
      errors.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }
    if (!validateCurso(curso)) {
      errors.curso = 'O curso dever ser preenchido.';
    }
    if (!validateDepartamento(departamento)) {
      errors.departamento = 'O departamento dever ser preenchido.';
    }

    setInputErrors(errors);

     if (Object.keys(errors).length > 0) {
      setAlert({ type: 'error', message: Object.values(errors).join(' ') });
      setTimeout(() => setAlert(null), 3000);
      return; // impede o submit
    }

    // Cria o FormData para envio multipart/form-data
    const formData = new FormData();
    if (inputNome.current?.value) formData.append('nome', inputNome.current.value);
    if (inputEmail.current?.value) formData.append('email', inputEmail.current.value);
    if (inputSenha.current?.value) formData.append('senha', inputSenha.current.value);
    if (inputCurso.current?.value) formData.append('curso', inputCurso.current.value);
    if (inputDepartamento.current?.value) formData.append('departamento', inputDepartamento.current.value);
    if (selectedImage) formData.append('fotoPerfil', selectedImage);

    try {
      const response = await postUser(formData);

      setAlert({ type: 'success', message: 'Cadastro realizado com sucesso!' });

      setTimeout(() => {
        setAlert(null);
        router.push('/login');
      }, 2000);

    } catch (error) {
      let errorMessage = 'Ocorreu um erro ao cadastrar';
      if (error instanceof Error) {
        errorMessage +=  ': '+ error.message;
      }
      setAlert({
        type: 'error',
        message: errorMessage,
      });

      setTimeout(() => setAlert(null), 3000);
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

      {isClient && alert && (
        <Alert 
          variant="filled" 
          severity={alert.type} 
          className='w-full justify-center items-center h-fit'
          >
          {alert.message}
        </Alert>
      )}

      <ImageUpload onImageChange={setSelectedImage} />

      <InputForm 
        label="Nome" 
        placeholder="Digite seu nome" 
        ref={inputNome} 
        error={!!inputErrors.nome}
        helperText={inputErrors.nome}
      />

      <InputForm 
        label="Email" 
        placeholder="Digite seu e-mail" 
        ref={inputEmail} 
        error={!!inputErrors.email}
        helperText={inputErrors.email}
      />

      <InputForm 
        label="Senha" 
        placeholder="Digite sua senha" 
        type="password" 
        ref={inputSenha} 
        error={!!inputErrors.senha}
        helperText={inputErrors.senha}
      />

      <InputForm 
        label="Curso" 
        placeholder="Digite seu curso" 
        ref={inputCurso} 
        error={!!inputErrors.curso}
        helperText={inputErrors.curso}
      />

      <InputForm 
        label="Departamento" 
        placeholder="Digite seu Departamento" 
        ref={inputDepartamento} 
        error={!!inputErrors.departamento}
        helperText={inputErrors.departamento}
      />

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
