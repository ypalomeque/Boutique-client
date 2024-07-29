import { BOUTIQUE_API } from "./api"

export const getGeneralConfigurationsApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('configuraciones')
    return data
}