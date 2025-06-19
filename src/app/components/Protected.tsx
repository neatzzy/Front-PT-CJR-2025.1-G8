"use client";
import { useEffect, useState } from "react";

interface ProtectedProps {
  children: React.ReactNode;
  singin : boolean;
}

export default function Protected({ 
  children, 
  singin
}: ProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  if (isAuthenticated == singin) {
    return <>{children}</>;
  }
  
  // Não renderiza nada
  return null;
}