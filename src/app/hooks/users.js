import { useQuery } from "@tanstack/react-query";
import { getUsersApi, saveUserApi, updateUserApi } from "app/api/users";


export function SaveUser(payload) {
    // console.log('Llego aqui', payload);
    // return queryOptions({ queryKey: ['products', payload], queryFn: () => saveProductApi(payload) })
    return saveUserApi(payload)
}

export function GetUsers() {
    return useQuery({ queryKey: ['users'], queryFn: getUsersApi, saleTime: 120000 })
}

export function UpdateUser(data) {
    return updateUserApi(data[0], data[1])
}