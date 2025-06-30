import axios from "axios";

interface AvaliacaoData {
    professorId: number;
    disciplinaId: number;
    conteudo: string
}

interface Disciplina {
    id: number;
    nome: string;
}

export async function createAvaliacao(avaliacaoData: AvaliacaoData, token?: string){
    try{
        const response = await axios.post("http://localhost:5000/avaliacao", avaliacaoData, 
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
        const response = await axios.get(`http://localhost:5000/professor?search=${searchTerm}`, {
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
        const response = await axios.get<Disciplina[]>(`http://localhost:5000/professor-disciplina/${professorId}/disciplinas?search=${searchTerm}`, {
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
        const response = await axios.delete(`http://localhost:5000/avaliacao/${avaliacaoId}`, {
            headers: {
                ...(token && {Authorization: `Bearer ${token}`})
            }
        });
        return response.data;
    }catch(error) {
        console.error('Erro ao enviar remoção API')
    }
}