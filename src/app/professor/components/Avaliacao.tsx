import React, { useState } from 'react'
import { FaRegComment , FaRegEdit} from 'react-icons/fa';
import { IoIosTrash } from "react-icons/io";
import Image from 'next/image';
import Comentario from './Comentario';
import { formatDate } from '@/app/utils/format';
import { useRouter } from 'next/navigation'; // CERTO para App Router
import EditarAvaliacao from '@/app/modais/EditarAvaliacao';
import { deleteAvaliacao } from '@/app/utils/api/apiModalAvaliacao';
import Button from '@mui/material/Button';
import { CiCirclePlus } from "react-icons/ci";
import NovoComentarioModal from '@/app/modais/NovoComentario';

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
    reload : () => void;
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
    comentarios, 
    reload, 
} : avaliacao) => {
    const avatarSrc = avatarUser ? `data:image/png;base64,${avatarUser}`: "/image/fotoPerfil.png";
    const [comentariosAbertos, setComentariosAbertos] = useState(false);
    const [openEditAvalicaoModal, setOpenEditAvalicaoModal] = useState<boolean> (false);
    const [openNewCommentModal, setOpenNewCommentModal] = useState<boolean> (false);
    const router = useRouter();

    // Handlers para os ícones
    const handleCommentClick = () => {
        setComentariosAbertos((prev) => !prev);
    };

    const handlerNewComment = () => {
        setOpenNewCommentModal(true);
        
    };

    const handleEditClick = () => {
        setOpenEditAvalicaoModal(true);
        
    };

    const handleTrashClick = async () => {
        const token = localStorage.getItem('token');

        try{
            await deleteAvaliacao(id.toString(), token || undefined);

            setOpenEditAvalicaoModal(false);

            reload();

        }catch (error){
            alert(`Error ao deletar a avaliação ${id}}: ` + error)
        }
        
    };

    const handlerPerfilUserPage = () => {
        router.push(`/usuario/${usuarioAvaliacao}`)
    }


  return (
    <div className='flex flex-row flex-nowrap w-full h-fit bg-[#3eee9a] p-3.5 rounded-2xl border items-start justify-center gap-3'>
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
                <p className='text-gray-700'> · {nomeProfessor} </p>
                <p className='text-gray-700'> · {disciplina} </p>
            </div>

            {/* conteudo da avalicao */}
            <div className='w-full h-fit max-w-full'>
                <p className='text-black text-base h-fit max-w-full break-words'>{conteudo}</p>
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

                {usuarioAutenticado === usuarioAvaliacao && (
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
                )}

            </div>

            < EditarAvaliacao 
                isOpen = {openEditAvalicaoModal}
                onClose={() => setOpenEditAvalicaoModal(false)}
                userId={usuarioAvaliacao}
                avaliacaoId={id}
                conteudoAvaliacao={conteudo}
                reload = {reload}
            /> 

            {/* Renderiza comentários se aberto */}
            {comentariosAbertos && (
                <>
                    <hr className="w-full border-gray-700 border-0.5" />
                    <div className='flex flex-col w-full w-min-fit h-fit p-2 justify-center items-center'>
                        {comentarios
                            .filter(comentario => comentario && comentario.usuarioID)
                            .map(comentario => (
                                <>
                                    <Comentario 
                                        key={comentario.id}
                                        conteudo={comentario.conteudo || ''}
                                        updatedAt={formatDate(comentario.updatedAt)}
                                        userId={comentario.usuarioID}
                                        userNome= {comentario.usuario.nome}
                                        userAvatar= {comentario.usuario.fotoPerfil}
                                    />

                                    {
                                        (comentarios.indexOf(comentario) < (comentarios.length - 1)) &&
                                            (<hr className="w-full border-gray-600 border-0.25" />)
                                    }
                                </>
                            ))
                        }
                        <CiCirclePlus 
                            className='m-2 center'
                            onClick={handlerNewComment}
                            size = {44}
                        />
                    </div>

                    <NovoComentarioModal 
                        isOpen = {openNewCommentModal}
                        onClose={() => setOpenNewCommentModal(false)}
                        userId={usuarioAutenticado}
                        avaliacaoId={id}
                        reload = {reload}
                    />
                </>
            )}
        </div>
      
    </div>
  )
}

export default Avaliacao
