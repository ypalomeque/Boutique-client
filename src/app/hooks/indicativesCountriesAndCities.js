import { useQuery } from "@tanstack/react-query";
import { getIndicativesCountriesAndCitiesApi } from "app/api/indicativesCountriesAndCities";


export function GetIndicativesCountriesAndCities() {
    return useQuery({ queryKey: ['indicativesCountriesAndCities'], queryFn: getIndicativesCountriesAndCitiesApi, saleTime: 120000 })
}