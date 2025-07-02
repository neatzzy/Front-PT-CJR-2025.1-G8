import { api } from './api'; 

/**
 * Busca todos os professores relacionados a disciplinas com filtros opcionais.
 * @param {Object} params - Parâmetros de busca (ver FindAllProfessorDisciplinaDto).
 * @returns {Promise<any>}
 */
export async function getAllProfessorDisciplina(
    {
        page,
        pageSize,
        sort,
        order,
        professorID,
        disciplinaID,
        search,
        include,
        token
    } = {}
) {
    const endpoint = "/professor-disciplina";
    const params = {};

    if (page) params.page = page;
    if (pageSize) params.pageSize = pageSize;
    if (sort) params.sort = sort;
    if (order) params.order = order;
    if (search) params.search = search;
    if (include) params.include = include;
    if (professorID) params.professorID = professorID;
    if (disciplinaID) params.disciplinaID = disciplinaID;

    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return await api.get(endpoint, { 
        params: params,
        headers: headers 
    });
    
}