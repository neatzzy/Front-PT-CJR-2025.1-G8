"use client";
import React, { useEffect, useState, useRef } from 'react';
import FeedUserHeader from './components/header/FeedUserHeader';
import CardProfessorFeed from './components/card/CardProfessorFeed';
import { getAllAvaliacao } from '../app/utils/api/apiAvaliacao';
import SeletorOrdenacaoFeed from './components/seletor/SeletorOrdenacaoFeed';
import ToggleFeed from './components/seletor/toggleFeed';
import CriarAvaliacaoModal from './modais/criarAvaliacaomodal';

function Feed() {
  const [avaliacoesNovosProfessores, setAvaliacoesNovosProfessores] = useState<any[]>([]);
  const [avaliacoesTodosProfessores, setAvaliacoesTodosProfessores] = useState<any[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [orderValue, setOrderValue] = useState<'asc' | 'desc'>('asc');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const includeQuery = 'professor,disciplina,comentarios';

  // Carrega os novos professores apenas uma vez ao montar
  useEffect(() => {
    
    async function fetchNovosProfessores(includeParams : string) {
      try {
        const response = await getAllAvaliacao({ 
          include : includeParams, 
          order : orderValue  
        });
        
        setAvaliacoesNovosProfessores(response.data.data || []);
        setAvaliacoesTodosProfessores(response.data.data || []);
      } catch (error) {
        setAvaliacoesNovosProfessores([]);
        setAvaliacoesTodosProfessores([]);
      }
    }
    fetchNovosProfessores(includeQuery);
  }, []);

  
  const handlerSearchChange = async (e: React.ChangeEvent<HTMLInputElement>, includeParams : string = "") => {
    const value = e.target.value;
    setSearchValue(value);

    try {
      const response = await getAllAvaliacao({ include: includeParams, search: value, sort: sortValue, order: orderValue});
      setAvaliacoesTodosProfessores(response.data.data || []);
    } catch (error) {
      setAvaliacoesTodosProfessores([]);
    }
  };

  // Função chamada toda vez que o seletor muda
  const hadlerSortChange = async (value: string, includeParams : string = "") => {
    setSortValue(value);

    try {
      const response = await getAllAvaliacao({ include: includeParams, search: searchValue, sort: value, order: orderValue});
      setAvaliacoesTodosProfessores(response.data.data || []);
    } catch (error) {
      setAvaliacoesTodosProfessores([]);
    }
    
  };

  const hadlerOrderChange = async (value: 'asc' | 'desc', includeParams: string = "") => {
    setOrderValue(value); // mantém o estado atualizado para futuros renders

    try {
      const response = await getAllAvaliacao({
        include: includeParams,
        search: searchValue,
        sort: sortValue,
        order: value, 
      });

      setAvaliacoesTodosProfessores(response.data.data || []);
    } catch (error) {
      setAvaliacoesTodosProfessores([]);
    }
  };

  const formatDate = (date : Date) => {
    return new Date(date)
      .toLocaleString('pt-BR', 
        {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour12: false,
          timeZone: 'UTC'
        }
      );
  }

  const selectOrderOptions = [
    {
      value : 'professor', 
      label: 'Nome'
    },
    {
      value : 'disciplina', 
      label: 'Matéria'
    },
    {
      value : 'updatedAt', 
      label: 'Atualização'
    },
    {
      value : 'createdAt', 
      label: 'Criação'
    },
  ];



  return (
    <>
      <FeedUserHeader />

      <main className="bg-[#ededed] h-fit min-h-screen w-full flex flex-col items-center p-10">
        
        {/* Novos Professores */}
        <section className="w-fit min-w-full h-auto h-min-fit bg-white-100 ">
          <div className="flex flex-row justify-between items-center h-fit py-5 px-5 bg-white border-2 rounded-full">
            <h2 className="text-2xl center text-black">Novos Professores</h2>

              <button
                className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] transition-colors duration-300 h-full min-w-[35px] w-fit"
                onClick={() => setModalOpen(true)}
              >
                + Avaliações
              </button>

          </div>

          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {avaliacoesNovosProfessores.map((avaliacao) => (
              <CardProfessorFeed
                key={avaliacao.id}
                nome={avaliacao.professor?.nome}
                disciplina={avaliacao.disciplina?.nome}
                img="/image/girafales.jpeg"
                updatedAt={avaliacao.updatedAt ? formatDate(avaliacao.updatedAt) : ''} 
              />
            ))}
          </div>
        </section>

        <hr className="w-full border-black border-2 my-2" />

        {/* Todos os Professores */}
        <section className="w-fit min-w-full h-auto">

           {/* Cabecalho */}
          <div className="flex flex-row justify-between items-center h-fit py-5 px-5 bg-white border-2 rounded-full">
            <h2 className="text-2xl center text-black">Todos os Professores</h2>

            
            {/* Input do nome do professor */}
            <div className="relative h-10" style={{ minWidth: '25%' }}>
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none h-10">
                {/* Lupa SVG */}
                <svg width="18" height="18" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Buscar Professor(a)"
                className="rounded-full px-4 py-2 border-2 border-black bg-white text-black placeholder-gray-400 w-full text-center pl-10 min-h-fit"
                onChange={e => handlerSearchChange(e, includeQuery)}
              />
            </div>

            <div className='flex flex-row items-center justify-between gap-x-10 h-auto w-fit'> 
              <ToggleFeed 
                value={orderValue} 
                onToggle={e => hadlerOrderChange(e, includeQuery)}
              />

              <SeletorOrdenacaoFeed 
                defaultValue='Ordenar'
                value={sortValue}
                options={selectOrderOptions}
                onChange={e => hadlerSortChange(e, includeQuery)}
              />

            </div>

          </div>
          
          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {avaliacoesTodosProfessores.map((avaliacao) => (
              <CardProfessorFeed
                key={avaliacao.id}
                nome={avaliacao.professor?.nome}
                disciplina={avaliacao.disciplina?.nome}
                img="/image/girafales.jpeg"
                updatedAt={avaliacao.updatedAt ? formatDate(avaliacao.updatedAt) : ''} 
              />
            ))}
          </div>
        </section>
        <CriarAvaliacaoModal open={modalOpen} onClose={() => setModalOpen(false)} />

      </main>
    </>
  );
}

export default Feed;