import { BOUTIQUE_API } from "./api"

export const getDepartamentsMunicipiesApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('municipios')
    return data
}