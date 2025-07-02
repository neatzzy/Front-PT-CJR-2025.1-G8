import React from "react";
import { editAvaliacao } from "@/app/utils/api/apiModalAvaliacao"; 
import { useState } from "react";

interface EditarAvaliacaoProps {
    open: boolean;
    onClose: () => void;
    authToken?: string | undefined;
    avaliacaoId: number | null;
}  

export default function EditarAvaliacao({open, onClose, authToken, avaliacaoId}: EditarAvaliacaoProps) {
    if (!open) return null;

    const [avaliacaoText, setAvaliacaoText] = useState<string>("");

    const handleUpdate = async () => {
        if (avaliacaoId == null) {
            console.error("ID da avaliação para edição é nulo.");
            alert("Não foi possível editar a avaliação: ID não fornecido.");
            onClose();
            return;
        }

        if (!avaliacaoText || avaliacaoText.trim() === "") {
            console.error("Preencha o campo para fazer uma edição.");
            alert("Preencha o campo para fazer uma edição.");
            return;
        }

        const updateAvaliacaoData = {
            conteudo: avaliacaoText
        }

        try {
            const response = await editAvaliacao(String(avaliacaoId), updateAvaliacaoData, authToken);
            console.log('Avaliação editada com sucesso!', response);
            alert("Avaliação Editada com sucesso!");
            onClose();
        } catch (error) {
            console.error(`Erro ao editar avaliação ${avaliacaoId}:`, error);
            alert('Ocorreu um erro ao editar a avaliação. Tente novamente.');
            onClose();
        }
    };

    return(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-yellow-200 rounded-lg p-6 shadow-xl max-w-150 w-full">

        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Editar Avaliação</h2>

        <div className="bg-white rounded-lg p-2 border border-yellow-400">
                <div className="flex gap-2 mb-2 bg-yellow-700 p-2 rounded-lg">
                    <button className="font-bold p-1 rounded hover:bg-gray-100">B</button>
                    <button className="italic p-1 rounded hover:bg-gray-100">I</button>
                    <button className="p-1 rounded hover:bg-gray-100">📷</button>
                </div>
                <textarea
                    className="w-full h-57 p-4 rounded-lg border border-gray-200 text-gray-800
                            resize-y"
                    placeholder="Reescreva sua avaliação aqui..."
                    value={avaliacaoText}
                    onChange={(e) => setAvaliacaoText(e.target.value)}
                ></textarea>
                </div>
    
        <div className="flex justify-center space-x-95 mt-4">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpdate}
            className="cursor-pointer px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
    );
}