"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getAllAvaliacao } from "@/app/utils/api/apiAvaliacao";
import { getCurrentUserAuthorized } from "@/app/utils/api/apiUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaRegComment, FaRegEdit } from 'react-icons/fa';
import { IoIosTrash } from "react-icons/io";
import DeletarAvaliacao from "./AvaliacaoOptions/DeletarAvaliacao";
import EditarAvaliacao from "./AvaliacaoOptions/EditarAvaliacao";
import ToggleFeed from "../seletor/toggleFeed";
import { jwtDecode } from "jwt-decode";
import Protected from "../Protected";
import { CiCirclePlus } from "react-icons/ci";
import NovoComentarioModal from "@/app/modais/NovoComentario";
import { formatDate } from "@/app/utils/format";
import Comentario from "@/app/professor/components/Comentario";
import ComentariosDaPublicacao from "./components/ComentariosDaPublicacao";

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
  const [commentOpen, setCommentOpen] = useState(false);
  const [openNewCommentModal, setOpenNewCommentModal] = useState<boolean>(false);
  const [makeReload, setMakeReload] = useState<boolean>(false);

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
  }, [profileuserId, makeReload]);

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

  const handleCommentClick = () => {
    setCommentOpen((prev) => !prev);
  };

  const handlerNewComment = () => {
    setOpenNewCommentModal(true);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-300 p-6 mt-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="w-full font-bold text-2xl text-black">Publicações</h2>
        <ToggleFeed value={orderValue} onToggle={handleOrderChange} />
      </div>

      {sortedPublicacoes.length > 0 ? (
        sortedPublicacoes.map((pub, idx) => (
          <div
            key={pub.id ?? idx}
            className="mb-4 p-7 bg-[#3eee9a] rounded-2xl shadow flex flex-col hover:shadow-2xl transition-shadow border text-1g"
          >
            <div className="flex flex-col justify-center gap-8 mb-2 text-1g">

              <div className="flex flex-row h-fit items-center justify-start w-fit gap-2">         
                {/** foto de perfil */}
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

                {/** Infos da publicacao */}
                <div>
                  <span className="text-black font-semibold">
                    {pub.usuario?.nome || "Usuário"}
                  </span>
                  <span className="text-gray-700 text-sm ml-2">
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
            </div>

            <p className="text-black text-base h-fit max-w-full break-words overflow-hidden">{pub.conteudo}</p>

            {/** botões inferiores */}
            <div className="flex items-center gap-4 text-gray-700 mt-1">
              <div className='flex flex-row gap-4 w-fit items-center'>
                  <FaRegComment
                      color="black"
                      size={28}
                      style={{ cursor: "pointer" }}
                      onClick={handleCommentClick} // Remover ou ajustar se necessário
                  />
                  <p className='w-fit text-black text-base'>{pub.comentarios.length || 0} comentários</p>
              </div>
              {isOwner && (
                <>
                  <button
                    className="ml-auto hover:text-[#179478] cursor-pointer"
                    onClick={() => handleEdit(pub.id)}
                  >
                    <FaRegEdit 
                      color="black"
                      size={28}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                  <button
                    className="hover:text-[#b94a4a] cursor-pointer"
                    onClick={() => handleDelete(pub.id)}
                  >
                    <IoIosTrash 
                      color="black"
                      size={32}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                </>
              )}
            </div>

            { commentOpen && (
                /** Comentários encapsulados */
                <ComentariosDaPublicacao
                  isOpen={commentOpen}
                  comentarios={pub.comentarios}
                  avaliacaoId={pub.id}
                  loggedInUserId={loggedInUserId}
                  reload={() => setMakeReload((prev) => !prev)}
                />
              )
            }
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
