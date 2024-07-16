import { useQuery } from "@tanstack/react-query";
import { getCostDomiciliesApi } from "app/api/costDomicilie";

export function GetCostDomicilies() {
    return useQuery({ queryKey: ['costDomicilies'], queryFn: getCostDomiciliesApi, staleTime: 120000 })
}