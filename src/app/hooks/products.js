import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsApi, saveProductApi, updateProductApi } from "app/api/products";
import { NotificationAlert } from "app/components/NotificationAlert/Notification";


export function useMutationProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: SaveProduct,
        onError: (error, variables, context) => {
            let { message } = error.response.data;
            // console.log("Mostrando error", variables);
            // console.log("Mostrando error", context);
            NotificationAlert("error", "Registro Producto", `${message}`);
        },
        onSuccess: (resp) => {
            NotificationAlert("success", "Registro Producto", "Registro realizado con éxito.");
            queryClient.setQueryData(["products"], (prevProducts) => prevProducts.concat(resp));
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    })
}


function SaveProduct(payload) {
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