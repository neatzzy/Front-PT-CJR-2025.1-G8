import { api } from "./api";

/**
 * Busca todas as avaliações com filtros opcionais.
 * @param {Object} params - Parâmetros de busca (ver FindAllAvaliacoesDto).
 * @returns {Promise<any>}
 */

export async function postComentario(createComentarioDto, token) {
    const endpoint = '/comentarios';

    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return await api.post(
        endpoint,
        createComentarioDto, // corpo da requisição
        {
            headers: headers,
        }
    );
}
export async function deleteComentarioById(comentarioId, token) {
    const endpoint = `/comentarios/${comentarioId}`;

    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return await api.delete(endpoint, {
        headers: headers
    });
}