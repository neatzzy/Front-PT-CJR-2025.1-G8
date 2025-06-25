import axios from "axios";

interface AvaliacaoData {
    professorId: number;
    disciplinaId: number;
    avaliacao: string
}

interface Disciplina {
    id: number;
    nome: string;
    // Adicione outros campos conforme necessário
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
        const response = await axios.get<Disciplina[]>(`http://localhost:5000/professor-disciplina/professor/${professorId}/disciplinas?search=${searchTerm}`, {
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