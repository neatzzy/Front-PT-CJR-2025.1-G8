import { api } from "./api";

export async function getUsuarioByID(id) {
  const endpoint = `/usuario/${id}`;

  return await api.get(endpoint);
}

export async function getCurrentUserAuthorized(token) {
  const Authorization = `Bearer ${token}`;

  const endpoint = "/me";

  const config = {
    headers: {
      Authorization: Authorization,
    },
  };

  return await api.get(endpoint, config);
}

export async function updateUsuario(id, data, token) {
  const endpoint = `/usuario/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await api.patch(endpoint, data);
}

export async function deleteUsuario(id, token) {
  const endpoint = `/usuario/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await api.delete(endpoint);
}

export async function deleteWithPassword(id, senha, token) {
  const endpoint = `/usuario/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await api.delete(endpoint, senha);
}
