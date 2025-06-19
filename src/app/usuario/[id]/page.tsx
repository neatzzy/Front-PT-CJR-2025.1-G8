"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { FaBell, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import Perfil from "./components/Perfil";
import Publicacoes from "./components/Publicacoes";
import EditarPerfilModal from "./components/EditarPerfil";

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
    <main className="min-h-screen w-full bg-[#e5fdf1] flex flex-col">
      {/* Header */}
      <header className="w-full h-20 bg-[#a4ffe2] flex items-center justify-between px-8">
        <Image src="/image/UnbLogo.png" alt="UnB Logo" width={60} height={60} />
        <div className="flex items-center gap-8">
          <FaBell size={28} className="text-black" />
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#22a27a]">
            <Image
              src={perfilData.avatarUrl || "/image/fotoPerfil.png"}
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
        {/* Sidebar esquerda */}
        <aside className="w-1/5 bg-[#e5fdf1] flex flex-col items-center pt-10">
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
        <aside className="w-1/5 bg-[#e5fdf1]" />
      </section>

      {/* Modal de edição de perfil */}
      <EditarPerfilModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
