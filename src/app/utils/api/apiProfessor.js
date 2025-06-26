import { api } from "./api";

export async function getProfessorById(id) {
    const endpoint = '/professor';

    const router = endpoint + "/" + id;

    return await api.get(router);
}


/**
 * Busca todas as avaliações com filtros opcionais.
 * @param {Object} params - Parâmetros de busca (ver FindAllAvaliacoesDto).
 * @returns {Promise<any>}
 */
export async function getAllProfessor({
  page,
  pageSize,
  sort,
  order,
  professorID,
  disciplinaID,
  search,
} = {}) {
  const endpoint = "/professor";
  const params = {};

  if (page) params.page = page;
  if (pageSize) params.pageSize = pageSize;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (professorID) params.professorID = professorID;
  if (disciplinaID) params.disciplinaID = disciplinaID;
  if (search) params.search = search;

  return await api.get(endpoint, { params });
}
