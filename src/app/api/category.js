import { BOUTIQUE_API } from "./api"

export const getCategoriesApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('categorias')
    return data
}

export const saveCategoryApi = async (payload) => {
    let { data: { data } } = await BOUTIQUE_API.post('categoria', payload)
    return data
}