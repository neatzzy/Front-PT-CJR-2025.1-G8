import React from "react";
import { deleteAvaliacao } from "@/app/utils/api/apiModalAvaliacao";


interface DeletarAvaliacaoProps {
    open: boolean;
    onClose: () => void;
    authToken?: string | undefined;
    avaliacaoId: number | null;
    reload: () => void;
} 

export default function DeletarAvaliacao({open, onClose, authToken, avaliacaoId, reload}: DeletarAvaliacaoProps) {
    if (!open) return null;

    const handleRemove = async () => {
        if (avaliacaoId == null) {
            console.error("ID da avaliação para exclusão é nulo.");
            alert("Não foi possível excluir a avaliação: ID não fornecido.");
            onClose();
            return;
        } 
        
        try{
            const response = await deleteAvaliacao(String(avaliacaoId), authToken ?? undefined)
            console.log('Avaliação removida com sucesso!', response);
            alert("Avaliação Deletada com sucesso!");
            onClose();
            reload();
        }catch(error) {
            console.error(`Erro ao excluir avaliação ${avaliacaoId}:`, error);
            alert('Ocorreu um erro ao excluir a avaliação. Tente novamente.');
            onClose();
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