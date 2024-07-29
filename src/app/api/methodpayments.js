import { BOUTIQUE_API } from "./api"

export const getMethodpaymentsApi = async () => {
    let { data: { data } } = await BOUTIQUE_API.get('metodo-pago')
    return data
}
