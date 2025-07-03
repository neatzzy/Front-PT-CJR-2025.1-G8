import React from 'react'
import Image from "next/image";
import { FaBuilding, FaBookOpen } from "react-icons/fa";


interface PerfilProfessorProps {
  nome: string;
  departamento: string;
  disciplinas : any[];
  avatar: string;
  onAddDisciplineClick: () => void;
}


const PerfilProfessor = ({
  nome,
  departamento,
  disciplinas,
  avatar,
  onAddDisciplineClick,
}: PerfilProfessorProps) => {

    const avatarSrc = avatar ? `data:image/png;base64,${avatar}` : "/image/fotoPerfil.png";

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

      {/* Infos */}
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
          className="w-30 h-6 mp-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          + Disciplinas
        </button>
        </div>

    </div>
  )
}

export default PerfilProfessor;
