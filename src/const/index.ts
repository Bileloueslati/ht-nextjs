import { Api } from "@/libs/axios";

export const API_ENDPOINT = "https://www.ht-api.canfianceesthetique.com";

export const CRM_URL = "https://perso.healthtravel.fr";

export const fetchFromApi = <T = any>(url: string) => Api.get<T>(url);
