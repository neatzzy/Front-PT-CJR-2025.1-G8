import React from "react";
import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { X } from "lucide-react";
import CriarProfessorModal from "./criarProfessormodal";
import { fetchProfessors, createAvaliacao, fetchDisciplinasbyProfessor } from "../utils/api/apiModalAvaliacao";
import { layoutBuscadinamica } from "./utils/layoutBuscadinamica";

interface CriarAvaliacaoModalProps {
    open: boolean;
    onClose: () => void;
    authToken?: string | undefined;
    userId?: number | null;
}

interface SelectOption {
    value: any;
    label: string;
}

export default function CriarAvaliacaoModal({open, onClose, authToken, userId}: CriarAvaliacaoModalProps) {
    if (!open) return null;

    const [CriarProfessorOpen, setCriarProfessorOpen] = useState<boolean>(false);
    const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
    const [selectedDisciplina, setSelectedDisciplina] = useState<any>(null);
    const [avaliacaoText, setAvaliacaoText] = useState<string>("");


    const handleOpenCriarProfessorModal = () => {
        setCriarProfessorOpen(true);
    };
    const handleCloseCriarProfessorModal = () => {
        setCriarProfessorOpen(false);
    }

    const ProfessorOptions = async (inputValue: string) => {
        if (inputValue.length <2 && !selectedProfessor) { 
            return [];
        }
        const professors = await fetchProfessors(inputValue, authToken); 
        const Options = professors.map((prof: any) => ({
            value: prof.id,
            label: prof.nome,
        }));
        return Options;
    };

    const DisciplinaOptions = async (inputValue: string, callback: (options: SelectOption[]) => void): Promise<SelectOption[]> => {
  if (!selectedProfessor) {
    return [];
  }
  try {
    const disciplinas = await fetchDisciplinasbyProfessor(selectedProfessor.value, inputValue, authToken);
    const formattedOptions: SelectOption[] = disciplinas.map((disc: any) => ({ value: disc.id, label: disc.nome }));
    return formattedOptions;
  } catch (error) {
    console.error("Erro ao carregar opções de disciplina:", error);
    return [];
  }
};
    const handleSubmit = async () => {
        if (!selectedProfessor || !selectedDisciplina || !avaliacaoText || userId === null) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
        const avaliacaoData = {
            professorId: selectedProfessor.value,
            disciplinaId: selectedDisciplina.value,
            conteudo: avaliacaoText,
            userId: userId
        }
        try {
            const response = await createAvaliacao(avaliacaoData, authToken || undefined);
            console.log('Avaliação enviada com sucesso!', response);
            alert("Avaliação criada com sucesso!");
            onClose();
            setSelectedProfessor(null);
            setSelectedDisciplina(null);
            setAvaliacaoText("");
        }
        catch (error) {
            alert("Erro ao criar avaliação.");
        }
    };


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

                <AsyncSelect
                    classNames={layoutBuscadinamica}
                    loadOptions={ProfessorOptions}
                    defaultOptions
                    cacheOptions
                    placeholder="Nome do professor"
                    isClearable 
                    isSearchable 
                    onChange={(option) => {setSelectedProfessor(option); setSelectedDisciplina(null);}}
                    value={selectedProfessor}
                    />

                <AsyncSelect
                    classNames={layoutBuscadinamica}
                    loadOptions={DisciplinaOptions} 
                    defaultOptions={false}
                    cacheOptions
                    placeholder={selectedProfessor ? "Selecione a Disciplina" : "Selecione um Professor Primeiro"}
                    isClearable
                    isSearchable
                    onChange={setSelectedDisciplina}
                    value={selectedDisciplina}
                    isDisabled={!selectedProfessor}
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
                    value={avaliacaoText}
                    onChange={(e) => setAvaliacaoText(e.target.value)}
                ></textarea>
                </div>

                <div className="flex justify-between gap-3 mt-4">
                <button 
                    onClick={handleOpenCriarProfessorModal} 
                    className="px-6 py-2 rounded-lg font-semibold bg-gray-300 text-gray-800 cursor-pointer">
                        Adicionar Professor
                </button>
                <button
                    onClick={handleSubmit}
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