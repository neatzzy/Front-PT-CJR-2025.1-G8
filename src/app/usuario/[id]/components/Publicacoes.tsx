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

function Publicacoes() {
  const publicacoes = [
    {
      id: 1,
      nome: "Simpson Gamer",
      avatar: "/image/fotoPerfil.png",
      info: "17/04/2024, às 21:42 · Games Eduuu · Gameplay",
      texto: "Você está no canal Simpson Gamer. Esse canal é bom demais!",
      comentarios: 2,
    },
    {
      id: 2,
      nome: "Simpson Gamer",
      avatar: "/image/fotoPerfil.png",
      info: "15/04/2024, às 21:42 · Player Barbie · Youtuber",
      texto: "Você está no canal Simpson Gamer. Esse canal é bom demais!",
      comentarios: 5,
    },
  ];

  return (
    <div className="border-t px-8 py-6">
      <h3 className="font-bold text-lg mb-4">Publicações</h3>
      {publicacoes.map((pub) => (
        <div
          key={pub.id}
          className="bg-[#4fffc7] rounded-2xl p-4 mb-6 shadow flex flex-col"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#22a27a]">
              <Image src={pub.avatar} alt="Avatar" width={40} height={40} />
            </div>
            <div>
              <span className="font-bold">{pub.nome}</span>
              <span className="text-gray-600 text-sm ml-2">{pub.info}</span>
            </div>
          </div>
          <p className="text-gray-800 mb-2">{pub.texto}</p>
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
              {pub.comentarios} comentários
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
  );
}

export default Publicacoes;
