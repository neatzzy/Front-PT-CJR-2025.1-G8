import React, { useState } from 'react'
import { IoIosTrash } from 'react-icons/io';
import { deleteAvaliacao } from '../utils/api/apiModalAvaliacao';
import { patchAvaliacao } from '../utils/api/apiAvaliacao';

interface EditarAvaliacaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId?: number | null;
    avaliacaoId ?: number | null;
    conteudoAvaliacao ?: string | null;
    reload : () => void;

}

const EditarAvaliacao = ({
    isOpen,
    onClose, 
    userId,
    avaliacaoId,
    conteudoAvaliacao, 
    reload,
}: EditarAvaliacaoModalProps) => {
    if (!isOpen) return null;
    const [avaliacaoText, setAvaliacaoText] = useState<string>(conteudoAvaliacao || '');


    const handleTrashClick = async () => {
        const token = localStorage.getItem('token');

        if (avaliacaoId == null) {
            alert("ID da avaliação não encontrado.");
            return;
        }

        try {
            await deleteAvaliacao(avaliacaoId.toString(), token || undefined);

            onClose();

            reload();

        } catch (error) {
            alert(`Error ao deletar a avaliação ${avaliacaoId}: ` + error)
        }
        
    };

    const handlerEdit = async () => {
        if (avaliacaoId == null) {
            alert("ID da avaliação não encontrado.");
            return;
        }
        const token = localStorage.getItem('token');
        const avaliacaoDTO = {
            id : avaliacaoId, 
            conteudo : avaliacaoText,
        }

        try{
            await patchAvaliacao(avaliacaoId.toString(), avaliacaoDTO, token || undefined);

            onClose();

            reload();

        }catch (error){
            alert(`Error ao alterar avaliação ${avaliacaoId}: ` + error)
        }
        
    }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center transition-colors bg-black/80">

            <div className="relative bg-green-400 p-7 rounded-lg w-11/12 md:w-2/3  
               lg:w-1/2 xl:w-1/2  max-h-[90vh] overflow-y-auto flex flex-col gap-4"          
            >
                <h1 className="text-2xl text-center font-bold text-white mb-4">
                    Editar Avaliação
                </h1>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg 
                    text-gray-400 hover:bg-emerald-500 hover:text-white
                    cursor-pointer">
                </button>


                <div className="bg-white rounded-lg p-2 border border-gray-400">
                <div className="flex gap-2 mb-2 bg-emerald-700 p-1 rounded-lg">
                    <button className="font-bold p-1 rounded hover:bg-gray-100">B</button>
                    <button className="italic p-1 rounded hover:bg-gray-100">I</button>
                    <button className="p-1 rounded hover:bg-gray-100">📷</button>
                </div>
                <textarea
                    className="w-full h-57 p-4 rounded-lg border border-gray-200 text-gray-800
                            resize-y"
                    placeholder="Escreva sua avaliação aqui..."
                    value={avaliacaoText}
                    onChange={(e) => setAvaliacaoText(e.target.value)}
                ></textarea>
                </div>

                <div className="flex flex-row w-full h-fit justify-between gap-3 items-center">
                    <IoIosTrash 
                        color="black" 
                        size={48} 
                        style={{ cursor: "pointer" }} 
                        onClick={handleTrashClick}
                    />

                    <div className="flex flex-row w-fit justify-between gap-3 h-fit">
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2 rounded-lg font-semibold bg-gray-300 text-gray-800 cursor-pointer"
                            >
                                Cancelar
                        </button>
                        <button
                            onClick={handlerEdit}
                            className="
                            px-6 py-2 rounded-lg font-semibold
                            bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
                            Avaliar
                        </button>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default EditarAvaliacao
