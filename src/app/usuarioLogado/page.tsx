"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaBell,
  FaSignOutAlt,
  FaBuilding,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import Publicacoes from "./components/publicacoes";
import EditarPerfilModal from "./components/editarPerfil";

export default function PerfilPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#e5fdf1] flex flex-col">
      {/* Header */}
      <header className="w-full h-20 bg-[#a4ffe2] flex items-center justify-between px-8">
        <Image src="/image/UnbLogo.png" alt="UnB Logo" width={60} height={60} />
        <div className="flex items-center gap-8">
          <FaBell size={28} className="text-black" />
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#22a27a]">
            <Image
              src="/image/fotoPerfil.png"
              alt="Avatar"
              width={48}
              height={48}
            />
          </div>
          <FaSignOutAlt size={28} className="text-black" />
        </div>
      </header>

      {/* Conteúdo central */}
      <section className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="w-1/5 bg-[#e5fdf1] flex flex-col items-center pt-10">
          <button className="bg-white rounded-full p-3 shadow-md border border-black">
            <FaArrowLeft size={32} />
          </button>
        </aside>

        {/* Perfil */}
        <div className="flex-1 flex flex-col items-center pt-10">
          <div className="w-[600px] bg-white rounded-b-xl shadow-md border border-gray-300">
            {/* Banner + Avatar */}
            <div className="relative bg-[#4fffc7] h-36 rounded-t-xl flex items-end justify-center">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
                  <Image
                    src="/image/fotoPerfil.png"
                    alt="Avatar"
                    width={128}
                    height={128}
                  />
                </div>
              </div>
            </div>
            {/* Info + Botões */}
            <div className="pt-20 pb-6 px-8 flex flex-col items-center">
              <div className="flex w-full justify-end gap-4 mb-2">
                <button
                  className="bg-[#a4ffe2] border border-black text-[#179478] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#71d2b6] transition"
                  onClick={() => setModalOpen(true)}
                >
                  Editar Perfil
                </button>
                <button className="bg-[#ffb6b6] border border-black text-[#b94a4a] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#ff8a8a] transition">
                  Excluir Perfil
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Simpson Gamer
              </h2>
              <div className="flex items-center gap-2 mt-2 text-gray-700">
                <FaBuilding />
                <span>Ciência da Computação / Dept. Ciência da Computação</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-gray-700">
                <FaEnvelope />
                <span>simpson.gamer.25@cjr.org.br</span>
              </div>
            </div>
            {/* Publicações */}
            <Publicacoes />
          </div>
        </div>

        {/* Espaço lateral direito */}
        <aside className="w-1/5 bg-[#e5fdf1]" />
      </section>

      {/* Modal de edição de perfil */}
      <EditarPerfilModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
