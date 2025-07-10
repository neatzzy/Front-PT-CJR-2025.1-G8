import React from "react";
import { useState } from "react"; 
import { editDisciplina } from "@/app/utils/api/apiModalProfessor";
import Image from "next/image";
import { X } from "lucide-react";

interface AdicionarDisciplinasProps {
    open: boolean;
    onClose: () => void;
    authToken?: string | undefined;
    professorId: number | null;
    professorFoto: string; 
    reload: () => void;
}   

export default function AdicionarDisciplinas({open, onClose, authToken, professorId, professorFoto, reload}: AdicionarDisciplinasProps) {
    if (!open) return null;
    const [disciplinaName, setDisciplinaName] = useState<string>('');
    const fotoP = professorFoto ? `data:image/png;base64,${professorFoto}` : "/image/fotoPerfil.png";

    const handleDisciplina = async() => {
        if (professorId== null) {
            console.error("ID do professor esta nulo.");
            alert("Não foi possível adicionar disciplina: ID não fornecido.");
            onClose();
            return;
        }
        
        try {
            const response = await editDisciplina(String(professorId), disciplinaName, authToken);
            console.log('Disciplina adicionada com sucesso!', response);
            alert("Disciplina adicionada com sucesso!");
            onClose();
            reload();
        }catch(error){
            console.error(`Erro ao adicionar disciplina ${professorId}:`, error);
            alert('Ocorreu um erro ao adicionar disciplina. Tente novamente.');
            onClose();
        }
    };

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-50">
      <div className="relative bg-blue-300 rounded-lg p-6 shadow-xl max-w-md w-full flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-blue-500 hover:text-white cursor-pointer"
        >
          <X />
        </button>

        <div className="mb-4 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={fotoP}
              alt="Avatar do Professor"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        </div>

        <p className="text-gray-800 text-center mb-4">Adicione uma Disciplina para esse professor:</p>
        <input
          type="text"
          placeholder="Nome da Disciplina"
          value={disciplinaName}
          onChange={(e) => setDisciplinaName(e.target.value)}
          className="w-full p-2 border border-cyan-800 bg-white text-black rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-center space-x-4 w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleDisciplina}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>        
    );
}