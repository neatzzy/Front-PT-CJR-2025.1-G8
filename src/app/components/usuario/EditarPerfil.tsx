import Image from "next/image";
import React, { useState, useEffect } from "react";
import { updateUsuario } from "@/app/utils/api/apiUser";
import { useRouter } from "next/navigation";
import ImageUpload from "../ImageUpload"; // Importa o componente de upload

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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Preenche os campos com os dados atuais ao abrir o modal
  useEffect(() => {
    if (open && initialData) {
      setNome(initialData.nome);
      setEmail(initialData.email);
      setCurso(initialData.curso);
      setDepartamento(initialData.departamento);
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Sempre envia os valores antigos caso o campo esteja vazio
      const data: any = {
        nome: nome || initialData?.nome,
        email: email || initialData?.email,
        curso: curso || initialData?.curso,
        departamento: departamento || initialData?.departamento,
        senha: senhaAtual,
      };

      if (!senhaAtual) {
        alert("Digite sua senha para confirmar as alterações.");
        setLoading(false);
        return;
      }

      if (avatarFile) {
        const formData = new FormData();
        formData.append("nome", data.nome);
        formData.append("email", data.email);
        formData.append("curso", data.curso);
        formData.append("departamento", data.departamento);
        formData.append("senha", senhaAtual);
        formData.append("avatar", avatarFile);
        await updateUsuario(userId, formData, token);
      } else {
        await updateUsuario(userId, data, token);
      }
      onClose();
      alert(
        "Perfil atualizado com sucesso! Atualize a página para ver as mudanças.",
      );
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
        {/* Substitui o bloco do avatar pelo componente de upload */}
        <div className="relative flex flex-col items-center mb-6">
          <ImageUpload onImageChange={setAvatarFile} />
        </div>
        <form
          className="flex flex-col gap-4 w-full items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full gap-4">
            <div className="flex-1 flex flex-col">
              <label
                className="font-semibold text-gray-700 mb-1 ml-1"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                id="nome"
                type="text"
                className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border border-gray-300"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label
                className="font-semibold text-gray-700 mb-1 ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex-1 flex flex-col">
              <label
                className="font-semibold text-gray-700 mb-1 ml-1"
                htmlFor="curso"
              >
                Curso
              </label>
              <input
                id="curso"
                type="text"
                className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border border-gray-300"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label
                className="font-semibold text-gray-700 mb-1 ml-1"
                htmlFor="departamento"
              >
                Departamento
              </label>
              <input
                id="departamento"
                type="text"
                className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border border-gray-300"
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex-1 flex flex-col">
              <label
                className="font-semibold text-gray-700 mb-1 ml-1"
                htmlFor="senhaAtual"
              >
                Digite sua senha para confirmar as alterações
              </label>
              <input
                id="senha"
                type="password"
                className="w-105 h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border border-gray-300"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div className="flex-1" />
          </div>
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
