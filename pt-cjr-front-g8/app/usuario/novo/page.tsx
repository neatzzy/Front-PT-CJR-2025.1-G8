import React from 'react'
import FormBox from '../../components/formulario/FormBox'
import Image from 'next/image';

const novoUsuarioPage = () => {
  return (
    <>
      <main style={{ 
        backgroundColor: 'black', 
        borderRadius: '10px', 
        borderWidth: "3px",
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between' }}>
          
          <div style={{ maxWidth: '50%', height: 'auto' }}>
          <Image
            src="/image/usuarioImagePage.png"
            alt="alunos"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>

          <FormBox />

      </main>
    </>
    
  )
}

export default novoUsuarioPage;
