import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

interface EditarPerfilModalProps {
  open: boolean;
  onClose: () => void;
  userId: number;
  initialData?: {
    nome: string;
    email: string;
    curso: string;
    departamento: string;
    avatarUrl?: string;
  };
}

export default function EditarPerfilModal({
  open,
  onClose,
  userId,
  initialData,
}: EditarPerfilModalProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [curso, setCurso] = useState(initialData?.curso || "");
  const [departamento, setDepartamento] = useState(
    initialData?.departamento || "",
  );
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/usuarios/${userId}`, {
        nome,
        email,
        curso,
        departamento,
        senhaAtual,
        novaSenha,
        confirmarSenha,
      });
      onClose();
    } catch (err) {
      alert("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#171717] opacity-40 pointer-events-none" />
      <div className="relative bg-[#ededed] w-[500px] rounded-3xl flex flex-col items-center px-10 py-8 z-10">
        <button
          className="absolute top-6 right-8 text-4xl text-gray-700 hover:text-black"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        <div className="relative flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ff4fc7] bg-white flex items-center justify-center">
            <Image
              src={initialData?.avatarUrl || "/image/fotoPerfil.png"}
              alt="Avatar"
              width={128}
              height={128}
            />
          </div>
          <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 border border-gray-300 shadow">
            <FaCamera size={28} className="text-black" />
          </button>
        </div>
        <form
          className="flex flex-col gap-4 w-full items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Nome"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Curso"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
          <input
            type="text"
            placeholder="Departamento"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha atual"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nova senha"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar nova senha"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-48 h-12 rounded-xl bg-[#a4ffe2] text-gray-800 font-semibold text-xl shadow border border-black hover:bg-[#71d2b6] transition"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
