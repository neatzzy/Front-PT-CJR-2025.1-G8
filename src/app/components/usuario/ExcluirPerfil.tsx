import React, { useState } from "react";

interface ExcluirPerfilModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (senha: string) => void;
  loading?: boolean;
  error?: string;
}

export default function ExcluirPerfilModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  error = "",
}: ExcluirPerfilModalProps) {
  const [senha, setSenha] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundo levemente escurecido */}
      <div className="absolute inset-0 bg-[#171717] opacity-40 pointer-events-none" />
      <div className="relative bg-[#ededed] w-[400px] rounded-3xl flex flex-col items-center px-10 py-8 z-10">
        {/* Botão fechar */}
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
        <p className="mb-4 text-center text-gray-700">
          Tem certeza que deseja excluir sua conta? <br />
          Digite sua senha para confirmar.
        </p>
        <input
          type="password"
          placeholder="Senha"
          className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none mb-4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {error && <span className="text-red-600 mb-2">{error}</span>}
        <div className="flex gap-4 mt-2">
          <button
            className="w-32 h-12 rounded-xl bg-[#ffb6b6] text-[#b94a4a] font-semibold text-lg shadow border border-black hover:bg-[#ff8a8a] transition"
            onClick={() => onConfirm(senha)}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </button>
          <button
            className="w-32 h-12 rounded-xl bg-[#a4ffe2] text-gray-800 font-semibold text-lg shadow border border-black hover:bg-[#71d2b6] transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
