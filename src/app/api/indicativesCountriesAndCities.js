import { BOUTIQUE_API } from "./api"

export const getIndicativesCountriesAndCitiesApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('indicativos-paieses')
    return data
}