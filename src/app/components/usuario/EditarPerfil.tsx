import Image from "next/image";
import React, { useState, useEffect } from "react";
import { updateUsuario } from "@/app/utils/api/apiUser";
import { useRouter } from "next/navigation";
import ImageUpload from "../ImageUpload";
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
    avatar?: string;
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
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && initialData) {
      setNome(initialData.nome || "");
      setEmail(initialData.email || "");
      setCurso(initialData.curso || "");
      setDepartamento(initialData.departamento || "");
      setAvatarPreview(initialData.avatar);
    }
  }, [open, initialData]);

  const handleImageChange = (file: File | null) => {
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(initialData?.avatar);
    }
  };

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data: any = {
        nome: nome || initialData?.nome,
        email: email || initialData?.email,
        curso: curso || initialData?.curso,
        departamento: departamento || initialData?.departamento,
        senha: senhaAtual,
        novaSenha,
        confirmarSenha,
      };

      if (!senhaAtual) {
        alert("Digite sua senha para confirmar as alterações.");
        setLoading(false);
        return;
      }

      let response;
      if (avatarFile) {
        const formData = new FormData();
        if (nome) formData.append("nome", data.nome);
        if (email) formData.append("email", data.email);
        if (curso) formData.append("curso", data.curso);
        if (departamento) formData.append("departamento", data.departamento);
        formData.append("senha", senhaAtual);
        if (novaSenha) formData.append("novaSenha", novaSenha);
        if (confirmarSenha) formData.append("confirmarSenha", confirmarSenha);
        formData.append("fotoPerfil", avatarFile);
        response = await updateUsuario(userId, formData, token);
      } else {
        response = await updateUsuario(userId, data, token);
      }

      // Verifique se a resposta indica erro
      if (response?.data?.status === "erro") {
        alert(response.data.message || "Erro ao atualizar perfil");
        setLoading(false);
        return;
      }

      alert(
        "Perfil atualizado com sucesso! Atualize a página para ver as mudanças.",
      );
      onClose();
    } catch (err) {
      alert("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative bg-[#ededed] w-[480px] rounded-2xl flex flex-col items-center px-8 py-10 z-10 shadow-lg">
        <button
          className="absolute top-6 right-8 text-4xl text-gray-700 hover:text-black"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        {/* Foto de perfil centralizada com upload */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#4af0a0] bg-white flex items-center justify-center">
            <Image
              src={
                avatarPreview
                  ? avatarPreview
                  : initialData?.avatar
                    ? initialData.avatar.startsWith("data:image")
                      ? initialData.avatar
                      : `data:image/png;base64,${initialData.avatar}`
                    : "/image/fotoPerfil.png"
              }
              alt="Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Botão de upload centralizado embaixo da foto, com ícone correto */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <label
              htmlFor="avatar-upload"
              className="bg-white border-2 border-[#ffffff] w-12 h-12 flex items-center justify-center rounded-full cursor-pointer shadow hover:bg-[#dadada] transition"
              style={{ boxShadow: "0 2px 8px #0001" }}
            >
              <FaCamera className="text-2xl text-[#a5a2a2]" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleImageChange(file);
                }}
              />
            </label>
          </div>
        </div>
        <form
          className="flex flex-col gap-4 w-full items-center"
          onSubmit={handleSubmit}
        >
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="curso"
            type="text"
            placeholder="Curso"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          />
          <input
            id="departamento"
            type="text"
            placeholder="Departamento"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          />
          <input
            id="senhaAtual"
            type="password"
            placeholder="Senha atual"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
          />
          <input
            id="novaSenha"
            type="password"
            placeholder="Nova senha"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <input
            id="confirmarSenha"
            type="password"
            placeholder="Confirmar nova senha"
            className="w-full h-12 rounded-2xl px-4 bg-white text-gray-800 placeholder-gray-400 outline-none border-none"
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
