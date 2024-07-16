import { BOUTIQUE_API } from "app/api/api";

export function validateEmail(value, id = null) {
    return new Promise(async (resolve, reject) => {
        try {
            if (value !== undefined && id !== undefined && id !== null) {
                BOUTIQUE_API.post(`/validate/email`, { email: value, id: id })
                    .then((res) => {
                        let { data: { data: { email }, status } } = res
                        if (status === 'ok') {
                            if (email === 1) {
                                resolve(true)
                            }
                            else if (email === 2) {
                                resolve(true)
                            }
                            else if (email === 3) {
                                resolve(false)
                            }
                        }
                    })
                    .catch((error) => {
                        return resolve(false);
                    });
            } else if (value !== undefined && id == null) {
                BOUTIQUE_API.post(`/validate/email`, { email: value, id: null })
                    .then((res) => {
                        let { data: { data: { email }, status } } = res
                        if (status === 'ok') {
                            if (email === 1) {
                                resolve(true)
                            }
                            else if (email === 2) {
                                resolve(true)
                            }
                            else if (email === 3) {
                                resolve(false)
                            }
                        }
                    })
                    .catch((error) => {
                        return resolve(false);
                    });
            } else {
                return resolve(false);
            }
        } catch (error) {
            console.log(error);
            return resolve(false);
        }
    });
}