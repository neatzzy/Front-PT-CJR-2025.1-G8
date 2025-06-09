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
        width : '30%',
        borderRadius: '15px',
        marginTop: '2rem',
    };

  // Referências para cada input
  
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputSenha = useRef<HTMLInputElement>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados = {
      email: inputEmail.current?.value,
      senha: inputSenha.current?.value,     
    };

    try {
      const response = await axios.post('http://localhost:5000/usuario', dados); // ajuste a URL para sua rota real
      console.log('Usuário cadastrado:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <main
  style={{
    width: "50vw",             
    height: "100vh",
    background: "#66CDAA",      
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",   
    overflow: "hidden"}}>

        <img src="/image/UnbLogo.png" alt="Unb Logo" style={{
            position: "absolute", top: 0, left: 16,height: 80, width: 'auto' ,zIndex: 2,}}/>
        <img src="/image/CjrLogo.png" alt="CJR Logo" style={{
            position: "absolute", top: 0, right: 16,height: 80, width: 95 ,zIndex: 2,}}/>
  
  

        <h1
        style={{
            textAlign: "center",
            fontFamily: "Calisto MT, serif", fontWeight: 400, fontSize: "4rem",
            color: "#2F4F4F",
            margin: "30px 0 50px 0",   
            whiteSpace: "nowrap"}}>
            Avaliação de Professores
        </h1>

        <form
        onSubmit={handleSubmit}
        style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "420px",
        marginTop: "0px",
        padding: "0 0 120px 0", 
        background: "transparent"}}>

        <InputForm label="Email" placeholder="Digite seu e-mail" ref={inputEmail} style={{
            width: "100%",
            marginBottom: "16px",
            fontSize: "1.1rem"}}/>

        <InputForm label="Senha" placeholder="Digite sua senha" type="password" ref={inputSenha} style={{
            width: "100%",
            marginBottom: "28px",
            fontSize: "1.1rem"}}/>
  
            <div style={{ display: "flex", gap: "24px", width: "100%", justifyContent: "center" }}>
            <ButtonForm label="Entrar" type="submit" style={styleButton} />
            <ButtonForm label="Criar Conta" type= "button" onClick={() => window.location.href = '/usuario/novo'} style={styleButton} />
            </div>
    </form> 
</main>

  )




   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    /*    <>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#66CDAA', 
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: '20px'      
      }}>
        <div style={{position: "relative", width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "500px"}}>
            <img src="/image/UnbLogo.png" alt="Unb Logo" style={{position:"absolute", top:"0", left:"0", height:"90px" }}/>
            <img src="/image/CjrLogo.png" alt="CJR Logo" style={{position:"absolute", top:"0", right:"0", height:"95px"}}/>
        </div>
        <h1 style={{ 
            textAlign: "center", 
            fontSize: "4rem", fontFamily: "Calisto MT, serif", color: "#2F4F4F", 
            margin: "0px 0px 10rem 0px",
            padding: "6rem 0 18rem 0",
            position:"absolute"}}>Avaliação de Professores</h1>
        
        <InputForm label="Email" placeholder="Digite seu e-mail" ref={inputEmail} />
        
        <InputForm label="Senha" placeholder="Digite sua senha" type="password" ref={inputSenha} />
        
        <ButtonForm label='Login' type='submit' style={styleButton} />
      </form>
    </>
  );
}; */
}
export default FormBox; 
