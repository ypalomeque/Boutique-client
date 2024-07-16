import { useQuery } from "@tanstack/react-query";
import { getDepartamentsMunicipiesApi } from "app/api/departmentsMunicipies";

export function GetDepartamentsMunicipies() {
    return useQuery({ queryKey: ['departamentsMunicipies'], queryFn: getDepartamentsMunicipiesApi, staleTime: 120000 })
}