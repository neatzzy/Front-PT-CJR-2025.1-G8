"use client";

import { useState } from "react"; 
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(""); 

    //LOGICA DE SIMULAÇÃO INTEGRAÇÃO BACKEND (APENAS TESTE E SUBSTITUIR NO FUTURO)
    if (email === "teste@cjr.com" && senha === "123") {
      // Se o login estiver correto, navega para dashboard
      alert("Login bem-sucedido!");
      router.push("/dashboard"); // Alterar "/dashboard" para página principal
    } else {
      setError("Usuário não cadastrado");
    }
  };

  return (
    <main className="flex h-screen w-screen">
      <div className="relative w-1/2 h-full">
        <Image
          src="/image/usuarioImagePage.png"
          alt="Alunos"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-1/2 h-full bg-[#71D2B6] flex flex-col justify-center items-center relative">
        <Image
          src="/image/UnbLogo.png"
          alt="UnB Logo"
          width={60}
          height={60}
          className="absolute top-3 left-6"
        />
        <Image
          src="/image/CJRLogo.png"
          alt="CJR Logo"
          width={90}
          height={60}
          className="absolute top-0 right-6"
        />

        <div className="flex flex-col items-center w-full max-w-lg">
          <h1 className="text-5xl font-bold text-gray-800 font-sans mb-12 mt-4 text-center w-full">
            Avaliação de Professores
          </h1>

          <form className="w-full flex flex-col gap-7" onSubmit={handleSubmit}>
            {error && <p className="text-center text-red-600 font-bold bg-transparent p-2 rounded-md">{error}</p>}
            
            <div>
              <label htmlFor="email" className="text-2xl font-semibold text-gray-800">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full h-12 px-4 bg-white border border-black rounded-lg text-black text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#179478]"
              />
            </div>
            <div>
              <label htmlFor="senha" className="text-2xl font-semibold text-gray-800">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-2 block w-full h-12 px-4 bg-white border border-black rounded-lg text-black text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#179478]"
              />
            </div>
            <div className="flex gap-8 justify-center mt-4">
              <button
                type="submit"
                className="bg-[#22a27a] border border-black text-white text-lg rounded-full px-10 py-2 transition hover:bg-[#179478] font-semibold shadow-sm cursor-pointer"
              >
                Entrar
              </button>
              <Link href="/usuario/novo">
                <button
                  type="button"
                  className="bg-[#22a27a] border border-black text-white text-lg rounded-full px-10 py-2 transition hover:bg-[#179478] font-semibold shadow-sm cursor-pointer"
                >
                  Criar Conta
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}