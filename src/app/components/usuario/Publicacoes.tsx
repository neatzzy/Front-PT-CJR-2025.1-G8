"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getAllAvaliacao } from "@/app/utils/api/apiAvaliacao";
import { getCurrentUserAuthorized } from "@/app/utils/api/apiUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeletarAvaliacao from "./AvaliacaoOptions/DeletarAvaliacao";
import { jwtDecode } from "jwt-decode";
import EditarAvaliacao from "./AvaliacaoOptions/EditarAvaliacao";

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
  const [DelOpen, setDelOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
  const [selectedAvaliacaoId, setSelectedAvaliacaoId] = useState<number | null>(null);
  const [EditOpen, setEditOpen] = useState<boolean>(false);


  useEffect(() => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      try {
        const decodedToken: any = jwtDecode(storedToken);
        const extractedUserId = decodedToken.id || decodedToken.sub;
        setLoggedInUserId(extractedUserId);
      } catch (e) {
        console.error("Erro ao decodificar token JWT:", e);
        setLoggedInUserId(null);
      }
    } else {
      setLoggedInUserId(null);
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
        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await getCurrentUserAuthorized(token);
          setIsOwner(userRes.data.id?.toString() === profileuserId?.toString());
        } else {
          setIsOwner(false);
        }
      } catch {
        setIsOwner(false);
      }
    }
    if (profileuserId) checkOwner();
  }, [profileuserId]);

  if (loading) return <div className="px-8 py-6">Carregando...</div>;

  const handleDelete = (avaliacaoId: number) => {
    setSelectedAvaliacaoId(avaliacaoId);
    setDelOpen(true);
    };

  const handleEdit = (avaliacaoId: number) => {
    setSelectedAvaliacaoId(avaliacaoId);
    setEditOpen(true);
    };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-300 p-6 mt-4">
      <h2 className="text-xl font-bold mb-4 text-emerald-900">Publicações</h2>
      {publicacoes.length > 0 ? (
        publicacoes.map((pub, idx) => (
          <div
            key={pub.id ?? idx}
            className="mb-4 p-4 bg-[#4fffc7] rounded-2xl shadow flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#22a27a]">
                <Image
                  src={pub.usuario?.fotoPerfil || "/image/fotoPerfil.png"}
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
                  {pub.updatedAt
                    ? new Date(pub.updatedAt).toLocaleDateString("pt-BR") +
                      ", às " +
                      new Date(pub.updatedAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                  {pub.professor?.nome ? " · " + pub.professor.nome : ""}
                  {pub.disciplina?.nome ? " · " + pub.disciplina.nome : ""}
                </span>
              </div>
            </div>
            <p className="text-gray-800 mb-2">{pub.conteudo}</p>
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
                  className="ml-auto hover:text-[#179478]"
                  onClick={() => handleEdit(pub.id)}>
                    <FaEdit />
                  </button>

                  <button 
                  className="hover:text-[#b94a4a]"
                  onClick={() => handleDelete(pub.id)}>
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
      <DeletarAvaliacao open={DelOpen} onClose={() => setDelOpen(false)} authToken={token ?? undefined} avaliacaoId={selectedAvaliacaoId} />
      <EditarAvaliacao open={EditOpen} onClose={() => setEditOpen(false)} authToken={token ?? undefined} avaliacaoId={selectedAvaliacaoId}/>

    </div>
  );
}
