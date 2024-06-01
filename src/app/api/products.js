import { BOUTIQUE_API } from "./api"

export const saveProductApi = async (payload) => {
    try {
        let { data: { data } } = await BOUTIQUE_API.post('producto', payload)
        if (data) {
            return data
        }
    } catch (error) {
        throw error
    }
}

export const getProductsApi = async () => {
    try {
        let { data: { data } } = await BOUTIQUE_API.get('productos')
        if (data) {
            return data
        }
    } catch (error) {
        throw error
    }
}

export const updateProductApi = async (payload, id) => {
    try {
        let { data: { data } } = await BOUTIQUE_API.put(`producto/${id}`, payload)
        if (data) {
            return data
        }
    } catch (error) {
        throw error
    }
}