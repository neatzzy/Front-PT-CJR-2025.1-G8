import { api } from "./api";

/**
 * Busca todas as avaliações com filtros opcionais.
 * @param {Object} params - Parâmetros de busca (ver FindAllAvaliacoesDto).
 * @returns {Promise<any>}
 */
export async function getAllAvaliacao({
  page,
  pageSize,
  sort,
  order,
  professorID,
  disciplinaID,
  usuarioID,
  search,
  include,
  token,
} = {}) {
  const endpoint = "/avaliacao";
  const params = {};

  if (page) params.page = page;
  if (pageSize) params.pageSize = pageSize;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (professorID) params.professorID = professorID;
  if (disciplinaID) params.disciplinaID = disciplinaID;
  if (usuarioID) params.usuarioID = usuarioID;
  if (search) params.search = search;
  if (include) params.include = include;

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return await axios.get(endpoint, { 
    params: params,
    headers: headers 
  });
}
