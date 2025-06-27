"use client";
import React, { useEffect, useState } from 'react';
import FeedUserHeader from './components/header/FeedUserHeader';
import CardProfessorFeed from './components/card/CardProfessorFeed';
import SeletorOrdenacaoFeed from './components/seletor/SeletorOrdenacaoFeed';
import ToggleFeed from './components/seletor/toggleFeed';
import CriarAvaliacaoModal from './modais/criarAvaliacaomodal'; 
import Protected from './components/Protected';
import CriarProfessorModal from './modais/criarProfessormodal';
import { jwtDecode } from 'jwt-decode';
import { getAllProfessorDisciplina } from '../app/utils/api/apiProfessorDisciplina'

function Feed() {
  const [novosProfessores, setNovosProfessores] = useState<any[]>([]);
  const [todosProfessores, setTodosProfessores] = useState<any[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [orderValue, setOrderValue] = useState<'asc' | 'desc'>('asc');
  const [modalTeacherOpen, setModalTeacherOpen] = useState<boolean>(false);
  const [modalAssessmentOpen, setModalAssessmentOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  
  useEffect(() => {
    async function featchUser(){
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem("token"); 
        setToken(storedToken);
        if (storedToken) {
          try {
            const decodedToken: any = jwtDecode(storedToken);
            const extractedUserId = decodedToken.id || decodedToken.sub;
            setUserId(extractedUserId);
          } catch (e) {
            console.error("Erro ao decodificar token JWT:", e);
            setUserId(null);
          }
        } else {
          setUserId(null);
        }
      }
    }
    
    async function fetchDataProfessores(includeParams : string) {
      try {
        const responseAllTeacher = await getAllProfessorDisciplina({
          include: includeParams,
          order: orderValue,
          search: searchValue, 
          sort: sortValue,
        });

        const responseNewTeacher = await getAllProfessorDisciplina({
          include: includeParams,
          order: 'desc',
          sort: 'createdAt',
        });
        
        setNovosProfessores(responseNewTeacher.data.data || []);
        setTodosProfessores(responseAllTeacher.data.data || []);
      } catch (error) {
        setNovosProfessores([]);
        setTodosProfessores([]);
      }
    }

    const includeQuery = 'professor,disciplina';

    featchUser();
    fetchDataProfessores(includeQuery);
   
  }, 
  [
    orderValue, 
    sortValue, 
    searchValue,
  ]);

  const handlerSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const hadlerSortChange = async (value: string) => {
    setSortValue(value);
  };

  const hadlerOrderChange = async (value: 'asc' | 'desc') => {
    setOrderValue(value);
  };

  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleString('pt-BR',
        {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour12: false,
        }
      );
  };

  const selectOrderOptions = [
    { value: 'professor', label: 'Nome' },
    { value: 'disciplina', label: 'Matéria' },
    { value: 'updatedAt', label: 'Atualização' },
    { value: 'createdAt', label: 'Criação' },
  ];

  return (
    <>
      <FeedUserHeader />

      <main className="bg-[#ededed] h-fit min-h-screen w-full flex flex-col items-center p-10">

        {/* Novos Professores */}
        <section className="w-fit min-w-full h-auto h-min-fit bg-white-100 ">
          <div className="flex flex-row justify-between items-center h-fit py-5 px-5 bg-white border-2 rounded-full">
            <h2 className="text-2xl center text-black">Novos Professores</h2>
            
            <Protected singin={true}>
               <div className='flex flex-row w-fit gap-x-10 h-fit'>
                  <button
                      className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] transition-colors duration-300 h-full min-w-[35px] w-fit"
                      onClick={() => setModalTeacherOpen(true)}
                  >
                      Adicionar Professor
                  </button>

                  <button
                      className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] transition-colors duration-300 h-full min-w-[35px] w-fit"
                      onClick={() => setModalAssessmentOpen(true)}
                  >
                      Adicionar Avaliação
                  </button>
              </div>
            </Protected>
          </div>

          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {novosProfessores.map((relacao) => (
              <CardProfessorFeed
                key={relacao?.professorID}
                professorID = {relacao?.professorID}
                nome={relacao?.professor?.nome}
                disciplina={relacao?.disciplina?.nome}
                img={relacao?.professor.fotoPerfil}
                updatedAt={relacao?.professor.updatedAt ? formatDate(relacao?.professor.updatedAt) : ''}
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
           
            <input
              type="text"
              placeholder="Buscar Professor(a)"
              className="rounded-full px-4 py-2 border-2 border-black bg-white text-black placeholder-gray-400 w-full text-center pl-10 min-h-fit"
              style={{ 
                width: '350px',
                }}
              value={searchValue}
              onChange={handlerSearchChange}
            />

            <div className="flex flex-row gap-10 items-center">
              <SeletorOrdenacaoFeed
                defaultValue="Ordenar"
                options={selectOrderOptions}
                value={sortValue}
                onChange={hadlerSortChange}
              />
              <ToggleFeed value={orderValue} onToggle={hadlerOrderChange} />
            </div>
          </div>

          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {todosProfessores.map((relacao) => (
              <CardProfessorFeed
                key={relacao?.professorID}
                professorID = {relacao?.professorID}
                nome={relacao?.professor?.nome}
                disciplina={relacao?.disciplina?.nome}
                img={relacao?.professor.fotoPerfil}
                updatedAt={relacao?.professor.updatedAt ? formatDate(relacao?.professor.updatedAt) : ''}                
              />
            ))}
          </div>
        </section>
       <CriarAvaliacaoModal open={modalAssessmentOpen} onClose={() => setModalAssessmentOpen(false)} authToken={token ?? undefined} userId={userId}/>
        <CriarProfessorModal open={modalTeacherOpen} onClose={() => setModalTeacherOpen(false)} authToken={token} />
        
      </main>
    </>
  );
}

export default Feed;