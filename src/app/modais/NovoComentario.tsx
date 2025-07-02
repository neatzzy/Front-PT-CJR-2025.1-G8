import React, { useState } from 'react'
import { postComentario } from '../utils/api/apiComentario'

interface NovoComentarioModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId?: number | null;
    avaliacaoId ?: number | null;
    reload : () => void;

}

const NovoComentarioModal = ({
    isOpen,
    onClose, 
    userId,
    avaliacaoId,
    reload,
}: NovoComentarioModalProps) => {
    if (!isOpen) return null;

    const [commentText, setCommentText] = useState<string>('');

    const handlerNewComment = async () => {
        if (avaliacaoId == null) {
            alert("ID da avaliação não encontrado.");
            return;
        }
        const token = localStorage.getItem('token');
        const createComentarioDto = {
            avaliacaoId : Number(avaliacaoId), 
            userId : Number(userId),
            conteudo : commentText,
        }

        try{
            await postComentario(
                createComentarioDto, 
                token || undefined
            );

            onClose();

            reload();

        }catch (error){
            alert(`Error ao criar o comentário` + error)
        }
        
    }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center transition-colors bg-black/80">

            <div className="relative bg-green-400 p-7 rounded-lg w-11/12 md:w-2/3  
               lg:w-1/2 xl:w-1/2  max-h-[90vh] overflow-y-auto flex flex-col gap-4"          
            >

                <div className="bg-white rounded-lg p-2 border border-gray-400">
                <div className="flex gap-2 mb-2 bg-emerald-700 p-1 rounded-lg">
                    <button className="font-bold p-1 rounded hover:bg-gray-100">B</button>
                    <button className="italic p-1 rounded hover:bg-gray-100">I</button>
                    <button className="p-1 rounded hover:bg-gray-100">📷</button>
                </div>
                <textarea
                    className="w-full h-57 p-4 rounded-lg border border-gray-200 text-gray-800
                            resize-y"
                    placeholder="Escreva seu comentário aqui..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                </div>

                <div className="flex flex-row w-full h-fit justify-between gap-3 items-center">
                    <div className="flex flex-row w-fit justify-between gap-3 h-fit">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2 rounded-lg font-semibold bg-gray-300 text-gray-800 cursor-pointer"
                            >
                                Cancelar
                        </button>
                        <button
                            onClick={handlerNewComment}
                            className="
                            px-6 py-2 rounded-lg font-semibold
                            bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
                            Comentar
                        </button>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default NovoComentarioModal


