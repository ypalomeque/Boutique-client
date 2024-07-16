import { BOUTIQUE_API } from "./api"

export const getCostDomiciliesApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('costos-domicilios')
    return data
}