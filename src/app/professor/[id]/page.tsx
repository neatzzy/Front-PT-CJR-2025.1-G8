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

    const params = useParams();


    useEffect(() => {
        async function fetchPerfil() {
            const { id } = params;
            const includeQuery = "?include=disciplina,comentarios,usuario";
            
            try{

                const queryParams = {
                    professorID : id, 
                    include:includeQuery,
                };

                const responseProfessor = await getProfessorById(id);

                const professorData = {
                    id : responseProfessor.data.id,
                    nome : responseProfessor.data.nome,
                    departamento : responseProfessor.data.departamento,
                    disciplinas : responseProfessor.data.disciplinas.map((item: { disciplina: { nome: string } }) => item.disciplina.nome), 
                    avatar : "",
                };
                
                setProfessor(professorData);

                const responseAvalicao = await getAllAvaliacao(queryParams);

                setAvaliacoes(responseAvalicao.data?.data);

            }catch(err){
                setProfessor(null)
                setAvaliacoes([]);
            }
            
        }

        fetchPerfil();    
    
    },[]);

    const avaliacao = {};

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
                        nome={professor?.nome || 'Jacinto'}
                        departamento={professor?.departamento || 'Cicaralho'}
                        disciplinas={professor?.disciplinas || ['segurança','estrutura de dados', 'Banco de dados', 'sistemas de informação']}
                        avatar={professor?.avatar || ''}
                    />
                    {/* Professor */}

                    <hr className="w-full border-black border-1" />

                    {/* Avaliacoes */}
                    <div className="h-fit bg-white p-4 w-full flex flex-col justify-start items-center ">
                        <div className='w-full'>
                            <h3 className='text-black font-bold'> Avaliações </h3>
                        </div>

                        {
                            avaliacoes.map(avaliacao => (
                                <Avaliacao 
                                    key={avaliacao.id}
                                    id={avaliacao.id}
                                    avatarUser={avaliacao.usuario.fotoPerfil}
                                    nomeUser={avaliacao.usuario.nome}
                                    updatedAt={formatDate(avaliacao.updatedAt)}
                                    nomeProfessor={professor?.nome || ""}
                                    disciplina={avaliacao.disciplina.nome}
                                    conteudo={avaliacao.conteudo}
                                    comentarios={avaliacao.comentarios || []}
                                />
                            ))
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
