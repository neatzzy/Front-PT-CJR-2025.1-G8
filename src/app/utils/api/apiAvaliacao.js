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
} = {}) {
  const endpoint = "/avaliacao";
  const params = {};

  if (page) params.page = page;
  if (pageSize) params.pageSize = pageSize;
  if (sort) params.sort = sort;
  if (order) params.order = order;
  if (professorID) params.professorID = professorID;
  if (usuarioID) params.usuarioID = usuarioID;

  if (disciplinaID) params.disciplinaID = disciplinaID;
  if (usuarioID) params.usuarioID = usuarioID;
  if (search) params.search = search;
  if (include) params.include = include;

  return await api.get(endpoint, { params });
}
