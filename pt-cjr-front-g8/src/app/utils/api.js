import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:5000'
});

export async function postUsuario(data){
        const post = await api.post('/usuarios', data)
    return; 
}
