import React from "react";
import Image from "next/image";
import { FaBuilding, FaEnvelope } from "react-icons/fa";

interface PerfilProps {
  nome: string;
  curso: string;
  departamento: string;
  email: string;
  avatar: string;
  onEditar: () => void;
  onExcluir: () => void;
  showButtons?: boolean;
}

export default function Perfil({
  nome,
  curso,
  departamento,
  email,
  avatar,
  onEditar,
  onExcluir,
  showButtons,
}: PerfilProps) {
  const avatarSrc = avatar
    ? `data:image/png;base64,${avatar}`
    : "/image/fotoPerfil.png";

  return (
    <div className="w-[600px] bg-white rounded-b-xl shadow-md border border-gray-300">
      {/* Banner */}
      <div className="relative bg-[#3eee9a] h-36 rounded-t-xl flex items-center">
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
            <Image src={avatarSrc} alt="Avatar" width={128} height={128} />
          </div>
        </div>
      </div>
      {/* Info + Botões */}
      <div className="pt-20 pb-6 px-8 flex flex-col gap-2 relative">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col items-start mt-2">
            <h2 className="text-2xl font-bold text-gray-800">{nome}</h2>
            <div className="flex items-center gap-2 mt-2 text-gray-700">
              <FaBuilding />
              <span>
                {curso} / Dept. {departamento}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-gray-700">
              <FaEnvelope />
              <span>{email}</span>
            </div>
          </div>
          {showButtons && (
            <div className="flex flex-col gap-2 items-end">
              <button
                className="cursor-pointer bg-[#a4ffe2] border border-black text-[#179478] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#71d2b6] transition active:scale-95 w-[140px]"
                onClick={onEditar}
                type="button"
              >
                Editar Perfil
              </button>
              <button
                className="cursor-pointer bg-[#ffb6b6] border border-black text-[#b94a4a] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#ff8a8a] transition active:scale-95 w-[140px]"
                onClick={onExcluir}
                type="button"
              >
                Excluir Perfil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
