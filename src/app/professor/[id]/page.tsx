"use client"

import React, {useEffect, useState} from 'react'
import FeedUserHeader from '@/app/components/header/FeedUserHeader'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import PerfilProfessor from '../components/PerfilProfessor';
import Avaliacao from '../components/Avaliacao';
import { getProfessorById } from '../../utils/api/apiProfessor'
import { getAllAvaliacao } from '@/app/utils/api/apiAvaliacao';


interface Professor {
    id : number;
    nome : string;
    deparamento : string;
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
            const includeQuery = "?include=professor,disciplina,comentarios,usuario";
            
            try{

                const queryParams = {
                    professorID : id, 
                    include:includeQuery,
                };

                const response = await getAllAvaliacao(queryParams);

                setAvaliacoes(response.data);

            }catch(err){
                setAvaliacoes([]);
            }
            
        }

        fetchPerfil();    
    
    },[]);

    const avaliacao = {};

    return (
        <>
            <FeedUserHeader />

            <main className="min-h-screen w-full bg-[#ededed] flex flex-row justify-center">
                {/* Sidebar esquerda */}
                <aside className="w-1/5 bg-[#ededed] flex flex-col items-end p-10">
                    <button
                        className="bg-white rounded-full p-3 shadow-md border border-black"

                    >
                        <FaArrowLeft size={32} />
                    </button>
                </aside>
                {/* Conteúdo principal centralizado */}
                <div className="flex flex-col items-start w-1/2 h-fit">

                    <PerfilProfessor
                        nome={professor?.nome || 'Jacinto'}
                        departamento={professor?.deparamento || 'Cicaralho'}
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


                        <Avaliacao 
                            id={avaliacao.id ? avaliacao.id : 1}
                            avatarUser={avaliacao.avatarUser || ""}
                            nomeUser={avaliacao.nomeUser || "baiano"}
                            updatedAt={avaliacao.updatedAt || "15/06"}
                            nomeProfessor={avaliacao.nomeProfessor || "Jacinto"}
                            disciplina={avaliacao.disciplina || "Segurança"}
                            conteudo={avaliacao.conteudo || "kdghbaskjdgbhaksdb"}
                            comentarios={avaliacao.comentarios || []}
                        />

                        {
                        /*avaliacoes.map(avaliacao => (
                        ))
                        */
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
