import { BOUTIQUE_API } from "./api"

export const saveUserApi = async (payload) => {
    try {
        let { data: { data } } = await BOUTIQUE_API.post('usuario', payload)
        if (data) {
            return data
        }
    } catch (error) {
        throw error
    }
}

export const getUsersApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('usuarios')
    return data
}

export const updateUserApi = async (payload, id) => {
    try {
        let { data: { data } } = await BOUTIQUE_API.put(`usuario/${id}`, payload)
        if (data) {
            return data
        }
    } catch (error) {
        throw error
    }
}