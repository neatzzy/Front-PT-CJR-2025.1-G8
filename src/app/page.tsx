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
import { getAllProfessorDisciplina } from '../app/utils/api/apiProfessorDisciplina';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@mui/material/Pagination';

export interface Root {
  meta: Meta
  data: Daum[]
}

export interface Meta {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface Daum {
  professorID: number
  disciplinaID: number
  professor: Professor
  disciplina: Disciplina
}

export interface Professor {
  id: number
  nome: string
  departamento: string
  updatedAt: string
  createdAt: string
  fotoPerfil: any
}

export interface Disciplina {
  id: number
  nome: string
  updatedAt: string
  createdAt: string
}

const pageSize = 7;
const minTimeLoad = 750;

function Feed() {
  const [sortValue, setSortValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [orderValue, setOrderValue] = useState<'asc' | 'desc'>('asc');
  const [modalTeacherOpen, setModalTeacherOpen] = useState<boolean>(false);
  const [modalAssessmentOpen, setModalAssessmentOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Paginação
  const [pageNovos, setPageNovos] = useState(1);
  const [pageTodos, setPageTodos] = useState(1);

  // Estado para controlar loading mínimo
  const [showLoadingNovos, setShowLoadingNovos] = useState(false);
  const [showLoadingTodos, setShowLoadingTodos] = useState(false);

  // Busca paginada de novos professores
  const { data: novosProfessoresData = { meta: { total: 0, page: 1, pageSize: pageSize, totalPages: 1 }, data: [] }, isLoading: loadingNovos } = useQuery<Root>({
    queryKey: ['novosProfessores', pageNovos],
    queryFn: async () => {
      const res = await getAllProfessorDisciplina({
        include: 'professor,disciplina',
        order: 'desc',
        sort: 'createdAt',
        page: pageNovos,
        pageSize: pageSize,
      });

      await new Promise(resolve => setTimeout(resolve, minTimeLoad));

      return res.data as Root;
    },
    staleTime: 1000 * 60,
  });

  // Busca paginada de todos professores
  const { data: todosProfessoresData = { meta: { total: 0, page: 1, pageSize: pageSize, totalPages: 1 }, data: [] }, isLoading: loadingTodos } = useQuery<Root>({
    queryKey: ['todosProfessores', pageTodos, sortValue, orderValue, searchValue],
    queryFn: async () => {
      const res = await getAllProfessorDisciplina({
        include: 'professor,disciplina',
        order: orderValue,
        sort: sortValue,
        page: pageTodos,
        pageSize: pageSize,
        search: searchValue,
      });

      await new Promise(resolve => setTimeout(resolve, minTimeLoad));

      return res.data as Root;
    },
    staleTime: 1000 * 60,
  });


  useEffect(() => {
    async function featchUser() {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        if (storedToken) {
          try {
            const decodedToken: any = jwtDecode(storedToken);
            const extractedUserId = decodedToken.id || decodedToken.sub;
            setUserId(extractedUserId);
          } catch (e) {
            setUserId(null);
          }
        } else {
          setUserId(null);
        }
      }
    }
    featchUser();
  }, []);

  const handlerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPageTodos(1);
  };

  const hadlerSortChange = (value: string) => {
    setSortValue(value);
  };

  const hadlerOrderChange = (value: 'asc' | 'desc') => {
    setOrderValue(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
    });
  };

  const selectOrderOptions = [
    { value: 'professor', label: 'Nome' },
    { value: 'disciplina', label: 'Matéria' },
    { value: 'updatedAt', label: 'Atualização' },
    { value: 'createdAt', label: 'Criação' },
  ];

