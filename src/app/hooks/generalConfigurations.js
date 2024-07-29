import { useQuery } from "@tanstack/react-query";
import { getGeneralConfigurationsApi } from "app/api/generalConfigurations";

export function GetGeneralConfigurations() {
    return useQuery({ queryKey: ['generalConfigurations'], queryFn: getGeneralConfigurationsApi, saleTime: 120000 })
}
