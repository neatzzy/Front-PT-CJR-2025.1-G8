"use client";

import React, { useEffect, useState } from 'react';
import FeedUserHeader from '@/app/components/header/FeedUserHeader';
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import PerfilProfessor from '../components/PerfilProfessor';
import Avaliacao from '../components/Avaliacao';
import { getProfessorById } from '../../utils/api/apiProfessor';
import { getAllAvaliacao } from '@/app/utils/api/apiAvaliacao';
import { formatDate } from '@/app/utils/format';
import { getCurrentUserAuthorized } from '@/app/utils/api/apiUser';
import DeletarAvaliacao from '@/app/components/usuario/AvaliacaoOptions/DeletarAvaliacao';
import EditarAvaliacao from '@/app/components/usuario/AvaliacaoOptions/EditarAvaliacao';
import { jwtDecode } from 'jwt-decode';
import AdicionarDisciplinas from '../DisciplinaOptions/AdicionarDIsciplinas';

interface Professor {
    id: number;
    nome: string;
    departamento: string;
    disciplinas: any[];
    avatar: string;
}

function ProfessorPage() {
    const [professor, setProfessor] = useState<Professor | null>(null);
    const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
    const [usuarioAutorizado, setUsuarioAutorizado] = useState<any>(null);
    const [makeReload, setMakeReload] = useState<boolean>(false);
    const router = useRouter();

    const params = useParams();
    const professorIdFromParams = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

    const [token, setToken] = useState<string | null>(null);
    const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

    const [DelOpen, setDelOpen] = useState<boolean>(false);
    const [selectedAvaliacaoId, setSelectedAvaliacaoId] = useState<number | null>(null);

    const [EditOpen, setEditOpen] = useState<boolean>(false);
    const [isAddDisciplinaOpen, setIsAddDisciplinaOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);

            if (storedToken) {
                try {
                    const decodedToken: any = jwtDecode(storedToken);
                    const extractedUserId = decodedToken.id || decodedToken.sub;
                    setLoggedInUserId(extractedUserId);
                } catch (e) {
                    console.error("Erro ao decodificar token JWT:", e);
                    setLoggedInUserId(null);
                }
            } else {
                setLoggedInUserId(null);
            }
        }
    }, []);

    useEffect(() => {
        async function fetchPerfil() {
            if (!professorIdFromParams || !token) {
                setUsuarioAutorizado(null); 
                return;
            }

            const includeQuery = "usuario,professor,disciplina,comentarios";
            const avaliacaoQueryParams = {
                professorID: professorIdFromParams,
                include: includeQuery,
                token: token,
            };

            try {
                const responseProfessor = await getProfessorById(professorIdFromParams);
                const professorData = {
                    id: responseProfessor.data.id,
                    nome: responseProfessor.data.nome,
                    departamento: responseProfessor.data.departamento,
                    disciplinas: responseProfessor.data.disciplinas ? responseProfessor.data.disciplinas.map((item: { disciplina: { nome: string } }) => item.disciplina.nome) : [],
                    avatar: responseProfessor.data.fotoPerfil,
                };
                console.log('ProfessorPage: professorData.disciplinas (após mapeamento):', professorData.disciplinas);
                setProfessor(professorData);

                const responseAvalicao = await getAllAvaliacao(avaliacaoQueryParams);
                setAvaliacoes(responseAvalicao.data?.data);

                if (loggedInUserId) {
                    setUsuarioAutorizado({ id: loggedInUserId });
                } else {
                    setUsuarioAutorizado(null);
                }

            } catch (err) {
                console.error("Erro ao buscar perfil do professor ou avaliações:", err);
                setProfessor(null);
                setAvaliacoes([]);
                setUsuarioAutorizado(null);
            }
        }

        fetchPerfil();
    }, [professorIdFromParams, makeReload, token, loggedInUserId]);


    const handleReload = () => {
        setMakeReload((prev) => !prev);
    };

    function handlerBackPage() {
        window.history.back();
    }

    const handleTrashClickProfessorPage = (avaliacaoId: number) => {
        setSelectedAvaliacaoId(avaliacaoId);
        setDelOpen(true);
    };

    const handleEditClickProfessorPage = (avaliacaoId: number) => { 
        setSelectedAvaliacaoId(avaliacaoId);
        setEditOpen(true);
    };
    const handleAddDisciplineClick = () => { 
      setIsAddDisciplinaOpen(true);
    };

    return (
        <>
            <FeedUserHeader />

            <main className="min-h-screen w-full bg-[#ededed] flex flex-row justify-center">

                <aside className="w-1/5 bg-[#ededed] flex flex-col items-end p-10">
                    <button className="bg-white rounded-full p-3 shadow-md border border-black">
                        <FaArrowLeft
                            size={32}
                            onClick={handlerBackPage}
                        />
                    </button>
                </aside>

                <div className="flex flex-col items-start w-1/2 h-fit">

                    <PerfilProfessor
                        nome={professor?.nome || ''}
                        departamento={professor?.departamento || ''}
                        disciplinas={professor?.disciplinas || []}
                        avatar={professor?.avatar || ''}
                        onAddDisciplineClick={() => setIsAddDisciplinaOpen(true)}
                    />
                    <hr className="w-full border-black border-1" />

                    <div className="h-fit bg-white p-4 w-full flex flex-col gap-3 justify-start items-center ">
                        <div className='w-full'>
                            <h3 className='text-black font-bold mb-5'> Avaliações </h3>
                        </div>

                        {avaliacoes.length > 0 ?
                            (
                                Array.isArray(avaliacoes) && avaliacoes
                                    .filter(avaliacao => avaliacao &&
                                        avaliacao.usuario &&
                                        avaliacao.disciplina
                                    )
                                    .map(avaliacao => (
                                        <Avaliacao
                                            key={avaliacao.id}
                                            id={avaliacao.id}
                                            usuarioAutenticado={usuarioAutorizado?.id || null}
                                            usuarioAvaliacao={avaliacao.usuario.id || null}
                                            avatarUser={avaliacao.usuario.fotoPerfil}
                                            nomeUser={avaliacao.usuario.nome}
                                            updatedAt={formatDate(avaliacao.updatedAt)}
                                            nomeProfessor={professor?.nome || ""}
                                            disciplina={avaliacao.disciplina.nome}
                                            conteudo={avaliacao.conteudo}
                                            comentarios={Array.isArray(avaliacao.comentarios) ? avaliacao.comentarios : []}
                                            reload={handleReload}
                                            onDeleteRequest={handleTrashClickProfessorPage}
                                            onEditRequest={handleEditClickProfessorPage}
                                        />
                                    ))
                            )
                            : (
                                <div className='w-full h-fit m-2'>
                                    <h3 className='text-gray-600 text-center font-bold mb-5'> Não há publicações </h3>
                                </div>
                            )
                        }

                    </div>
                </div>

                <aside className="w-1/5 bg-[#ededed]" />
            </main>

            <DeletarAvaliacao
                open={DelOpen}
                onClose={() => setDelOpen(false)}
                authToken={token ?? undefined}
                avaliacaoId={selectedAvaliacaoId}

            />

            <EditarAvaliacao
                open={EditOpen}
                onClose={() => setEditOpen(false)}
                authToken={token ?? undefined}
                avaliacaoId={selectedAvaliacaoId} 
            />

            <AdicionarDisciplinas open={isAddDisciplinaOpen} onClose={() => setIsAddDisciplinaOpen(false)} authToken={token ?? undefined} professorId={professor?.id || null} 
            professorFoto={professor?.avatar || ''}/>
        </>
    );
}

export default ProfessorPage;