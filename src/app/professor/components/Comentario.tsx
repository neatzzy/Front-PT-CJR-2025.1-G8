import React , {useEffect, useState} from 'react'
import Image from 'next/image';
import { getUserById } from '@/app/utils/api/apiUser';
import { useRouter } from 'next/navigation'; // CERTO para App Router

interface ComentarioProps {
    comentarioId: number;
    conteudo : string;
    updatedAt : string;
    userId : number;
    userNome : string;
    userAvatar : string;
}

const Comentario = ({
    conteudo, 
    updatedAt,
    userId,
    userNome, 
    userAvatar
}: ComentarioProps) => {
    const router = useRouter();

    // Fallbacks in case user data is not loaded yet
    const avatarSrc = userAvatar ? 
        `data:image/png;base64,${userAvatar}`
        : "/image/fotoPerfil.png";
        
    const nomeUser = userNome || '';

    const handlerPerfilUserPage = () => {
        router.push(`/usuario/${userId}`)
    }

    return (
    <>
        <div className='flex flex-row flex-nowrap w-full h-fit bg-[#3eee9a] p-3.5 rounded-x1 items-start justify-center gap-3'>
            {/* foto de perfil do user que fez a avaliacao */}
            <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image src={avatarSrc} 
                    alt="Avatar" 
                    width={32} 
                    height={32} 
                    onClick={handlerPerfilUserPage}
                />
            </div>

            {/* conteudo principal */}
            <div className='flex flex-col w-full h-fit gap-2'>
                {/*infos de usuarios da avalicao */}
                <div className='flex flex-row justify-center items-start w-fit w-max-full h-fit flex-wrap text-1g gap-1'
                    onClick={handlerPerfilUserPage}
                >
                    <p className='text-black font-semibold'>{nomeUser} </p>
                    <p className='text-gray-700'> · {updatedAt} </p>
                </div>

                {/* conteudo da avalicao */}
                <div className='w-full h-fit'>
                    <p className='text-black text-base h-fit max-w-full break-words'>{conteudo}</p>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Comentario
