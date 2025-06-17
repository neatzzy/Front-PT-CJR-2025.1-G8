import Image from "next/image";
import React from "react";
import Select from "react-select";
import { X } from "lucide-react";

interface CriarAvaliacaoModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CriarAvaliacaoModal({open, onClose,}: CriarAvaliacaoModalProps) {
    if (!open) return null;

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
                className="absolute top-2 right-2 p-1 rounded-lg text-white hover:bg-emerald-500 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer">
                    <X />
                </button>

                <Select
                    options={[]} //backend 
                    placeholder="Nome do professor"
                    isClearable 
                    isSearchable 
                    />

                <Select
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
                            focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-y"
                    placeholder="Escreva sua avaliação aqui..."
                ></textarea>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                <button
                    // onClick={handleSubmit} // submeter o formulário
                    className="
                    px-6 py-2 rounded-lg font-semibold
                    bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    Avaliar
                </button>
                </div>
            </div>
        </div>
  );
}