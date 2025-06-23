"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { FaBell, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import Perfil from "./components/Perfil";
import Publicacoes from "./components/Publicacoes";
import EditarPerfilModal from "./components/EditarPerfil";
import FeedUserHeader from "@/app/components/header/FeedUserHeader";

export default function PerfilPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [perfilData, setPerfilData] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const { id } = params;
        const res = await axios.get(`http://localhost:5000/usuario/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPerfilData(res.data);
      } catch (err) {
        // Trate o erro conforme necessário
        setPerfilData(null);
      }
    }
    fetchPerfil();
  }, [params]);

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
              onExcluir={() => {
                /* ação de excluir */
              }}
            />
            <Publicacoes />
          </div>
        </div>

        {/* Sidebar direita */}
        <aside className="w-1/5 bg-[#ededed]" />
      </section>
      {/* Modal de edição de perfil */}
      <EditarPerfilModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
