import React from 'react';

interface CardProps {
  nome?: string;
  disciplina?: string;
  img?: string;
  updatedAt : string;
  key: number,
}

const CardProfessorFeed: React.FC<CardProps> = ({
  nome = "Nome",
  disciplina = "Disciplina",
  img,
  updatedAt,
}) => (
  <div
    className="flex flex-col items-center justify-between gap-y-1 bg-white rounded-3xl shadow-1g p-3 w-fit min-h-fit h-60"
  >
    <img
      src={img || "/user-placeholder.png"}
      alt={nome}
      className='w-45 h-45 br-10 rounded-3xl border-2'
    />
    <div className='w-full h-full  min-h-fit max-h-1/2 flex flex-col items-center justify-center gap-y-0.5'>
      <h1 className="font-extrabold h-fit w-fit text-black text-x1">{nome}</h1>
      <p className="text-gray-500 h-fit w-fit text-base">{disciplina}</p>
      <p className="text-gray-400 h-fit w-fit text-sm">{updatedAt}</p>

    </div>

  </div>
);

export default CardProfessorFeed;