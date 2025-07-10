"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getAllAvaliacao } from "@/app/utils/api/apiAvaliacao";
import { getCurrentUserAuthorized } from "@/app/utils/api/apiUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeletarAvaliacao from "./AvaliacaoOptions/DeletarAvaliacao";
import EditarAvaliacao from "./AvaliacaoOptions/EditarAvaliacao";
import ToggleFeed from "../seletor/toggleFeed";
import { jwtDecode } from "jwt-decode";

export default function Publicacoes() {
  const params = useParams();
  const profileuserId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [publicacoes, setPublicacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [DelOpen, setDelOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [selectedAvaliacaoId, setSelectedAvaliacaoId] = useState<number | null>(
    null,
  );
  const [token, setToken] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
  const [orderValue, setOrderValue] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (storedToken) {
        try {
          const decoded: any = jwtDecode(storedToken);
          setLoggedInUserId(decoded.id || decoded.sub || null);
        } catch {
          setLoggedInUserId(null);
        }
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPublicacoes() {
      try {
        const res = await getAllAvaliacao({
          usuarioID: profileuserId,
          include: "usuario,professor,disciplina,comentarios",
        });
        setPublicacoes(res.data?.data || []);
      } catch {
        setPublicacoes([]);
      } finally {
        setLoading(false);
      }
    }
    if (profileuserId) fetchPublicacoes();
  }, [profileuserId]);

  useEffect(() => {
    async function checkOwner() {
      try {
        if (token) {
          const userRes = await getCurrentUserAuthorized(token);
          setIsOwner(userRes.data.id?.toString() === profileuserId);
        }
      } catch {
        setIsOwner(false);
      }
    }
    checkOwner();
  }, [profileuserId, token]);

  if (loading) return <div className="px-8 py-6">Carregando...</div>;

  const handleDelete = (id: number) => {
    setSelectedAvaliacaoId(id);
    setDelOpen(true);
  };
  const handleEdit = (id: number) => {
    setSelectedAvaliacaoId(id);
    setEditOpen(true);
  };
  const handleOrderChange = (value: "asc" | "desc") => {
    setOrderValue(value);
  };

  const sortedPublicacoes = [...publicacoes].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return orderValue === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-300 p-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-emerald-900">Publicações</h2>
        <ToggleFeed value={orderValue} onToggle={handleOrderChange} />
      </div>

      {sortedPublicacoes.length > 0 ? (
        sortedPublicacoes.map((pub, idx) => (
          <div
            key={pub.id ?? idx}
            className="mb-4 p-7 bg-[#4fffc7] rounded-2xl shadow flex flex-col hover:shadow-2xl transition-shadow border"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#22a27a]">
                <Image
                  src={
                    pub.usuario?.fotoPerfil
                      ? pub.usuario.fotoPerfil.startsWith("data:image")
                        ? pub.usuario.fotoPerfil
                        : `data:image/png;base64,${pub.usuario.fotoPerfil}`
                      : "/image/fotoPerfil.png"
                  }
                  alt={
                    pub.usuario?.nome
                      ? `Avatar de ${pub.usuario.nome}`
                      : "Avatar"
                  }
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <span className="font-bold">
                  {pub.usuario?.nome || "Usuário"}
                </span>
                <span className="text-[#179478] text-sm ml-2">
                  {pub.updatedAt &&
                    `${new Date(pub.updatedAt).toLocaleDateString("pt-BR")}, às ${new Date(
                      pub.updatedAt,
                    ).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  {pub.professor?.nome ? ` · ${pub.professor.nome}` : ""}
                  {pub.disciplina?.nome ? ` · ${pub.disciplina.nome}` : ""}
                </span>
              </div>
            </div>
            <p className="text-gray-800 mb-2 overflow-hidden">{pub.conteudo}</p>
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
                {Array.isArray(pub.comentarios) ? pub.comentarios.length : 0}{" "}
                comentários
              </span>
              {isOwner && (
                <>
                  <button
                    className="ml-auto hover:text-[#179478] cursor-pointer"
                    onClick={() => handleEdit(pub.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="hover:text-[#b94a4a] cursor-pointer"
                    onClick={() => handleDelete(pub.id)}
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nenhuma publicação encontrada.</p>
      )}

      <DeletarAvaliacao
        open={DelOpen}
        onClose={() => setDelOpen(false)}
        authToken={token ?? undefined}
        avaliacaoId={selectedAvaliacaoId}
        reload={() => {
          if (profileuserId) {
            setLoading(true);
            getAllAvaliacao({
              usuarioID: profileuserId,
              include: "usuario,professor,disciplina,comentarios",
            })
              .then((res) => setPublicacoes(res.data?.data || []))
              .catch(() => setPublicacoes([]))
              .finally(() => setLoading(false));
          }
        }}
      />
      <EditarAvaliacao
        open={EditOpen}
        onClose={() => setEditOpen(false)}
        authToken={token ?? undefined}
        avaliacaoId={selectedAvaliacaoId}
        reload={() => {
          if (profileuserId) {
            setLoading(true);
            getAllAvaliacao({
              usuarioID: profileuserId,
              include: "usuario,professor,disciplina,comentarios",
            })
              .then((res) => setPublicacoes(res.data?.data || []))
              .catch(() => setPublicacoes([]))
              .finally(() => setLoading(false));
          }
        }}
      />
    </div>
  );
}
