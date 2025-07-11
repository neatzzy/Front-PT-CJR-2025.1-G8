import React from 'react'
import Image from "next/image";
import { FaBuilding, FaBookOpen } from "react-icons/fa";
import { useRef, useState } from 'react';
import { updateProfessorPhoto } from '@/app/utils/api/apiModalProfessor'; 


interface PerfilProfessorProps {
  nome: string;
  departamento: string;
  disciplinas : any[];
  avatar: string;
  onAddDisciplineClick: () => void;
  professorId: number;
  isAdmin: boolean;
  onDeleteProfessorClick: (id: number) => void;
  onEditarFoto?: (id: number) => void;
  token?: string | null; 
}


const PerfilProfessor = ({
  nome,
  departamento,
  disciplinas,
  avatar,
  onAddDisciplineClick,
  professorId,
  isAdmin,
  onDeleteProfessorClick,
  onEditarFoto,
  token,
}: PerfilProfessorProps) => {

  const avatarSrc = avatar ? `data:image/png;base64,${avatar}` : "/image/fotoPerfil.png";
  const fileInputRef = useRef<HTMLInputElement>(null); 


  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (!file) {
      return; 
    }
    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
      const pureBase64 = base64String.split(',')[1];
      await updateProfessorPhoto(professorId, pureBase64, token ?? undefined);
      alert('Foto atualizada com sucesso!');

    } catch (err: any) {
      console.error('Erro ao atualizar foto:', err); 
      alert('Erro ao atualizar foto. Tente novamente.');
    }
  }

  const handleEditPhotoButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };
    
  return (
    <div className='w-full h-fit flex flex-col '> 
      {/* Banner */}
        <div className="relative bg-[#3eee9a] h-36 rounded-t-xl flex items-center">
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
                    <Image src={avatarSrc} alt="Avatar" width={128} height={128} />
                </div>
            </div>
        </div>

        <div className='bg-white h-fit flex flex-col w-full p-10 pt-18'>
            <h2 className="text-2xl font-bold text-gray-800 text-center">{nome}</h2>
             
             <div className="flex items-center gap-2 mt-2 text-gray-700">
                <FaBuilding />
                <span>
                    Dept. {departamento}
                </span>
            </div>

           <div className="flex flex-row justify-start items-center gap-2 mt-2 mb-3 text-gray-700 h-fit w-fit w-max-full flex-wrap">
                <FaBookOpen />
                {disciplinas.map((disciplina, idx) => (
                    <span key={idx}>
                        {disciplina}
                        {idx < disciplinas.length - 1 ? ', ' : ''}
                    </span>
                ))}
            </div>
            <button
          onClick={onAddDisciplineClick} 
          className="w-30 h-6 mp-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          + Disciplinas
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          style={{ display: 'none' }}
        />

        {isAdmin && (
          <button
            onClick={handleEditPhotoButtonClick} 
            className="w-full py-2 px-4 mt-2 bg-green-200 hover:bg-green-300 text-green-700 font-semibold rounded focus:outline-none focus:shadow-outline cursor-pointer text-center
                       border border-green-700" 
            type="button"
          >
            Editar Foto Professor
          </button>
        )}
        {isAdmin && (
          <button
            onClick={() => onDeleteProfessorClick(professorId)}
            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline cursor-pointer text-center text-sm border border-red-700"
            type="button"
          >
            Excluir Discente
          </button>
        )}
        </div>

    </div>
  )
}

export default PerfilProfessor;
