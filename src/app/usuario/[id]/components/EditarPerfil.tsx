import Image from "next/image";
import axios from "axios";
import React from "react";
import { FaCamera } from "react-icons/fa";

interface EditarPerfilModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditarPerfilModal({
  open,
  onClose,
}: EditarPerfilModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo levemente escurecido */}
      <div className="absolute inset-0 bg-[#171717] opacity-40 pointer-events-none" />
      <div className="relative bg-[#ededed] w-[500px] rounded-3xl flex flex-col items-center px-10 py-8 z-10">
        {/* Botão fechar */}
        <button
          className="absolute top-6 right-8 text-4xl text-gray-700 hover:text-black"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        {/* Avatar + Câmera */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ff4fc7] bg-white flex items-center justify-center">
            <Image
              src="/image/fotoPerfil.png"
              alt="Avatar"
              width={128}
              height={128}
            />
          </div>
          <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 border border-gray-300 shadow">
            <FaCamera size={28} className="text-black" />
          </button>
        </div>
        {/* Formulário */}
        <form className="flex flex-col gap-4 w-full items-center">
          <input
            type="text"
            placeholder="Nome"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <input
            type="text"
            placeholder="Curso"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <input
            type="text"
            placeholder="Departamento"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Senha atual"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Nova senha"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
          />
          <button
            type="submit"
            className="mt-4 w-48 h-12 rounded-xl bg-[#a4ffe2] text-gray-800 font-semibold text-xl shadow border border-black hover:bg-[#71d2b6] transition"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