  return (
    <>
      <header className='sticky top-0'>
      <FeedUserHeader />
      </header>
      <main className="bg-[#ededed] h-fit min-h-screen w-full flex flex-col items-center p-10">

        {/* Novos Professores */}
        <section className="w-fit min-w-full h-auto h-min-fit bg-white-100 ">
          <div className="flex flex-row justify-between items-center h-fit py-5 px-5 bg-white border-2 rounded-full">
            <h2 className="text-2xl center text-black">Novos Professores</h2>
            <Protected singin={true}>
              <div className='flex flex-row w-fit gap-x-10 h-fit'>
                <button
                  className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] h-full min-w-[35px] w-fit hover:bg-[#00ed4f] transition-colors"
                  onClick={() => setModalTeacherOpen(true)}
                >
                  Adicionar Professor
                </button>
                <button
                  className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] h-full min-w-[35px] w-fit hover:bg-[#00ed4f] transition-colors"
                  onClick={() => setModalAssessmentOpen(true)}
                >
                  Adicionar Avaliação
                </button>
              </div>
            </Protected>
          </div>

          <div className="flex flex-row gap-8 justify-center py-5 h-fit">
            {(loadingNovos) ? (
              <div className='w-full h-60 flex flex-col items-center justify-center gap-3'>
                <p className='font-bold text-black text-100'>Carregando</p>
              </div>
            ) : (
              novosProfessoresData.data.length > 0 ? (
                novosProfessoresData.data.map((relacao: Daum) => (
                  <CardProfessorFeed
                    key={relacao.professorID}
                    professorID={relacao.professorID}
                    nome={relacao.professor.nome}
                    disciplina={relacao.disciplina.nome}
                    img={relacao.professor.fotoPerfil}
                    updatedAt={relacao.professor.updatedAt ? formatDate(relacao.professor.updatedAt) : ''}
                  />
                ))
              ) : (
                <div className='w-full h-60 flex items-center justify-center'>
                  <p className='font-bold text-black text-100'>Não há professores</p>
                </div>
              )
            )}
          </div>

          <div className='w-full h-fit flex flex-row justify-center m-2'>
            {novosProfessoresData.meta && (
              <Pagination
                count={novosProfessoresData.meta.totalPages}
                page={pageNovos}
                onChange={(_, value) => setPageNovos(value)}
                color="primary"
                variant="outlined"
                shape="rounded"
                size="large"
              />
            )}
          </div>
        </section>

        <hr className="w-full border-black border-2 my-2" />

        {/* Todos os Professores */}
        <section className="w-fit min-w-full h-auto">
          <div className="flex flex-row justify-between items-center h-fit py-5 px-5 bg-white border-2 rounded-full">
            <h2 className="text-2xl center text-black">Todos os Professores</h2>
            <input
              type="text"
              placeholder="Buscar Professor(a)"
              className="rounded-full px-4 py-2 border-2 border-black bg-white text-black placeholder-gray-400 w-full text-center pl-10 min-h-fit"
              style={{ width: '350px' }}
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
            {(loadingTodos) ? (
              <div className='w-full h-60 flex items-center justify-center'>
                <p className='font-bold text-black text-100'>Carregando</p>
              </div>
            ) : (
              todosProfessoresData.data.length > 0 ? (
                todosProfessoresData.data.map((relacao: Daum) => (
                  <CardProfessorFeed
                    key={relacao.professorID}
                    professorID={relacao.professorID}
                    nome={relacao.professor.nome}
                    disciplina={relacao.disciplina.nome}
                    img={relacao.professor.fotoPerfil}
                    updatedAt={relacao.professor.updatedAt ? formatDate(relacao.professor.updatedAt) : ''}
                  />
                ))
              ) : (
                <div className='w-full h-60 flex items-center justify-center'>
                  <p className='font-bold text-black text-100'>Não há professores</p>
                </div>
              )
            )}
          </div>

          <div className='w-full h-fit flex flex-row justify-center m-2'>
            {
              todosProfessoresData.meta && 
                (
                  <Pagination
                    count={todosProfessoresData.meta.totalPages}
                    page={pageTodos}
                    onChange={(_, value) => setPageTodos(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    size="large"
                  />
                )
            }
          </div>
        </section>

        <CriarAvaliacaoModal open={modalAssessmentOpen} onClose={() => setModalAssessmentOpen(false)} authToken={token ?? undefined} userId={userId} />
        <CriarProfessorModal open={modalTeacherOpen} onClose={() => setModalTeacherOpen(false)} authToken={token} />

      </main>
    </>
  );
}

export default Feed;