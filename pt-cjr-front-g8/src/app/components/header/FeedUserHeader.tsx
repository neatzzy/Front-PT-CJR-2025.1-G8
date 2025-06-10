import React from 'react';
import Image from 'next/image';


const FeedUserHeader = () => {
  return (
   <header style={{
    backgroundColor: '#a4fed3',
    height: '10%',
    width: '100%',
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'row',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
   }}>

    <div
      style={{
        height: '100%',
        width: 'auto',
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px', // Espaço entre a imagem e o conteúdo à direita
      }}
    >
      <Image
        src="/image/UnbLogo.png"
        alt="LogoUnB"
        width={60}
        height={60}
      />
    </div>
      <a href='/login'>
        <button 
          style={{
            backgroundColor: '#00ABED',
            color: 'white',
            padding: '10px 20px',
            border: 'solid 2px #ffffff',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease',
            height: '100%',
            width: 'fit-content',
            minWidth: '35px',
          }}
          
        > 
          Login
        </button>
      </a>

   </header>
  )
}

export default FeedUserHeader;
