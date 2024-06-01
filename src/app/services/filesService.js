import { BOUTIQUE_API } from "../api/api";

export const uploadFileService = async (files) => {

    try {
        return await BOUTIQUE_API.post(`subir-archivo`, files, { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (error) {
        return error
    }

}

export const getFileService = async (file) => {
    let resp = null
    try {
        let { data } = await BOUTIQUE_API.get(`archivo/${file}`)
        resp = data
    } catch (error) {
        resp = error
    }
    return resp
}

export const deleteFileService = async (file) => {
    let resp = null
    try {
        let { data } = await BOUTIQUE_API.delete(`eliminar-archivo/${file}`)
        resp = data
    } catch (error) {
        resp = error
    }
    return resp
}
