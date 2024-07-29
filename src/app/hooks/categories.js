import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi, getCategoriesApiQuery, saveCategoryApi } from "app/api/category";


export function GetCategories() {
    return useQuery({ queryKey: ['categories'], queryFn: getCategoriesApi, saleTime: 120000 })
}

export function GetCategoriesQuery() {
    return useQuery({ queryKey: ['categories'], queryFn: getCategoriesApiQuery, saleTime: 120000 })
}
export function SaveCategory(payload) {
    // console.log('Llego aqui', payload);
    // return queryOptions({ queryKey: ['products', payload], queryFn: () => saveProductApi(payload) })
    return saveCategoryApi(payload)
}