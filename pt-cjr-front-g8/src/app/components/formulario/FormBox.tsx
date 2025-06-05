import React from 'react'
import InputForm from './InputForm'
import ButtonForm from './buttonForm'

const FormBox = () => {
    const styleButton = {
        backgroundColor: '#A4FED3', // verde
        color: '#222E50',
        borderColor: '#222E50',
        width : '25%',
        borderRadius: '10px',
    };

  return (
    <div style={{
            backgroundColor: '#ededed', 
            width: "50%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',  
            alignItems: 'center',
            padding: '20px'      
          }}>
            
            <InputForm label="Nome" placeholder="Digite seu nome" />
            
            <InputForm label="Email" placeholder="Digite seu e-mail" />
            
            <InputForm label="Senha" placeholder="Digite sua senha" type="password" />
            
            <InputForm label="Curso" placeholder="Digite seu curso"  />

            <InputForm label="Departamento" placeholder="Digite seu Departamento" />

            <ButtonForm label='Criar Conta' type='submit' style={styleButton} />
           
          </div>
  )
}

export default FormBox;
