import { api } from "./api";

/**
 * Busca todas as avaliações com filtros opcionais.
 * @param {Object} params - Parâmetros de busca (ver FindAllAvaliacoesDto).
 * @returns {Promise<any>}
 */
export async function getAllAvaliacao({
  avaliacaoId,
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

  if (avaliacaoId) params.avaliacaoId = avaliacaoId;
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

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return await api.get(endpoint, { 
    params: params,
    headers: headers 
  });
}


/**
 * 
 * @param {Object} params - Parâmetros de busca (ver ).
 * @returns {Promise<any>}
 */
export async function deleteAvaliacao(avaliacaoId, token){

  avaliacaoId = Number(avaliacaoId);
  const endpoint = "/avaliacao";
  const params = {};

  if(avaliacaoId) params.id = avaliacaoId;

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return await api.delete(endpoint, 
    { 
      params: params,
      headers: headers 
    }
  );
}


/**
 * 
 * @param {Object} params - Parâmetros de busca (ver ).
 * @returns {Promise<any>}
 */
export async function patchAvaliacao(avaliacaoId, avaliacaoDTO, token){

  avaliacaoId = Number(avaliacaoId);
  const endpoint = `/avaliacao/${avaliacaoId}`;
  const params = {};

  if(avaliacaoId) params.id = avaliacaoId;

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return await api.patch(
    endpoint,
    avaliacaoDTO, // corpo da requisição
    {
      params: params,
      headers: headers
    }
  );
}


