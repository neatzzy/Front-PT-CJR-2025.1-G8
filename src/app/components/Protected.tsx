"use client";
import { useEffect, useState } from "react";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  });

  if (!isAuthenticated) {
    // Não renderiza nada
    return null;
  }

  // Usuário autenticado, renderiza o conteúdo protegido
  return <>{children}</>;
}