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
        minHeight: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between' }}>
          
          <Image
            src="/image/usuarioImagePage.png"
            alt="alunos"
            width={800}
            height={600}
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          
          <FormBox />

      </main>
    </>
    
  )
}

export default novoUsuarioPage;