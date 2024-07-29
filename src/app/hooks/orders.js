import { useQuery } from "@tanstack/react-query";
import { getOrdersApi } from "app/api/orders";


export function GetOrders() {
    return useQuery({ queryKey: ['orders'], queryFn: getOrdersApi, saleTime: 120000 })
}