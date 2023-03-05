import http from "@/libs/axios"

export const API_ENDPOINT = "https://www.ht-api.canfianceesthetique.com"

export const fetchFromApi = <T>(url: string) => http.get<T>(url);