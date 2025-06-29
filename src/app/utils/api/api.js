import axios from "axios";
if (process.env.NEXT_PUBLIC_API_URL = undefined | null){
  console.log("API PARA O BACK NÃO DEFINIDA")
}
console.log('Valor de NEXT_PUBLIC_API_URL na instância API:', process.env.NEXT_PUBLIC_API_URL);
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});
