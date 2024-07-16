import { useQuery } from "@tanstack/react-query";
import { getRolesApi } from "app/api/roles";


export function GetRoles() {
    return useQuery({ queryKey: ['roles'], queryFn: getRolesApi, saleTime: 120000 })
}