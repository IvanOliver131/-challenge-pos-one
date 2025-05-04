import { requestApi } from "@/http/request-api";
import type { ApiRequestOptions } from "@/types/ApiRequestOptions";
import type { Link } from "@/types/Link";

interface Response {
  links: Link[];
  total: number;
}

export async function getLinks(pageParam: number): Promise<Response> {
  const requestOptions: ApiRequestOptions = {
    url: `${import.meta.env.VITE_BASE_URL}/links?page=${pageParam}`,
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await requestApi<Response>(requestOptions);

  return response;
}
