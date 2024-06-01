import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi, saveCategoryApi } from "app/api/category";


export function GetCategories() {
    return useQuery({ queryKey: ['categories'], queryFn: getCategoriesApi })
}

export function SaveCategory(payload) {
    // console.log('Llego aqui', payload);
    // return queryOptions({ queryKey: ['products', payload], queryFn: () => saveProductApi(payload) })
    return saveCategoryApi(payload)
}