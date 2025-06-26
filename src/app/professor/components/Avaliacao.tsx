import React, { useState } from 'react'
import { FaRegComment , FaRegEdit} from 'react-icons/fa';
import { IoIosTrash } from "react-icons/io";
import Image from 'next/image';
import Protected from '@/app/components/Protected';
import Comentario from './Comentario';
import { formatDate } from '@/app/utils/format';

interface avaliacao{
    id : number;
    usuarioAutenticado : number;
    usuarioAvaliacao : number;
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
    usuarioAutenticado,
    usuarioAvaliacao,
    avatarUser,
    nomeUser,
    updatedAt,
    nomeProfessor,
    disciplina, 
    conteudo, 
    comentarios
} : avaliacao) => {
    const avatarSrc = avatarUser ? `data:image/png;base64,${avatarUser}`: "/image/fotoPerfil.png";
    const [comentariosAbertos, setComentariosAbertos] = useState(false);

    // Handlers para os ícones
    const handleCommentClick = () => {
        setComentariosAbertos((prev) => !prev);
    };

    const handleEditClick = () => {
        // ação ao clicar em editar
        alert('Editar avaliação ' + id);
    };

    const handleTrashClick = () => {
        // ação ao clicar em deletar
        alert('Deletar avaliação ' + id);
    };

    console.log("usuario logado: " + usuarioAutenticado);

    console.log("usuario avalicao: " + usuarioAvaliacao);

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
            <div className='flex flex-row gap-4 h-fit w-full items-center justify-between'>
                <div className='flex flex-row gap-4 w-fit items-center'>
                    <FaRegComment 
                        color="black" 
                        size={28} 
                        style={{ cursor: "pointer" }} 
                        onClick={handleCommentClick}
                    />
                    <p className='w-fit text-black text-base'>{comentarios.length} comentários</p>
                </div>

            </div>

            {
                usuarioAutenticado === usuarioAvaliacao && (
                    <div className='flex flex-row gap-4 w-fit items-center'>
                        <FaRegEdit 
                            color="black" 
                            size={28} 
                            style={{ cursor: "pointer" }} 
                            onClick={handleEditClick}
                        />
                        <IoIosTrash 
                            color="black" 
                            size={32} 
                            style={{ cursor: "pointer" }} 
                            onClick={handleTrashClick}
                        />
                    </div>
                )
            }

            {/* Renderiza comentários se aberto */}
            {comentariosAbertos && (
                <div className='w-full w-min-fit h-fit p-2'>
                    {comentarios
                        .filter(comentario => comentario &&
                            comentario.usuarioID
                        )
                        .map(comentario => (
                            <Comentario 
                                key={comentario.id}
                                conteudo={comentario.conteudo || ''}
                                updatedAt={formatDate(comentario.updatedAt)}
                                userId={comentario.usuarioID}
                            />
                        ))
                    }
                </div>
            )}
        </div>
      
    </div>
  )
}

export default Avaliacao
