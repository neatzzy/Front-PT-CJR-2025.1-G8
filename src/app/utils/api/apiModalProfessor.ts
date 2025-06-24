import axios from "axios";
import { File } from "buffer";

interface ProfessorData {
    professorNome: string;
    professorDepartamento: string;
    professorDisciplina: string;
    professorFoto?: File;
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