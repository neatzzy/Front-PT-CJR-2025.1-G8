import { api } from "./api";

interface ProfessorData {
    professorNome: string;
    professorDepartamento: string;
    professorDisciplina: string;
    professorFoto?: File | null;
}

interface PhotoUpdatePayload {
    fotoPerfil: string; 
}

export async function createProfessor(data: FormData, token?: string){
    try{
        const response = await api.post("/professor", data,{
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
        const response = await api.patch(`/professor/${professorId}`, {disciplinaName}, {
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

export async function deleteProfessor(professorId: number, token?: string) {
    try {
        const response = await api.delete(`/professor/${professorId}`, {
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir professor API", error);
        throw error;
    }
}

export async function updateProfessorPhoto(professorId: number, photoBase64: string, token?: string): Promise<any> { 
  try {
    const dataToSend: PhotoUpdatePayload = {
      fotoPerfil: photoBase64, 
    };
    const response = await api.patch(
      `/professor/${professorId}`,
      dataToSend,
      {
        headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar foto do professor API:", error);
    throw error;
  }
}