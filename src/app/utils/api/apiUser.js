import { api } from "./api";

export async function getCurrentUserAuthorized(token) {
    const Authorization = `Bearer ${token}`;
    
    const endpoint = '/me';
    
    const config = {
        headers : {
            'Authorization': Authorization,
        }
    };

    return await api.get(endpoint, config);
}