import { useQuery } from "@tanstack/react-query";
import { getProductsApi, saveProductApi, updateProductApi } from "app/api/products";

export function SaveProduct(payload) {
    // console.log('Llego aqui', payload);
    // return queryOptions({ queryKey: ['products', payload], queryFn: () => saveProductApi(payload) })
    return saveProductApi(payload)
}

export function GetProducts() {
    return useQuery({ queryKey: ['products'], queryFn: getProductsApi, staleTime: 120000 })
}
export function UpdateProduct(data) {
    return updateProductApi(data[0], data[1])
}