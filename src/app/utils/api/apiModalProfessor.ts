import axios from "axios";

interface ProfessorData {
    professorNome: string;
    professorDepartamento: string;
    professorDisciplina: string;
    professorFoto?: File | null;
}

export async function createProfessor(data: FormData){
    try{
        const response = await axios.post("http://localhost:5000/professor", data);
        return response.data;
    } catch(error) {
        console.error("Erro ao enviar professor API", error);
        throw error;
    }
};