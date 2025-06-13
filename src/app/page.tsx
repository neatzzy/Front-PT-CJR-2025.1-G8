"use client";
import React, { useEffect, useState, useRef } from 'react';
import FeedUserHeader from './components/header/FeedUserHeader';
import CardProfessorFeed from './components/card/CardProfessorFeed';
import { getAllAvaliacao } from '../app/utils/api/apiAvaliacao';
import SeletorOrdenacaoFeed from './components/seletor/SeletorOrdenacaoFeed';

function Feed() {
  const [avaliacoesNovosProfessores, setAvaliacoesNovosProfessores] = useState<any[]>([]);
  const [avaliacoesTodosProfessores, setAvaliacoesTodosProfessores] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const includeQuery = 'professor,disciplina,comentarios';

  // Carrega os novos professores apenas uma vez ao montar
  useEffect(() => {
    
    async function fetchNovosProfessores(includeParams : string) {
      try {
        const response = await getAllAvaliacao({ include : includeParams  });
        setAvaliacoesNovosProfessores(response.data.data || []);
        setAvaliacoesTodosProfessores(response.data.data || []);
      } catch (error) {
        setAvaliacoesNovosProfessores([]);
        setAvaliacoesTodosProfessores([]);
      }
    }
    fetchNovosProfessores(includeQuery);
  }, []);

  // Atualiza apenas Todos os Professores ao buscar
  const handlerSearchChange = async (e: React.ChangeEvent<HTMLInputElement>, includeParams : string = "") => {
    const value = e.target.value;
    setSearchValue(value);

    try {
      const response = await getAllAvaliacao({ include: includeParams, search: value, sort: selectedOrder});
      setAvaliacoesTodosProfessores(response.data.data || []);
    } catch (error) {
      setAvaliacoesTodosProfessores([]);
    }
  };

  // Função chamada toda vez que o seletor muda
  const handleOrderChange = async (value: string, includeParams : string = "") => {
    setSelectedOrder(value);

    try {
      const response = await getAllAvaliacao({ include: includeParams, search: searchValue, sort: value});
      setAvaliacoesTodosProfessores(response.data.data || []);
    } catch (error) {
      setAvaliacoesTodosProfessores([]);
    }
    
  };

  const selectOrderOptions = [
    {
      value : 'professor', 
      text: 'Nome'
    },
    {
      value : 'disciplina', 
      text: 'Matéria'
    },
    {
      value : 'updatedAt', 
      text: 'Atualização'
    },
    {
      value : 'createdAt', 
      text: 'Criação'
    },
  ];

  return (
    <>
      <FeedUserHeader />

      <main className="bg-[#ededed] h-fit min-h-screen w-full flex flex-col items-center p-10">
        
        {/* Novos Professores */}
        <section className="w-fit min-w-full bg-green-100 h-auto h-min-fit">
          <div className="flex flex-row justify-between items-center h-fit p-2 bg-white">
            <h2 className="text-2xl center text-black">Novos Professores</h2>

            <div className="relative" style={{ minWidth: 250 }}>
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                {/* Lupa SVG */}
                <svg width="18" height="18" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Buscar Professor(a)"
                className="rounded-full px-4 py-2 border-2 border-black bg-white text-black placeholder-gray-400 w-full text-center pl-10"
                style={{ minWidth: 250 }}
                onChange={e => handlerSearchChange(e, includeQuery)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {avaliacoesNovosProfessores.map((avaliacao) => (
              <CardProfessorFeed
                key={avaliacao.id}
                nome={avaliacao.professor?.nome}
                disciplina={avaliacao.disciplina?.nome}
                img="/image/girafales.jpeg"
                updateAt={avaliacao.updateAt || ''} />
            ))}
          </div>
        </section>

        <hr className="w-full border-black border-2 my-2" />

        {/* Todos os Professores */}
        <section className="w-fit min-w-full bg-green-100 h-auto">
          <div className="flex flex-row justify-between items-center h-fit p-2 bg-red-100">
            <h2 className="text-2xl center text-black">Todos os Professores</h2>
            <SeletorOrdenacaoFeed 
              defaultValue='Ordenar'
              value={selectedOrder}
              options={selectOrderOptions}
              onChange={e => handleOrderChange(e, includeQuery)}
            />
          </div>
          
          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {avaliacoesTodosProfessores.map((avaliacao) => (
              <CardProfessorFeed
                key={avaliacao.id}
                nome={avaliacao.professor?.nome}
                disciplina={avaliacao.disciplina?.nome}
                img="/image/girafales.jpeg"
                updateAt={avaliacao.updateAt || ''} />
            ))}
          </div>
        </section>
        
      </main>
    </>
  );
}

export default Feed;