import React from 'react';

interface CardProps {
  nome?: string;
  disciplina?: string;
  img?: string;
  updateAt : string;
  key: number,
}

const CardProfessorFeed: React.FC<CardProps> = ({
  nome = "Nome",
  disciplina = "Disciplina",
  img,
  updateAt,
}) => (
  <div
    className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-2 m-2"
    style={{ width: 160, minHeight: 180 }}
  >
    <img
      src={img || "/user-placeholder.png"}
      alt={nome}
      style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 8 }}
    />
    <div className="font-semibold">{nome}</div>
    <div className="text-xs text-gray-500">{disciplina}</div>
    <div className="text-xs text-gray-500">{updateAt}</div>

  </div>
);

export default CardProfessorFeed;