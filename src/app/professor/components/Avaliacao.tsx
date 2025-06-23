import React from 'react'
import { FaRegComment } from 'react-icons/fa';
import Image from 'next/image';

interface avaliacao{
    id : number;
    avatarUser : string; 
    nomeUser : string;
    updatedAt : string;
    nomeProfessor : string; 
    disciplina : string; 
    conteudo : string;
    comentarios : any[];

}

const Avaliacao = ({
    id,
    avatarUser,
    nomeUser,
    updatedAt,
    nomeProfessor,
    disciplina, 
    conteudo, 
    comentarios
} : avaliacao) => {
     const avatarSrc = avatarUser ? avatarUser : "/image/fotoPerfil.png";

  return (
    <div className='flex flex-row flex-nowrap w-full h-fit bg-[#3eee9a] p-3.5 rounded-x1 items-start justify-center gap-3'>
        {/* foto de perfil do user que fez a avaliacao */}
        <div className="w-8 h-8 rounded-full">
            <Image src={avatarSrc} alt="Avatar" width={32} height={32} />
        </div>

        {/* conteudo principal */}
        <div className='flex flex-col w-full h-fit gap-2'>
            {/*infos de usuarios da avalicao */}
            <div className='flex flex-row justify-center items-start w-fit w-max-full h-fit flex-wrap text-1g gap-1'>
                <p className='text-black font-semibold'>{nomeUser} </p>
                <p className='text-gray-700'> · {updatedAt} </p>
                <p className='text-gray-700'> · {nomeProfessor} </p>
                <p className='text-gray-700'> · {disciplina} </p>

            </div>

            {/* conteudo da avalicao */}
            <div className='w-full h-fit'>
                <p className='text-black text-base'>{conteudo}</p>
            </div>

            {/* comentarios da avalicao */}
            <div className='flex flex-row gap-4 h-fit w-full items-center justify-start'>
                < FaRegComment />
                <p className='w-fit text-black text-base'>{comentarios.length} comentários</p>

            </div>

        </div>
      
    </div>
  )
}

export default Avaliacao
