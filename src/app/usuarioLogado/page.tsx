"use client";

import Image from "next/image";
import {
  FaBell,
  FaSignOutAlt,
  FaBuilding,
  FaEnvelope,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function PerfilPage() {
  return (
    <main className="min-h-screen w-full bg-[#e5fdf1] flex flex-col">
      {/* Header */}
      <header className="w-full h-20 bg-[#a4ffe2] flex items-center justify-between px-8">
        <Image src="/image/UnbLogo.png" alt="UnB Logo" width={60} height={60} />
        <div className="flex items-center gap-8">
          <FaBell size={28} className="text-black" />
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#22a27a]">
            <Image src="/image/morty.png" alt="Avatar" width={48} height={48} />
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
                <button className="bg-[#a4ffe2] border border-black text-[#179478] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#71d2b6] transition">
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
            <div className="border-t px-8 py-6">
              <h3 className="font-bold text-lg mb-4">Publicações</h3>
              {/* Card de publicação */}
              {[1, 2].map((pub) => (
                <div
                  key={pub}
                  className="bg-[#4fffc7] rounded-2xl p-4 mb-6 shadow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#22a27a]">
                      <Image
                        src="/image/morty.png"
                        alt="Avatar"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <span className="font-bold">Simpson Gamer</span>
                      <span className="text-gray-600 text-sm ml-2">
                        {pub === 1
                          ? "17/04/2024, às 21:42 · Games Eduuu · Gameplay"
                          : "15/04/2024, às 21:42 · Player Barbie · Youtuber"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-2">
                    Você está no canal Simpson Gamer. Esse canal é bom demais!
                  </p>
                  <div className="flex items-center gap-4 text-gray-700 mt-1">
                    <span className="flex items-center gap-1 text-base">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="inline"
                      >
                        <circle cx="10" cy="10" r="8" />
                      </svg>
                      {pub === 1 ? "2 comentários" : "5 comentários"}
                    </span>
                    <button className="ml-auto hover:text-[#179478]">
                      <FaEdit />
                    </button>
                    <button className="hover:text-[#b94a4a]">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Espaço lateral direito */}
        <aside className="w-1/5 bg-[#e5fdf1]" />
      </section>
    </main>
  );
}
