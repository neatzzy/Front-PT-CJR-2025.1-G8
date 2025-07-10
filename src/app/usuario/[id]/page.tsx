"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Perfil from "../../components/usuario/Perfil";
import Publicacoes from "../../components/usuario/Publicacoes";
import EditarPerfilModal from "../../components/usuario/EditarPerfil";
import ExcluirPerfilModal from "../../components/usuario/ExcluirPerfil";
import FeedUserHeader from "@/app/components/header/FeedUserHeader";
import { FaArrowLeft } from "react-icons/fa";
import { getCurrentUserAuthorized, getUserById } from "@/app/utils/api/apiUser";

export default function PerfilPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [excluirOpen, setExcluirOpen] = useState(false);
  const [excluirLoading, setExcluirLoading] = useState(false);
  const [excluirError, setExcluirError] = useState("");
  const [perfilData, setPerfilData] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const id =
          typeof params.id === "string"
            ? params.id
            : Array.isArray(params.id)
              ? params.id[0]
              : "";
        if (!id) {
          setPerfilData(null);
          setIsOwner(false);
          return;
        }
        // Usa a API centralizada para buscar o perfil
        const res = await getUserById(id);
        setPerfilData(res.data);

        // Verifica se o usuário logado é o dono do perfil usando API centralizada
        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await getCurrentUserAuthorized(token);
          setIsOwner(userRes.data.id === res.data.id);
        } else {
          setIsOwner(false);
        }
      } catch (err: any) {
        setPerfilData(null);
        setIsOwner(false);
      }
    }
    fetchPerfil();
  }, [params.id]);

  async function handleExcluirPerfil(senha: string) {
    setExcluirLoading(true);
    setExcluirError("");
    try {
      // Implemente aqui a chamada de exclusão usando sua API centralizada, se necessário
      setExcluirLoading(false);
      setExcluirOpen(false);
      router.push("/");
    } catch (err: any) {
      setExcluirLoading(false);
      setExcluirError(
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Erro ao excluir perfil. Tente novamente.",
      );
    }
  }

  if (!perfilData) {
    return (
      <div className="min-h-screen w-full bg-[#e5fdf1] flex items-center justify-center">
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#ededed] flex flex-col">
      {/* Header */}
      <FeedUserHeader />
      {/* Conteúdo central */}
      <section className="flex flex-1 w-full">
        {/* Sidebar esquerda */}
        <aside className="w-1/5 bg-[#ededed] flex flex-col items-center pt-10">
          <button
            className="bg-white rounded-full p-3 shadow-md border border-black"
            onClick={() => router.back()}
          >
            <FaArrowLeft 
             className="cursor-pointer hover:text-black transition-colors"
            size={32} />
          </button>
        </aside>

        {/* Conteúdo principal centralizado */}
        <div className="flex-1 flex flex-col items-center pt-5">
          <div>
            <div className="flex flex-col items-center">
            <Perfil
              nome={perfilData.nome}
              curso={perfilData.curso}
              departamento={perfilData.departamento}
              email={perfilData.email}
              avatar={perfilData.fotoPerfil}
              onEditar={() => setModalOpen(true)}
              onExcluir={() => setExcluirOpen(true)}
              showButtons={isOwner}
            />
            </div>
            <div className="mt-4 max-w-150 overflow-hidden">
            <Publicacoes />
            </div>
          </div>
        </div>

        {/* Sidebar direita */}
        <aside className="w-1/5 bg-[#ededed]" />
      </section>
      {/* Modal de edição de perfil */}
      <EditarPerfilModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          router.refresh();
        }}
        userId={perfilData.id}
      />
      {/* Modal de exclusão de perfil */}
      <ExcluirPerfilModal
        open={excluirOpen}
        onClose={() => {
          setExcluirOpen(false);
          setExcluirError("");
        }}
        userId={perfilData.id} // <-- Passe sempre o id aqui!
      />
    </div>
  );
}
