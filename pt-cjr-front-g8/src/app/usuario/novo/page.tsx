import React from 'react'
import FormBox from '../../components/formulario/FormBox'
import Image from 'next/image';

const novoUsuarioPage = () => {
  return (
 
      <main style={{ 
        display: 'flex',
        padding: '0px',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100vh' }}>
          
          <Image
            src="/image/usuarioImagePage.png"
            alt="alunos"
            width={800}
            height={600}
            style={{ width: '50%', height: 'auto' }} 
          />
          
          <FormBox />

      </main>
    
  )
}

export default novoUsuarioPage;