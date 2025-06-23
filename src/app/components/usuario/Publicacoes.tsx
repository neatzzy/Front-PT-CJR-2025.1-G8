"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getAllAvaliacao } from "@/app/utils/api/apiAvaliacao";

type Publicacao = {
  id: number;
  nome: string;
  avatar: string;
  info: string;
  texto: string;
  comentarios: number;
  disciplina?: string;
  professor?: string;
  data?: string;
};

export default function Publicacoes() {
  const params = useParams();
  const userId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";
  const [publicacoes, setPublicacoes] = useState<Publicacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicacoes() {
      try {
        // Busca avaliações feitas pelo usuário (avaliadorID)
        const res = await getAllAvaliacao({
          avaliadorID: userId,
          include: "professor,disciplina",
        });
        const data = Array.isArray(res.data) ? res.data : [];
        setPublicacoes(
          data.map((item: any) => ({
            id: item.id,
            nome: item.usuario?.nome || "Usuário",
            avatar: item.usuario?.avatar || "/image/fotoPerfil.png",
            info:
              (item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("pt-BR") +
                  ", às " +
                  new Date(item.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "") +
              (item.professor?.nome ? " · " + item.professor.nome : "") +
              (item.disciplina?.nome ? " · " + item.disciplina.nome : ""),
            texto: item.comentario || "",
            comentarios: item.comentariosCount || 0,
          })),
        );
      } catch (e) {
        setPublicacoes([]);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchPublicacoes();
  }, [userId]);

  if (loading) return <div className="px-8 py-6">Carregando...</div>;

  return (
    <div className="border-t px-8 py-6 bg-white">
      <h3 className="font-bold text-lg mb-4">Publicações</h3>
      {publicacoes.length === 0 && <div>Nenhuma publicação encontrada.</div>}
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
              <span className="text-[#179478] text-sm ml-2">{pub.info}</span>
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
