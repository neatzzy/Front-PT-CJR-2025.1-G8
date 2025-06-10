import React from 'react'
import FormBox from '../components/formulario/FormBox'
import Image from 'next/image';

const novoUsuarioPage = () => {
  return (
 
      <main style={{ 
        display: 'flex',
        padding: '0px',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 'fit-content',
        minHeight: '100vh',
      }}>
        <div style={{
          backgroundColor: 'blue',
          width : '50%',
          height: 'auto',
          position: 'relative'
        }}>

          <Image
            src="/image/usuarioImagePage.png"
            alt="alunos"
            fill // faz a imagem ocupar toda a div
            style={{
              objectFit: 'cover'
            }}
          />

          <h1
            style={{
              position: 'absolute',
              top: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '3rem',
              textShadow: '3px 3px 8px rgba(0, 0, 0, 0.7)',
            }}
          >
      Cadastro Usuário
    </h1>
        </div>
        
        <FormBox />

      </main>
    
  )
}

export default novoUsuarioPage;