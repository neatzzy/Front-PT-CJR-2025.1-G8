import React from 'react'
import FormBox from '../../components/formulario/FormBox'
import Image from 'next/image';

const novoUsuarioPage = () => {
  return (
    <>
      <main style={{ 
        backgroundColor: 'black', 
        margin: '0px',
        padding: '0px',
        boxSizing: 'border-box',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between' }}>
          
          <div style={{ width: '50%', height: '100%', position: 'relative' }}>
            <Image
              src="/image/usuarioImagePage.png"
              alt="alunos"
              fill
              style={{ objectFit: 'cover' }} // ou 'contain', dependendo do efeito desejado
            />
          </div>

          <FormBox />

      </main>
    </>
    
  )
}

export default novoUsuarioPage;