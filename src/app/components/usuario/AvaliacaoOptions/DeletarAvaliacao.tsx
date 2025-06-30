import React from "react";
import { deleteAvaliacao } from "@/app/utils/api/apiModalAvaliacao";


interface DeletarAvaliacaoProps {
    open: boolean;
    onClose: () => void;
    authToken?: string | undefined;
    pubId?: string | null;
} 

export default function DeletarAvaliacao({open, onClose, authToken, pubId}: DeletarAvaliacaoProps) {
    if (!open) return null;

    const handleRemove = async () => {
        if (!pubId) {
            alert('ID da avaliação inválida.');
            return;
        }
        try {
            const response = await deleteAvaliacao(pubId, authToken);
            console.log('Avaliação removida com sucesso!', response);
            alert("Avaliação Deletada com sucesso!");
            onClose();
        } catch (error) {
            alert('Erro ao Deletar Professor');
        }
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">

        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Excluir Avaliação</h2>
        <p className="text-gray-700 text-center mb-6">Você tem certeza que deseja excluir essa avaliação?</p>
    
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleRemove}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
    );
}