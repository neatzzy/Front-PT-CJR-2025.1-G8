import axios from "axios";

interface ProfessorData {
    professorNome: string;
    professorDepartamento: string;
    professorDisciplina: string;
    professorFoto?: File | null;
}

export async function createProfessor(data: FormData, token?: string){
    try{
        const response = await axios.post("http://localhost:5000/professor", data,{
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return response.data;
    } catch(error) {
        console.error("Erro ao enviar professor API", error);
        throw error;
    }
};

export async function editDisciplina(professorId: string , disciplinaName: string, token?: string){
    console.log('⮕ disciplinaName:', disciplinaName, typeof disciplinaName);
    try{
        const response = await axios.patch(`http://localhost:5000/professor/${professorId}`, {disciplinaName}, {
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return response.data;
    } catch(error) {
        console.error("Erro ao enviar disciplina API", error);
        throw error;
    }
};