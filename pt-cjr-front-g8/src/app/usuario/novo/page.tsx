import React from 'react'
import FormBox from '../../components/formulario/FormBox'
import Image from 'next/image';

const novoUsuarioPage = () => {
  return (
 
      <main style={{ 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center' }}>
          
          <Image
            src="/image/usuarioImagePage.png"
            alt="alunos"
            width={800}
            height={600}
            style={{ maxWidth: '50%', height: 'auto' }} 
          />
          
          <FormBox />

      </main>
    
  )
}

export default novoUsuarioPage;