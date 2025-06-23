import axios from "axios";

interface ProfessorData {
    professorNome: string;
    professorId: number;
    departamentoNome: string;
    departamentoId: number;
    disciplinaNome?: string;
    disciplinaId?: number;

    
}

export async function createProfessor(professorData: ProfessorData){
    try{
        const response = await axios.post("http://localhost:5000/professor", professorData);
        return response.data;
    } catch(error) {
        console.error("Erro ao enviar professor API", error);
        throw error;
    }
};