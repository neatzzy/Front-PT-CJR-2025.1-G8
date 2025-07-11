import axios from "axios";
import { api } from "./api";

interface AvaliacaoData {
    professorId: number;
    disciplinaId: number;
    conteudo: string
}

interface UpdateAvaliacaoData {
    conteudo: string
}

interface Disciplina {
    id: number;
    nome: string;
}

export async function createAvaliacao(avaliacaoData: AvaliacaoData, token?: string){
    try{
        const response = await api.post("/avaliacao", avaliacaoData, 
            {
                headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
        return response.data;
    } catch(error) {
        console.error("Erro ao enviar avaliação API", error);
        throw error;
    }
}
export async function fetchProfessors(searchTerm: string = '', token?: string) {
    try {
        const response = await api.get(`/professor?search=${searchTerm}`, {
            headers: {
                ...(token && {Authorization: `Bearer ${token}`})
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        return [];
    }
    }

export async function fetchDisciplinasbyProfessor(
    professorId: string,
    searchTerm: string = '',
    token?: string
): Promise<Disciplina[]> {
    try {
        const response = await api.get<Disciplina[]>(`/professor-disciplina/${professorId}/disciplinas?search=${searchTerm}`, {
            headers: {
                ...(token && {Authorization: `Bearer ${token}`})
            }
            });
        return response.data;
    }catch (error) {
        console.error(`Erro ao buscar disciplinas para o professor ${professorId}:`, error);
        return [];
    }

}

export async function deleteAvaliacao(avaliacaoId:string ,token?: string) {
    try{
        const response = await api.delete(`/avaliacao/${avaliacaoId}`, {
            headers: {
                ...(token && {Authorization: `Bearer ${token}`})
            }
        });
        return response.data;
    }catch(error) {
        console.error('Erro ao enviar remoção API')
    }
} 

export async function editAvaliacao(avaliacaoId: string, updateAvaliacaoData: UpdateAvaliacaoData, token?: string) {
    try{
        const response = await api.patch(`/avaliacao/${avaliacaoId}`, updateAvaliacaoData, {
            headers: {
                ...(token && {Authorization: `Bearer ${token}`})
            }
        });
        return response.data;
    }catch(error) {
        console.error('Erro ao enviar edição API')
    }
}