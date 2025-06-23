import axios from "axios";

interface AvaliacaoData {
    professorId: number;
    disciplinaId: number;
    avaliacao: string
}

export async function createAvaliacao(avaliacaoData: AvaliacaoData){
    try{
        const response = await axios.post("http://localhost:5000/avaliacao", avaliacaoData);
        return response.data;
    } catch(error) {
        console.error("Erro ao enviar avaliação API", error);
        throw error;
    }
}
export async function fetchProfessors(searchTerm: string = '') {
    try {
        const response = await axios.get(`http://localhost:5000/professor?search=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar professores:", error);
        return [];
    }
    }

export async function fetchDisciplina(searchTerm: string = '') {
    try {
        const response = await axios.get(`http://localhost:5000/disciplina?search=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
        return [];
    }
}