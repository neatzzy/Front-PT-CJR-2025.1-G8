import React, { useState } from "react";
import { deleteUsuario } from "@/app/utils/api/apiUser";
import { useRouter } from "next/navigation";

interface ExcluirPerfilModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: (senha: string) => void; // agora opcional
  userId: number;
}

export default function ExcluirPerfilModal({
  open,
  onClose,
  userId,
}: ExcluirPerfilModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!open) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await deleteUsuario(userId, token);
      setLoading(false);
      onClose();
      localStorage.removeItem("token");
      router.replace("/");
    } catch (err: any) {
      setLoading(false);
      setError("Erro ao excluir perfil.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#171717] opacity-40 pointer-events-none" />
      <div className="relative bg-[#ededed] w-[400px] rounded-3xl flex flex-col items-center px-10 py-8 z-10">
        <button
          className="absolute top-6 right-8 text-4xl text-gray-700 hover:text-black"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-[#b94a4a]">
          Excluir Conta
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Tem certeza que deseja excluir sua conta?
        </p>
        {error && <span className="text-red-600 mb-2">{error}</span>}
        <div className="flex gap-4 mt-2">
          <button
            className="w-32 h-12 rounded-xl bg-[#ffb6b6] text-[#b94a4a] font-semibold text-lg shadow border border-black hover:bg-[#ff8a8a] transition"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Sim"}
          </button>
          <button
            className="w-32 h-12 rounded-xl bg-[#a4ffe2] text-gray-800 font-semibold text-lg shadow border border-black hover:bg-[#71d2b6] transition"
            onClick={onClose}
            disabled={loading}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
