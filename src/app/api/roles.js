import { BOUTIQUE_API } from "./api"

export const getRolesApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('role')
    return data
}