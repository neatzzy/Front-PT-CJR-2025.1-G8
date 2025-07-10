import React, { useState, useRef } from "react";
import UploadImageProfessor from "./uploadImageProfessor";
import { X } from "lucide-react";
import { createProfessor } from "../utils/api/apiModalProfessor";

interface CriarProfessorModalProps {
    open: boolean;
    onClose: () => void;
    authToken?: string | null;
}

export default function CriarProfessorModal({ open, onClose, authToken}: CriarProfessorModalProps) {
  const [nome, setNome] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreviewUrl, setFotoPreviewUrl] = useState<string | null>(null); 

  const handlePhotoSelect = (file: File | null, previewUrl: string | null) => {
    setFotoFile(file);
    setFotoPreviewUrl(previewUrl);
  };

  const handleSave = async () => {
    if (!nome || !departamento || !disciplina.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const formData = new FormData();
      formData.append('nome', nome);
      formData.append('departamento', departamento);
      formData.append('disciplinaName', disciplina);
      if (fotoFile) {
        formData.append('fotoProfessor', fotoFile);
      }
    try {
        const response = await createProfessor(formData, authToken || undefined);
        console.log('Professor cadastrado com sucesso!', response);
        alert("Professor disponivel para avaliação!");
        onClose();
        setNome("")
        setDepartamento("");
        setDisciplina("");
        setFotoPreviewUrl(null);
        setFotoFile(null);
    }
    catch (error) {
        alert("Erro ao cadastrar Professor.")
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center transition-colors bg-black/30">
      <div className="relative bg-gray-100 p-6 sm:p-8 md:p-10 rounded-lg shadow-2xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3
       max-h-[90vh] overflow-y-auto flex flex-col items-center">
       
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:bg-emerald-500 hover:text-white
          cursor-pointer">    
            <X />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-gray-800">Adicionar Novo Professor</h1> 

        <UploadImageProfessor
          onFileSelect={handlePhotoSelect} />

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"/>

        <input
          type="text"
          placeholder="Departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"/>

        <input
          type="text"
          placeholder="Disciplina(s)"
          value={disciplina}
          onChange={(e) => setDisciplina(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"/>

        <button
          onClick={handleSave}
          className="w-full px-6 py-3 rounded-lg font-bold text-lg bg-green-600 text-white hover:bg-green-700
          focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer">
          Salvar
        </button>

      </div>
    </div>
  );
}