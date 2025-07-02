import React from "react";
import { useState } from "react";
import Select from "react-select";
import { X } from "lucide-react";
import CriarProfessorModal from "./criarProfessormodal";

interface CriarAvaliacaoModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CriarAvaliacaoModal({open, onClose,}: CriarAvaliacaoModalProps) {
    if (!open) return null;

    const [CriarProfessorOpen, setCriarProfessorOpen] = useState<boolean>(false);
    const handleOpenCriarProfessorModal = () => {
        setCriarProfessorOpen(true);
    };
    const handleCloseCriarProfessorModal = () => {
        setCriarProfessorOpen(false);
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center transition-colors bg-black/80">

            <div className="relative bg-green-400 p-7 rounded-lg w-11/12 md:w-2/3  
               lg:w-1/2 xl:w-1/2  max-h-[90vh] overflow-y-auto flex flex-col gap-4"          
            >
                <h1 className="text-2xl text-center font-bold text-white mb-4">
                Nova Avaliação
                </h1>

                <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1 rounded-lg 
                text-gray-400 hover:bg-emerald-500 hover:text-white
                cursor-pointer">
                    <X />
                </button>

                <Select
                    className="cursor-pointer"
                    options={[]} //backend 
                    placeholder="Nome do professor"
                    isClearable 
                    isSearchable 
                    />

                <Select
                    className="cursor-pointer"
                    options={[]} //backend
                    placeholder="Disciplina"
                    isClearable
                    isSearchable
                    />

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
                ></textarea>
                </div>

                <div className="flex justify-between gap-3 mt-4">
                <button 
                    onClick={handleOpenCriarProfessorModal} 
                    className="px-6 py-2 rounded-lg font-semibold bg-gray-300 text-gray-800 cursor-pointer">
                        Adicionar Professor
                </button>
                <button
                    // onClick={handleSubmit} // submeter o formulário
                    className="
                    px-6 py-2 rounded-lg font-semibold
                    bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
                    Avaliar
                </button>
                </div>
                <CriarProfessorModal 
                    open={CriarProfessorOpen}
                    onClose={handleCloseCriarProfessorModal} />
            </div>
        </div>
  );
}