import React from "react";
import Image from "next/image";

interface CriarProfessorModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CriarProfessorModal({open, onClose,}: CriarProfessorModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 felx justify-center items-center transition-colors
            visible bg-black/30">
            <h1 className="text-2xl text-center font-bold mt-10">Novo Professor</h1>
            <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg
                text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 cursor-pointer">
            X
            </button>
        </div>
    );
};
