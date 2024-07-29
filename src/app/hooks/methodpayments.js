import { useQuery } from "@tanstack/react-query";
import { getMethodpaymentsApi } from "app/api/methodpayments";



export function GetMethodpayments() {
    return useQuery({ queryKey: ['methodpayments'], queryFn: getMethodpaymentsApi, saleTime: 120000 })
}
