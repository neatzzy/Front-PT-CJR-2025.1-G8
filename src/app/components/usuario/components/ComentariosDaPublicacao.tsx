import React, { useState } from "react";
import Comentario from "@/app/professor/components/Comentario";
import { formatDate } from "@/app/utils/format";
import Protected from "../../Protected";
import { CiCirclePlus } from "react-icons/ci";
import NovoComentarioModal from "@/app/modais/NovoComentario";

interface ComentariosDaPublicacaoProps {
  isOpen : boolean;
  comentarios: any[];
  avaliacaoId: number;
  loggedInUserId: number | null;
  reload: () => void;
}

const ComentariosDaPublicacao = ({
  isOpen,
  comentarios,
  avaliacaoId,
  loggedInUserId,
  reload,
}: ComentariosDaPublicacaoProps) => {
  const [openNewCommentModal, setOpenNewCommentModal] = useState(false);

  const handlerNewComment = () => setOpenNewCommentModal(true);

  return (
    <>
      {isOpen && (
        <>
          <hr className="w-full border-gray-700 border-0.5" />
          <div className='flex flex-col w-full w-min-fit h-fit p-2 justify-center items-center'>
            {comentarios
              .filter((comentario: any) => comentario && comentario.usuarioID)
              .map((comentario: any, index: number, arr: any[]) => (
                <React.Fragment key={comentario?.id}>
                  <Comentario
                    key={comentario?.id}
                    comentarioId={comentario?.id}
                    conteudo={comentario?.conteudo || ''}
                    updatedAt={formatDate(comentario?.updatedAt)}
                    userId={comentario?.usuarioID}
                    userNome={comentario?.usuario.nome}
                    userAvatar={comentario?.usuario.fotoPerfil}
                  />
                  {index < arr.length - 1 && (
                    <hr className="w-full border-gray-600 border-0.25" />
                  )}
                </React.Fragment>
              ))}
            <Protected singin={true}>
              <CiCirclePlus
                className='m-2 center cursor-pointer hover:text-black transition-colors'
                onClick={handlerNewComment}
                size={44}
              />
            </Protected>
          </div>
          <NovoComentarioModal
            isOpen={openNewCommentModal}
            onClose={() => setOpenNewCommentModal(false)}
            userId={loggedInUserId}
            avaliacaoId={avaliacaoId}
            reload={reload}
          />
        </>
      )}
    </>
  );
};

export default ComentariosDaPublicacao;