import { saveOrderApi } from "app/api/order";

export function SaveOrder(payload) {
    // console.log('Llego aqui', payload);
    // return queryOptions({ queryKey: ['products', payload], queryFn: () => saveProductApi(payload) })
    return saveOrderApi(payload)
}