import Image from "next/image";
import React from "react";

interface CriarAvaliacaoModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CriarAvaliacaoModal({open, onClose,}: CriarAvaliacaoModalProps) {
    if (!open) return null;

    return (
        <div className="bg-amber-50 h-screen">
            <h1 className="text-2xl text-center font-bold mt-10">Criar Avaliação</h1>
        </div>
        

        
        
    )
}