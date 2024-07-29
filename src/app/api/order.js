import { BOUTIQUE_API } from "./api"

export const saveOrderApi = async (payload) => {
    try {
        let { data: { data } } = await BOUTIQUE_API.post('pedido', payload)
        if (data) {
            return data
        }
    } catch (error) {
        throw error
    }
}