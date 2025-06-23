"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Perfil from "./components/Perfil";
import Publicacoes from "./components/Publicacoes";
import EditarPerfilModal from "./components/EditarPerfil";
import ExcluirPerfilModal from "./components/ExcluirPerfil";
import FeedUserHeader from "@/app/components/header/FeedUserHeader";
import { FaArrowLeft } from "react-icons/fa";
import { getCurrentUserAuthorized } from "@/app/utils/api/apiUser";

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
        const res = await axios.get(`http://localhost:5000/usuario/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPerfilData(res.data);

        // Verifica se o usuário logado é o dono do perfil usando a nova API
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
      const id =
        typeof params.id === "string"
          ? params.id
          : Array.isArray(params.id)
            ? params.id[0]
            : "";
      if (!id) {
        setExcluirLoading(false);
        setExcluirError("ID do usuário não encontrado.");
        return;
      }
      await axios.delete(`http://localhost:5000/usuario/${id}`, {
        data: { senha },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setExcluirLoading(false);
      setExcluirOpen(false);
      // Redireciona para a página inicial ou login após exclusão
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
      <main className="min-h-screen w-full bg-[#e5fdf1] flex items-center justify-center">
        <span>Carregando...</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#ededed] flex flex-col">
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
            <FaArrowLeft size={32} />
          </button>
        </aside>

        {/* Conteúdo principal centralizado */}
        <div className="flex-1 flex flex-col items-center pt-10">
          <div>
            <Perfil
              nome={perfilData.nome}
              curso={perfilData.curso}
              departamento={perfilData.departamento}
              email={perfilData.email}
              avatarUrl={perfilData.avatarUrl}
              onEditar={() => setModalOpen(true)}
              onExcluir={() => setExcluirOpen(true)}
              showButtons={isOwner}
            />
            <Publicacoes />
          </div>
        </div>

        {/* Sidebar direita */}
        <aside className="w-1/5 bg-[#ededed]" />
      </section>
      {/* Modal de edição de perfil */}
      <EditarPerfilModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={perfilData.id}
      />
      {/* Modal de exclusão de perfil */}
      <ExcluirPerfilModal
        open={excluirOpen}
        onClose={() => {
          setExcluirOpen(false);
          setExcluirError("");
        }}
        onConfirm={handleExcluirPerfil}
        loading={excluirLoading}
        error={excluirError}
      />
    </main>
  );
}
