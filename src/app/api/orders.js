import { BOUTIQUE_API } from "./api"

export const getOrdersApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('pedidos')
    return data
}