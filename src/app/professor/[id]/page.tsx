"use client"

import React, {useEffect, useState} from 'react'
import FeedUserHeader from '@/app/components/header/FeedUserHeader'
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";
import PerfilProfessor from '../components/PerfilProfessor';
import Avaliacao from '../components/Avaliacao';
import { getProfessorById } from '../../utils/api/apiProfessor'
import { getAllAvaliacao } from '@/app/utils/api/apiAvaliacao';
import { formatDate } from '@/app/utils/format';
import { getCurrentUserAuthorized } from '@/app/utils/api/apiUser';


interface Professor {
    id : number;
    nome : string;
    departamento : string;
    disciplinas : any[];
    avatar : string;
}

function ProfessorPage() {
    const [professor, setProfessor] = useState<Professor | null>(null);
    const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
    const [usuarioAutorizado, setUsuarioAutorizado] = useState<any> (null);

    const params = useParams();


    useEffect(() => {
        async function fetchPerfil() {
            const { id } = params;
            const includeQuery = "?include=disciplina,comentarios,usuario";
            const userToken = localStorage.getItem('token');
            
            try{

                const queryParams = {
                    professorID : id, 
                    include:includeQuery,
                };

                const responseAvalicao = await getAllAvaliacao(queryParams);
                const responseProfessor = await getProfessorById(id);

                const professorData = {
                    id : responseProfessor.data.id,
                    nome : responseProfessor.data.nome,
                    departamento : responseProfessor.data.departamento,
                    disciplinas : responseProfessor.data.disciplinas.map((item: { disciplina: { nome: string } }) => item.disciplina.nome), 
                    avatar : responseProfessor.data.fotoPerfil,
                };
                
                
                setAvaliacoes(responseAvalicao.data?.data);
                setProfessor(professorData);
                
                if (userToken){
                    const responseUser = await getCurrentUserAuthorized(userToken);
                    setUsuarioAutorizado(responseUser.data);
                }

                
            }catch(err){
                console.log(err);
                setProfessor(null)
                setAvaliacoes([]);
                setUsuarioAutorizado(null);
            }
            
        }

        fetchPerfil();    
    
    },[]);

    function handlerBackPage() {
        window.history.back();
    }

    return (
        <>
            <FeedUserHeader />

            <main className="min-h-screen w-full bg-[#ededed] flex flex-row justify-center">

                {/* Sidebar esquerda */}
                <aside className="w-1/5 bg-[#ededed] flex flex-col items-end p-10">
                    <button
                        className="bg-white rounded-full p-3 shadow-md border border-black"

                    >
                        <FaArrowLeft 
                            size={32} 
                            onClick={handlerBackPage}
                        />
                    </button>
                </aside>

                {/* Conteúdo principal centralizado */}
                <div className="flex flex-col items-start w-1/2 h-fit">

                    <PerfilProfessor
                        nome={professor?.nome || ''}
                        departamento={professor?.departamento || ''}
                        disciplinas={professor?.disciplinas || []}
                        avatar={professor?.avatar || ''}
                    />
                    {/* Professor */}

                    <hr className="w-full border-black border-1" />

                    {/* Avaliacoes */}
                    <div className="h-fit bg-white p-4 w-full flex flex-col gap-3 justify-start items-center ">
                        <div className='w-full'>
                            <h3 className='text-black font-bold mb-5'> Avaliações </h3>
                        </div>

                        {   avaliacoes.length > 0 ?
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

                {/* Sidebar direita */}
                <aside className="w-1/5 bg-[#ededed]" />
            </main>
        </>
    );
}

export default ProfessorPage;
