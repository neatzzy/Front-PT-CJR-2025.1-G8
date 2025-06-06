"use client"
import React, { useRef } from 'react';
import InputForm from './InputForm';
import ButtonForm from './buttonForm';
import axios from 'axios';

const FormBox = () => {
    const styleButton = {
        backgroundColor: '#A4FED3', // verde
        color: '#222E50',
        borderColor: '#222E50',
        width : '50%',
        borderRadius: '10px',
    };

  // Referências para cada input
  const inputNome = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSenha = useRef<HTMLInputElement>(null);
  const inputCurso = useRef<HTMLInputElement>(null);
  const inputDepartamento = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados = {
      nome: inputNome.current?.value,
      email: inputEmail.current?.value,
      senha: inputSenha.current?.value,
      curso: inputCurso.current?.value,
      departamento: inputDepartamento.current?.value
    };

    try {
      const response = await axios.post('http://localhost:5000/usuario', dados); // ajuste a URL para sua rota real
      console.log('Usuário cadastrado:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#ededed', 
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        padding: '20px'      
      }}>
        <InputForm label="Nome" placeholder="Digite seu nome" ref={inputNome} />
        <InputForm label="Email" placeholder="Digite seu e-mail" ref={inputEmail} />
        <InputForm label="Senha" placeholder="Digite sua senha" type="password" ref={inputSenha} />
        <InputForm label="Curso" placeholder="Digite seu curso" ref={inputCurso} />
        <InputForm label="Departamento" placeholder="Digite seu Departamento" ref={inputDepartamento} />
        <ButtonForm label='Criar Conta' type='submit' style={styleButton} />
      </form>
    </>
  );
};

export default FormBox;
