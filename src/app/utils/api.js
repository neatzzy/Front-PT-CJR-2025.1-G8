import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function postUsuario(data) {
  const post = await api.post("/usuarios", data);
  return;
}
export default api;
