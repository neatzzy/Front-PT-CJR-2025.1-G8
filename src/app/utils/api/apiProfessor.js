import { api } from "./api";

export async function getProfessorById(id) {
    const endpoint = '/professor';

    const router = endpoint + "/" + id;

    return await api.get(router);
}